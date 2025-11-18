"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from "react";
import { authApi, subscriptionApi, type AuthUser, type AuthTokens } from "../lib/api";
import { saveAuthState, loadAuthState, clearAuthState } from "../lib/auth";
import { toast } from "sonner";

interface User extends AuthUser {
  premiumDaysRemaining?: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isPremium: boolean;
  premiumDaysRemaining: number;
  user: User | null;
  accessToken: string | null;
  signIn: (username: string, password: string) => Promise<boolean>;
  signUp: (username: string, password: string, confirmPassword: string, fullName?: string) => Promise<boolean>;
  signInWithGoogle: (idToken: string) => Promise<boolean>;
  signOut: () => void;
  upgradeToPremium: (days: number) => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const APP_SLUG = 'cv-online';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [premiumDaysRemaining, setPremiumDaysRemaining] = useState(0);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [accessTokenExpiry, setAccessTokenExpiry] = useState<number | null>(null);
  const accessTokenRefreshTimeoutRef = useRef<number | null>(null);
  const refreshTokenRef = useRef<string | null>(null);

  // Clear access token refresh timeout
  const clearAccessTokenRefreshTimeout = useCallback(() => {
    if (accessTokenRefreshTimeoutRef.current !== null) {
      clearTimeout(accessTokenRefreshTimeoutRef.current);
      accessTokenRefreshTimeoutRef.current = null;
    }
  }, []);

  // Schedule access token refresh
  const scheduleAccessTokenRefresh = useCallback(
    (expiresInSeconds: number, refreshFn: () => Promise<void>): void => {
      if (typeof window === 'undefined') {
        return;
      }
      clearAccessTokenRefreshTimeout();
      const safeOffset = Math.max(expiresInSeconds - 60, 30);
      const timeoutId = window.setTimeout(() => {
        void refreshFn();
      }, safeOffset * 1000);
      accessTokenRefreshTimeoutRef.current = timeoutId;
    },
    [clearAccessTokenRefreshTimeout],
  );

  // Check subscription status
  const checkSubscription = useCallback(async (token: string) => {
    try {
      const { subscription } = await subscriptionApi.getSubscription(token, APP_SLUG);
      if (subscription && subscription.status === 'active') {
        setIsPremium(subscription.planSlug === 'premium');
        setPremiumDaysRemaining(subscription.remainingDays);
      } else {
        setIsPremium(false);
        setPremiumDaysRemaining(0);
      }
    } catch (error) {
      // Subscription check failed, assume free
      setIsPremium(false);
      setPremiumDaysRemaining(0);
    }
  }, []);

  // Refresh auth state
  const refreshAuth = useCallback(async () => {
    const activeRefreshToken = refreshTokenRef.current;
    if (!activeRefreshToken) {
      clearAccessTokenRefreshTimeout();
      setAccessToken(null);
      setAccessTokenExpiry(null);
      refreshTokenRef.current = null;
      setUser(null);
      clearAuthState();
      return;
    }

    try {
      const { user: refreshedUser, tokens } = await authApi.refresh(activeRefreshToken);
      setUser(refreshedUser);
      setAccessToken(tokens.accessToken);
      refreshTokenRef.current = tokens.refreshToken;
      setAccessTokenExpiry(Date.now() + tokens.accessTokenExpiresIn * 1000);
      saveAuthState(refreshedUser, tokens);
      clearAccessTokenRefreshTimeout();
      scheduleAccessTokenRefresh(tokens.accessTokenExpiresIn, async () => {
        await refreshAuth();
      });
      await checkSubscription(tokens.accessToken);
    } catch (error) {
      clearAccessTokenRefreshTimeout();
      clearAuthState();
      setUser(null);
      setAccessToken(null);
      setAccessTokenExpiry(null);
      refreshTokenRef.current = null;
    }
  }, [checkSubscription, clearAccessTokenRefreshTimeout, scheduleAccessTokenRefresh]);

  // Apply auth success (used after login/signup)
  const applyAuthSuccess = useCallback(
    (authUser: AuthUser, tokens: AuthTokens) => {
      setUser(authUser);
      setAccessToken(tokens.accessToken);
      refreshTokenRef.current = tokens.refreshToken;
      setAccessTokenExpiry(Date.now() + tokens.accessTokenExpiresIn * 1000);
      clearAccessTokenRefreshTimeout();
      scheduleAccessTokenRefresh(tokens.accessTokenExpiresIn, async () => {
        await refreshAuth();
      });
      saveAuthState(authUser, tokens);
    },
    [clearAccessTokenRefreshTimeout, scheduleAccessTokenRefresh, refreshAuth],
  );

  const signIn = async (username: string, password: string): Promise<boolean> => {
    try {
      const { user: authUser, tokens } = await authApi.login({ username, password });
      applyAuthSuccess(authUser, tokens);
      await checkSubscription(tokens.accessToken);
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
      return false;
    }
  };

  const signUp = async (
    username: string,
    password: string,
    confirmPassword: string,
    fullName?: string,
  ): Promise<boolean> => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    try {
      const { user: authUser, tokens } = await authApi.register({
        username,
        password,
        fullName: fullName || username,
      });
      applyAuthSuccess(authUser, tokens);
      await checkSubscription(tokens.accessToken);
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
      return false;
    }
  };

  const signInWithGoogle = async (idToken: string): Promise<boolean> => {
    try {
      const { user: authUser, tokens } = await authApi.googleAuth({ idToken });
      applyAuthSuccess(authUser, tokens);
      await checkSubscription(tokens.accessToken);
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Google sign-in failed';
      toast.error(message);
      return false;
    }
  };

  const signOut = async () => {
    const activeRefreshToken = refreshTokenRef.current;
    if (activeRefreshToken) {
      try {
        await authApi.logout(activeRefreshToken);
      } catch (error) {
        // Continue with logout even if API call fails
      }
    }
    clearAccessTokenRefreshTimeout();
    clearAuthState();
    setUser(null);
    setAccessToken(null);
    setAccessTokenExpiry(null);
    refreshTokenRef.current = null;
    setIsPremium(false);
    setPremiumDaysRemaining(0);
  };

  const upgradeToPremium = async (days: number) => {
    if (!accessToken) {
      toast.error('Please sign in first');
      return;
    }

    try {
      await subscriptionApi.createSubscription(accessToken, APP_SLUG, 'premium', days, 'free');
      await checkSubscription(accessToken);
      toast.success('Premium subscription activated!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to upgrade to premium';
      toast.error(message);
    }
  };

  // Initialize auth on mount
  useEffect(() => {
    let active = true;

    const initialiseAuth = async () => {
      const stored = loadAuthState();
      if (!stored.accessToken || !stored.refreshToken) {
        if (active) {
          // No stored auth, user is guest
        }
        return;
      }

      if (active) {
        setAccessToken(stored.accessToken);
        refreshTokenRef.current = stored.refreshToken;
        setAccessTokenExpiry(null);
        if (stored.user) {
          setUser(stored.user);
        }
      }

      try {
        // Validate token by calling profile endpoint
        const profile = await authApi.profile(stored.accessToken);
        if (!active) {
          return;
        }
        setUser(profile.user);
        setAccessTokenExpiry(Date.now() + 14 * 60 * 1000); // Assume 14 min expiry
        clearAccessTokenRefreshTimeout();
        scheduleAccessTokenRefresh(14 * 60, async () => {
          await refreshAuth();
        });
        await checkSubscription(stored.accessToken);
      } catch {
        // Profile check failed, try to refresh
        if (!stored.refreshToken) {
          if (active) {
            clearAuthState();
            setUser(null);
            setAccessToken(null);
            setAccessTokenExpiry(null);
            refreshTokenRef.current = null;
            clearAccessTokenRefreshTimeout();
          }
        } else {
          try {
            const refreshed = await authApi.refresh(stored.refreshToken);
            if (!active) {
              return;
            }
            saveAuthState(refreshed.user, refreshed.tokens);
            setUser(refreshed.user);
            setAccessToken(refreshed.tokens.accessToken);
            refreshTokenRef.current = refreshed.tokens.refreshToken;
            setAccessTokenExpiry(Date.now() + refreshed.tokens.accessTokenExpiresIn * 1000);
            clearAccessTokenRefreshTimeout();
            scheduleAccessTokenRefresh(refreshed.tokens.accessTokenExpiresIn, async () => {
              await refreshAuth();
            });
            await checkSubscription(refreshed.tokens.accessToken);
          } catch {
            if (active) {
              clearAuthState();
              setUser(null);
              setAccessToken(null);
              setAccessTokenExpiry(null);
              refreshTokenRef.current = null;
              clearAccessTokenRefreshTimeout();
            }
          }
        }
      }
    };

    void initialiseAuth();

    return () => {
      active = false;
      clearAccessTokenRefreshTimeout();
    };
  }, [checkSubscription, clearAccessTokenRefreshTimeout, scheduleAccessTokenRefresh, refreshAuth]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user && !!accessToken,
        isPremium,
        premiumDaysRemaining,
        user,
        accessToken,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        upgradeToPremium,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}


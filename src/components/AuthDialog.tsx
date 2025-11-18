"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAuth } from "./AuthContext";
import { useLanguage } from "../App";
import { toast } from "sonner";
import { X } from "lucide-react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: { credential: string }) => void }) => void;
          renderButton: (element: HTMLElement, config: { theme?: string; size?: string; text?: string; width?: number }) => void;
          prompt: () => void;
        };
      };
    };
  }
}

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isGuestRestriction?: boolean;
}

export function AuthDialog({ open, onOpenChange, isGuestRestriction = false }: AuthDialogProps) {
  const { t } = useLanguage();
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleButtonRef, setGoogleButtonRef] = useState<HTMLDivElement | null>(null);

  // Load Google Identity Services script
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (clientId && window.google) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response) => {
            try {
              setLoading(true);
              const success = await signInWithGoogle(response.credential);
              if (success) {
                toast.success("Signed in with Google successfully");
                onOpenChange(false);
                resetForm();
              }
            } catch (error) {
              const message = error instanceof Error ? error.message : 'Google sign-in failed';
              toast.error(message);
            } finally {
              setLoading(false);
            }
          },
        });
      }
    };

    return () => {
      // Cleanup if needed
    };
  }, [signInWithGoogle, onOpenChange]);

  // Render Google button when dialog opens
  useEffect(() => {
    if (!open || !window.google || !googleButtonRef) return;

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    // Clear any existing button
    googleButtonRef.innerHTML = '';

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      if (googleButtonRef && window.google) {
        try {
          window.google.accounts.id.renderButton(googleButtonRef, {
            theme: 'outline',
            size: 'large',
            text: 'signin_with',
            width: 300,
          });
        } catch (error) {
          console.error('Failed to render Google button:', error);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (googleButtonRef) {
        googleButtonRef.innerHTML = '';
      }
    };
  }, [open, googleButtonRef]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      if (username.trim() && password.trim() && confirmPassword.trim()) {
        setLoading(true);
        const success = await signUp(username, password, confirmPassword);
        setLoading(false);
        if (success) {
          toast.success(t.signUpButton + " " + t.success);
          onOpenChange(false);
          resetForm();
        }
      } else {
        toast.error(t.fillAllFields);
      }
    } else {
      if (username.trim() && password.trim()) {
        setLoading(true);
        const success = await signIn(username, password);
        setLoading(false);
        if (success) {
          toast.success(t.loginButton + " " + t.success);
          onOpenChange(false);
          resetForm();
        }
      } else {
        toast.error(t.fillAllFields);
      }
    }
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setIsSignUp(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleOpenChange(false)}
          className="absolute top-4 right-4 z-[100] h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <DialogHeader className="pr-8">
          <DialogTitle>
            {isSignUp ? t.signUpTitle : t.loginTitle}
          </DialogTitle>
          <DialogDescription>
            {isGuestRestriction && (
              <span className="text-amber-600 dark:text-amber-400 block mb-2 font-medium">
                {t.guestRestrictionMessage}
              </span>
            )}
            {isSignUp ? t.signUpSubtitle : t.loginSubtitle}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">{t.usernameLabel}</Label>
            <Input
              id="username"
              type="text"
              placeholder={t.usernamePlaceholder}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t.passwordLabel}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder={t.passwordPlaceholder}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (isSignUp ? "Signing up..." : "Signing in...") : (isSignUp ? t.signUpButton : t.loginButton)}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400">Or continue with</span>
              </div>
            </div>
            <div ref={(el) => setGoogleButtonRef(el)} className="flex justify-center"></div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full"
            >
              {isSignUp ? t.alreadyHaveAccount : t.noAccount} {isSignUp ? t.loginButton : t.signUp}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiRequestOptions<TBody> {
  method?: HttpMethod;
  body?: TBody;
  token?: string | null;
  signal?: AbortSignal;
}

// Auth interfaces
interface RegisterPayload {
  fullName: string;
  username: string;
  password: string;
  sex?: 'male' | 'female' | 'other';
  preferredLanguage?: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

interface GoogleAuthPayload {
  idToken: string;
}

export interface AuthTokens {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

export interface AuthUser {
  id: number;
  fullName: string;
  username: string;
  preferredLanguage: string;
  sex: 'male' | 'female' | 'other' | null;
}

interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
  isNewUser?: boolean;
}

// CV interfaces
export interface CVData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    linkedinLabel: string;
    website: string;
    websiteLabel: string;
    facebook: string;
    facebookLabel: string;
    zalo: string;
    zaloLabel: string;
    photo: string;
    showLinkedinQR?: boolean;
    showPortfolioQR?: boolean;
  };
  profile: string;
  workExperience: Array<{
    position: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    responsibilities: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    startDate: string;
    endDate: string;
    details: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
  languages: Array<{
    name: string;
    level: string;
  }>;
  certifications: string[];
  customSections: Array<{
    title: string;
    content: string;
  }>;
}

export interface CV {
  id: number;
  userId: number;
  title: string;
  cvData: CVData;
  templateId: number;
  isPublic: boolean;
  shareToken: string | null;
  createdAt: string;
  updatedAt: string;
}

// Subscription interfaces
export interface Subscription {
  id: number;
  appSlug: string;
  appName: string;
  planSlug: string;
  planName: string;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  startDate: string;
  endDate: string;
  remainingDays: number;
  features: Record<string, unknown>;
}

async function apiRequest<TResponse, TBody = unknown>(
  path: string,
  { method = 'GET', body, token, signal }: ApiRequestOptions<TBody> = {},
): Promise<TResponse> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    signal,
    credentials: 'include',
  });

  if (response.status === 204) {
    return undefined as unknown as TResponse;
  }

  const data = await response.json().catch(() => undefined);

  if (!response.ok) {
    const message = (data && data.message) || 'Unexpected error';
    throw new Error(message);
  }

  return data as TResponse;
}

// Auth API
export const authApi = {
  register: (payload: RegisterPayload) =>
    apiRequest<AuthResponse, RegisterPayload>('/api/auth/register', { method: 'POST', body: payload }),

  login: (payload: LoginPayload) =>
    apiRequest<AuthResponse, LoginPayload>('/api/auth/login', { method: 'POST', body: payload }),

  googleAuth: (payload: GoogleAuthPayload) =>
    apiRequest<AuthResponse, GoogleAuthPayload>('/api/auth/google', { method: 'POST', body: payload }),

  refresh: (refreshToken: string) =>
    apiRequest<AuthResponse, { refreshToken: string }>('/api/auth/refresh', {
      method: 'POST',
      body: { refreshToken },
    }),

  logout: (refreshToken: string) =>
    apiRequest<void, { refreshToken: string }>('/api/auth/logout', { method: 'POST', body: { refreshToken } }),

  profile: (accessToken: string) =>
    apiRequest<{ user: AuthUser }>('/api/auth/me', { token: accessToken }),

  updateProfile: (accessToken: string, payload: { fullName?: string; password?: string; preferredLanguage?: string; sex?: 'male' | 'female' | 'other' | null }) =>
    apiRequest<{ user: AuthUser }>('/api/auth/me', {
      method: 'PUT',
      body: payload,
      token: accessToken,
    }),
};

// CV API
export const cvApi = {
  createCV: (accessToken: string, appSlug: string, title: string, cvData: CVData, templateId?: number) =>
    apiRequest<{ cv: CV }, { appSlug: string; title: string; cvData: CVData; templateId?: number }>(
      '/api/cvs',
      {
        method: 'POST',
        body: { appSlug, title, cvData, templateId },
        token: accessToken,
      },
    ),

  getCVs: (accessToken: string, appSlug: string) =>
    apiRequest<{ cvs: CV[] }>(`/api/cvs?appSlug=${encodeURIComponent(appSlug)}`, {
      token: accessToken,
    }),

  getCV: (accessToken: string, cvId: number) =>
    apiRequest<{ cv: CV }>(`/api/cvs/${cvId}`, {
      token: accessToken,
    }),

  updateCV: (accessToken: string, cvId: number, updates: { title?: string; cvData?: CVData; templateId?: number }) =>
    apiRequest<{ cv: CV }, { title?: string; cvData?: CVData; templateId?: number }>(`/api/cvs/${cvId}`, {
      method: 'PUT',
      body: updates,
      token: accessToken,
    }),

  deleteCV: (accessToken: string, cvId: number) =>
    apiRequest<void>(`/api/cvs/${cvId}`, {
      method: 'DELETE',
      token: accessToken,
    }),

  shareCV: (accessToken: string, cvId: number, isPublic: boolean) =>
    apiRequest<{ shareToken: string | null; isPublic: boolean }, { isPublic: boolean }>(`/api/cvs/${cvId}/share`, {
      method: 'POST',
      body: { isPublic },
      token: accessToken,
    }),

  getSharedCV: (shareToken: string) =>
    apiRequest<{ cv: CV }>(`/api/cvs/shared/${shareToken}`),

  uploadImage: async (accessToken: string, file: File): Promise<{ url: string; filename: string; size: number; mimetype: string }> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}/api/cvs/upload-image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const data = await response.json().catch(() => undefined);
      const message = (data && data.message) || 'Upload failed';
      throw new Error(message);
    }

    return response.json();
  },

  deleteImage: (accessToken: string, filename: string) =>
    apiRequest<{ message: string }, { filename: string }>('/api/cvs/delete-image', {
      method: 'DELETE',
      body: { filename },
      token: accessToken,
    }),
};

// Subscription API
export const subscriptionApi = {
  getSubscription: (accessToken: string, appSlug: string) =>
    apiRequest<{ subscription: Subscription | null }>(`/api/subscriptions/${appSlug}`, {
      token: accessToken,
    }),

  getAllSubscriptions: (accessToken: string) =>
    apiRequest<{ subscriptions: Subscription[] }>('/api/subscriptions', {
      token: accessToken,
    }),

  createSubscription: (
    accessToken: string,
    appSlug: string,
    planSlug: string,
    durationDays: number,
    paymentMethod?: string,
  ) =>
    apiRequest<
      { subscription: Subscription; extended?: boolean },
      { appSlug: string; planSlug: string; durationDays: number; paymentMethod?: string }
    >('/api/subscriptions', {
      method: 'POST',
      body: { appSlug, planSlug, durationDays, paymentMethod },
      token: accessToken,
    }),

  cancelSubscription: (accessToken: string, appSlug: string) =>
    apiRequest<void>(`/api/subscriptions/${appSlug}`, {
      method: 'DELETE',
      token: accessToken,
    }),
};


export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  name: string;
  termsAccepted: boolean;
}

export interface RegisterResponse {
  id: string;
  email: string;
  username: string;
  familyId?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthUser {
  userName: string;
  name: string;
  initials: string;
  email: string;
  roles: string;
}

export interface AuthState {
  session: boolean;
  user: AuthUser | null;
}

export interface LoginResponse {
  userName: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface NormalizedApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  fieldErrors?: Record<string, string>;
}

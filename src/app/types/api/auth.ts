export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  name: string;
  termsAccepted: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface ConfirmEmailRequest {
  userId: string;
  token: string;
}

export interface ResendConfirmationRequest {
  email: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string
}

export interface UserResponse {
  userName: string;
  email: string;
  roles: string;
  token: string;
  refreshToken: string;
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

export interface NormalizedApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  fieldErrors?: Record<string, string>;
}

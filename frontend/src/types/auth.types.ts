export type Role = 'ADMIN' | 'VIEWER';

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: AuthUser;
}

export interface AccountResponse {
  message: string;
  user: AuthUser;
}

export interface ForgotPasswordResponse {
  message: string;
  resetToken?: string;
}

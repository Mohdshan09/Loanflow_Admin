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
  user: {
    id: string;
    fullName: string;
    email: string;
    role: 'ADMIN' | 'VIEWER';
  };
}

export interface ForgotPasswordResponse {
  message: string;
  resetToken?: string;
}

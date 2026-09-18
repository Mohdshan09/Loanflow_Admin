import { api } from './axios';
import type {
  AuthResponse,
  AccountResponse,
  ForgotPasswordResponse,
  LoginRequest,
  RegisterRequest,
} from '../types/auth.types';

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data);

  return response.data;
};

export const register = async (data: RegisterRequest): Promise<AccountResponse> => {
  const response = await api.post<AccountResponse>('/auth/register', data);

  return response.data;
};

export const updateProfile = async (data: { fullName: string }): Promise<AccountResponse> => {
  const response = await api.put<AccountResponse>('/auth/profile', data);
  return response.data;
};

export const requestPasswordReset = async (email: string): Promise<ForgotPasswordResponse> => {
  const response = await api.post<ForgotPasswordResponse>('/auth/forgot-password', { email });

  return response.data;
};

export const resetPassword = async (token: string, password: string): Promise<void> => {
  await api.post('/auth/reset-password', { token, password });
};

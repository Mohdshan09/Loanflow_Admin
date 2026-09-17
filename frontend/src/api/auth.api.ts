import { api } from './axios';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth.types';

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data);

  return response.data;
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', data);

  return response.data;
};

export const updateProfile = async (data: { fullName: string }): Promise<AuthResponse> => {
  const response = await api.put<AuthResponse>('/auth/profile', data);
  return response.data;
};

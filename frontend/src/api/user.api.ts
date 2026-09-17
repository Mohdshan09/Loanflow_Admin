import type { CreateUserInput, User, UserResponse, UsersResponse } from '../types/user.types';
import { api } from './axios';

export const getUsers = async (): Promise<UsersResponse> => {
  const response = await api.get<UsersResponse>('/users');
  return response.data;
};

export const getUserById = async (id: string): Promise<{ success: boolean; data: User }> => {
  const response = await api.get<{ success: boolean; data: User }>(`/users/${id}`);
  return response.data;
};

export const createUser = async (data: CreateUserInput): Promise<UserResponse> => {
  const response = await api.post<UserResponse>('/users', data);
  return response.data;
};

export const deleteUser = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

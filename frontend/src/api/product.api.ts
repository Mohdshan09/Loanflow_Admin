import type {
  CreateProductInput,
  ProductResponse,
  ProductsResponse,
} from '../types/products.types';
import { api } from './axios';

export const getProducts = async (): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>('/products');
  return response.data;
};

export const getProductById = async (id: string): Promise<ProductResponse> => {
  const response = await api.get<ProductResponse>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (data: CreateProductInput): Promise<ProductResponse> => {
  const response = await api.post<ProductResponse>('/products', data);
  return response.data;
};

export const updateProduct = async (
  id: string,
  data: Partial<CreateProductInput>,
): Promise<ProductResponse> => {
  const response = await api.patch<ProductResponse>(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (
  id: string,
): Promise<{ success: boolean; data: { message: string } }> => {
  const response = await api.delete<{ success: boolean; data: { message: string } }>(
    `/products/${id}`,
  );
  return response.data;
};

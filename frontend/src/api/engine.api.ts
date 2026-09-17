import { api } from './axios';

export const simulateRun = async (): Promise<{ message: string; durationMs: number }> => {
  const response = await api.post('/engine/simulate');
  return response.data;
};

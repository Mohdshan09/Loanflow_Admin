import { useQuery } from '@tanstack/react-query';
import { getSystemHealth } from '../api/health.api';

export const useSystemHealth = () => {
  return useQuery({
    queryKey: ['system-health'],
    queryFn: getSystemHealth,
    refetchInterval: 15000, // polls every 15s
    retry: 1,
  });
};

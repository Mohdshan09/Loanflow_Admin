import { useMutation } from '@tanstack/react-query';
import { login, register } from '../api/auth.api';
import { useAuthStore } from '../stores/auth.store';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: login,

    onSuccess: (data, variables) => {
      setAuth(data.token, data.user, variables.rememberMe);
    },
  });
};

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: register,

    onSuccess: (data) => {
      setAuth(data.token, data.user, false);
    },
  });
};

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { requestPasswordReset, resetPassword } from '../../api/auth.api';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const requestReset = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await requestPasswordReset(email.trim());
      toast.success(response.message);

      if (response.resetToken) {
        setToken(response.resetToken);
      }
    } catch {
      toast.error('Unable to request a password reset. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const submitNewPassword = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 8 || !/[^A-Za-z0-9\s]/.test(password)) {
      toast.error('Use at least 8 characters and one special character');
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(token ?? '', password);
      toast.success('Password reset successfully. Please sign in.');
      navigate('/login', { replace: true });
    } catch {
      toast.error('This reset link is invalid or has expired.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-950">Reset your password</h1>
        <p className="mt-2 text-sm text-slate-500">
          {token
            ? 'Choose a new password for your account.'
            : 'Enter your work email to request a password reset.'}
        </p>

        {token ? (
          <form onSubmit={submitNewPassword} className="mt-6 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="New password"
              autoComplete="new-password"
              required
              disabled={isLoading}
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-slate-400"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm new password"
              autoComplete="new-password"
              required
              disabled={isLoading}
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-slate-400"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full rounded-lg bg-slate-950 text-sm font-semibold text-white disabled:opacity-60"
            >
              {isLoading ? 'Resetting…' : 'Reset password'}
            </button>
          </form>
        ) : (
          <form onSubmit={requestReset} className="mt-6 space-y-4">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@lendingco.com"
              autoComplete="email"
              required
              disabled={isLoading}
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-slate-400"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full rounded-lg bg-slate-950 text-sm font-semibold text-white disabled:opacity-60"
            >
              {isLoading ? 'Requesting…' : 'Request reset'}
            </button>
          </form>
        )}

        <Link to="/login" className="mt-5 block text-center text-sm font-medium text-blue-600 hover:text-blue-700">
          Back to sign in
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;

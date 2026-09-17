import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

import { useLogin } from '../../hooks/useAuth';
import { loginSchema } from '../../schemas/auth.schema';

const Login = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isLoading = loginMutation.isPending;

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? 'Please check your input');

      return;
    }

    loginMutation.mutate(
      {
        email: result.data.email,
        password: result.data.password,
        rememberMe,
      },
      {
        onSuccess: () => {
          toast.success('Login successful!');

          navigate('/dashboard', {
            replace: true,
          });
        },

        onError: (error) => {
          const message = error instanceof Error ? error.message : 'Invalid email or password';

          toast.error(message);
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-4">
      <div className="w-full max-w-[455px]">
        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-sm">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950">
              <ShieldCheck size={23} strokeWidth={2} className="text-white" />
            </div>
          </div>

          {/* Heading */}
          <div className="mt-3 text-center">
            <p className="text-xs font-medium tracking-[0.16em] text-slate-500">
              LOAN MANAGEMENT PORTAL
            </p>

            <h1 className="mt-1 text-xl font-semibold text-slate-950">Welcome Back</h1>

            <p className="mt-1 text-sm text-slate-500">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-slate-800">
                WORK EMAIL
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@lendingco.com"
                  autoComplete="email"
                  disabled={isLoading}
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-medium text-slate-800">
                  PASSWORD
                </label>

                <button
                  type="button"
                  className="text-xs font-medium text-blue-600 transition hover:text-blue-700"
                  onClick={() => {
                    toast('Password reset is not available yet.');
                  }}
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={isLoading}
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 disabled:cursor-not-allowed"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember device */}
            <label className="flex cursor-pointer items-center gap-2 pt-1 text-xs text-slate-500">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                disabled={isLoading}

                className="h-4 w-4 rounded border-slate-300"
              />

              <span>Remember this device</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}

              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Signup */}
          <p className="mt-4 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-700">
              Create an account
            </Link>
          </p>
        </div>

        {/* Security footer */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck size={14} />
          <span>Enterprise Grade • 256-bit TLS Encryption</span>
        </div>
      </div>
    </div>
  );
};

export default Login;

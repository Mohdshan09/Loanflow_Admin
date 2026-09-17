import { useState } from 'react';
import axios from 'axios';
import { User, Edit2, Check, X, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../stores/auth.store';
import { updateProfile } from '../../api/auth.api';

const Profile = () => {
  const { user, login } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    return null;
  }

  const initials =
    user.fullName
      ?.split(' ')
      .map((n) => n.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? 'U';

  const roleLabel = user.role === 'ADMIN' ? 'Administrator' : 'Viewer';

  const handleSave = async () => {
    if (!fullName.trim() || fullName === user.fullName) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await updateProfile({ fullName });
      // Update local user state
      // The login function in auth store expects a token, we can get token from local storage
      const token = localStorage.getItem('token') ?? sessionStorage.getItem('token');
      if (token) {
        const rememberMe = !!localStorage.getItem('token');
        login(token, response.user, rememberMe);
      }
      setIsEditing(false);
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || 'Failed to update profile'
          : 'Failed to update profile',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFullName(user.fullName);
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Profile</h1>
          <p className="text-sm text-slate-500">Manage your account details and preferences.</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors"
          >
            <Edit2 size={14} />
            Edit Profile
          </button>
        )}
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">{error}</div>}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header banner */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

        {/* Profile info */}
        <div className="relative px-6 pb-8">
          <div className="relative -mt-16 mb-4 flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-slate-800 text-4xl font-bold text-white shadow-md">
            {initials}
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">{user.fullName}</h2>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                <User size={12} />
                {roleLabel}
              </span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                  className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                />
              ) : (
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900">
                  {user.fullName}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500">Email Address</label>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
                {user.email}{' '}
                <span className="ml-1 text-[10px] text-slate-400">(Cannot be changed)</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500">Account ID</label>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-mono text-slate-500">
                {user.id}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500">Role</label>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
                {roleLabel}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:opacity-50"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

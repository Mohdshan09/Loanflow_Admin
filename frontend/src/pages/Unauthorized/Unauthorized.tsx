import { ShieldX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-600">
          <ShieldX size={28} />
        </div>

        <h1 className="mt-5 text-xl font-semibold text-slate-900">Access Denied</h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          You don't have permission to access this page.
        </p>

        <button
          type="button"
          onClick={() => navigate('/dashboard', { replace: true })}
          className="mt-6 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;

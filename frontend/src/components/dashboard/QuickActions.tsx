import { PackagePlus, UserPlus, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import QuickActionCard from './QuickActionCard';
import { useAuthStore } from '../../stores/auth.store';
import { hasPermission } from '../../auth/authorization';
import { PERMISSIONS } from '../../auth/permissions';

const QuickActions = () => {
  const navigate = useNavigate();

  const role = useAuthStore((state) => state.user?.role);

  const canCreateProduct = hasPermission(role, PERMISSIONS.PRODUCT_CREATE);

  const canCreateUser = hasPermission(role, PERMISSIONS.USER_CREATE);

  const canCreateAnything = canCreateProduct || canCreateUser;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-900">Quick Actions</h2>

        <p className="mt-1 text-sm text-slate-500">
          {canCreateAnything
            ? 'Common administrative actions'
            : 'Available actions for your account'}
        </p>
      </div>

      <div className="space-y-3">
        {canCreateProduct && (
          <QuickActionCard
            title="Add Loan Product"
            description="Create and configure a new loan product."
            icon={<PackagePlus size={20} />}
            actionLabel="Configure Product"
            onClick={() => navigate('/products')}
          />
        )}

        {canCreateUser && (
          <QuickActionCard
            title="Add User"
            description="Register a user and evaluate eligibility."
            icon={<UserPlus size={20} />}
            actionLabel="Register User"
            onClick={() => navigate('/users')}
          />
        )}

        {!canCreateAnything && (
          <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm">
              <Info size={16} />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-800">View-only access</p>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Your account has viewer permissions. You can view loan products and users, but
                creating or modifying records requires administrator access.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuickActions;

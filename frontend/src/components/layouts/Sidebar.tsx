import { LayoutDashboard, Package, Users, LogOut, ShieldCheck } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';

const Sidebar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const isAdmin = user?.role === 'ADMIN';

  const initials =
    user?.fullName
      ?.split(' ')
      .map((n) => n.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? 'AS';

  const roleLabel = isAdmin ? 'ADMIN' : 'VIEWER';
  const roleDescription = isAdmin ? 'Administrator' : 'Viewer';

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* ── Brand ─────────────────────────────────── */}
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
        <div className="flex items-center gap-2.5">
          {/* Logo mark */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-sm">
            <span className="text-xs font-bold leading-none text-white">LF</span>
          </div>

          <div className="leading-none">
            <p className="text-sm font-bold text-slate-900">LoanFlow</p>
            <p className="mt-0.5 text-[10px] text-slate-400">{roleLabel} PORTAL</p>
          </div>
        </div>

        {/* Role badge */}
        <span className="rounded-md border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-blue-600">
          {roleLabel}
        </span>
      </div>

      {/* ── Navigation ────────────────────────────── */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3 pt-4">
        <NavItem
          to="/dashboard"
          icon={<LayoutDashboard size={16} strokeWidth={2} />}
          label="Dashboard"
        />

        <NavItem
          to="/products"
          icon={<Package size={16} strokeWidth={2} />}
          label="Loan Products"
        />

        <NavItem to="/users" icon={<Users size={16} strokeWidth={2} />} label="Users" />
        {isAdmin && <NavItem to="/staff" icon={<ShieldCheck size={16} strokeWidth={2} />} label="Staff Access" />}
      </nav>

      {/* ── User / Logout ──────────────────────────── */}
      <div className="border-t border-slate-200 p-4">
        {/* User card */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `mb-2 flex items-center gap-3 rounded-lg px-2 py-2 transition-colors ${
              isActive ? 'bg-slate-100' : 'hover:bg-slate-50'
            }`
          }
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-white">
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              {user?.fullName ?? 'Arun Sharma'}
            </p>
            <p className="text-[11px] text-slate-400">{roleDescription}</p>
          </div>
        </NavLink>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={15} strokeWidth={2} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

/* ── NavItem ──────────────────────────────────────────── */

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-100',
        isActive
          ? 'bg-blue-600 text-white shadow-sm'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
      ].join(' ')
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;

import SystemStatusBar from '../../components/layouts/SystemStatusBar';
import DashboardStats from '../../components/dashboard/DashboardStats';
import EligibilityOverview from '../../components/dashboard/EligibilityOverview';
import QuickActions from '../../components/dashboard/QuickActions';
import RecentProducts from '../../components/dashboard/RecentProducts';
import RecentEvaluations from '../../components/dashboard/RecentEvaluations';
import { useAuthStore } from '../../stores/auth.store';
import { PERMISSIONS } from '../../auth/permissions';
import { hasPermission } from '../../auth/authorization';
import { Navigate } from 'react-router-dom';
import { useDashboardStats } from '../../hooks/useDashboard';

const Dashboard = () => {
  const role = useAuthStore((state) => state.user?.role);
  const { data, isPending } = useDashboardStats();

  const stats = data?.data;

  if (!hasPermission(role, PERMISSIONS.DASHBOARD_VIEW)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="space-y-5">
      {/* System health bar */}
      <SystemStatusBar />

      {/* Stat cards */}
      <DashboardStats stats={stats} isLoading={isPending} />

      {/* Eligibility overview + Quick actions */}
      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <EligibilityOverview stats={stats} isLoading={isPending} />
        <QuickActions />
      </div>

      {/* Recent products + Recent evaluations */}
      <div className="grid gap-5 xl:grid-cols-2">
        <RecentProducts products={stats?.recentProducts} isLoading={isPending} />
        <RecentEvaluations evaluations={stats?.recentEvaluations} isLoading={isPending} />
      </div>
    </div>
  );
};

export default Dashboard;

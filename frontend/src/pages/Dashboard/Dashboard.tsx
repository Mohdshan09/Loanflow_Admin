import AdminLayout from "../../components/layouts/AdminLayout";
import SystemStatusBar from "../../components/layouts/SystemStatusBar";

import DashboardStats from "../../components/dashboard/DashboardStats";
import EligibilityOverview from "../../components/dashboard/EligibilityOverview";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentProducts from "../../components/dashboard/RecentProducts";
import RecentEvaluations from "../../components/dashboard/RecentEvaluations";
import { useAuthStore } from "../../stores/auth.store";
import { PERMISSIONS } from "../../auth/permissions";
import { hasPermission } from "../../auth/authorization";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const role = useAuthStore((state) => state.user?.role);

    if (!hasPermission(role, PERMISSIONS.DASHBOARD_VIEW)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return (
        <AdminLayout>

            <SystemStatusBar />

            <DashboardStats />

            <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
                <EligibilityOverview />
                <QuickActions />
            </div>

            <div className="mt-5 grid gap-4 xl:grid-cols-2">
                <RecentProducts />
                <RecentEvaluations />
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
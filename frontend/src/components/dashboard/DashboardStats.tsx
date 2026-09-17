import { Package, Users, CheckCircle2, XCircle } from "lucide-react";
import StatCard from "./StatCard";
import type { DashboardStatsData } from "../../types/dashboard.types";

interface Props {
    stats?: DashboardStatsData;
    isLoading?: boolean;
}

const DashboardStats = ({ stats, isLoading }: Props) => {
    const totalProducts = stats?.totalProducts ?? 0;
    const totalUsers = stats?.totalUsers ?? 0;
    const activeUsers = stats?.activeUsers ?? 0;
    const rejectedUsers = stats?.rejectedUsers ?? 0;
    const passRate = stats?.passRate ?? 0;
    const rejectRate = stats?.rejectRate ?? 0;

    return (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
                title="Total Products"
                value={totalProducts}
                icon={<Package size={16} strokeWidth={2} />}
                tone="slate"
                description="Active in policy engine"
                isLoading={isLoading}
            />

            <StatCard
                title="Total Users"
                value={totalUsers}
                icon={<Users size={16} strokeWidth={2} />}
                tone="blue"
                description="Registered applicants"
                isLoading={isLoading}
            />

            <StatCard
                title="Active / Eligible"
                value={activeUsers}
                icon={<CheckCircle2 size={16} strokeWidth={2} />}
                tone="green"
                description="Qualified for >= 1 product"
                subdescription={`↑ ${passRate}% pass rate`}
                isLoading={isLoading}
            />

            <StatCard
                title="Rejected Users"
                value={rejectedUsers}
                icon={<XCircle size={16} strokeWidth={2} />}
                tone="red"
                description="Below criteria threshold"
                subdescription={`↓ ${rejectRate}% reject rate`}
                isLoading={isLoading}
            />
        </section>
    );
};

export default DashboardStats;
import {
    Package,
    Users,
    UserCheck,
    UserX,
} from "lucide-react";

import StatCard from "./StatCard";

const DashboardStats = () => {
    return (
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
                title="Total Products"
                icon={<Package size={20} />}
            />

            <StatCard
                title="Total Users"
                icon={<Users size={20} />}
            />

            <StatCard
                title="Active Users"
                icon={<UserCheck size={20} />}
            />

            <StatCard
                title="Rejected Users"
                icon={<UserX size={20} />}
            />
        </section>
    );
};

export default DashboardStats;
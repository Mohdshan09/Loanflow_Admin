import { PackagePlus, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import QuickActionCard from "./QuickActionCard";
import { useAuthStore } from "../../stores/auth.store";
import { hasPermission } from "../../auth/authorization";
import { PERMISSIONS } from "../../auth/permissions";

const QuickActions = () => {
    const navigate = useNavigate();

    const role = useAuthStore((state) => state.user?.role);

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
                <h2 className="text-base font-semibold text-slate-900">
                    Quick Actions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Common administrative actions
                </p>
            </div>

            <div className="space-y-3">
                {hasPermission(role, PERMISSIONS.PRODUCT_CREATE) && (
                    <QuickActionCard
                        title="Add Loan Product"
                        description="Create and configure a new loan product."
                        icon={<PackagePlus size={20} />}
                        actionLabel="Configure Product"
                        onClick={() => navigate("/products")}
                    />
                )}

                {hasPermission(role, PERMISSIONS.USER_CREATE) && (
                    <QuickActionCard
                        title="Add User"
                        description="Register a user and evaluate eligibility."
                        icon={<UserPlus size={20} />}
                        actionLabel="Register User"
                        onClick={() => navigate("/users")}
                    />
                )}
            </div>
        </section>
    );
};

export default QuickActions;
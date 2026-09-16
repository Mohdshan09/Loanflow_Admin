import {
    LayoutDashboard,
    Package,
    Users,
    LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";

const Sidebar = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
            {/* Brand */}
            <div className="flex h-16 items-center border-b border-slate-200 px-6">
                <div>
                    <h1 className="text-lg font-bold text-slate-900">
                        LoanFlow
                    </h1>

                    <p className="text-xs text-slate-500">
                        Admin Panel
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
                <NavItem
                    to="/dashboard"
                    icon={<LayoutDashboard size={18} />}
                    label="Dashboard"
                />

                <NavItem
                    to="/products"
                    icon={<Package size={18} />}
                    label="Products"
                />

                <NavItem
                    to="/users"
                    icon={<Users size={18} />}
                    label="Users"
                />
            </nav>

            {/* User / Logout */}
            <div className="border-t border-slate-200 p-4">
                <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white">
                        {user?.name?.charAt(0).toUpperCase() ?? "A"}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900">
                            {user?.name ?? "Admin"}
                        </p>

                        <p className="text-xs text-slate-500">
                            {user?.role ?? "ADMIN"}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                    <LogOut size={17} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

interface NavItemProps {
    to: string;
    icon: React.ReactNode;
    label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                [
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                    isActive
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                ].join(" ")
            }
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    );
};

export default Sidebar;
import { Bell } from "lucide-react";
import { useAuthStore } from "../../stores/auth.store";

const Topbar = () => {
    const user = useAuthStore((state) => state.user);

    const initials =
        user?.name
            ?.split(" ")
            .map((name) => name.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase() || "A";

    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
            {/* Page title */}
            <div>
                <h2 className="text-lg font-semibold text-slate-900">
                    Dashboard
                </h2>
                <p className="mt-1 text-sm tracking-tight text-slate-900">
                    Overview of your loan management system
                </p>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                >
                    <Bell size={19} />

                    {/* Notification indicator */}
                    <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                </button>

                {/* Divider */}
                <div className="h-8 w-px bg-slate-200" />

                {/* User */}
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                        {initials}
                    </div>

                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-medium text-slate-900">
                            {user?.name || "Admin"}
                        </p>

                        <p className="text-xs text-slate-500">
                            {user?.role || "ADMIN"}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
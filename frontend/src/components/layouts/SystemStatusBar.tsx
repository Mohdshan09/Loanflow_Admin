import {
    CheckCircle2,
    Database,
    Server,
    Activity,
} from "lucide-react";

type SystemStatus = "connected" | "disconnected" | "loading";

interface SystemStatusBarProps {
    apiStatus?: SystemStatus;
    databaseStatus?: SystemStatus;
}

const statusConfig = {
    connected: {
        label: "Connected",
        className: "text-emerald-600",
        dotClassName: "bg-emerald-500",
    },
    disconnected: {
        label: "Disconnected",
        className: "text-red-600",
        dotClassName: "bg-red-500",
    },
    loading: {
        label: "Checking...",
        className: "text-slate-500",
        dotClassName: "bg-slate-400",
    },
};

const SystemStatusBar = ({
    apiStatus = "loading",
    databaseStatus = "loading",
}: SystemStatusBarProps) => {
    const api = statusConfig[apiStatus];
    const database = statusConfig[databaseStatus];

    return (
        <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-slate-200 bg-white px-5 py-3">
            {/* API */}
            <div className="flex items-center gap-2">
                <Server size={16} className="text-slate-500" />

                <span className="text-sm text-slate-600">
                    Backend API
                </span>

                <span className="flex items-center gap-1.5 text-sm font-medium">
                    <span
                        className={`h-2 w-2 rounded-full ${api.dotClassName}`}
                    />

                    <span className={api.className}>
                        {api.label}
                    </span>
                </span>
            </div>

            {/* Divider */}
            <div className="hidden h-5 w-px bg-slate-200 sm:block" />

            {/* Database */}
            <div className="flex items-center gap-2">
                <Database size={16} className="text-slate-500" />

                <span className="text-sm text-slate-600">
                    Database
                </span>

                <span className="flex items-center gap-1.5 text-sm font-medium">
                    <span
                        className={`h-2 w-2 rounded-full ${database.dotClassName}`}
                    />

                    <span className={database.className}>
                        {database.label}
                    </span>
                </span>
            </div>

            {/* Divider */}
            <div className="hidden h-5 w-px bg-slate-200 sm:block" />

            {/* System */}
            <div className="flex items-center gap-2">
                <Activity size={16} className="text-slate-500" />

                <span className="text-sm text-slate-600">
                    System
                </span>

                <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                    <CheckCircle2 size={15} />
                    Operational
                </span>
            </div>
        </div>
    );
};

export default SystemStatusBar;
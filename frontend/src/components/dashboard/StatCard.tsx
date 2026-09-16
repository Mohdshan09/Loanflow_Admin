import type { ReactNode } from "react";

interface StatCardProps {
    title: string;
    value?: number | string;
    description?: string;
    icon: ReactNode;
    isLoading?: boolean;
}

const StatCard = ({
    title,
    value,
    description,
    icon,
    isLoading = false,
}: StatCardProps) => {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    {isLoading ? (
                        <div className="mt-3 h-8 w-20 animate-pulse rounded-md bg-slate-100" />
                    ) : (
                        <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                            {value ?? "—"}
                        </p>
                    )}

                    {description && !isLoading && (
                        <p className="mt-1 text-xs text-slate-500">
                            {description}
                        </p>
                    )}
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
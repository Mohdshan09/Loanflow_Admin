import type { ReactNode } from "react";

type Tone = "slate" | "blue" | "green" | "red";

interface StatCardProps {
    title: string;
    value?: number | string;
    description?: string;
    subdescription?: string;
    icon: ReactNode;
    tone?: Tone;
    isLoading?: boolean;
}

const toneMap: Record<Tone, { bg: string; iconColor: string; dot?: string }> = {
    slate: {
        bg: "bg-slate-100",
        iconColor: "text-slate-500",
    },
    blue: {
        bg: "bg-blue-50",
        iconColor: "text-blue-500",
    },
    green: {
        bg: "bg-emerald-50",
        iconColor: "text-emerald-500",
        dot: "bg-emerald-400",
    },
    red: {
        bg: "bg-rose-50",
        iconColor: "text-rose-500",
        dot: "bg-rose-400",
    },
};

const StatCard = ({
    title,
    value,
    description,
    subdescription,
    icon,
    tone = "slate",
    isLoading = false,
}: StatCardProps) => {
    const { bg, iconColor } = toneMap[tone];

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {title}
                </p>

                <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bg} ${iconColor}`}
                >
                    {icon}
                </span>
            </div>

            {isLoading ? (
                <div className="mt-3 h-8 w-20 animate-pulse rounded-md bg-slate-100" />
            ) : (
                <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                    {value ?? "—"}
                </p>
            )}

            {description && !isLoading && (
                <p className="mt-1 text-xs text-slate-500">{description}</p>
            )}

            {subdescription && !isLoading && (
                <p
                    className={`mt-0.5 text-xs font-medium ${
                        tone === "green"
                            ? "text-emerald-600"
                            : tone === "red"
                              ? "text-rose-600"
                              : "text-slate-500"
                    }`}
                >
                    {subdescription}
                </p>
            )}
        </div>
    );
};

export default StatCard;
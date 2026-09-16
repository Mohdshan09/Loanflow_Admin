import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface QuickActionCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    actionLabel: string;
    onClick: () => void;
}

const QuickActionCard = ({
    title,
    description,
    icon,
    actionLabel,
    onClick,
}: QuickActionCardProps) => {
    return (
        <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm">
                    {icon}
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-slate-900">
                        {title}
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-slate-500">
                        {description}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    type="button"
                    onClick={onClick}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
                >
                    {actionLabel}
                    <ArrowRight size={14} />
                </button>
            </div>
        </div>
    );
};

export default QuickActionCard;
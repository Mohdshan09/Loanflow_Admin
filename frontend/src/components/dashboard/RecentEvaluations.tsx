import { ArrowRight, ClipboardCheck, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmptyState from "./EmptyState";
import type { RecentEvaluationItem } from "../../types/dashboard.types";

interface Props {
    evaluations?: RecentEvaluationItem[];
    isLoading?: boolean;
}

const RecentEvaluations = ({ evaluations = [], isLoading }: Props) => {
    const navigate = useNavigate();

    return (
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div>
                    <h2 className="text-base font-semibold text-slate-900">
                        Recent Evaluations
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Recently evaluated applicants
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/users")}
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 transition hover:text-blue-800"
                >
                    View all
                    <ArrowRight size={15} />
                </button>
            </div>

            {/* Content */}
            <div className="p-6">
                {isLoading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-12 w-full animate-pulse rounded-lg bg-slate-50"
                            />
                        ))}
                    </div>
                ) : evaluations.length === 0 ? (
                    <EmptyState
                        icon={<ClipboardCheck size={22} />}
                        title="No evaluations available"
                        description="User eligibility evaluations will appear here."
                        action={
                            <button
                                type="button"
                                onClick={() => navigate("/users")}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                            >
                                Go to Users
                            </button>
                        }
                    />
                ) : (
                    <div className="divide-y divide-slate-100">
                        {evaluations.map((ev) => {
                            const isEligible = ev.status === "ACTIVE";
                            return (
                                <div
                                    key={ev.id}
                                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                                isEligible
                                                    ? "bg-emerald-50 text-emerald-600"
                                                    : "bg-rose-50 text-rose-600"
                                            }`}
                                        >
                                            {isEligible ? (
                                                <CheckCircle size={16} />
                                            ) : (
                                                <XCircle size={16} />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">
                                                {ev.fullName}
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                Score: {ev.creditScore} ·{" "}
                                                {isEligible
                                                    ? `${ev.eligibleProductsCount} product(s) match`
                                                    : "No match"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                                                isEligible
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-rose-50 text-rose-700"
                                            }`}
                                        >
                                            {isEligible ? "Qualified" : "Rejected"}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecentEvaluations;
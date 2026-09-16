import { Activity } from "lucide-react";

import EmptyState from "./EmptyState";

const EligibilityOverview = () => {
    return (
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
                <div>
                    <h2 className="text-base font-semibold text-slate-900">
                        Eligibility Overview
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Overview of user eligibility results
                    </p>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5">
                    <Activity size={14} className="text-slate-500" />

                    <span className="text-xs font-medium text-slate-500">
                        Eligibility
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex min-h-[200px] items-center justify-center">
                <EmptyState
                    icon={<Activity size={20} />}
                    title="No eligibility data available yet"
                    description="Eligibility statistics will appear here once users are evaluated."
                />
            </div>
        </section>
    );
};

export default EligibilityOverview;
import { Cpu } from "lucide-react";

/**
 * Shown at the bottom of the Products page.
 * Matches the "Algorithmic Scoring Engine v2.4" bar in the design.
 */
const AlgorithmicScoringBar = () => {
    return (
        <div className="flex flex-col items-start gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            {/* Left: icon + description */}
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-white">
                    <Cpu size={16} strokeWidth={2} />
                </div>

                <div>
                    <p className="text-sm font-semibold text-slate-900">
                        Algorithmic Scoring Engine{" "}
                        <span className="font-normal text-slate-500">v2.4</span>
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                        When eligibility criteria update, applicant evaluation
                        caches purge and recompute in under 120ms.
                    </p>
                </div>
            </div>

            {/* Right: action buttons */}
            <div className="flex shrink-0 items-center gap-2">
                <button
                    type="button"
                    className="inline-flex h-8 items-center rounded-lg border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
                >
                    Audit Logs
                </button>

                <button
                    type="button"
                    className="inline-flex h-8 items-center rounded-lg bg-blue-600 px-3.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                >
                    Simulate Run
                </button>
            </div>
        </div>
    );
};

export default AlgorithmicScoringBar;

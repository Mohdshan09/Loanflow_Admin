import { Activity, CheckCircle2, XCircle, Users } from 'lucide-react';
import EmptyState from './EmptyState';
import type { DashboardStatsData } from '../../types/dashboard.types';

interface Props {
  stats?: DashboardStatsData;
  isLoading?: boolean;
}

const EligibilityOverview = ({ stats, isLoading }: Props) => {
  const totalUsers = stats?.totalUsers ?? 0;
  const activeUsers = stats?.activeUsers ?? 0;
  const rejectedUsers = stats?.rejectedUsers ?? 0;
  const passRate = stats?.passRate ?? 0;
  const rejectRate = stats?.rejectRate ?? 0;

  const hasData = totalUsers > 0;

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Eligibility Overview</h2>
          <p className="mt-1 text-sm text-slate-500">Real-time user qualification distribution</p>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
          <Activity size={13} className="animate-pulse" />
          Live Engine
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="p-6 space-y-4">
          <div className="h-4 w-1/3 animate-pulse rounded bg-slate-100" />
          <div className="h-6 w-full animate-pulse rounded-full bg-slate-100" />
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="h-16 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-16 animate-pulse rounded-xl bg-slate-100" />
          </div>
        </div>
      ) : !hasData ? (
        <div className="flex min-h-[220px] items-center justify-center p-6">
          <EmptyState
            icon={<Activity size={20} />}
            title="No eligibility data available yet"
            description="Eligibility statistics will appear automatically once users are added and evaluated."
          />
        </div>
      ) : (
        <div className="p-6 space-y-6">
          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-emerald-700 flex items-center gap-1">
                <CheckCircle2 size={13} />
                Qualified ({passRate}%)
              </span>
              <span className="text-rose-600 flex items-center gap-1">
                <XCircle size={13} />
                Rejected ({rejectRate}%)
              </span>
            </div>
            <div className="h-3.5 w-full overflow-hidden rounded-full bg-slate-100 flex p-0.5">
              <div
                style={{ width: `${passRate}%` }}
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              />
              <div
                style={{ width: `${rejectRate}%` }}
                className="h-full rounded-full bg-rose-500 transition-all duration-500 ml-0.5"
              />
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-emerald-800">Eligible Users</span>
                <CheckCircle2 size={15} className="text-emerald-600" />
              </div>
              <p className="mt-2 text-2xl font-bold text-emerald-900">{activeUsers}</p>
              <p className="mt-0.5 text-[11px] text-emerald-600">Qualified for loan products</p>
            </div>

            <div className="rounded-xl border border-rose-100 bg-rose-50/50 p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-rose-800">Rejected Users</span>
                <XCircle size={15} className="text-rose-600" />
              </div>
              <p className="mt-2 text-2xl font-bold text-rose-900">{rejectedUsers}</p>
              <p className="mt-0.5 text-[11px] text-rose-600">Criteria not met</p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3.5 py-2.5 text-xs text-slate-600">
            <span className="flex items-center gap-2">
              <Users size={14} className="text-slate-400" />
              Total Evaluated Applicants
            </span>
            <span className="font-bold text-slate-900">{totalUsers}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default EligibilityOverview;

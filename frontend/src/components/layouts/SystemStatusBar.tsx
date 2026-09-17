import { CheckCircle2, AlertCircle, Database, Server, Activity } from 'lucide-react';
import { useSystemHealth } from '../../hooks/useSystemHealth';

type SystemStatus = 'connected' | 'disconnected' | 'loading';

interface SystemStatusBarProps {
  apiStatus?: SystemStatus;
  databaseStatus?: SystemStatus;
}

const statusConfig = {
  connected: {
    label: 'Connected',
    textClass: 'text-emerald-600',
    dotClass: 'bg-emerald-500',
  },
  disconnected: {
    label: 'Disconnected',
    textClass: 'text-rose-600',
    dotClass: 'bg-rose-500',
  },
  loading: {
    label: 'Checking…',
    textClass: 'text-slate-400',
    dotClass: 'bg-slate-300 animate-pulse',
  },
};

const Divider = () => <div className="hidden h-4 w-px bg-slate-200 sm:block" />;

const SystemStatusBar = ({
  apiStatus: propApiStatus,
  databaseStatus: propDbStatus,
}: SystemStatusBarProps) => {
  const { data, isPending, isError } = useSystemHealth();

  const computedApi: SystemStatus =
    propApiStatus && propDbStatus
      ? propApiStatus
      : isPending
        ? 'loading'
        : isError || !data
          ? 'disconnected'
          : data.api === 'connected'
            ? 'connected'
            : 'disconnected';

  const computedDb: SystemStatus =
    propApiStatus && propDbStatus
      ? propDbStatus
      : isPending
        ? 'loading'
        : isError || !data
          ? 'disconnected'
          : data.database === 'connected'
            ? 'connected'
            : 'disconnected';

  const api = statusConfig[computedApi];
  const db = statusConfig[computedDb];

  const isSystemOperational = computedApi === 'connected' && computedDb === 'connected';
  const isSystemLoading = computedApi === 'loading' || computedDb === 'loading';

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm transition-all">
      {/* Backend API */}
      <div className="flex items-center gap-2">
        <Server size={14} className="shrink-0 text-slate-400" />
        <span className="text-xs text-slate-600">Backend API</span>
        <div className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${api.dotClass}`} />
          <span className={`text-xs font-semibold ${api.textClass}`}>{api.label}</span>
        </div>
      </div>

      <Divider />

      {/* Database */}
      <div className="flex items-center gap-2">
        <Database size={14} className="shrink-0 text-slate-400" />
        <span className="text-xs text-slate-600">Database</span>
        <div className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${db.dotClass}`} />
          <span className={`text-xs font-semibold ${db.textClass}`}>{db.label}</span>
        </div>
      </div>

      <Divider />

      {/* System Status */}
      <div className="flex items-center gap-2">
        <Activity size={14} className="shrink-0 text-slate-400" />
        <span className="text-xs text-slate-600">System</span>
        <div
          className={`flex items-center gap-1.5 ${
            isSystemLoading
              ? 'text-slate-400'
              : isSystemOperational
                ? 'text-emerald-600'
                : 'text-rose-600'
          }`}
        >
          {isSystemLoading ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-pulse" />
              <span className="text-xs font-semibold">Checking…</span>
            </>
          ) : isSystemOperational ? (
            <>
              <CheckCircle2 size={13} strokeWidth={2} />
              <span className="text-xs font-semibold">Operational</span>
            </>
          ) : (
            <>
              <AlertCircle size={13} strokeWidth={2} />
              <span className="text-xs font-semibold">Degraded</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemStatusBar;

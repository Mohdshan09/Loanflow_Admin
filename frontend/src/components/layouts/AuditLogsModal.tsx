import { useQuery } from '@tanstack/react-query';
import { Clock3, X } from 'lucide-react';
import { api } from '../../api/axios';

interface AuditLog {
  id: string;
  trigger: string;
  createdAt: string;
  user: { id: string; fullName: string };
  results: Array<{ productName: string; eligible: boolean; decisionNote: string }>;
}

interface Props { isOpen: boolean; onClose: () => void; }

const triggerLabel: Record<string, string> = {
  USER_CREATED: 'Applicant created', USER_UPDATED: 'Applicant updated', PRODUCT_CREATED: 'Product created',
  PRODUCT_UPDATED: 'Product rules updated', PRODUCT_DELETED: 'Product deleted', MANUAL_SIMULATION: 'Manual simulation',
};

const AuditLogsModal = ({ isOpen, onClose }: Props) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['audit-logs'],
    queryFn: async () => (await api.get<{ data: AuditLog[] }>('/audit-logs')).data.data,
    enabled: isOpen,
  });

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4"><div><h2 className="text-lg font-bold text-slate-900">Eligibility Audit Logs</h2><p className="text-xs text-slate-500">Latest 100 immutable evaluation events</p></div><button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={18} /></button></div>
        <div className="divide-y divide-slate-100 overflow-y-auto">
          {isPending && <p className="p-6 text-sm text-slate-500">Loading audit logs…</p>}
          {isError && <p className="p-6 text-sm text-rose-600">Unable to load audit logs.</p>}
          {data?.map((log) => <article key={log.id} className="p-4"><div className="flex items-center justify-between"><p className="text-sm font-semibold text-slate-900">{log.user.fullName}</p><span className="flex items-center gap-1 text-xs text-slate-500"><Clock3 size={12} />{new Date(log.createdAt).toLocaleString('en-IN')}</span></div><p className="mt-1 text-xs font-medium text-blue-700">{triggerLabel[log.trigger] ?? log.trigger}</p><ul className="mt-2 space-y-1">{log.results.map((result, index) => <li key={`${result.productName}-${index}`} className="text-xs text-slate-600"><span className={result.eligible ? 'font-semibold text-emerald-700' : 'font-semibold text-rose-700'}>{result.eligible ? 'Accepted' : 'Rejected'}</span> · {result.productName}: {result.decisionNote}</li>)}</ul></article>)}
          {data?.length === 0 && <p className="p-6 text-sm text-slate-500">No audit events yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default AuditLogsModal;

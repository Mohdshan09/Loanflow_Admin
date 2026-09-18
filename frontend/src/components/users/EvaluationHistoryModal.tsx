import { useQuery } from '@tanstack/react-query';
import { CheckCircle2, Clock3, History, X, XCircle } from 'lucide-react';
import { getUserEvaluationHistory } from '../../api/user.api';
import type { User } from '../../types/user.types';

interface Props {
  user: User | null;
  onClose: () => void;
}

const triggerLabel: Record<string, string> = {
  USER_CREATED: 'Applicant created',
  USER_UPDATED: 'Applicant details updated',
  PRODUCT_CREATED: 'Loan product created',
  PRODUCT_UPDATED: 'Loan product rules updated',
  PRODUCT_DELETED: 'Loan product deleted',
  MANUAL_SIMULATION: 'Manual simulation run',
};

const EvaluationHistoryModal = ({ user, onClose }: Props) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['users', user?.id, 'evaluation-history'],
    queryFn: () => getUserEvaluationHistory(user!.id),
    enabled: Boolean(user),
  });

  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900"><History size={19} /> Evaluation History</h2>
            <p className="mt-1 text-xs text-slate-500">Immutable decision snapshots for {user.fullName}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>

        <div className="space-y-4 overflow-y-auto p-6">
          {isPending && <p className="text-sm text-slate-500">Loading evaluation history…</p>}
          {isError && <p className="text-sm text-rose-600">Unable to load evaluation history.</p>}
          {!isPending && !isError && data?.data.length === 0 && (
            <p className="text-sm text-slate-500">No evaluations have been recorded yet.</p>
          )}
          {data?.data.map((evaluation) => (
            <section key={evaluation.id} className="rounded-xl border border-slate-200">
              <header className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
                <span className="text-sm font-semibold text-slate-800">{triggerLabel[evaluation.trigger]}</span>
                <span className="flex items-center gap-1 text-xs text-slate-500"><Clock3 size={12} />{new Date(evaluation.createdAt).toLocaleString('en-IN')}</span>
              </header>
              <div className="divide-y divide-slate-100">
                {evaluation.results.map((result) => (
                  <div key={result.id} className="p-4">
                    <div className="flex items-center gap-2">
                      {result.eligible ? <CheckCircle2 size={16} className="text-emerald-600" /> : <XCircle size={16} className="text-rose-600" />}
                      <p className="text-sm font-semibold text-slate-900">{result.productName}</p>
                      <span className={result.eligible ? 'text-xs font-medium text-emerald-700' : 'text-xs font-medium text-rose-700'}>{result.eligible ? 'Accepted' : 'Rejected'}</span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600">{result.decisionNote}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvaluationHistoryModal;

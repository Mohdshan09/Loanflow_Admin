import { useState } from 'react';
import axios from 'axios';
import { X, Loader2, UserPlus, CheckCircle2, XCircle, ShieldAlert } from 'lucide-react';
import { useCreateUser } from '../../hooks/useUser';
import type { CreateUserInput, ProductEvaluationResult, UserStatus } from '../../types/user.types';
import type { EmploymentType } from '../../types/products.types';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal = ({ isOpen, onClose }: Props) => {
  const { mutateAsync: createUser, isPending } = useCreateUser();

  const [formData, setFormData] = useState<CreateUserInput>({
    fullName: '',
    dateOfBirth: '1995-05-15',
    creditScore: 720,
    employmentType: 'SALARIED',
    salaryType: 'DAT',
    salary: 45000,
  });

  const [evaluationResult, setEvaluationResult] = useState<{
    status: UserStatus;
    results: ProductEvaluationResult[];
    userName: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createUser(formData);
      toast.success('User registered and evaluated successfully!');

      // Display evaluation result summary
      if (response.data?.evaluation) {
        setEvaluationResult({
          status: response.data.evaluation.status,
          results: response.data.evaluation.results || [],
          userName: formData.fullName,
        });
      } else {
        handleModalClose();
      }
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || 'Failed to create user'
          : 'Failed to create user',
      );
    }
  };

  const handleModalClose = () => {
    setEvaluationResult(null);
    setFormData({
      fullName: '',
      dateOfBirth: '1995-05-15',
      creditScore: 720,
      employmentType: 'SALARIED',
      salaryType: 'DAT',
      salary: 45000,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <UserPlus size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-none">
                {evaluationResult ? 'Eligibility Evaluation Result' : 'Register New Applicant'}
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {evaluationResult
                  ? 'Policy engine evaluation breakdown'
                  : 'Enter applicant profile to run real-time policy evaluation'}
              </p>
            </div>
          </div>
          <button
            onClick={handleModalClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        {evaluationResult ? (
          <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Status banner */}
            <div
              className={`rounded-xl p-4 border flex items-center gap-3.5 ${
                evaluationResult.status === 'ACTIVE'
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50/70 border-rose-200 text-rose-900'
              }`}
            >
              {evaluationResult.status === 'ACTIVE' ? (
                <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
              ) : (
                <XCircle size={24} className="text-rose-600 shrink-0" />
              )}
              <div>
                <h3 className="font-bold text-sm">
                  {evaluationResult.status === 'ACTIVE'
                    ? 'Applicant is Eligible'
                    : 'Applicant is Ineligible'}
                </h3>
                <p className="text-xs mt-0.5 opacity-90">
                  {evaluationResult.status === 'ACTIVE'
                    ? `${evaluationResult.userName} qualifies for one or more active loan products.`
                    : `${evaluationResult.userName} does not meet the minimum eligibility criteria for any product.`}
                </p>
              </div>
            </div>

            {/* Product-by-product breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Product Breakdown ({evaluationResult.results.length} evaluated)
              </h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {evaluationResult.results.map((res) => (
                  <div
                    key={res.product.id}
                    className="p-3.5 flex items-start justify-between gap-3 bg-white"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900">{res.product.name}</p>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            res.eligible
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {res.eligible ? 'Eligible' : 'Ineligible'}
                        </span>
                      </div>

                      {/* Ineligibility reasons */}
                      {!res.eligible && res.reasons.length > 0 && (
                        <ul className="mt-1.5 space-y-1">
                          {res.reasons.map((reason, idx) => (
                            <li
                              key={idx}
                              className="text-xs text-rose-600 flex items-center gap-1.5"
                            >
                              <ShieldAlert size={12} className="shrink-0" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleModalClose}
                className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Priya Sharma"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Date of Birth <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Credit Score */}
              <div>
                <label className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-600">
                  <span>
                    Credit Score <span className="text-rose-500">*</span>
                  </span>
                  <span className="text-slate-400 font-normal">300 - 900</span>
                </label>
                <input
                  type="number"
                  name="creditScore"
                  required
                  min={300}
                  max={900}
                  value={formData.creditScore}
                  onChange={handleChange}
                  placeholder="750"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Employment Type */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Employment Type <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'SALARIED', label: 'Salaried' },
                    { id: 'SELF_EMPLOYED', label: 'Self Employed' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          employmentType: type.id as EmploymentType,
                        }))
                      }
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                        formData.employmentType === type.id
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary Mode */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Salary Payment Mode <span className="text-rose-500">*</span>
                </label>
                <select
                  name="salaryType"
                  value={formData.salaryType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="DAT">Direct Account Transfer (DAT)</option>
                  <option value="CHEQUE">Cheque</option>
                  <option value="CASH">Cash</option>
                </select>
              </div>

              {/* Monthly Salary */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Monthly Salary (₹ / month) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="salary"
                    required
                    min={1}
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="50,000"
                    className="w-full rounded-lg border border-slate-200 pl-8 pr-3.5 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={handleModalClose}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
              >
                {isPending && <Loader2 size={16} className="animate-spin" />}
                Register & Evaluate
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddUserModal;

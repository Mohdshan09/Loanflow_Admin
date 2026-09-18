import { useState } from 'react';
import axios from 'axios';
import { Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUpdateUser } from '../../hooks/useUser';
import type { CreateUserInput, User } from '../../types/user.types';
import type { EmploymentType, SalaryType } from '../../types/products.types';

interface Props {
  user: User | null;
  onClose: () => void;
}

const toFormData = (user: User): CreateUserInput => ({
  fullName: user.fullName,
  dateOfBirth: new Date(user.dateOfBirth).toISOString().slice(0, 10),
  creditScore: user.creditScore,
  employmentType: user.employmentType,
  salaryType: user.salaryType,
  salary: Number(user.salary),
});

const EditUserModal = ({ user, onClose }: Props) => {
  const { mutateAsync: updateUser, isPending } = useUpdateUser();
  const [formData, setFormData] = useState<CreateUserInput | null>(() =>
    user ? toFormData(user) : null,
  );

  if (!user || !formData) return null;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    setFormData((current) =>
      current ? { ...current, [name]: type === 'number' ? Number(value) : value } : current,
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await updateUser({ id: user.id, data: formData });
      const status = response.data.evaluation.status === 'ACTIVE' ? 'eligible' : 'ineligible';
      toast.success(`Applicant updated and re-evaluated: ${status}`);
      onClose();
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || 'Failed to update applicant'
          : 'Failed to update applicant',
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Edit Applicant</h2>
            <p className="mt-1 text-xs text-slate-500">Saving automatically recalculates eligibility.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="sm:col-span-2 text-sm font-medium text-slate-700">
              Full Name
              <input name="fullName" required value={formData.fullName} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Date of Birth
              <input type="date" name="dateOfBirth" required value={formData.dateOfBirth} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Credit Score
              <input type="number" name="creditScore" required min={300} max={900} value={formData.creditScore} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Employment Type
              <select name="employmentType" value={formData.employmentType} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
                <option value={'SALARIED' satisfies EmploymentType}>Salaried</option>
                <option value={'SELF_EMPLOYED' satisfies EmploymentType}>Self Employed</option>
              </select>
            </label>
            <label className="text-sm font-medium text-slate-700">
              Salary Payment Mode
              <select name="salaryType" value={formData.salaryType} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
                <option value={'DAT' satisfies SalaryType}>Direct Account Transfer</option>
                <option value={'CHEQUE' satisfies SalaryType}>Cheque</option>
                <option value={'CASH' satisfies SalaryType}>Cash</option>
              </select>
            </label>
            <label className="sm:col-span-2 text-sm font-medium text-slate-700">
              Monthly Salary
              <input type="number" name="salary" required min={1} value={formData.salary} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
            </label>
          </div>
          <div className="mt-7 flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600">Cancel</button>
            <button type="submit" disabled={isPending} className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50">
              {isPending && <Loader2 size={16} className="animate-spin" />}
              Save & Re-evaluate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;

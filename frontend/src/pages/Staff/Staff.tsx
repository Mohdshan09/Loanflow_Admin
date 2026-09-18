import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { ShieldPlus, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../../api/axios';
import { useAuthStore } from '../../stores/auth.store';

type StaffRole = 'ADMIN' | 'VIEWER';
interface StaffMember {
  id: string;
  fullName: string;
  email: string;
  role: StaffRole;
  createdAt: string;
}

const Staff = () => {
  const role = useAuthStore((state) => state.user?.role);
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'VIEWER' as StaffRole });

  const staffQuery = useQuery({
    queryKey: ['staff'],
    queryFn: async () => (await api.get<{ data: StaffMember[] }>('/staff')).data.data,
    enabled: role === 'ADMIN',
  });
  const createStaff = useMutation({
    mutationFn: async () => (await api.post('/staff', form)).data,
    onSuccess: () => {
      toast.success(`${form.role === 'VIEWER' ? 'Viewer' : 'Administrator'} account created`);
      setForm({ fullName: '', email: '', password: '', role: 'VIEWER' });
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    },
    onError: (error) => {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || 'Failed to create staff account'
          : 'Failed to create staff account',
      );
    },
  });

  if (role !== 'ADMIN') return <Navigate to="/unauthorized" replace />;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Staff Access</h1>
        <p className="mt-1 text-sm text-slate-500">Provision internal accounts and assign their access role.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <form
          onSubmit={(event) => { event.preventDefault(); createStaff.mutate(); }}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="mb-5 flex items-center gap-2"><ShieldPlus className="text-blue-600" size={20} /><h2 className="font-semibold text-slate-900">Add staff member</h2></div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Full name<input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" /></label>
            <label className="block text-sm font-medium text-slate-700">Work email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" /></label>
            <label className="block text-sm font-medium text-slate-700">Temporary password<input required type="password" minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" /><span className="mt-1 block text-xs text-slate-400">At least 8 characters and one special character.</span></label>
            <label className="block text-sm font-medium text-slate-700">Role<select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as StaffRole })} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"><option value="VIEWER">Viewer — read-only</option><option value="ADMIN">Administrator — manage records</option></select></label>
            <button disabled={createStaff.isPending} className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"><UserPlus size={16} />{createStaff.isPending ? 'Creating…' : 'Create staff account'}</button>
          </div>
        </form>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4"><h2 className="font-semibold text-slate-900">Provisioned staff</h2></div>
          {staffQuery.isPending ? <p className="p-5 text-sm text-slate-500">Loading staff accounts…</p> : (
            <table className="w-full text-sm"><thead className="bg-slate-50 text-left text-xs uppercase text-slate-500"><tr><th className="px-5 py-3">Name</th><th className="px-5 py-3">Role</th><th className="px-5 py-3">Created</th></tr></thead><tbody className="divide-y divide-slate-100">{staffQuery.data?.map((staff) => <tr key={staff.id}><td className="px-5 py-3"><p className="font-medium text-slate-900">{staff.fullName}</p><p className="text-xs text-slate-500">{staff.email}</p></td><td className="px-5 py-3"><span className={staff.role === 'ADMIN' ? 'rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700' : 'rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700'}>{staff.role}</span></td><td className="px-5 py-3 text-slate-500">{new Date(staff.createdAt).toLocaleDateString('en-IN')}</td></tr>)}</tbody></table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Staff;

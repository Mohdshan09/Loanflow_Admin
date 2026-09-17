import { useState, useMemo } from 'react';
import axios from 'axios';
import {
  Users as UsersIcon,
  Plus,
  Search,
  RefreshCw,
  Trash2,
  CheckCircle2,
  XCircle,
  Briefcase,
} from 'lucide-react';
import { useUsers, useDeleteUser } from '../../hooks/useUser';
import AddUserModal from '../../components/users/AddUserModal';
import type { User } from '../../types/user.types';
import toast from 'react-hot-toast';

const EMPTY_USERS: User[] = [];

const calculateAge = (dobString: string): number => {
  const dob = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

const Users = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'REJECTED'>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const { data, isPending, isError, refetch } = useUsers();
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUser();

  const users: User[] = data?.data ?? EMPTY_USERS;

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch = u.fullName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' ? true : u.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  const activeCount = users.filter((u) => u.status === 'ACTIVE').length;
  const rejectedCount = users.filter((u) => u.status === 'REJECTED').length;

  const handleDeleteUser = async (id: string, name: string) => {
    try {
      await deleteUser(id);
      toast.success(`Applicant "${name}" deleted`);
      setUserToDelete(null);
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || 'Failed to delete applicant'
          : 'Failed to delete applicant',
      );
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <nav className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            <span>Admin Portal</span>
            <span className="text-slate-300">›</span>
            <span className="text-blue-600">Applicant Registry</span>
          </nav>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Applicants & Users</h1>
          <p className="mt-1 text-sm text-slate-500">
            Register applicants and review automated loan eligibility evaluations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={15} strokeWidth={2.5} />
          Add Applicant
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Applicants
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <UsersIcon size={16} />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{users.length}</p>
          <p className="mt-0.5 text-xs text-slate-400">Registered in system</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Qualified Applicants
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-900">{activeCount}</p>
          <p className="mt-0.5 text-xs text-emerald-600 font-medium">
            {users.length > 0
              ? `${((activeCount / users.length) * 100).toFixed(1)}% qualification rate`
              : '0.0%'}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Rejected Applicants
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
              <XCircle size={16} />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-rose-900">{rejectedCount}</p>
          <p className="mt-0.5 text-xs text-rose-600 font-medium">
            {users.length > 0
              ? `${((rejectedCount / users.length) * 100).toFixed(1)}% rejection rate`
              : '0.0%'}
          </p>
        </div>
      </div>

      {/* Filter & Toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        {/* Tabs */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setStatusFilter('ALL')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              statusFilter === 'ALL'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All ({users.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('ACTIVE')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              statusFilter === 'ACTIVE'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Qualified ({activeCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('REJECTED')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              statusFilter === 'REJECTED'
                ? 'bg-rose-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Rejected ({rejectedCount})
          </button>
        </div>

        {/* Search & Refresh */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search applicants..."
              className="h-9 w-60 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400"
            />
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            title="Refresh"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {isPending ? (
          <div className="p-12 text-center">
            <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
            <p className="text-sm font-medium text-slate-600">Loading applicants…</p>
          </div>
        ) : isError ? (
          <div className="p-12 text-center">
            <p className="text-sm font-semibold text-slate-900">Failed to load applicants</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Retry
            </button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <UsersIcon size={22} />
            </div>
            <h3 className="text-base font-semibold text-slate-900">No applicants found</h3>
            <p className="mt-1 text-sm text-slate-500">
              {search
                ? 'No applicants match your search criteria.'
                : 'Add your first applicant to evaluate eligibility against configured products.'}
            </p>
            {!search && (
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                + Add Applicant
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3 text-left">Applicant</th>
                  <th className="px-5 py-3 text-left">Age / DOB</th>
                  <th className="px-5 py-3 text-left">Credit Score</th>
                  <th className="px-5 py-3 text-left">Employment / Mode</th>
                  <th className="px-5 py-3 text-left">Salary</th>
                  <th className="px-5 py-3 text-left">Eligibility</th>
                  <th className="px-5 py-3 text-left">Qualified Products</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => {
                  const age = calculateAge(user.dateOfBirth);
                  const isQualified = user.status === 'ACTIVE';
                  const eligibleList = user.eligibleProducts || [];

                  return (
                    <tr key={user.id} className="transition-colors hover:bg-slate-50/60">
                      {/* Name */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-white">
                            {user.fullName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{user.fullName}</p>
                            <p className="font-mono text-[10px] text-slate-400">
                              {user.id.slice(0, 8)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Age */}
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-medium text-slate-800">{age} yrs</p>
                        <p className="text-[11px] text-slate-400">
                          {new Date(user.dateOfBirth).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </td>

                      {/* Credit Score */}
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold ${
                            user.creditScore >= 750
                              ? 'bg-emerald-50 text-emerald-700'
                              : user.creditScore >= 650
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {user.creditScore}
                        </span>
                      </td>

                      {/* Employment */}
                      <td className="px-5 py-3.5">
                        <p className="text-xs font-medium text-slate-800 flex items-center gap-1">
                          <Briefcase size={12} className="text-slate-400" />
                          {user.employmentType === 'SALARIED' ? 'Salaried' : 'Self Employed'}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {user.salaryType === 'DAT'
                            ? 'Direct Account Transfer'
                            : user.salaryType === 'CHEQUE'
                              ? 'Cheque'
                              : 'Cash'}
                        </p>
                      </td>

                      {/* Salary */}
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-bold text-slate-900">
                          ₹{Number(user.salary).toLocaleString('en-IN')}
                        </p>
                        <p className="text-[10px] text-slate-400">/ month</p>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            isQualified
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {isQualified ? (
                            <>
                              <CheckCircle2 size={12} />
                              Qualified
                            </>
                          ) : (
                            <>
                              <XCircle size={12} />
                              Rejected
                            </>
                          )}
                        </span>
                      </td>

                      {/* Qualified Products */}
                      <td className="px-5 py-3.5">
                        {eligibleList.length === 0 ? (
                          <span className="text-xs text-slate-400 italic">None</span>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            {eligibleList.map((ep) => (
                              <span
                                key={ep.productId}
                                className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700"
                              >
                                {ep.product?.name || 'Product'}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-5 py-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => setUserToDelete(user)}
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                          title="Delete applicant"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      <AddUserModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Delete Confirmation Dialog */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Delete Applicant</h3>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to remove{' '}
              <span className="font-semibold text-slate-900">{userToDelete.fullName}</span>? This
              record will be permanently deleted.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => handleDeleteUser(userToDelete.id, userToDelete.fullName)}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

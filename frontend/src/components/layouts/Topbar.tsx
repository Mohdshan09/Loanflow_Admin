import { useState, useRef, useEffect, useMemo } from 'react';
import {
  Bell,
  HelpCircle,
  Search,
  X,
  Package,
  Users as UsersIcon,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { useProducts } from '../../hooks/useProduct';
import { useUsers } from '../../hooks/useUser';
import type { Product } from '../../types/products.types';
import type { User } from '../../types/user.types';

// Stable references so a loading/undefined state doesn't create a new
// array on every render (which would break useMemo's dependency check below).
const EMPTY_PRODUCTS: Product[] = [];
const EMPTY_USERS: User[] = [];

const Topbar = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const [lastRead, setLastRead] = useState(() =>
    Number(localStorage.getItem('notifLastRead') || 0),
  );

  // React query cached data
  const { data: productsData } = useProducts();
  const { data: usersData } = useUsers();

  const products: Product[] =
    (productsData as { data?: Product[] } | undefined)?.data ?? EMPTY_PRODUCTS;
  const users: User[] = (usersData as { data?: User[] } | undefined)?.data ?? EMPTY_USERS;

  const initials =
    user?.fullName
      ?.split(' ')
      .map((n) => n.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? 'AS';

  // Dynamic notifications
  const { generatedNotifications, hasUnread } = useMemo(() => {
    const productNotifs = products.map((p) => ({
      id: `p-${p.id}`,
      title: 'New Loan Product',
      message: `Product '${p.name}' was created.`,
      timestamp: new Date(p.createdAt).getTime(),
    }));

    const userNotifs = users.map((u) => ({
      id: `u-${u.id}`,
      title: 'User Evaluated',
      message: `Applicant '${u.fullName}' was evaluated (${u.status}).`,
      timestamp: new Date(u.createdAt).getTime(),
    }));

    const combined = [...productNotifs, ...userNotifs]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10)
      .map((n) => {
        const time = new Date(n.timestamp).toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        });
        return { ...n, time, unread: n.timestamp > lastRead };
      });

    return {
      generatedNotifications: combined,
      hasUnread: combined.some((n) => n.unread),
    };
  }, [products, users, lastRead]);

  // Filter results based on search query
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { matchedProducts: [], matchedUsers: [] };

    const matchedProducts = products
      .filter((p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q))
      .slice(0, 4);

    const matchedUsers = users
      .filter((u) => u.fullName.toLowerCase().includes(q) || u.id.toLowerCase().includes(q))
      .slice(0, 4);

    return { matchedProducts, matchedUsers };
  }, [query, products, users]);

  const hasResults = results.matchedProducts.length > 0 || results.matchedUsers.length > 0;

  // Handle clicks outside search container to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsNotifOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectProduct = (product: Product) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/products/${product.id}`);
  };

  const handleSelectUser = (selectedUser: User) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/users/${selectedUser.id}`);
  };

  return (
    <header className="relative flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      {/* Global Search bar */}
      <div ref={searchRef} className="relative w-96">
        <div className="relative">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            placeholder="Search loans, applications, or clients..."
            className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-8 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-50"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Floating Search Results Popover */}
        {isOpen && query.trim().length > 0 && (
          <div className="absolute left-0 top-full mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-2xl z-50 overflow-hidden">
            {!hasResults ? (
              <div className="p-6 text-center">
                <p className="text-xs font-semibold text-slate-700">
                  No results found for "{query}"
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Try searching by loan product name or applicant name
                </p>
              </div>
            ) : (
              <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100">
                {/* Products Section */}
                {results.matchedProducts.length > 0 && (
                  <div className="p-2">
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Loan Products
                    </div>
                    <div className="mt-1 space-y-0.5">
                      {results.matchedProducts.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleSelectProduct(p)}
                          className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left transition hover:bg-slate-50"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                              <Package size={14} />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-slate-900 leading-none">
                                {p.name}
                              </p>
                              <p className="mt-1 text-[10px] text-slate-400">
                                Min Score: {p.minCreditScore}+ · Min Salary: ₹
                                {Number(p.minSalary).toLocaleString('en-IN')}
                              </p>
                            </div>
                          </div>
                          <ArrowRight size={13} className="text-slate-300" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Users / Applicants Section */}
                {results.matchedUsers.length > 0 && (
                  <div className="p-2">
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Applicants
                    </div>
                    <div className="mt-1 space-y-0.5">
                      {results.matchedUsers.map((u) => {
                        const isQualified = u.status === 'ACTIVE';
                        return (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => handleSelectUser(u)}
                            className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left transition hover:bg-slate-50"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-700">
                                <UsersIcon size={14} />
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-slate-900 leading-none">
                                  {u.fullName}
                                </p>
                                <p className="mt-1 text-[10px] text-slate-400">
                                  Credit: {u.creditScore} · ₹
                                  {Number(u.salary).toLocaleString('en-IN')}/mo
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                  isQualified
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-rose-50 text-rose-700'
                                }`}
                              >
                                {isQualified ? (
                                  <>
                                    <CheckCircle2 size={10} /> Qualified
                                  </>
                                ) : (
                                  <>
                                    <XCircle size={10} /> Rejected
                                  </>
                                )}
                              </span>
                              <ArrowRight size={13} className="text-slate-300" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Footer prompt */}
            <div className="border-t border-slate-100 bg-slate-50/70 px-3 py-2 text-right">
              <span className="text-[10px] text-slate-400 font-medium">
                Press{' '}
                <kbd className="rounded bg-white px-1 py-0.5 border border-slate-200 shadow-2xs font-mono text-[9px]">
                  ESC
                </kbd>{' '}
                to close
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1">
        {/* Bell */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setIsNotifOpen((prev) => !prev)}
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <Bell size={18} strokeWidth={1.8} />
            {hasUnread && (
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-slate-50">
                <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                {hasUnread && (
                  <button
                    type="button"
                    onClick={() => {
                      const now = Date.now();
                      setLastRead(now);
                      localStorage.setItem('notifLastRead', now.toString());
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-[300px] overflow-y-auto divide-y divide-slate-50">
                {generatedNotifications.length === 0 ? (
                  <div className="p-6 text-center text-sm text-slate-500">No notifications</div>
                ) : (
                  generatedNotifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-4 transition hover:bg-slate-50 ${n.unread ? 'bg-blue-50/30' : ''}`}
                    >
                      <div className="flex gap-3">
                        <div
                          className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${n.unread ? 'bg-blue-500' : 'bg-transparent'}`}
                        />
                        <div>
                          <p
                            className={`text-sm ${n.unread ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'}`}
                          >
                            {n.title}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                            {n.message}
                          </p>
                          <p className="mt-1.5 text-[10px] font-medium text-slate-400">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <button
          type="button"
          aria-label="Help"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <HelpCircle size={18} strokeWidth={1.8} />
        </button>

        {/* Divider */}
        <div className="mx-2 h-6 w-px bg-slate-200" />

        {/* Avatar */}
        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white transition hover:bg-blue-700"
        >
          {initials}
        </button>
      </div>
    </header>
  );
};

export default Topbar;

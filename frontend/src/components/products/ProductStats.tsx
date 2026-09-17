import { Package, Users, CheckCircle2, XCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ProductStatsProps {
  totalProducts: number;
  activeUsers: number | null;
  eligibleUsers: number | null;
  rejectedUsers: number | null;
}

type Tone = 'slate' | 'blue' | 'green' | 'red';

interface StatCardProps {
  label: string;
  value: number | null;
  description: string;
  subdescription?: string;
  icon: LucideIcon;
  tone: Tone;
}

const toneStyles: Record<Tone, { iconBg: string; iconText: string; subText: string }> = {
  slate: {
    iconBg: 'bg-slate-100',
    iconText: 'text-slate-500',
    subText: 'text-slate-500',
  },
  blue: {
    iconBg: 'bg-blue-50',
    iconText: 'text-blue-500',
    subText: 'text-blue-600',
  },
  green: {
    iconBg: 'bg-emerald-50',
    iconText: 'text-emerald-500',
    subText: 'text-emerald-600',
  },
  red: {
    iconBg: 'bg-rose-50',
    iconText: 'text-rose-500',
    subText: 'text-rose-600',
  },
};

const StatCard = ({
  label,
  value,
  description,
  subdescription,
  icon: Icon,
  tone,
}: StatCardProps) => {
  const styles = toneStyles[tone];
  const isLoading = value === null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${styles.iconBg} ${styles.iconText}`}
        >
          <Icon size={16} strokeWidth={2} />
        </span>
      </div>

      {isLoading ? (
        <div className="mt-3 h-8 w-16 animate-pulse rounded-md bg-slate-100" />
      ) : (
        <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
          {value.toLocaleString()}
        </p>
      )}

      {!isLoading && (
        <>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
          {subdescription && (
            <p className={`mt-0.5 text-xs font-medium ${styles.subText}`}>{subdescription}</p>
          )}
        </>
      )}
    </div>
  );
};

const ProductStats = ({
  totalProducts,
  activeUsers,
  eligibleUsers,
  rejectedUsers,
}: ProductStatsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total Products"
        value={totalProducts}
        description="Active in policy engine"
        icon={Package}
        tone="slate"
      />

      <StatCard
        label="Active Users"
        value={activeUsers}
        description="Evaluated across all products"
        icon={Users}
        tone="blue"
      />

      <StatCard
        label="Eligible Users"
        value={eligibleUsers}
        description="Users with product eligibility"
        subdescription="↑ 75.0% pass rate"
        icon={CheckCircle2}
        tone="green"
      />

      <StatCard
        label="Rejected Users"
        value={rejectedUsers}
        description="No eligible product"
        subdescription="↓ 25.0% Below threshold criteria"
        icon={XCircle}
        tone="red"
      />
    </div>
  );
};

export default ProductStats;

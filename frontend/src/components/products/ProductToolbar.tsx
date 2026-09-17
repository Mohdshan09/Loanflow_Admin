import { RefreshCw, Search, ChevronDown, Radio } from "lucide-react";

interface ProductToolbarProps {
    totalProducts: number;
    search: string;
    onSearchChange: (value: string) => void;
    onRefresh: () => void;
}

const ProductToolbar = ({
    totalProducts,
    search,
    onSearchChange,
    onRefresh,
}: ProductToolbarProps) => {
    return (
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            {/* Left: tab + realtime badge */}
            <div className="flex items-center gap-3">
                {/* Active tab */}
                <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5">
                    <span className="text-sm font-semibold text-blue-700">
                        All Products
                    </span>
                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-1.5 text-[11px] font-bold text-white">
                        {totalProducts}
                    </span>
                </div>

                {/* Realtime indicator */}
                <div className="flex items-center gap-1.5">
                    <Radio
                        size={11}
                        className="animate-pulse text-emerald-500"
                        strokeWidth={2}
                    />
                    <span className="text-xs font-medium text-slate-500">
                        Realtime Evaluation Enabled
                    </span>
                </div>
            </div>

            {/* Right: search + sort + refresh */}
            <div className="flex items-center gap-2">
                {/* Search */}
                <div className="relative">
                    <Search
                        size={14}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search products by name..."
                        className="h-9 w-56 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-50"
                    />
                </div>

                {/* Sort dropdown */}
                <div className="relative">
                    <button
                        type="button"
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 transition hover:bg-slate-50"
                    >
                        <span className="text-xs font-medium text-slate-400">
                            Sort:
                        </span>
                        <span className="font-medium">Newest first</span>
                        <ChevronDown size={13} strokeWidth={2} />
                    </button>
                </div>

                {/* Refresh */}
                <button
                    type="button"
                    onClick={onRefresh}
                    title="Refresh products"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                >
                    <RefreshCw size={14} strokeWidth={2} />
                </button>
            </div>
        </div>
    );
};

export default ProductToolbar;
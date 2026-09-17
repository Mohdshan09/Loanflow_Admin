import { Grid3X3, Plus } from "lucide-react";

interface ProductHeaderProps {
    onAddProduct?: () => void;
    onRuleMatrix?: () => void;
}

const ProductHeader = ({ onAddProduct, onRuleMatrix }: ProductHeaderProps) => {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            {/* Left: breadcrumb + title */}
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    <span className="cursor-default transition-colors hover:text-slate-600">
                        Admin Portal
                    </span>
                    <span className="text-slate-300">›</span>
                    <span className="cursor-default transition-colors hover:text-slate-600">
                        Loan Management
                    </span>
                    <span className="text-slate-300">›</span>
                    <span className="text-blue-600">Loan Products</span>
                </nav>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Loan Products
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Manage loan products and define the eligibility criteria used
                    to evaluate users.
                </p>
            </div>

            {/* Right: action buttons */}
            <div className="flex shrink-0 items-center gap-2">
                <button
                    type="button"
                    onClick={onRuleMatrix}
                    className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
                >
                    <Grid3X3 size={14} strokeWidth={2} />
                    Rule Matrix
                </button>

                <button
                    type="button"
                    onClick={onAddProduct}
                    className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                >
                    <Plus size={14} strokeWidth={2.5} />
                    Add Product
                </button>
            </div>
        </div>
    );
};

export default ProductHeader;
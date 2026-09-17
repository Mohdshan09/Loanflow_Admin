import { X, Calendar, DollarSign, TrendingUp, Users, Wallet, ShieldCheck } from "lucide-react";
import type { Product } from "../../types/products.types";

interface Props {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit?: (product: Product) => void;
}

const ViewProductModal = ({ product, isOpen, onClose, onEdit }: Props) => {
    if (!isOpen || !product) return null;

    const salaryLabels: Record<string, string> = {
        DAT: "Direct Account Transfer",
        CASH: "Cash",
        CHEQUE: "Cheque",
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-100">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-semibold shadow-sm">
                            LF
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 leading-none">
                                {product.name}
                            </h2>
                            <p className="mt-1 font-mono text-xs text-slate-400">
                                ID: {product.id}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-6">
                    {/* Key Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                <Users size={14} className="text-blue-500" />
                                Age Range
                            </div>
                            <p className="mt-1.5 text-sm font-bold text-slate-900">
                                {product.minAge} – {product.maxAge} yrs
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                <TrendingUp size={14} className="text-emerald-500" />
                                Min Credit
                            </div>
                            <p className="mt-1.5 text-sm font-bold text-slate-900">
                                {product.minCreditScore}+
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                <DollarSign size={14} className="text-amber-500" />
                                Min Salary
                            </div>
                            <p className="mt-1.5 text-sm font-bold text-slate-900">
                                ₹{Number(product.minSalary).toLocaleString("en-IN")}
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                <Calendar size={14} className="text-purple-500" />
                                Created
                            </div>
                            <p className="mt-1.5 text-xs font-semibold text-slate-900">
                                {new Date(product.createdAt).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Employment Types */}
                    <div className="rounded-xl border border-slate-100 p-4">
                        <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            <ShieldCheck size={14} className="text-blue-600" />
                            Allowed Employment Types
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {product.allowedEmploymentTypes.map((type) => (
                                <span
                                    key={type}
                                    className="inline-flex items-center rounded-lg border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                                >
                                    {type === "SALARIED" ? "Salaried" : "Self Employed"}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Salary Modes */}
                    <div className="rounded-xl border border-slate-100 p-4">
                        <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            <Wallet size={14} className="text-slate-600" />
                            Allowed Salary Modes
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {product.allowedSalaryTypes.map((mode) => (
                                <span
                                    key={mode}
                                    className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                                >
                                    {salaryLabels[mode] ?? mode}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                        Close
                    </button>
                    {onEdit && (
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                onEdit(product);
                            }}
                            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                        >
                            Edit Product
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewProductModal;

import { ArrowRight, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmptyState from "./EmptyState";
import type { RecentProductItem } from "../../types/dashboard.types";

interface Props {
    products?: RecentProductItem[];
    isLoading?: boolean;
}

const RecentProducts = ({ products = [], isLoading }: Props) => {
    const navigate = useNavigate();

    return (
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div>
                    <h2 className="text-base font-semibold text-slate-900">
                        Recent Products
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Recently created loan products
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/products")}
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 transition hover:text-blue-800"
                >
                    View all
                    <ArrowRight size={15} />
                </button>
            </div>

            {/* Content */}
            <div className="p-6">
                {isLoading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-12 w-full animate-pulse rounded-lg bg-slate-50"
                            />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <EmptyState
                        icon={<Package size={22} />}
                        title="No products available"
                        description="Recently created loan products will appear here."
                        action={
                            <button
                                type="button"
                                onClick={() => navigate("/products")}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                            >
                                Go to Products
                            </button>
                        }
                    />
                ) : (
                    <div className="divide-y divide-slate-100">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                        <Package size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">
                                            {product.name}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            Score: {product.minCreditScore}+ · Min Salary: ₹{Number(product.minSalary).toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <span className="text-xs text-slate-500">
                                        {new Date(product.createdAt).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecentProducts;
import { ArrowRight, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

import EmptyState from "./EmptyState";

const RecentProducts = () => {
    const navigate = useNavigate();

    return (
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
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
                    className="flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-slate-900"
                >
                    View all
                    <ArrowRight size={15} />
                </button>
            </div>

            {/* Content */}
            <div className="min-h-[260px]">
                <EmptyState
                    icon={<Package size={22} />}
                    title="No products available"
                    description="Recently created loan products will appear here."
                    action={
                        <button
                            type="button"
                            onClick={() => navigate("/products")}
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                        >
                            Go to Products
                        </button>
                    }
                />
            </div>
        </section>
    );
};

export default RecentProducts;
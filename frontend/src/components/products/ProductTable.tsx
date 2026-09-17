import { useState } from "react";
import type { Product as ProductType } from "../../types/products.types";

import Product from "../prodtable/Product";
import AgeRange from "../prodtable/AgeRange";
import MinCreditScore from "../prodtable/MinCreditScore";
import EmploymentTypes from "../prodtable/EmploymentTypes";
import SalaryTypes from "../prodtable/SalaryTypes";
import MinimumSalary from "../prodtable/MinimumSalary";
import CreatedDate from "../prodtable/CreatedDate";
import Actions from "../prodtable/Actions";
import ViewProductModal from "./ViewProductModal";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";
import { useProducts } from "../../hooks/useProduct";

const COLS = [
    "Product Name",
    "Age Range",
    "Min. Credit Score",
    "Employment Types",
    "Salary Modes",
    "Minimum Salary",
    "Created Date",
    "Actions",
];

interface ProductTableProps {
    products?: ProductType[];
}

const ProductTable = ({ products: propProducts }: ProductTableProps) => {
    const { data, isPending, isError, refetch } = useProducts();

    const [selectedForView, setSelectedForView] = useState<ProductType | null>(null);
    const [selectedForEdit, setSelectedForEdit] = useState<ProductType | null>(null);
    const [selectedForDelete, setSelectedForDelete] = useState<ProductType | null>(null);

    const products: ProductType[] =
        propProducts ??
        ((data as { data?: ProductType[] } | undefined)?.data ?? []);

    /* ── Loading ─────────────────────────────────── */
    if (isPending && !propProducts) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
                <p className="text-sm font-medium text-slate-600">
                    Loading products…
                </p>
            </div>
        );
    }

    /* ── Error ───────────────────────────────────── */
    if (isError && !propProducts) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                <p className="text-sm font-semibold text-slate-900">
                    Failed to load products
                </p>
                <p className="mt-1 text-sm text-slate-500">
                    Something went wrong while fetching products.
                </p>
                <button
                    type="button"
                    onClick={() => refetch()}
                    className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    Try Again
                </button>
            </div>
        );
    }

    /* ── Empty ───────────────────────────────────── */
    if (products.length === 0) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">
                    No loan products yet
                </h3>
                <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                    Create your first loan product and define its eligibility
                    criteria.
                </p>
            </div>
        );
    }

    /* ── Table ───────────────────────────────────── */
    return (
        <>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1100px]">
                        {/* Head */}
                        <thead className="border-b border-slate-200 bg-slate-50">
                            <tr>
                                {COLS.map((col) => (
                                    <th
                                        key={col}
                                        className={`px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 ${
                                            col === "Actions" ? "text-right" : ""
                                        }`}
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody className="divide-y divide-slate-100">
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="transition-colors hover:bg-slate-50/60"
                                >
                                    <td className="px-5 py-3.5">
                                        <Product product={product} />
                                    </td>

                                    <td className="px-5 py-3.5">
                                        <AgeRange
                                            minAge={product.minAge}
                                            maxAge={product.maxAge}
                                        />
                                    </td>

                                    <td className="px-5 py-3.5">
                                        <MinCreditScore
                                            score={product.minCreditScore}
                                        />
                                    </td>

                                    <td className="px-5 py-3.5">
                                        <EmploymentTypes
                                            types={product.allowedEmploymentTypes}
                                        />
                                    </td>

                                    <td className="px-5 py-3.5">
                                        <SalaryTypes
                                            types={product.allowedSalaryTypes}
                                        />
                                    </td>

                                    <td className="px-5 py-3.5">
                                        <MinimumSalary salary={product.minSalary} />
                                    </td>

                                    <td className="px-5 py-3.5">
                                        <CreatedDate
                                            date={String(product.createdAt)}
                                        />
                                    </td>

                                    <td className="px-5 py-3.5">
                                        <Actions
                                            productId={product.id}
                                            onView={() => setSelectedForView(product)}
                                            onEdit={() => setSelectedForEdit(product)}
                                            onDelete={() => setSelectedForDelete(product)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination footer */}
                <div className="flex items-center justify-between border-t border-slate-100 bg-white px-5 py-3">
                    <p className="text-xs text-slate-500">
                        Showing{" "}
                        <span className="font-semibold text-slate-700">
                            1–{products.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-slate-700">
                            {products.length}
                        </span>{" "}
                        products
                    </p>

                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            disabled
                            className="flex h-7 items-center gap-1 rounded-md border border-slate-200 px-2.5 text-xs font-medium text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            ‹ Previous
                        </button>

                        <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-xs font-semibold text-white"
                        >
                            1
                        </button>

                        <button
                            type="button"
                            disabled
                            className="flex h-7 items-center gap-1 rounded-md border border-slate-200 px-2.5 text-xs font-medium text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Next ›
                        </button>
                    </div>
                </div>
            </div>

            {/* View Product Modal */}
            <ViewProductModal
                product={selectedForView}
                isOpen={Boolean(selectedForView)}
                onClose={() => setSelectedForView(null)}
                onEdit={(p) => setSelectedForEdit(p)}
            />

            {/* Edit Product Modal */}
            <EditProductModal
                product={selectedForEdit}
                isOpen={Boolean(selectedForEdit)}
                onClose={() => setSelectedForEdit(null)}
            />

            {/* Delete Product Modal */}
            <DeleteProductModal
                product={selectedForDelete}
                isOpen={Boolean(selectedForDelete)}
                onClose={() => setSelectedForDelete(null)}
            />
        </>
    );
};

export default ProductTable;
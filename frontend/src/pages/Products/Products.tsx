import { useState, useMemo } from "react";
import { useProducts } from "../../hooks/useProduct";
import { useDashboardStats } from "../../hooks/useDashboard";
import type { Product as ProductType } from "../../types/products.types";

import ProductHeader from "../../components/products/ProductHeader";
import ProductStats from "../../components/products/ProductStats";
import ProductToolbar from "../../components/products/ProductToolbar";
import ProductTable from "../../components/products/ProductTable";
import AddProductModal from "../../components/products/AddProductModal";
import AlgorithmicScoringBar from "../../components/layouts/AlgorithmicScoringBar";

const Products = () => {
    const [search, setSearch] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { data, refetch } = useProducts();
    const { data: dashboardData } = useDashboardStats();

    const products: ProductType[] =
        (data as { data?: ProductType[] } | undefined)?.data ?? [];

    const stats = dashboardData?.data;

    const filtered = useMemo(() => {
        if (!search.trim()) return products;
        const q = search.toLowerCase();
        return products.filter((p) => p.name.toLowerCase().includes(q));
    }, [products, search]);

    return (
        <div className="flex flex-col gap-5">
            {/* Breadcrumb + title + action buttons */}
            <ProductHeader
                onAddProduct={() => setIsAddModalOpen(true)}
                onRuleMatrix={() => {}}
            />

            {/* Stat cards */}
            <ProductStats
                totalProducts={products.length}
                activeUsers={stats?.totalUsers ?? null}
                eligibleUsers={stats?.activeUsers ?? null}
                rejectedUsers={stats?.rejectedUsers ?? null}
            />

            {/* Toolbar: tab, search, sort, refresh */}
            <ProductToolbar
                totalProducts={products.length}
                search={search}
                onSearchChange={setSearch}
                onRefresh={() => refetch()}
            />

            {/* Data table */}
            <ProductTable products={filtered} />

            {/* Algorithmic scoring engine status bar */}
            <AlgorithmicScoringBar />

            {/* Add Product Modal */}
            <AddProductModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </div>
    );
};

export default Products;
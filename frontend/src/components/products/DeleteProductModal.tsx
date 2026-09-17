import { AlertTriangle, Loader2 } from "lucide-react";
import { useDeleteProduct } from "../../hooks/useProduct";
import type { Product } from "../../types/products.types";
import toast from "react-hot-toast";

interface Props {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const DeleteProductModal = ({ product, isOpen, onClose }: Props) => {
    const { mutateAsync: deleteProduct, isPending } = useDeleteProduct();

    if (!isOpen || !product) return null;

    const handleDelete = async () => {
        try {
            await deleteProduct(product.id);
            toast.success(`"${product.name}" deleted successfully`);
            onClose();
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Failed to delete product"
            );
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden">
                <div className="p-6">
                    <div className="flex items-center gap-3.5 mb-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-900">
                                Delete Product
                            </h3>
                            <p className="text-xs text-slate-500">
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-slate-900">
                            "{product.name}"
                        </span>
                        ? Any user eligibility evaluated against this product will also be updated.
                    </p>

                    <div className="mt-6 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isPending}
                            className="flex items-center gap-2 rounded-lg bg-rose-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 disabled:opacity-50"
                        >
                            {isPending && <Loader2 size={16} className="animate-spin" />}
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteProductModal;

import type { Product as ProductType } from "../../types/products.types";
import { Package } from "lucide-react";

interface Props {
    product: ProductType;
}

/* Generate a short code from product id (last 7 chars) */
const shortCode = (id: string) => id.slice(-7).toUpperCase();

const Product = ({ product }: Props) => {
    return (
        <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                <Package size={16} strokeWidth={2} />
            </div>

            {/* Name + code */}
            <div>
                <p className="text-sm font-semibold text-slate-900">
                    {product.name}
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-slate-400">
                    {shortCode(product.id)}
                </p>
            </div>
        </div>
    );
};

export default Product;
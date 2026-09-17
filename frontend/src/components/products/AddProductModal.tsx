import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useCreateProduct } from "../../hooks/useProduct";
import type { CreateProductInput, EmploymentType, SalaryType } from "../../types/products.types";
import toast from "react-hot-toast";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const AddProductModal = ({ isOpen, onClose }: Props) => {
    const { mutateAsync: createProduct, isPending } = useCreateProduct();

    const [formData, setFormData] = useState<CreateProductInput>({
        name: "",
        minAge: 21,
        maxAge: 60,
        minCreditScore: 700,
        minSalary: 25000,
        allowedEmploymentTypes: ["SALARIED"],
        allowedSalaryTypes: ["DAT"],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    const handleCheckboxChange = (
        name: "allowedEmploymentTypes" | "allowedSalaryTypes",
        value: string
    ) => {
        setFormData((prev) => {
            const current = prev[name] as string[];
            if (current.includes(value)) {
                return { ...prev, [name]: current.filter((v) => v !== value) };
            } else {
                return { ...prev, [name]: [...current, value] };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createProduct(formData);
            toast.success("Product created successfully");
            onClose();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to create product");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                    <h2 className="text-lg font-bold text-slate-900">Add New Product</h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                        {/* Name */}
                        <div className="sm:col-span-2">
                            <label className="mb-1 block text-sm font-medium text-slate-700">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Personal Loan Premium"
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Age */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Min Age</label>
                            <input
                                type="number"
                                name="minAge"
                                required
                                min={18}
                                value={formData.minAge}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Max Age</label>
                            <input
                                type="number"
                                name="maxAge"
                                required
                                value={formData.maxAge}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Financial */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Min Credit Score</label>
                            <input
                                type="number"
                                name="minCreditScore"
                                required
                                min={300}
                                max={900}
                                value={formData.minCreditScore}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Min Salary (₹/month)</label>
                            <input
                                type="number"
                                name="minSalary"
                                required
                                min={0}
                                value={formData.minSalary}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Employment Types */}
                        <div className="sm:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-slate-700">Allowed Employment Types</label>
                            <div className="flex gap-4">
                                {["SALARIED", "SELF_EMPLOYED"].map((type) => (
                                    <label key={type} className="flex items-center gap-2 text-sm text-slate-600">
                                        <input
                                            type="checkbox"
                                            checked={formData.allowedEmploymentTypes.includes(type as EmploymentType)}
                                            onChange={() => handleCheckboxChange("allowedEmploymentTypes", type)}
                                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        {type === "SALARIED" ? "Salaried" : "Self Employed"}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Salary Types */}
                        <div className="sm:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-slate-700">Allowed Salary Modes</label>
                            <div className="flex gap-4">
                                {[
                                    { id: "DAT", label: "Direct Account Transfer" },
                                    { id: "CASH", label: "Cash" },
                                    { id: "CHEQUE", label: "Cheque" },
                                ].map(({ id, label }) => (
                                    <label key={id} className="flex items-center gap-2 text-sm text-slate-600">
                                        <input
                                            type="checkbox"
                                            checked={formData.allowedSalaryTypes.includes(id as SalaryType)}
                                            onChange={() => handleCheckboxChange("allowedSalaryTypes", id)}
                                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        {label}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isPending ? <Loader2 size={16} className="animate-spin" /> : null}
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;

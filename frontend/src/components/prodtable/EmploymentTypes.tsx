import type { EmploymentType } from "../../types/products.types";

interface Props {
    types: EmploymentType[];
}

const labelMap: Record<EmploymentType, string> = {
    SALARIED: "Salaried",
    SELF_EMPLOYED: "Self Employed",
};

const EmploymentTypes = ({ types }: Props) => {
    return (
        <div className="flex flex-wrap gap-1.5">
            {types.map((type) => (
                <span
                    key={type}
                    className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-700 shadow-sm"
                >
                    {labelMap[type]}
                </span>
            ))}
        </div>
    );
};

export default EmploymentTypes;
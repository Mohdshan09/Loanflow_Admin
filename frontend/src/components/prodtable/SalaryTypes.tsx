import type { SalaryType } from '../../types/products.types';

interface Props {
  types: SalaryType[];
}

const labelMap: Record<SalaryType, string> = {
  DAT: 'Direct Account Transfer',
  CASH: 'Cash',
  CHEQUE: 'Cheque',
};

const SalaryTypes = ({ types }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {types.map((type) => (
        <span
          key={type}
          className="inline-flex w-fit items-center rounded-md bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600"
        >
          {labelMap[type]}
        </span>
      ))}
    </div>
  );
};

export default SalaryTypes;

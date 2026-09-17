interface Props {
  salary: number | string;
}

const MinimumSalary = ({ salary }: Props) => {
  const formatted = Number(salary).toLocaleString('en-IN');

  return (
    <div className="leading-none">
      <p className="text-sm font-bold text-slate-900">₹{formatted}</p>
      <p className="mt-0.5 text-[11px] text-slate-400">/ month</p>
    </div>
  );
};

export default MinimumSalary;

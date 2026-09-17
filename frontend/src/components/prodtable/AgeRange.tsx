interface Props {
  minAge: number;
  maxAge: number;
}

const AgeRange = ({ minAge, maxAge }: Props) => {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
      {minAge}–{maxAge} yrs
    </span>
  );
};

export default AgeRange;

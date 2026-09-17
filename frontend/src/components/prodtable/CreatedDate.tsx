interface Props {
    date: string;
}

const CreatedDate = ({ date }: Props) => {
    const formatted = new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return (
        <span className="text-sm text-slate-500">
            {formatted}
        </span>
    );
};

export default CreatedDate;
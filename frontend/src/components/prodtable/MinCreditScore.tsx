import { TrendingUp } from "lucide-react";

interface Props {
    score: number;
}

const MinCreditScore = ({ score }: Props) => {
    return (
        <div className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1">
            <span className="text-sm font-bold text-blue-700">
                {score}+
            </span>
            <TrendingUp size={12} strokeWidth={2.5} className="text-blue-500" />
        </div>
    );
};

export default MinCreditScore;
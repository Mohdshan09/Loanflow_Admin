interface Props {
    productId?: string;
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

const Actions = ({ onView, onEdit, onDelete }: Props) => {
    return (
        <div className="flex items-center justify-end gap-3">
            <button
                type="button"
                onClick={onView}
                className="text-xs font-semibold text-blue-600 transition hover:text-blue-800 hover:underline"
            >
                View
            </button>

            <button
                type="button"
                onClick={onEdit}
                className="text-xs font-semibold text-slate-600 transition hover:text-slate-900 hover:underline"
            >
                Edit
            </button>

            <button
                type="button"
                onClick={onDelete}
                className="text-xs font-semibold text-rose-500 transition hover:text-rose-700 hover:underline"
            >
                Delete
            </button>
        </div>
    );
};

export default Actions;
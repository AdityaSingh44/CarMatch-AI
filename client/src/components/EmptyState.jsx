import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';

export default function EmptyState({ title = 'No cars found', message = 'Try changing your preferences.', actionLabel = 'Find My Car', actionTo = '/' }) {
    return (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-slate-100 text-slate-500">
                <SearchX size={22} aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-slate-950">{title}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">{message}</p>
            <Link to={actionTo} className="mt-6 inline-flex items-center justify-center rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700">
                {actionLabel}
            </Link>
        </div>
    );
}

export default function LoadingSpinner({ label = 'Loading' }) {
    return (
        <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-slate-600">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" aria-hidden="true" />
            <p className="text-sm font-medium">{label}</p>
        </div>
    );
}

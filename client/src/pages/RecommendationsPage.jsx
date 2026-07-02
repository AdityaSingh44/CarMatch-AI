import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CarCard from '../components/CarCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import FiltersBar from '../components/FiltersBar.jsx';

const defaultFilters = {
    search: '',
    sort: 'score-desc',
    fuelType: '',
    bodyType: '',
    maxPrice: '',
};

function getStoredResults() {
    try {
        return JSON.parse(sessionStorage.getItem('carmatch-results') || '[]');
    } catch {
        return [];
    }
}

export default function RecommendationsPage() {
    const location = useLocation();
    const recommendations = location.state?.recommendations || getStoredResults();
    const [filters, setFilters] = useState(defaultFilters);

    const visibleCars = useMemo(() => {
        const search = filters.search.trim().toLowerCase();
        const filtered = recommendations.filter((car) => {
            const textMatch = `${car.make} ${car.model} ${car.variant}`.toLowerCase().includes(search);
            const fuelMatch = !filters.fuelType || car.fuelType === filters.fuelType;
            const bodyMatch = !filters.bodyType || car.bodyType === filters.bodyType;
            const priceMatch = !filters.maxPrice || car.price <= Number(filters.maxPrice);
            return textMatch && fuelMatch && bodyMatch && priceMatch;
        });

        return [...filtered].sort((first, second) => {
            if (filters.sort === 'price-asc') return first.price - second.price;
            if (filters.sort === 'price-desc') return second.price - first.price;
            if (filters.sort === 'mileage-desc') return second.mileage - first.mileage;
            if (filters.sort === 'safety-desc') return second.safetyRating - first.safetyRating;
            return (second.recommendationScore || 0) - (first.recommendationScore || 0);
        });
    }, [filters, recommendations]);

    return (
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Top recommendations</p>
                    <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Cars matched to your needs</h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Review the top scored cars, filter the list, and open details for deeper specifications.</p>
                </div>
                {recommendations.length ? <p className="rounded-md bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">{recommendations.length} matches</p> : null}
            </div>

            {!recommendations.length ? (
                <EmptyState title="No recommendations yet" message="Start from the preference form so CarMatch AI can score the cars for you." />
            ) : (
                <>
                    <FiltersBar filters={filters} setFilters={setFilters} />
                    {visibleCars.length ? (
                        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {visibleCars.map((car) => <CarCard key={car._id} car={car} />)}
                        </div>
                    ) : (
                        <div className="mt-6">
                            <EmptyState title="No cars match these filters" message="Clear one of the filters to see your recommended cars again." />
                        </div>
                    )}
                </>
            )}
        </main>
    );
}

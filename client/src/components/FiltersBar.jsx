import { Search } from 'lucide-react';

export default function FiltersBar({ filters, setFilters }) {
    function update(name, value) {
        setFilters((current) => ({ ...current, [name]: value }));
    }

    return (
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
                <label className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
                    <input
                        value={filters.search}
                        onChange={(event) => update('search', event.target.value)}
                        placeholder="Search make or model"
                        className="h-11 w-full rounded-md border border-slate-300 pl-10 pr-3 text-sm"
                    />
                </label>
                <select value={filters.sort} onChange={(event) => update('sort', event.target.value)} className="h-11 rounded-md border border-slate-300 px-3 text-sm">
                    <option value="score-desc">Best match</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="mileage-desc">Mileage: high to low</option>
                    <option value="safety-desc">Safety: high to low</option>
                </select>
                <select value={filters.fuelType} onChange={(event) => update('fuelType', event.target.value)} className="h-11 rounded-md border border-slate-300 px-3 text-sm">
                    <option value="">All fuels</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                </select>
                <select value={filters.bodyType} onChange={(event) => update('bodyType', event.target.value)} className="h-11 rounded-md border border-slate-300 px-3 text-sm">
                    <option value="">All body types</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Compact SUV">Compact SUV</option>
                    <option value="MPV">MPV</option>
                </select>
                <select value={filters.maxPrice} onChange={(event) => update('maxPrice', event.target.value)} className="h-11 rounded-md border border-slate-300 px-3 text-sm">
                    <option value="">Any price</option>
                    <option value="1000000">Under Rs. 10L</option>
                    <option value="1500000">Under Rs. 15L</option>
                    <option value="2500000">Under Rs. 25L</option>
                    <option value="4000000">Under Rs. 40L</option>
                </select>
            </div>
        </div>
    );
}

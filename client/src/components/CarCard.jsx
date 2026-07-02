import { Link } from 'react-router-dom';
import { ArrowRight, Fuel, Gauge, ShieldCheck } from 'lucide-react';
import { replaceBrokenImage } from '../utils/imageFallbacks.js';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
});

export default function CarCard({ car }) {
    const image = car.images?.[0] || car.image;

    return (
        <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                <img src={image} alt={`${car.make} ${car.model}`} onError={(event) => replaceBrokenImage(event)} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                {typeof car.recommendationScore === 'number' ? (
                    <span className="absolute right-3 top-3 rounded-md bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                        {car.recommendationScore}% match
                    </span>
                ) : null}
            </div>
            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="text-lg font-bold text-slate-950">{car.make} {car.model}</h3>
                        <p className="text-sm text-slate-500">{car.variant}</p>
                    </div>
                    <p className="shrink-0 text-sm font-bold text-emerald-700">{currencyFormatter.format(car.price)}</p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                    <span className="flex items-center gap-2"><Gauge size={16} aria-hidden="true" />{car.mileage} km/l</span>
                    <span className="flex items-center gap-2"><ShieldCheck size={16} aria-hidden="true" />{car.safetyRating}/5 safety</span>
                    <span className="flex items-center gap-2"><Fuel size={16} aria-hidden="true" />{car.fuelType}</span>
                    <span>{car.transmission}</span>
                </div>

                {car.recommendationReason ? <p className="mt-4 rounded-md bg-emerald-50 px-3 py-2 text-sm leading-6 text-emerald-800">{car.recommendationReason}</p> : null}

                <Link to={`/cars/${car._id}`} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">
                    View Details
                    <ArrowRight size={17} aria-hidden="true" />
                </Link>
            </div>
        </article>
    );
}

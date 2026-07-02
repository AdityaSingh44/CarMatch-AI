import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Fuel, Gauge, IndianRupee, ShieldCheck, Users } from 'lucide-react';
import EmptyState from '../components/EmptyState.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { carService } from '../services/api.js';
import { fallbackCarImages, replaceBrokenImage } from '../utils/imageFallbacks.js';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
});

export default function CarDetailsPage() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        async function loadCar() {
            try {
                setIsLoading(true);
                const { data } = await carService.getCarById(id);
                setCar(data.data);
                setActiveImageIndex(0);
            } catch (err) {
                setError(err.response?.data?.message || 'Unable to load this car.');
            } finally {
                setIsLoading(false);
            }
        }

        loadCar();
    }, [id]);

    if (isLoading) return <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><LoadingSpinner label="Loading car details" /></main>;
    if (error || !car) return <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><EmptyState title="Car not found" message={error || 'This car does not exist.'} actionLabel="Back to Home" /></main>;

    const galleryImages = (car.images?.length ? car.images : [car.image, ...fallbackCarImages]).filter(Boolean).slice(0, 7);
    const galleryLabels = ['Front Exterior', 'Side Look', 'Rear Look', 'Dashboard', 'Interior Seats', 'Rear Cabin', 'Feature Details'];

    const specs = [
        ['Price', currencyFormatter.format(car.price), IndianRupee],
        ['Mileage', `${car.mileage} km/l`, Gauge],
        ['Safety Rating', `${car.safetyRating}/5`, ShieldCheck],
        ['Fuel Type', car.fuelType, Fuel],
        ['Transmission', car.transmission, Gauge],
        ['Seats', `${car.seatingCapacity}`, Users],
    ];

    return (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Link to="/recommendations" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800">
                <ArrowLeft size={18} aria-hidden="true" />
                Back to results
            </Link>

            <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                    <div className="overflow-hidden rounded-lg bg-slate-200 shadow-sm">
                        <img src={galleryImages[activeImageIndex]} alt={`${car.make} ${car.model} ${galleryLabels[activeImageIndex] || 'gallery image'}`} onError={(event) => replaceBrokenImage(event, activeImageIndex)} className="h-full max-h-[560px] min-h-[320px] w-full object-cover" />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                        {galleryImages.map((image, index) => (
                            <button
                                type="button"
                                key={image}
                                onClick={() => setActiveImageIndex(index)}
                                className={`overflow-hidden rounded-md border bg-white text-left shadow-sm transition hover:-translate-y-0.5 ${activeImageIndex === index ? 'border-emerald-600 ring-2 ring-emerald-200' : 'border-slate-200'}`}
                            >
                                <img src={image} alt={`${car.make} ${car.model} ${galleryLabels[index] || `image ${index + 1}`}`} onError={(event) => replaceBrokenImage(event, index)} className="aspect-[4/3] w-full object-cover" />
                                <span className="block truncate px-2 py-2 text-xs font-bold text-slate-700">{galleryLabels[index] || `View ${index + 1}`}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">{car.bodyType}</p>
                    <h1 className="mt-2 text-4xl font-black text-slate-950">{car.make} {car.model}</h1>
                    <p className="mt-2 text-lg font-semibold text-slate-600">{car.variant}</p>
                    <p className="mt-5 text-base leading-7 text-slate-700">{car.description}</p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {specs.map(([label, value, Icon]) => (
                            <div key={label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                                <Icon className="mb-3 text-emerald-600" size={20} aria-hidden="true" />
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                                <p className="mt-1 text-base font-bold text-slate-950">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mt-8 grid gap-6 lg:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-950">Engine</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{car.engine}</p>
                </div>
                <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-5 shadow-sm">
                    <h2 className="text-lg font-bold text-emerald-900">Pros</h2>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-emerald-900">
                        {car.pros.map((item) => <li key={item}>• {item}</li>)}
                    </ul>
                </div>
                <div className="rounded-lg border border-amber-100 bg-amber-50 p-5 shadow-sm">
                    <h2 className="text-lg font-bold text-amber-950">Cons</h2>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-950">
                        {car.cons.map((item) => <li key={item}>• {item}</li>)}
                    </ul>
                </div>
            </section>
        </main>
    );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { carService } from '../services/api.js';
import LoadingSpinner from './LoadingSpinner.jsx';

const initialPreferences = {
    budget: '',
    fuelType: '',
    transmission: '',
    bodyType: '',
    priority: '',
    familySize: '',
    drivingType: '',
};

const options = {
    fuelType: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
    transmission: ['Manual', 'Automatic'],
    bodyType: ['SUV', 'Sedan', 'Hatchback', 'Compact SUV', 'MPV'],
    priority: ['Mileage', 'Safety', 'Performance', 'Balanced'],
    familySize: ['2', '4', '5', '7'],
    drivingType: ['City', 'Highway', 'Mixed'],
};

export default function PreferenceForm() {
    const navigate = useNavigate();
    const [preferences, setPreferences] = useState(initialPreferences);
    const [mode, setMode] = useState('structured');
    const [query, setQuery] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');

    function updateField(name, value) {
        setPreferences((current) => ({ ...current, [name]: value }));
        setErrors((current) => ({ ...current, [name]: '' }));
    }

    function validate() {
        const nextErrors = {};

        if (mode === 'query') {
            if (query.trim().length < 20) {
                nextErrors.query = 'Describe your budget and needs in one sentence.';
            }

            setErrors(nextErrors);
            return Object.keys(nextErrors).length === 0;
        }

        if (!preferences.budget || Number(preferences.budget) < 300000) {
            nextErrors.budget = 'Enter a budget of at least Rs. 3,00,000.';
        }

        Object.entries(preferences).forEach(([key, value]) => {
            if (key !== 'budget' && !value) {
                nextErrors[key] = 'Required';
            }
        });

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!validate()) return;

        try {
            setIsSubmitting(true);
            setApiError('');

            const payload = mode === 'query'
                ? { query: query.trim() }
                : {
                    ...preferences,
                    budget: Number(preferences.budget),
                    familySize: Number(preferences.familySize),
                };

            const { data } = await carService.recommendCars(payload);
            sessionStorage.setItem('carmatch-results', JSON.stringify(data.data || []));
            sessionStorage.setItem('carmatch-preferences', JSON.stringify(data.preferences || payload));
            navigate('/recommendations', { state: { recommendations: data.data || [], preferences: data.preferences || payload } });
        } catch (err) {
            setApiError(err.response?.data?.message || 'Could not generate recommendations. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isSubmitting) {
        return <LoadingSpinner label="Finding your best matches" />;
    }

    return (
        <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 sm:p-6">
            <div className="mb-6 flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
                    <Sparkles size={20} aria-hidden="true" />
                </span>
                <div>
                    <h2 className="text-xl font-bold text-slate-950">Tell us what matters</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600">Answer a few quick questions and get ranked recommendations.</p>
                </div>
            </div>

            {apiError ? <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{apiError}</div> : null}

            <div className="mb-5 grid grid-cols-2 rounded-lg bg-slate-100 p-1">
                {[
                    ['structured', 'Form'],
                    ['query', 'AI Prompt'],
                ].map(([value, label]) => (
                    <button
                        type="button"
                        key={value}
                        onClick={() => {
                            setMode(value);
                            setErrors({});
                            setApiError('');
                        }}
                        className={`rounded-md px-3 py-2 text-sm font-bold transition ${mode === value ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-950'}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {mode === 'query' ? (
                <label>
                    <span className="text-sm font-semibold text-slate-700">Describe your ideal car</span>
                    <textarea
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setErrors((current) => ({ ...current, query: '' }));
                        }}
                        rows={6}
                        placeholder="I have a budget of 12 lakh, I need a safe SUV for my family, mostly for city driving."
                        className="mt-2 w-full resize-none rounded-md border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-950 shadow-sm transition hover:border-slate-400"
                    />
                    {errors.query ? <span className="mt-1 block text-xs font-medium text-red-600">{errors.query}</span> : null}
                </label>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    <label className="md:col-span-2">
                        <span className="text-sm font-semibold text-slate-700">Budget</span>
                        <input
                            type="number"
                            min="300000"
                            step="50000"
                            value={preferences.budget}
                            onChange={(event) => updateField('budget', event.target.value)}
                            placeholder="Example: 1200000"
                            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm transition hover:border-slate-400"
                        />
                        {errors.budget ? <span className="mt-1 block text-xs font-medium text-red-600">{errors.budget}</span> : null}
                    </label>

                    {Object.entries(options).map(([name, values]) => (
                        <label key={name}>
                            <span className="text-sm font-semibold capitalize text-slate-700">{name.replace(/([A-Z])/g, ' $1')}</span>
                            <select
                                value={preferences[name]}
                                onChange={(event) => updateField(name, event.target.value)}
                                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm transition hover:border-slate-400"
                            >
                                <option value="">Select</option>
                                {values.map((value) => (
                                    <option key={value} value={value}>{value}</option>
                                ))}
                            </select>
                            {errors[name] ? <span className="mt-1 block text-xs font-medium text-red-600">{errors[name]}</span> : null}
                        </label>
                    ))}
                </div>
            )}

            <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700">
                Find My Car
                <ArrowRight size={18} aria-hidden="true" />
            </button>
        </form>
    );
}

import { ArrowDown } from 'lucide-react';
import PreferenceForm from '../components/PreferenceForm.jsx';

export default function HomePage() {
    return (
        <main>
            <section className="hero-gradient text-white">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_440px] lg:px-8 lg:py-20">
                    <div className="flex flex-col justify-center">
                        <p className="mb-4 text-sm font-bold uppercase tracking-wide text-emerald-200">CarMatch AI</p>
                        <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Find the right car in seconds.</h1>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">Skip endless browsing. Share your budget, driving style, and priorities, then let the recommendation engine rank cars that actually fit your needs.</p>
                        <a href="#find-my-car" className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-emerald-50">
                            Find My Car
                            <ArrowDown size={18} aria-hidden="true" />
                        </a>
                    </div>
                    <div id="find-my-car" className="scroll-mt-24">
                        <PreferenceForm />
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
                {[
                    ['Preference first', 'The flow starts with how you drive, who rides with you, and what matters most.'],
                    ['Scored matches', 'Every car is compared against your requirements using transparent weighted rules.'],
                    ['Clear reasons', 'Each recommendation includes a concise reason so the result feels useful, not random.'],
                ].map(([title, copy]) => (
                    <div key={title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="text-base font-bold text-slate-950">{title}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
                    </div>
                ))}
            </section>
        </main>
    );
}

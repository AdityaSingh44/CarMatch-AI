import { Link, NavLink } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <Link to="/" className="flex items-center gap-2 text-lg font-bold text-slate-950">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-600 text-white">
                        <Sparkles size={18} aria-hidden="true" />
                    </span>
                    CarMatch AI
                </Link>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <NavLink className={({ isActive }) => `rounded-md px-3 py-2 transition ${isActive ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-slate-100'}`} to="/">
                        Home
                    </NavLink>
                    <NavLink className={({ isActive }) => `rounded-md px-3 py-2 transition ${isActive ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-slate-100'}`} to="/recommendations">
                        Results
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}

import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import RecommendationsPage from './pages/RecommendationsPage.jsx';
import CarDetailsPage from './pages/CarDetailsPage.jsx';

export default function App() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-950">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recommendations" element={<RecommendationsPage />} />
                <Route path="/cars/:id" element={<CarDetailsPage />} />
            </Routes>
        </div>
    );
}

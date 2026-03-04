import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CitizenImpactApp from './pages/CitizenImpactApp';
import CollectorPickupTool from './pages/CollectorPickupTool';
import RecyclingFacilityLog from './pages/RecyclingFacilityLog';
import SortingFacilityHub from './pages/SortingFacilityHub';

function Home() {
    return (
        <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center p-8 text-slate-100 font-display">
            <div className="max-w-3xl w-full space-y-8">
                <div className="text-center space-y-4">
                    <div className="bg-primary size-16 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-3xl text-white">recycling</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-white">ZeroWaste Project Hub</h1>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        Select an interface below to view its specific functional dashboard or mobile application.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to="/municipality-dashboard" className="bg-surface-dark border border-border-dark p-6 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group relative overflow-hidden flex items-start gap-4">
                        <div className="size-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary-light shrink-0">
                            <span className="material-symbols-outlined">dashboard</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white group-hover:text-accent-green transition-colors">Municipality Dashboard</h2>
                            <p className="text-sm text-slate-400 mt-1">Desktop admin panel for city-wide overview, map tracking and overall metrics.</p>
                        </div>
                    </Link>

                    <Link to="/citizen-impact" className="bg-surface-dark border border-border-dark p-6 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group relative overflow-hidden flex items-start gap-4">
                        <div className="size-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 shrink-0">
                            <span className="material-symbols-outlined">smartphone</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Citizen Impact App</h2>
                            <p className="text-sm text-slate-400 mt-1">Mobile application interface for citizens to track personal recycling impact.</p>
                        </div>
                    </Link>

                    <Link to="/collector-pickup" className="bg-surface-dark border border-border-dark p-6 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group relative overflow-hidden flex items-start gap-4">
                        <div className="size-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                            <span className="material-symbols-outlined">local_shipping</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Collector Pickup Tool</h2>
                            <p className="text-sm text-slate-400 mt-1">Mobile tablet tool for collectors to follow active routes and scan bins.</p>
                        </div>
                    </Link>

                    <Link to="/recycling-log" className="bg-surface-dark border border-border-dark p-6 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group relative overflow-hidden flex items-start gap-4">
                        <div className="size-12 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 shrink-0">
                            <span className="material-symbols-outlined">factory</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">Recycling Facility Log</h2>
                            <p className="text-sm text-slate-400 mt-1">Desktop dashboard for facility managers to review intake and processes.</p>
                        </div>
                    </Link>

                    <Link to="/sorting-hub" className="bg-surface-dark border border-border-dark p-6 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group relative overflow-hidden flex items-start gap-4 md:col-span-2 md:w-1/2 md:mx-auto">
                        <div className="size-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 shrink-0">
                            <span className="material-symbols-outlined">grid_view</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">Sorting Facility Hub</h2>
                            <p className="text-sm text-slate-400 mt-1">Mobile interface for sorting floor workers to manage batches.</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/municipality-dashboard" element={<Dashboard />} />
                <Route path="/citizen-impact" element={<CitizenImpactApp />} />
                <Route path="/collector-pickup" element={<CollectorPickupTool />} />
                <Route path="/recycling-log" element={<RecyclingFacilityLog />} />
                <Route path="/sorting-hub" element={<SortingFacilityHub />} />
            </Routes>
        </BrowserRouter>
    );
}

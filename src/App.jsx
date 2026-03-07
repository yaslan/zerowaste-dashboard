import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import useWasteStore from './store/useWasteStore';
import Dashboard from './pages/Dashboard';
import CitizenImpactApp from './pages/CitizenImpactApp';
import CollectorPickupTool from './pages/CollectorPickupTool';
import RecyclingFacilityLog from './pages/RecyclingFacilityLog';
import SortingFacilityHub from './pages/SortingFacilityHub';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';

// Optional: Protected Route Wrapper for Dashboard
function ProtectedRoute({ children }) {
    const { t } = useTranslation();
    const user = useWasteStore(state => state.user);
    const sessionLoaded = useWasteStore(state => state.sessionLoaded);

    if (!sessionLoaded) {
        return <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center text-slate-500">{t('app.loadingSession')}</div>;
    }

    if (!user) {
        return <Login />; // Or: return <Navigate to="/login" replace />;
    }

    return children;
}

function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'tr' ? 'en' : 'tr';
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="absolute top-4 right-4 z-50">
            <button
                onClick={toggleLanguage}
                className="bg-white/10 hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 border border-slate-200 dark:border-border-dark backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all font-medium text-slate-700 dark:text-slate-200 shadow-sm"
            >
                <span className="material-symbols-outlined text-sm">language</span>
                {i18n.language === 'tr' ? 'EN' : 'TR'}
            </button>
        </div>
    );
}

function Home() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center p-8 text-slate-800 dark:text-slate-100 font-display relative">
            <LanguageSwitcher />
            <div className="max-w-3xl w-full space-y-8">
                <div className="text-center space-y-4">
                    <div className="bg-primary size-16 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-3xl text-slate-900 dark:text-white">recycling</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">{t('app.hubTitle')}</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto">
                        {t('app.hubDescription')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to="/user-dashboard" className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-6 rounded-xl hover:border-emerald-500 hover:bg-emerald-500/5 transition-all group relative overflow-hidden flex items-start gap-4 md:col-span-2">
                        <div className="size-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-500 shrink-0">
                            <span className="material-symbols-outlined">person</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">{t('app.citizenPanelTitle')}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('app.citizenPanelDesc')}</p>
                        </div>
                    </Link>

                    <Link to="/municipality-dashboard" className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-6 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group relative overflow-hidden flex items-start gap-4">
                        <div className="size-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary-light shrink-0">
                            <span className="material-symbols-outlined">dashboard</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-accent-green transition-colors">{t('app.municipalityTitle')}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('app.municipalityDesc')}</p>
                        </div>
                    </Link>

                    <Link to="/citizen-impact" className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-6 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group relative overflow-hidden flex items-start gap-4">
                        <div className="size-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 shrink-0">
                            <span className="material-symbols-outlined">smartphone</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-400 transition-colors">{t('app.citizenImpactTitle')}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('app.citizenImpactDesc')}</p>
                        </div>
                    </Link>

                    <Link to="/collector-pickup" className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-6 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group relative overflow-hidden flex items-start gap-4">
                        <div className="size-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                            <span className="material-symbols-outlined">local_shipping</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-400 transition-colors">{t('app.collectorTitle')}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('app.collectorDesc')}</p>
                        </div>
                    </Link>

                    <Link to="/recycling-log" className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-6 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group relative overflow-hidden flex items-start gap-4">
                        <div className="size-12 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 shrink-0">
                            <span className="material-symbols-outlined">factory</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-400 transition-colors">{t('app.facilityTitle')}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('app.facilityDesc')}</p>
                        </div>
                    </Link>

                    <Link to="/sorting-hub" className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-6 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group relative overflow-hidden flex items-start gap-4 md:col-span-2 md:w-1/2 md:mx-auto">
                        <div className="size-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 shrink-0">
                            <span className="material-symbols-outlined">grid_view</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors">{t('app.sortingTitle')}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('app.sortingDesc')}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function NotFound() {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center text-slate-800 dark:text-slate-100 gap-6">
            <span className="material-symbols-outlined text-6xl text-primary-light">error</span>
            <h1 className="text-4xl font-black">404</h1>
            <p className="text-slate-500 dark:text-slate-400">{t('app.pageNotFound')}</p>
            <Link to="/" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-bold">{t('app.backToHome')}</Link>
        </div>
    )
}

export default function App() {
    React.useEffect(() => {
        useWasteStore.getState().fetchInitialData();
    }, []);

    return (
        <BrowserRouter>
            <Toaster position="top-right" toastOptions={{ style: { background: '#1e2924', color: '#f1f5f9', border: '1px solid #2c3f37' } }} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/municipality-dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
                <Route path="/citizen-impact" element={<CitizenImpactApp />} />
                <Route path="/collector-pickup" element={<CollectorPickupTool />} />
                <Route path="/recycling-log" element={<RecyclingFacilityLog />} />
                <Route path="/sorting-hub" element={<SortingFacilityHub />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

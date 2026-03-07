import React, { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useWasteStore from '../store/useWasteStore';

const CollectorRouteMap = lazy(() => import('../components/CollectorRouteMap'));

export default function CollectorPickupTool() {
    const [weight, setWeight] = useState('');
    const logCollection = useWasteStore(state => state.logCollection);

    const [pickups, setPickups] = useState([
        { id: 1, address: '1248 Oakwood St.', type: 'Industrial Waste • 2 Large Bins', status: 'In Progress' },
        { id: 2, address: '902 Pine Avenue', type: 'Residential • 1 Standard Bin', status: 'Pending' },
        { id: 3, address: 'Community Park A', type: 'Recycling Center • 4 Bins', status: 'Pending' }
    ]);

    const handleScan = () => {
        const fakeWeight = (Math.random() * 15 + 2).toFixed(2);
        setWeight(fakeWeight);
        toast.success(`QR Code successfully scanned!\nCustomer verified. Weight set to ${fakeWeight} KG.`, { duration: 4000 });
    };

    const handleLogWeight = () => {
        const weightNum = parseFloat(weight);
        if (!weight || isNaN(weightNum) || weightNum <= 0) {
            toast.error('Please enter a valid positive weight first.');
            return;
        }

        const loadToast = toast.loading('Logging weight to blockchain...');

        setTimeout(() => {
            toast.success(`${weight} KG logged successfully!`, { id: loadToast });

            // Send to global store
            const currentPickup = pickups[0];
            const wasteType = currentPickup?.type.includes('Industrial') ? 'METAL' :
                currentPickup?.type.includes('Recycling') ? 'PAPER' : 'PLASTIC';

            logCollection(weight, 'Collector App', wasteType);

            // Move to next pickup
            setPickups(prev => {
                if (prev.length === 0) return prev;
                const newPickups = [...prev];
                newPickups.shift(); // Remove current
                if (newPickups.length > 0) {
                    newPickups[0].status = 'In Progress';
                }
                return newPickups;
            });
            setWeight('');
        }, 1500);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-800 dark:text-slate-100 min-h-screen flex flex-col">
            {/* Header */}
            <header className="flex items-center bg-background-light dark:bg-background-dark p-4 justify-between border-b border-primary/20 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-primary text-slate-800 dark:text-slate-100 p-2 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined">local_shipping</span>
                    </div>
                    <div>
                        <h1 className="text-slate-900 dark:text-slate-800 dark:text-slate-100 text-lg font-bold leading-tight">Waste Collector</h1>
                        <p className="text-primary dark:text-primary/80 text-xs font-medium uppercase tracking-wider">Unit #402 • Active</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link to="/" className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary dark:text-slate-800 dark:text-slate-100 hover:bg-primary/30 transition-colors" title="Back to Home">
                        <span className="material-symbols-outlined">home</span>
                    </Link>
                    <button onClick={() => toast("No new notifications")} className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary dark:text-slate-800 dark:text-slate-100">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <button className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary dark:text-slate-800 dark:text-slate-100">
                        <span className="material-symbols-outlined">account_circle</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-24">
                {/* Active Route Map Section */}
                <div className="p-4">
                    <div className="relative group h-48 w-full rounded-xl overflow-hidden border border-primary/20 bg-slate-900">
                        <Suspense fallback={<div className="flex items-center justify-center h-full text-slate-500 text-sm">Loading route map...</div>}>
                            <CollectorRouteMap />
                        </Suspense>
                        <div className="absolute top-3 left-3 z-[1000] bg-background-light dark:bg-background-dark/80 backdrop-blur px-3 py-1.5 rounded-lg border border-primary/30 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-green-500">navigation</span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase">Route Active</span>
                        </div>
                        <div className="absolute bottom-3 right-3 z-[1000]">
                            <button onClick={() => toast.success("Location centered")} className="bg-primary text-white p-3 rounded-full shadow-xl flex items-center justify-center active:scale-95 transition-transform">
                                <span className="material-symbols-outlined">my_location</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scan & Log Actions */}
                <div className="px-4 py-2 grid grid-cols-1 gap-4">
                    {/* Scan QR Button - High Contrast */}
                    <button onClick={handleScan} className="flex items-center justify-center gap-4 bg-primary text-white p-6 rounded-xl shadow-lg active:scale-95 transition-transform">
                        <span className="material-symbols-outlined !text-4xl animate-pulse">qr_code_scanner</span>
                        <div className="text-left">
                            <p className="text-xl font-bold">Scan Bin QR</p>
                            <p className="text-sm opacity-80">Identify customer & waste type</p>
                        </div>
                    </button>

                    {/* Log Weight Input Section */}
                    <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-4 rounded-xl">
                        <label className="block text-sm font-semibold mb-2 text-primary dark:text-slate-600 dark:text-slate-300 uppercase tracking-tight">Manual Weight Entry (KG)</label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/60">scale</span>
                                <input
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full bg-white dark:bg-slate-900 border-2 border-primary/20 rounded-lg py-4 pl-10 pr-4 text-2xl font-bold focus:border-primary outline-none text-slate-900 dark:text-slate-800 dark:text-slate-100"
                                    placeholder="00.00"
                                    type="number"
                                />
                            </div>
                            <button onClick={handleLogWeight} className="bg-primary/20 hover:bg-primary hover:text-slate-900 dark:text-white transition-colors text-primary dark:text-slate-800 dark:text-slate-100 px-6 font-bold rounded-lg border border-primary/30">
                                LOG
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scheduled Pickups List */}
                <div className="px-4 mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-slate-900 dark:text-slate-800 dark:text-slate-100 text-xl font-bold">Scheduled Pickups</h2>
                        <span className="bg-primary/20 text-primary dark:text-slate-600 dark:text-slate-300 text-xs font-bold px-2 py-1 rounded">{pickups.length > 0 ? `${pickups.length} REMAINING` : 'ALL DONE ✓'}</span>
                    </div>

                    <div className="space-y-3">
                        {pickups.length === 0 && (
                            <div className="p-8 text-center border-2 border-dashed border-primary/30 rounded-xl text-slate-500">
                                <span className="material-symbols-outlined text-4xl text-accent-green mb-2">check_circle</span>
                                <p className="font-bold">All caught up!</p>
                            </div>
                        )}
                        {pickups.map((pickup, index) => (
                            <div key={pickup.id} className={`flex items-center gap-4 ${pickup.status === 'In Progress' ? 'bg-primary/10 dark:bg-primary/20 border-l-4 border-primary' : 'bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 opacity-80'} p-4 rounded-lg transition-all`}>
                                <div className="flex-1">
                                    {pickup.status === 'In Progress' && (
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold text-primary dark:text-primary uppercase tracking-widest">In Progress</span>
                                            <div className="size-2 rounded-full bg-primary animate-pulse"></div>
                                        </div>
                                    )}
                                    <p className="text-slate-900 dark:text-slate-800 dark:text-slate-100 text-base font-bold">{pickup.address}</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">{pickup.type}</p>
                                </div>
                                {pickup.status === 'In Progress' ? (
                                    <button onClick={() => toast.success("Navigating to " + pickup.address)} className="flex size-10 items-center justify-center rounded-full bg-primary text-white hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined">directions</span>
                                    </button>
                                ) : index === 1 && (
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">NEXT</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Bottom Navigation Bar */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-primary/20 px-4 pb-6 pt-2 z-20">
                <div className="flex gap-2">
                    <a className="flex flex-1 flex-col items-center justify-center gap-1 text-primary" href="#">
                        <span className="material-symbols-outlined !text-[28px] fill-[1]">map</span>
                        <p className="text-xs font-bold leading-normal tracking-wide">Route</p>
                    </a>
                    <a onClick={(e) => { e.preventDefault(); toast("Route History Opened"); }} className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-primary transition-colors cursor-pointer" href="#">
                        <span className="material-symbols-outlined !text-[28px]">history</span>
                        <p className="text-xs font-medium leading-normal tracking-wide">History</p>
                    </a>
                    <a onClick={(e) => { e.preventDefault(); toast("Reports coming soon"); }} className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-primary transition-colors cursor-pointer" href="#">
                        <span className="material-symbols-outlined !text-[28px]">bar_chart</span>
                        <p className="text-xs font-medium leading-normal tracking-wide">Reports</p>
                    </a>
                    <a onClick={(e) => { e.preventDefault(); toast("Viewing Profile"); }} className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-primary transition-colors cursor-pointer" href="#">
                        <span className="material-symbols-outlined !text-[28px]">person</span>
                        <p className="text-xs font-medium leading-normal tracking-wide">Profile</p>
                    </a>
                </div>
            </nav>
        </div>
    );
}

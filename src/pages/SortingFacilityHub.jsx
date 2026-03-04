import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useWasteStore from '../store/useWasteStore';

export default function SortingFacilityHub() {
    const allBatches = useWasteStore(state => state.batches);
    const verifyAndSort = useWasteStore(state => state.verifyAndSort);
    const batches = allBatches.filter(b => b.status === 'Processing');

    // Dynamic daily volume from all batches
    const todayVolume = useMemo(() =>
        allBatches.reduce((sum, b) => sum + (b.weight || 0), 0)
        , [allBatches]);
    const dailyTarget = 1500;
    const progressPct = Math.min(100, Math.round((todayVolume / dailyTarget) * 100));

    // Dynamic blockchain hash that rotates on each verify
    const [lastHash, setLastHash] = useState(
        () => '0x' + Math.random().toString(16).slice(2, 9) + '...' + Math.random().toString(16).slice(2, 6)
    );
    const [lastTxId, setLastTxId] = useState(
        () => 'tx_id: ' + Math.floor(Math.random() * 99999) + '-' + Math.floor(Math.random() * 9999)
    );

    const handleVerifyAndSort = (id) => {
        const loadingToast = toast.loading(`Verifying Batch #${id}...`);
        setTimeout(() => {
            toast.success(`Batch #${id} successfully verified and sorted!`, { id: loadingToast });
            verifyAndSort(id);
            // Rotate blockchain hash
            setLastHash('0x' + Math.random().toString(16).slice(2, 9) + '...' + Math.random().toString(16).slice(2, 6));
            setLastTxId('tx_id: ' + Math.floor(Math.random() * 99999) + '-' + Math.floor(Math.random() * 9999));
        }, 1200);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-neutral-700 p-4">
                <div className="flex items-center justify-between max-w-md mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-primary flex items-center justify-center overflow-hidden border border-neutral-600">
                            <img alt="Facility Manager Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPNGwo2vjTiOb_IGcmSFSwm439dCqFGyZnCYfMbC6u8DzaoAMZjvwUkpUazsBxGZfcc04l0M6Ymv44chidRfJSXymbWelNOwc7PmD0HDBcuawM4sBMPW_AupvbcuaXUEVEPYOw_PPW3GM8xjwgOYCIDroeY0YRZuHvhDw8-Ru6AZ5DGNvZzhwrY7r-z7FXvNcFnlQT0KILvsl968Xcjst1iDI_mNNRN09dww_Xl9gFybw0zXjYJUaAHYVqzEqFF3t38XoEUeqEMio" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold leading-tight">Sorting Hub #08</h1>
                            <div className="flex items-center gap-1.5">
                                <span className="size-2 rounded-full bg-accent-green animate-pulse"></span>
                                <p className="text-xs font-medium text-slate-400">Active • Syncing</p>
                            </div>
                        </div>
                    </div>
                    <Link to="/" className="p-2 rounded-lg bg-neutral-800 text-slate-100 hover:bg-neutral-700 transition-colors" title="Back to Home">
                        <span className="material-symbols-outlined">home</span>
                    </Link>
                    <button onClick={() => toast('No new alerts from the system')} className="p-2 rounded-lg bg-neutral-800 text-slate-100 hover:bg-neutral-700 transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 max-w-md mx-auto w-full p-4 space-y-6 pb-24">
                {/* Throughput Stats */}
                <section className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-200 dark:bg-neutral-800 rounded-xl p-4 border border-neutral-700">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Today's Volume</p>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">{todayVolume.toLocaleString()}</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">kg</span>
                        </div>
                        <div className="mt-3 h-1.5 w-full bg-neutral-300 dark:bg-neutral-700 rounded-full overflow-hidden">
                            <div className="h-full bg-accent-green transition-all duration-700" style={{ width: `${progressPct}%` }}></div>
                        </div>
                        <p className="text-[10px] mt-2 text-slate-500 dark:text-slate-400">{progressPct}% of daily target ({dailyTarget.toLocaleString()} kg)</p>
                    </div>
                    <div className="bg-slate-200 dark:bg-neutral-800 rounded-xl p-4 border border-neutral-700">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">System Load</p>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">Optimal</span>
                        </div>
                        <div className="mt-3 flex gap-1">
                            <div className="h-4 w-1.5 bg-accent-green rounded-full"></div>
                            <div className="h-4 w-1.5 bg-accent-green rounded-full"></div>
                            <div className="h-4 w-1.5 bg-accent-green rounded-full animate-pulse"></div>
                            <div className="h-4 w-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full"></div>
                        </div>
                        <p className="text-[10px] mt-2 text-accent-green">+ 12% Efficient</p>
                    </div>
                </section>

                {/* Category Quick Sort */}
                <section>
                    <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Material Category Filters</h2>
                    <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
                        <button onClick={() => toast('Filtering by Plastic...')} className="flex flex-col items-center gap-2 min-w-[72px] p-3 rounded-xl bg-primary text-white border border-primary hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined">recycling</span>
                            <span className="text-xs font-medium">Plastic</span>
                        </button>
                        <button onClick={() => toast('Filtering by Metal...')} className="flex flex-col items-center gap-2 min-w-[72px] p-3 rounded-xl bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-neutral-700 hover:bg-slate-300 dark:hover:bg-neutral-700 transition-colors">
                            <span className="material-symbols-outlined">precision_manufacturing</span>
                            <span className="text-xs font-medium">Metal</span>
                        </button>
                        <button onClick={() => toast('Filtering by Organic...')} className="flex flex-col items-center gap-2 min-w-[72px] p-3 rounded-xl bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-neutral-700 hover:bg-slate-300 dark:hover:bg-neutral-700 transition-colors">
                            <span className="material-symbols-outlined">compost</span>
                            <span className="text-xs font-medium">Organic</span>
                        </button>
                        <button onClick={() => toast('Filtering by Glass...')} className="flex flex-col items-center gap-2 min-w-[72px] p-3 rounded-xl bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-neutral-700 hover:bg-slate-300 dark:hover:bg-neutral-700 transition-colors">
                            <span className="material-symbols-outlined">wine_bar</span>
                            <span className="text-xs font-medium">Glass</span>
                        </button>
                    </div>
                </section>

                {/* Incoming Batches */}
                <section className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">Incoming Batches</h2>
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-primary/30 text-accent-green">{batches.length} New</span>
                    </div>

                    {batches.length === 0 && (
                        <div className="bg-slate-200 dark:bg-neutral-800/50 rounded-xl p-8 border border-slate-300 dark:border-neutral-700 flex flex-col items-center justify-center text-center gap-2">
                            <span className="material-symbols-outlined text-4xl text-slate-400">check_circle</span>
                            <p className="text-slate-500 font-medium">All batches sorted for now.</p>
                        </div>
                    )}

                    {batches.map((batch) => (
                        <div key={batch.id} className="bg-slate-200 dark:bg-neutral-800 rounded-xl p-4 border border-slate-300 dark:border-neutral-700 flex flex-col gap-4 shadow-sm hover:border-primary/50 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="size-16 rounded-lg bg-neutral-300 dark:bg-neutral-700 flex-shrink-0 overflow-hidden">
                                    <img alt="Batch Sample" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" src={batch.img} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <p className="font-bold text-slate-900 dark:text-slate-100">Batch #{batch.id}</p>
                                        <span className="text-[10px] text-slate-500 dark:text-slate-400">{batch.time}</span>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{batch.source}</p>
                                    <p className="text-sm font-medium text-accent-green mt-1">{batch.weight}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleVerifyAndSort(batch.id)}
                                    className="flex-1 py-2.5 bg-primary hover:bg-primary-light active:scale-95 transition-all text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20"
                                >
                                    Verify & Sort
                                </button>
                                <button onClick={() => toast("Details opened.")} className="p-2.5 hover:bg-slate-400 bg-slate-300 dark:bg-neutral-700 text-slate-900 dark:text-slate-100 rounded-lg transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Blockchain Ledger Status */}
                <section className="bg-primary/10 border border-primary/30 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="size-8 rounded-full bg-primary/40 flex items-center justify-center">
                            <span className="material-symbols-outlined text-accent-green text-sm flex animate-pulse">hub</span>
                        </div>
                        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-200">Blockchain Ledger</h2>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600 dark:text-slate-400">Last Block Hash</span>
                            <span className="font-mono text-accent-green bg-accent-green/10 px-1 rounded">{lastHash}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600 dark:text-slate-400">Status</span>
                            <span className="flex items-center gap-1 text-accent-green">
                                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                Verified
                            </span>
                        </div>
                        <div className="p-2 bg-slate-200 dark:bg-black/20 rounded font-mono text-[10px] text-slate-600 dark:text-slate-500 break-all leading-relaxed border border-slate-300/50 dark:border-neutral-800">
                            {lastTxId}...
                        </div>
                    </div>
                </section>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-neutral-800 border-t border-neutral-300 dark:border-neutral-700 px-4 pb-6 pt-2 z-20">
                <div className="max-w-md mx-auto flex justify-between items-center">
                    <a onClick={(e) => e.preventDefault()} className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors cursor-pointer" href="#">
                        <span className="material-symbols-outlined">inbox</span>
                        <span className="text-[10px] font-medium">Inbox</span>
                    </a>
                    <a onClick={(e) => e.preventDefault()} className="flex flex-col items-center gap-1 text-primary dark:text-white" href="#">
                        <span className="material-symbols-outlined fill-icon">grid_view</span>
                        <span className="text-[10px] font-medium">Sorting</span>
                    </a>
                    <a onClick={(e) => { e.preventDefault(); toast("Ledger Synced!"); }} className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors cursor-pointer" href="#">
                        <span className="material-symbols-outlined">account_balance_wallet</span>
                        <span className="text-[10px] font-medium">Ledger</span>
                    </a>
                    <a onClick={(e) => e.preventDefault()} className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors cursor-pointer" href="#">
                        <span className="material-symbols-outlined">person</span>
                        <span className="text-[10px] font-medium">Profile</span>
                    </a>
                </div>
            </nav>
        </div>
    );
}

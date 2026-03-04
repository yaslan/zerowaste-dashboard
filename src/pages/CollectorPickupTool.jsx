import React from 'react';

export default function CollectorPickupTool() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
            {/* Header */}
            <header className="flex items-center bg-background-light dark:bg-background-dark p-4 justify-between border-b border-primary/20 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-primary text-slate-100 p-2 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined">local_shipping</span>
                    </div>
                    <div>
                        <h1 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">Waste Collector</h1>
                        <p className="text-primary dark:text-primary/80 text-xs font-medium uppercase tracking-wider">Unit #402 • Active</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary dark:text-slate-100">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <button className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary dark:text-slate-100">
                        <span className="material-symbols-outlined">account_circle</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-24">
                {/* Active Route Map Section */}
                <div className="p-4">
                    <div className="relative group h-48 w-full rounded-xl overflow-hidden border border-primary/20 bg-slate-200 dark:bg-slate-800">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQJCu7JE26V-rS4u-rxHsJEYzZnJ8FvshSDm9YhNBlpeR6KbF9ARfBNQfpgxS4nRTd77SvPB6DrZ3xZfsm7kvYLvt4uSMDkUWMFR5KjR28jjltA5uf-bMITlKSjkiTUDbYNvzDPPHXAZ5mBztuLqx2gBV0BoyWJ37wFCc6_DgCX_LqDQG_ULC-8kgwS2mrXxKRguW-odCQslXdP4KtDhmKzSo-An0Wt3TFZ7iNP5mEo6A9v8bsJNL8JEGdlfUg3ILiiV08GB2DQYo')` }}
                        ></div>
                        <div className="absolute top-3 left-3 bg-background-dark/80 backdrop-blur px-3 py-1.5 rounded-lg border border-primary/30 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-green-500">navigation</span>
                            <span className="text-xs font-bold text-white uppercase">Route Active</span>
                        </div>
                        <div className="absolute bottom-3 right-3">
                            <button className="bg-primary text-white p-3 rounded-full shadow-xl flex items-center justify-center">
                                <span className="material-symbols-outlined">my_location</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scan & Log Actions */}
                <div className="px-4 py-2 grid grid-cols-1 gap-4">
                    {/* Scan QR Button - High Contrast */}
                    <button className="flex items-center justify-center gap-4 bg-primary text-white p-6 rounded-xl shadow-lg active:scale-95 transition-transform">
                        <span className="material-symbols-outlined !text-4xl">qr_code_scanner</span>
                        <div className="text-left">
                            <p className="text-xl font-bold">Scan Bin QR</p>
                            <p className="text-sm opacity-80">Identify customer & waste type</p>
                        </div>
                    </button>

                    {/* Log Weight Input Section */}
                    <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-4 rounded-xl">
                        <label className="block text-sm font-semibold mb-2 text-primary dark:text-slate-300 uppercase tracking-tight">Manual Weight Entry (KG)</label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/60">scale</span>
                                <input className="w-full bg-white dark:bg-slate-900 border-2 border-primary/20 rounded-lg py-4 pl-10 pr-4 text-2xl font-bold focus:border-primary outline-none text-slate-900 dark:text-slate-100" placeholder="00.00" type="number" />
                            </div>
                            <button className="bg-primary/20 hover:bg-primary/30 text-primary dark:text-slate-100 px-6 font-bold rounded-lg border border-primary/30">
                                LOG
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scheduled Pickups List */}
                <div className="px-4 mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold">Scheduled Pickups</h2>
                        <span className="bg-primary/20 text-primary dark:text-slate-300 text-xs font-bold px-2 py-1 rounded">8 REMAINING</span>
                    </div>

                    <div className="space-y-3">
                        {/* Active Item */}
                        <div className="flex items-center gap-4 bg-primary/10 dark:bg-primary/20 border-l-4 border-primary p-4 rounded-lg">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold text-primary dark:text-primary uppercase tracking-widest">In Progress</span>
                                    <div className="size-2 rounded-full bg-primary animate-pulse"></div>
                                </div>
                                <p className="text-slate-900 dark:text-slate-100 text-base font-bold">1248 Oakwood St.</p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Industrial Waste • 2 Large Bins</p>
                            </div>
                            <button className="flex size-10 items-center justify-center rounded-full bg-primary text-white">
                                <span className="material-symbols-outlined">directions</span>
                            </button>
                        </div>

                        {/* Upcoming Items */}
                        <div className="flex items-center gap-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 rounded-lg">
                            <div className="flex-1">
                                <p className="text-slate-900 dark:text-slate-100 text-base font-semibold">902 Pine Avenue</p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Residential • 1 Standard Bin</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-slate-400">NEXT</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 rounded-lg opacity-80">
                            <div className="flex-1">
                                <p className="text-slate-900 dark:text-slate-100 text-base font-semibold">Community Park A</p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Recycling Center • 4 Bins</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Navigation Bar */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-background-dark border-t border-slate-200 dark:border-primary/20 px-4 pb-6 pt-2 z-20">
                <div className="flex gap-2">
                    <a className="flex flex-1 flex-col items-center justify-center gap-1 text-primary" href="#">
                        <span className="material-symbols-outlined !text-[28px] fill-[1]">map</span>
                        <p className="text-xs font-bold leading-normal tracking-wide">Route</p>
                    </a>
                    <a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 dark:text-slate-500" href="#">
                        <span className="material-symbols-outlined !text-[28px]">history</span>
                        <p className="text-xs font-medium leading-normal tracking-wide">History</p>
                    </a>
                    <a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 dark:text-slate-500" href="#">
                        <span className="material-symbols-outlined !text-[28px]">bar_chart</span>
                        <p className="text-xs font-medium leading-normal tracking-wide">Reports</p>
                    </a>
                    <a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 dark:text-slate-500" href="#">
                        <span className="material-symbols-outlined !text-[28px]">person</span>
                        <p className="text-xs font-medium leading-normal tracking-wide">Profile</p>
                    </a>
                </div>
            </nav>
        </div>
    );
}

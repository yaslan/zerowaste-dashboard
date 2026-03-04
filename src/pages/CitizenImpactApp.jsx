import React from 'react';

export default function CitizenImpactApp() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-10 flex items-center bg-background-light dark:bg-background-dark p-4 border-b border-primary/10 dark:border-primary/20 justify-between">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8"
                        style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBSEscCNNFfm9NedeOxqPZRHX9yHMRVMv2uIRcCuDO_ndbKmz3b-ouYidcv1ewz2MYFrulnHau-91W3-1V6UMDimixBvNsmuIIIJElx_YghO0B4itfplPClalKclOJFvqh-a_hXTOgm9-HvzRDs7gcPMhp659cCdr4A50SwoFXq0rUxfsBarjNQDtCMvbguX9GLM1aHa76PwO4GT21K5sInKRFmHJm41hifZ4i_zTw15-AEp2iKBajlYO-2n6WmVFIV40_MbBZHv18")` }}
                    ></div>
                </div>
                <h1 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 ml-3 font-display">Zero Waste</h1>
                <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-primary/10 dark:bg-primary/20 text-primary dark:text-slate-100">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-24">
                {/* Impact Stats */}
                <div className="grid grid-cols-2 gap-4 p-4">
                    <div className="flex flex-col gap-2 rounded-xl p-5 bg-primary/5 dark:bg-primary/20 border border-primary/10">
                        <div className="flex items-center gap-2 text-primary dark:text-emerald-400">
                            <span className="material-symbols-outlined text-sm">recycling</span>
                            <p className="text-sm font-medium">Recycled</p>
                        </div>
                        <p className="text-slate-900 dark:text-slate-100 text-2xl font-bold font-display">45.2 kg</p>
                        <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold">+15% this month</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-xl p-5 bg-primary/5 dark:bg-primary/20 border border-primary/10">
                        <div className="flex items-center gap-2 text-primary dark:text-emerald-400">
                            <span className="material-symbols-outlined text-sm">co2</span>
                            <p className="text-sm font-medium">Carbon Saved</p>
                        </div>
                        <p className="text-slate-900 dark:text-slate-100 text-2xl font-bold font-display">12.5 kg</p>
                        <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold">+8% this month</p>
                    </div>
                </div>

                {/* Wallet Card */}
                <div className="px-4 py-2 @container">
                    <div className="relative overflow-hidden flex flex-col items-stretch justify-start rounded-xl shadow-lg bg-primary text-slate-100 p-6">
                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl"></div>
                        <div className="relative z-10 flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                    <p className="text-emerald-200/80 text-xs font-medium uppercase tracking-wider">EcoToken Wallet</p>
                                    <h3 className="text-2xl font-bold mt-1 font-display">1,240.00 ETK</h3>
                                </div>
                                <span className="material-symbols-outlined text-emerald-300">account_balance_wallet</span>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex flex-col">
                                    <p className="text-emerald-200/60 text-[10px] uppercase">Wallet Address</p>
                                    <p className="text-xs font-mono opacity-80">0x7a...E42d</p>
                                </div>
                                <button className="flex items-center justify-center rounded-lg h-9 px-4 bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-400 transition-colors">
                                    <span>Redeem</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* QR Code Button */}
                <div className="flex px-4 py-6">
                    <button className="flex w-full items-center justify-center rounded-xl h-14 bg-primary dark:bg-primary text-white gap-3 shadow-md hover:opacity-90 active:scale-[0.98] transition-all">
                        <span className="material-symbols-outlined">qr_code_2</span>
                        <span className="text-base font-bold font-display">My Pickup QR Code</span>
                    </button>
                </div>

                {/* Recent Activity Log */}
                <div className="px-4 pb-4">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold font-display">Recent Activity</h3>
                        <button className="text-primary dark:text-emerald-400 text-sm font-semibold">See All</button>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-primary/10 border border-primary/5 dark:border-primary/20">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                                <span className="material-symbols-outlined">check_circle</span>
                            </div>
                            <div className="flex flex-1 flex-col">
                                <p className="text-slate-900 dark:text-slate-100 text-sm font-bold">Plastic & Glass Pickup</p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="material-symbols-outlined text-[14px] text-emerald-500">verified_user</span>
                                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Smart Contract: Verified</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-slate-900 dark:text-slate-100 text-sm font-bold">+12 ETK</p>
                                <p className="text-slate-400 text-[10px]">Today, 10:24 AM</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-primary/10 border border-primary/5 dark:border-primary/20">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                                <span className="material-symbols-outlined">check_circle</span>
                            </div>
                            <div className="flex flex-1 flex-col">
                                <p className="text-slate-900 dark:text-slate-100 text-sm font-bold">Organic Waste Deposit</p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="material-symbols-outlined text-[14px] text-emerald-500">verified_user</span>
                                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Smart Contract: Verified</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-slate-900 dark:text-slate-100 text-sm font-bold">+5 ETK</p>
                                <p className="text-slate-400 text-[10px]">Yesterday</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-primary/10 border border-primary/5 dark:border-primary/20">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                                <span className="material-symbols-outlined">check_circle</span>
                            </div>
                            <div className="flex flex-1 flex-col">
                                <p className="text-slate-900 dark:text-slate-100 text-sm font-bold">Paper Recycling Milestone</p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="material-symbols-outlined text-[14px] text-emerald-500">verified_user</span>
                                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Smart Contract: Verified</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-slate-900 dark:text-slate-100 text-sm font-bold">+50 ETK</p>
                                <p className="text-slate-400 text-[10px]">2 days ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Navigation Bar */}
            <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-primary/10 dark:border-primary/20 bg-background-light dark:bg-background-dark pb-6 pt-2">
                <div className="flex items-center justify-around px-2">
                    <a className="flex flex-1 flex-col items-center gap-1 text-primary dark:text-emerald-400" href="#">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                        <p className="text-[10px] font-bold">Home</p>
                    </a>
                    <a className="flex flex-1 flex-col items-center gap-1 text-slate-400 dark:text-slate-500" href="#">
                        <span className="material-symbols-outlined">analytics</span>
                        <p className="text-[10px] font-medium">Impact</p>
                    </a>
                    <a className="flex flex-1 flex-col items-center gap-1 text-slate-400 dark:text-slate-500" href="#">
                        <span className="material-symbols-outlined">wallet</span>
                        <p className="text-[10px] font-medium">Wallet</p>
                    </a>
                    <a className="flex flex-1 flex-col items-center gap-1 text-slate-400 dark:text-slate-500" href="#">
                        <span className="material-symbols-outlined">person</span>
                        <p className="text-[10px] font-medium">Profile</p>
                    </a>
                </div>
            </nav>
        </div>
    );
}

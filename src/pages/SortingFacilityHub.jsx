import React from 'react';

export default function SortingFacilityHub() {
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
                                <span className="size-2 rounded-full bg-accent-green"></span>
                                <p className="text-xs font-medium text-slate-400">Active • Syncing</p>
                            </div>
                        </div>
                    </div>
                    <button className="p-2 rounded-lg bg-neutral-800 text-slate-100 hover:bg-neutral-700">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 max-w-md mx-auto w-full p-4 space-y-6 pb-24">
                {/* Throughput Stats */}
                <section className="grid grid-cols-2 gap-4">
                    <div className="bg-neutral-800 bg-slate-200 dark:bg-neutral-800 rounded-xl p-4 border border-neutral-700">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Today's Volume</p>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">1,240</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">kg</span>
                        </div>
                        <div className="mt-3 h-1.5 w-full bg-neutral-300 dark:bg-neutral-700 rounded-full overflow-hidden">
                            <div className="h-full bg-accent-green" style={{ width: '82%' }}></div>
                        </div>
                        <p className="text-[10px] mt-2 text-slate-500 dark:text-slate-400">82% of daily target</p>
                    </div>
                    <div className="bg-slate-200 dark:bg-neutral-800 rounded-xl p-4 border border-neutral-700">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">System Load</p>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">Optimal</span>
                        </div>
                        <div className="mt-3 flex gap-1">
                            <div className="h-4 w-1.5 bg-accent-green rounded-full"></div>
                            <div className="h-4 w-1.5 bg-accent-green rounded-full"></div>
                            <div className="h-4 w-1.5 bg-accent-green rounded-full"></div>
                            <div className="h-4 w-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full"></div>
                        </div>
                        <p className="text-[10px] mt-2 text-accent-green">+ 12% Efficient</p>
                    </div>
                </section>

                {/* Category Quick Sort */}
                <section>
                    <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Material Category</h2>
                    <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
                        <button className="flex flex-col items-center gap-2 min-w-[72px] p-3 rounded-xl bg-primary text-white border border-primary">
                            <span className="material-symbols-outlined">recycling</span>
                            <span className="text-xs font-medium">Plastic</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 min-w-[72px] p-3 rounded-xl bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-neutral-700">
                            <span className="material-symbols-outlined">precision_manufacturing</span>
                            <span className="text-xs font-medium">Metal</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 min-w-[72px] p-3 rounded-xl bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-neutral-700">
                            <span className="material-symbols-outlined">compost</span>
                            <span className="text-xs font-medium">Organic</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 min-w-[72px] p-3 rounded-xl bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-neutral-700">
                            <span className="material-symbols-outlined">wine_bar</span>
                            <span className="text-xs font-medium">Glass</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 min-w-[72px] p-3 rounded-xl bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-neutral-700">
                            <span className="material-symbols-outlined">description</span>
                            <span className="text-xs font-medium">Paper</span>
                        </button>
                    </div>
                </section>

                {/* Incoming Batches */}
                <section className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">Incoming Batches</h2>
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-primary/30 text-accent-green">3 New</span>
                    </div>

                    {/* Batch Card 1 */}
                    <div className="bg-slate-200 dark:bg-neutral-800 rounded-xl p-4 border border-slate-300 dark:border-neutral-700 flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                            <div className="size-16 rounded-lg bg-neutral-300 dark:bg-neutral-700 flex-shrink-0 overflow-hidden">
                                <img alt="Batch Sample" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwmvUDssXU1OftR7lp9aDKH1IRAxSggUOqRMFkBZzp_MtbJK6S_7L4_yP4LasVNvcTrLKGRIYYvX3DWsyXb3O-TgpjmJf6DgBeoIlfAEcLYHoSVVFPaxV88UqAwCC9YCpPkKL_IkTJiy3fZIVqxMJssLBUZbGZYO0CkN6idtatmr5h3Aq3ofJGhav9ma66-tX_rJmmukhqU5RmXGItMEiVA3DXcq4bwRhtkI0XUjpOVZLksXQ852mI_wd4zktfwloWfpDGkYGYmZE" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <p className="font-bold text-slate-900 dark:text-slate-100">Batch #BX-9921</p>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400">2 min ago</span>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">City Collector A</p>
                                <p className="text-sm font-medium text-accent-green mt-1">450.5 kg</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20">
                                Verify & Sort
                            </button>
                            <button className="p-2.5 bg-slate-300 dark:bg-neutral-700 text-slate-900 dark:text-slate-100 rounded-lg">
                                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                            </button>
                        </div>
                    </div>

                    {/* Batch Card 2 */}
                    <div className="bg-slate-200/50 dark:bg-neutral-800/50 rounded-xl p-4 border border-slate-300/50 dark:border-neutral-700/50 flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                            <div className="size-16 rounded-lg bg-neutral-300 dark:bg-neutral-700 flex-shrink-0 overflow-hidden opacity-80">
                                <img alt="Batch Sample" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQLoS4ksadUOEl_PUlIvHJ1sL-seM4tOx8IfDk__zLB6h9Io2YP51ugEacUFcs-tZ-CyLIly0XzK0y_WUKqWk6GvrAamVYHjzaMcD162yVxKHfuov5ZdIS_ZUitHvkzmuV2X5jKAGXeiblGZ_xKo1N9wxF4dqAsZ8sr2wInOKmPz6N-9s2-F_672uU2NyjYKWSz1sUrGHTnxKS5AR9-kcERLIrjNZwbStLGezT3XAYHxK9mXAo0m3FgA06Nnf0t38byS9eDjV628Q" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <p className="font-bold text-slate-900 dark:text-slate-100">Batch #BX-9918</p>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400">14 min ago</span>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">District Hauler #4</p>
                                <p className="text-sm font-medium text-accent-green mt-1">128.0 kg</p>
                            </div>
                        </div>
                        <button className="w-full py-2.5 bg-slate-300 dark:bg-neutral-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-bold">
                            Verify & Sort
                        </button>
                    </div>
                </section>

                {/* Blockchain Ledger Status */}
                <section className="bg-primary/10 border border-primary/30 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="size-8 rounded-full bg-primary/40 flex items-center justify-center">
                            <span className="material-symbols-outlined text-accent-green text-sm">hub</span>
                        </div>
                        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-200">Blockchain Ledger</h2>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600 dark:text-slate-400">Last Block Hash</span>
                            <span className="font-mono text-accent-green">0x7f2...e49a</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600 dark:text-slate-400">Status</span>
                            <span className="flex items-center gap-1 text-accent-green">
                                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                Verified
                            </span>
                        </div>
                        <div className="p-2 bg-slate-200 dark:bg-black/20 rounded font-mono text-[10px] text-slate-600 dark:text-slate-500 break-all leading-relaxed">
                            tx_id: 88294-f823-99b2-c010-33291...
                        </div>
                    </div>
                </section>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-neutral-800 border-t border-neutral-300 dark:border-neutral-700 px-4 pb-6 pt-2">
                <div className="max-w-md mx-auto flex justify-between items-center">
                    <a className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400" href="#">
                        <span className="material-symbols-outlined">inbox</span>
                        <span className="text-[10px] font-medium">Inbox</span>
                    </a>
                    <a className="flex flex-col items-center gap-1 text-primary dark:text-white" href="#">
                        <span className="material-symbols-outlined fill-icon">grid_view</span>
                        <span className="text-[10px] font-medium">Sorting</span>
                    </a>
                    <a className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400" href="#">
                        <span className="material-symbols-outlined">account_balance_wallet</span>
                        <span className="text-[10px] font-medium">Ledger</span>
                    </a>
                    <a className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400" href="#">
                        <span className="material-symbols-outlined">person</span>
                        <span className="text-[10px] font-medium">Profile</span>
                    </a>
                </div>
            </nav>
        </div>
    );
}

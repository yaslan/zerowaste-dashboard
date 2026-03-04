import React from 'react';

export default function RecyclingFacilityLog() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                {/* Top Navigation Bar */}
                <header className="flex items-center justify-between border-b border-primary/20 bg-background-light dark:bg-background-dark px-6 py-4 lg:px-10">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3 text-primary dark:text-slate-100">
                            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">recycling</span>
                            </div>
                            <h2 className="text-lg font-bold leading-tight tracking-tight">RecycleChain Dashboard</h2>
                        </div>
                        <div className="hidden md:flex items-center">
                            <label className="flex items-center bg-slate-200 dark:bg-primary/20 rounded-lg px-3 py-1.5 focus-within:ring-2 ring-primary">
                                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 mr-2">search</span>
                                <input className="bg-transparent border-none focus:ring-0 text-sm w-64 placeholder:text-slate-500 dark:placeholder:text-slate-400" placeholder="Search facilities, batches..." type="text" />
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-200 dark:bg-primary/30 text-slate-700 dark:text-slate-100">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-200 dark:bg-primary/30 text-slate-700 dark:text-slate-100">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                        <div className="flex items-center gap-3 border-l border-primary/20 pl-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold">Admin User</p>
                                <p className="text-[10px] text-slate-500">Facility #102</p>
                            </div>
                            <div className="bg-slate-300 dark:bg-primary size-10 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex flex-1 flex-col lg:flex-row">
                    {/* Sidebar Navigation */}
                    <aside className="w-full lg:w-64 border-r border-primary/10 bg-background-light dark:bg-background-dark p-4 flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Main Menu</h3>
                            <nav className="flex flex-col gap-1">
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white" href="#">
                                    <span className="material-symbols-outlined">dashboard</span>
                                    <span className="text-sm font-medium">Overview</span>
                                </a>
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-primary/10 transition-colors" href="#">
                                    <span className="material-symbols-outlined">input</span>
                                    <span className="text-sm font-medium">Intake Log</span>
                                </a>
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-primary/10 transition-colors" href="#">
                                    <span className="material-symbols-outlined">inventory_2</span>
                                    <span className="text-sm font-medium">Batch Management</span>
                                </a>
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-primary/10 transition-colors" href="#">
                                    <span className="material-symbols-outlined">account_balance_wallet</span>
                                    <span className="text-sm font-medium">Blockchain Assets</span>
                                </a>
                            </nav>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Settings</h3>
                            <nav className="flex flex-col gap-1">
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-primary/10 transition-colors" href="#">
                                    <span className="material-symbols-outlined">analytics</span>
                                    <span className="text-sm font-medium">Reports</span>
                                </a>
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-primary/10 transition-colors" href="#">
                                    <span className="material-symbols-outlined">help_center</span>
                                    <span className="text-sm font-medium">Support</span>
                                </a>
                            </nav>
                        </div>
                        <div className="mt-auto p-4 bg-primary/5 rounded-xl border border-primary/10">
                            <p className="text-xs font-bold text-primary dark:text-slate-200">Facility Health</p>
                            <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[85%]"></div>
                            </div>
                            <p className="mt-1 text-[10px] text-slate-500">85% Processing Efficiency</p>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto max-h-[calc(100vh-73px)]">
                        {/* Header & Actions */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">Facility Alpha Overview</h1>
                                <p className="text-slate-500 text-sm">Real-time recycling throughput and blockchain status.</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20">
                                    <span className="material-symbols-outlined text-lg">add</span>
                                    Process Batch
                                </button>
                                <div className="flex items-center gap-3 px-4 py-2 bg-slate-200 dark:bg-primary/20 rounded-lg border border-primary/20">
                                    <span className="text-xs font-bold uppercase text-slate-500">Auto-Release Tokens</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input defaultChecked className="sr-only peer" type="checkbox" />
                                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-primary/10 p-5 rounded-xl border border-slate-200 dark:border-primary/20">
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Intake</p>
                                <h3 className="text-2xl font-bold mt-1">124.5 <span className="text-sm font-normal text-slate-500">Tons</span></h3>
                                <div className="flex items-center mt-2 text-emerald-500 gap-1 text-sm font-medium">
                                    <span className="material-symbols-outlined text-sm">trending_up</span>
                                    12% from last week
                                </div>
                            </div>
                            <div className="bg-white dark:bg-primary/10 p-5 rounded-xl border border-slate-200 dark:border-primary/20">
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pending Verification</p>
                                <h3 className="text-2xl font-bold mt-1">4,200 <span className="text-sm font-normal text-slate-500">RCT</span></h3>
                                <div className="flex items-center mt-2 text-amber-500 gap-1 text-sm font-medium">
                                    <span className="material-symbols-outlined text-sm">pending</span>
                                    3 batches waiting
                                </div>
                            </div>
                            <div className="bg-white dark:bg-primary/10 p-5 rounded-xl border border-slate-200 dark:border-primary/20">
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Blockchain Nodes</p>
                                <h3 className="text-2xl font-bold mt-1">Active</h3>
                                <div className="flex items-center mt-2 text-emerald-500 gap-1 text-sm font-medium">
                                    <span className="material-symbols-outlined text-sm">check_circle</span>
                                    Syncing @ Block 12.4M
                                </div>
                            </div>
                            <div className="bg-white dark:bg-primary/10 p-5 rounded-xl border border-slate-200 dark:border-primary/20">
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Batches</p>
                                <h3 className="text-2xl font-bold mt-1">12</h3>
                                <div className="flex items-center mt-2 text-rose-500 gap-1 text-sm font-medium">
                                    <span className="material-symbols-outlined text-sm">trending_down</span>
                                    -2% vs average
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Bulk Intake Log Table */}
                            <div className="lg:col-span-2 flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-bold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">list_alt</span>
                                        Bulk Intake Log
                                    </h2>
                                    <button className="text-primary dark:text-slate-300 text-sm font-medium hover:underline">View All Log</button>
                                </div>
                                <div className="bg-white dark:bg-background-dark/50 border border-slate-200 dark:border-primary/20 rounded-xl overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-slate-50 dark:bg-primary/20 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-primary/20 uppercase text-[10px]">
                                                <tr>
                                                    <th className="px-6 py-3">Source</th>
                                                    <th className="px-6 py-3">Waste Type</th>
                                                    <th className="px-6 py-3">Weight (kg)</th>
                                                    <th className="px-6 py-3">Timestamp</th>
                                                    <th className="px-6 py-3 text-right">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-primary/10">
                                                <tr className="hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors">
                                                    <td className="px-6 py-4 font-medium">GreenCity Muni</td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-[11px] font-bold">PLASTIC</span>
                                                    </td>
                                                    <td className="px-6 py-4">1,200</td>
                                                    <td className="px-6 py-4 text-slate-500">10:30 AM</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-[11px] font-bold">PENDING</span>
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors">
                                                    <td className="px-6 py-4 font-medium">EcoCorp Industrial</td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-[11px] font-bold">METAL</span>
                                                    </td>
                                                    <td className="px-6 py-4">3,500</td>
                                                    <td className="px-6 py-4 text-slate-500">09:15 AM</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="px-2.5 py-1 bg-primary/20 text-primary dark:text-slate-200 rounded-full text-[11px] font-bold uppercase">Processing</span>
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors">
                                                    <td className="px-6 py-4 font-medium">BioClean Solutions</td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-[11px] font-bold uppercase">Organic</span>
                                                    </td>
                                                    <td className="px-6 py-4">850</td>
                                                    <td className="px-6 py-4 text-slate-500">08:45 AM</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-[11px] font-bold uppercase">Verified</span>
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors">
                                                    <td className="px-6 py-4 font-medium">Urban Renew</td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-[11px] font-bold uppercase">Glass</span>
                                                    </td>
                                                    <td className="px-6 py-4">2,100</td>
                                                    <td className="px-6 py-4 text-slate-500">07:30 AM</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-[11px] font-bold uppercase">Verified</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Notifications Panel */}
                            <div className="flex flex-col gap-4">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">history_edu</span>
                                    Contracts Executed
                                </h2>
                                <div className="space-y-3">
                                    <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-xl p-4 flex gap-4">
                                        <div className="shrink-0 size-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                                            <span className="material-symbols-outlined">receipt_long</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-sm font-bold truncate">Contract #882-VER</h4>
                                                <span className="text-[10px] text-slate-400">2m ago</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">Token release for GreenCity Muni batch 002. 450 RCT minted.</p>
                                            <div className="mt-2 flex items-center gap-2 text-[10px] text-primary dark:text-slate-300 font-mono">
                                                <span className="material-symbols-outlined text-[12px]">link</span>
                                                0x72a...f41
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-xl p-4 flex gap-4 opacity-80">
                                        <div className="shrink-0 size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                            <span className="material-symbols-outlined">receipt_long</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-sm font-bold truncate">Contract #881-VER</h4>
                                                <span className="text-[10px] text-slate-400">1h ago</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">Bulk verification completed for 3 sources. 1,200 RCT minted.</p>
                                            <div className="mt-2 flex items-center gap-2 text-[10px] text-primary dark:text-slate-300 font-mono">
                                                <span className="material-symbols-outlined text-[12px]">link</span>
                                                0x91b...e92
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-xl p-4 flex gap-4 opacity-60">
                                        <div className="shrink-0 size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                            <span className="material-symbols-outlined">receipt_long</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-sm font-bold truncate">Contract #880-GEN</h4>
                                                <span className="text-[10px] text-slate-400">4h ago</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">Origin certificate generated for Urban Renew batch.</p>
                                            <div className="mt-2 flex items-center gap-2 text-[10px] text-primary dark:text-slate-300 font-mono">
                                                <span className="material-symbols-outlined text-[12px]">link</span>
                                                0x44c...a31
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors border-2 border-dashed border-slate-200 dark:border-primary/20 rounded-xl">
                                        Load Full Audit Trail
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Operational Map/Location Section */}
                        <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 overflow-hidden relative">
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold">Facility Active Nodes</h3>
                                    <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                                        Currently monitoring 4 collection points and 2 logistics units within a 50-mile radius.
                                        All IoT sensors are broadcasting waste telemetry to the main chain.
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="size-3 rounded-full bg-emerald-500"></div>
                                            <span className="text-xs font-medium">Node 01 - Online</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="size-3 rounded-full bg-emerald-500"></div>
                                            <span className="text-xs font-medium">Node 02 - Online</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="size-3 rounded-full bg-amber-500"></div>
                                            <span className="text-xs font-medium">Logistic Hub 01 - Syncing</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-80 h-48 rounded-xl bg-slate-200 dark:bg-primary/30 border border-primary/20 flex items-center justify-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-primary/20 opacity-40 mix-blend-overlay"></div>
                                    <span className="material-symbols-outlined text-4xl text-primary/50 group-hover:scale-110 transition-transform">map</span>
                                    <div className="absolute bottom-2 right-2 bg-white/90 dark:bg-black/90 px-2 py-1 rounded text-[10px] font-bold">
                                        VIEW MAP
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useWasteStore from '../store/useWasteStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

export default function RecyclingFacilityLog() {
    const [autoRelease, setAutoRelease] = React.useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const batches = useWasteStore(state => state.batches);
    const processPending = useWasteStore(state => state.processPending);
    const totalRecycledTons = useWasteStore(state => state.totalRecycledTons);

    // Filter batches by search
    const filteredBatches = useMemo(() =>
        batches.filter(b =>
            !searchQuery ||
            b.source?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.id?.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        [batches, searchQuery]
    );

    // Dynamically compute intake by type from batches
    const typeData = useMemo(() => {
        const acc = { Plastic: 0, Metal: 0, Organic: 0, Glass: 0 };
        batches.forEach(b => {
            const t = b.type?.toUpperCase?.() || '';
            if (t.includes('PLASTIC')) acc.Plastic += b.weight;
            else if (t.includes('METAL')) acc.Metal += b.weight;
            else if (t.includes('ORGANIC') || t.includes('ORG')) acc.Organic += b.weight;
            else if (t.includes('GLASS')) acc.Glass += b.weight;
            else acc.Plastic += b.weight; // fallback
        });
        return [
            { type: 'Plastic', amount: acc.Plastic },
            { type: 'Metal', amount: acc.Metal },
            { type: 'Organic', amount: acc.Organic },
            { type: 'Glass', amount: acc.Glass },
        ];
    }, [batches]);

    const handleProcessBatch = () => {
        const hasPending = batches.some(b => b.status === 'PENDING');
        if (!hasPending) {
            toast('No pending batches to process!', { icon: 'ℹ️' });
            return;
        }

        const processToast = toast.loading('Processing pending batches...');

        setTimeout(() => {
            processPending();
            toast.success('Batches successfully sent to processing pipeline.', { id: processToast });
        }, 1500);
    };

    const handleAutoReleaseToggle = () => {
        setAutoRelease(!autoRelease);
        if (!autoRelease) {
            toast.success('Auto-Release Tokens Enabled');
        } else {
            toast('Auto-Release Tokens Disabled', { icon: '🔒' });
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-800 dark:text-slate-100 transition-colors duration-300">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                {/* Top Navigation Bar */}
                <header className="flex items-center justify-between border-b border-primary/20 bg-background-light dark:bg-background-dark px-6 py-4 lg:px-10 z-10 sticky top-0">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3 text-primary dark:text-slate-800 dark:text-slate-100">
                            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">recycling</span>
                            </div>
                            <h2 className="text-lg font-bold leading-tight tracking-tight">RecycleChain Dashboard</h2>
                        </div>
                        <div className="hidden md:flex items-center">
                            <label className="flex items-center bg-slate-200 dark:bg-primary/20 rounded-lg px-3 py-1.5 focus-within:ring-2 ring-primary">
                                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 mr-2">search</span>
                                <input
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="bg-transparent border-none focus:ring-0 text-sm w-64 placeholder:text-slate-500 dark:placeholder:text-slate-500 dark:text-slate-400"
                                    placeholder="Search batches, types..."
                                    type="text"
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white">
                                        <span className="material-symbols-outlined text-sm">close</span>
                                    </button>
                                )}
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => toast('No new notifications')} className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-200 dark:bg-primary/30 text-slate-700 dark:text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-primary/50 transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button onClick={() => toast('Settings opened')} className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-200 dark:bg-primary/30 text-slate-700 dark:text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-primary/50 transition-colors">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                        <div className="flex items-center gap-3 border-l border-primary/20 pl-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold">Admin User</p>
                                <p className="text-[10px] text-slate-500">Facility #102</p>
                            </div>
                            <Link to="/" className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-200 dark:bg-primary/30 text-slate-700 dark:text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-primary/50 transition-colors" title="Back to Home">
                                <span className="material-symbols-outlined">home</span>
                            </Link>
                            <div className="bg-slate-300 dark:bg-primary size-10 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex flex-1 flex-col lg:flex-row">
                    {/* Sidebar Navigation */}
                    <aside className="w-full lg:w-64 border-r border-primary/10 bg-background-light dark:bg-background-dark p-4 flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Main Menu</h3>
                            <nav className="flex flex-col gap-1">
                                {[
                                    { id: 'overview', icon: 'dashboard', label: 'Overview' },
                                    { id: 'intake', icon: 'input', label: 'Intake Log' },
                                    { id: 'batches', icon: 'inventory_2', label: 'Batch Management' },
                                    { id: 'blockchain', icon: 'account_balance_wallet', label: 'Blockchain Assets' },
                                ].map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left w-full transition-colors ${activeTab === item.id
                                                ? 'bg-primary text-white'
                                                : 'text-slate-600 dark:text-slate-500 dark:text-slate-400 hover:bg-primary/10'
                                            }`}
                                    >
                                        <span className="material-symbols-outlined">{item.icon}</span>
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                        <div className="mt-auto p-4 bg-primary/5 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors cursor-pointer" onClick={() => toast.success('Sensors running optimally')}>
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
                                <button onClick={handleProcessBatch} className="flex items-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary-light active:scale-95 transition-all rounded-lg text-sm font-bold shadow-lg shadow-primary/20">
                                    <span className="material-symbols-outlined text-lg">add</span>
                                    Process Batch
                                </button>
                                <div className="flex items-center gap-3 px-4 py-2 bg-slate-200 dark:bg-primary/20 rounded-lg border border-primary/20">
                                    <span className="text-xs font-bold uppercase text-slate-500">Auto-Release Tokens</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input checked={autoRelease} onChange={handleAutoReleaseToggle} className="sr-only peer" type="checkbox" />
                                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-primary/10 p-5 rounded-xl border border-slate-200 dark:border-primary/20 hover:border-primary/50 transition-colors">
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Intake</p>
                                <h3 className="text-2xl font-bold mt-1">{totalRecycledTons.toLocaleString()} <span className="text-sm font-normal text-slate-500">Tons</span></h3>
                                <div className="flex items-center mt-2 text-emerald-500 gap-1 text-sm font-medium">
                                    <span className="material-symbols-outlined text-sm">trending_up</span>
                                    12% from last week
                                </div>
                            </div>
                            <div className="bg-white dark:bg-primary/10 p-5 rounded-xl border border-slate-200 dark:border-primary/20 hover:border-primary/50 transition-colors">
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pending Verification</p>
                                <h3 className="text-2xl font-bold mt-1">4,200 <span className="text-sm font-normal text-slate-500">RCT</span></h3>
                                <div className="flex items-center mt-2 text-amber-500 gap-1 text-sm font-medium">
                                    <span className="material-symbols-outlined text-sm animate-spin-slow">pending</span>
                                    {batches.filter(b => b.status === 'PENDING').length} batches waiting
                                </div>
                            </div>
                            <div className="bg-white dark:bg-primary/10 p-5 rounded-xl border border-slate-200 dark:border-primary/20 hover:border-primary/50 transition-colors">
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Blockchain Nodes</p>
                                <h3 className="text-2xl font-bold mt-1">Active</h3>
                                <div className="flex items-center mt-2 text-emerald-500 gap-1 text-sm font-medium">
                                    <span className="material-symbols-outlined text-sm animate-pulse">check_circle</span>
                                    Syncing @ Block 12.4M
                                </div>
                            </div>
                            <div className="bg-white dark:bg-primary/10 p-5 rounded-xl border border-slate-200 dark:border-primary/20 hover:border-primary/50 transition-colors">
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Batches</p>
                                <h3 className="text-2xl font-bold mt-1">{batches.length}</h3>
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
                                    <button onClick={() => toast('Opening full logs...')} className="text-primary dark:text-slate-600 dark:text-slate-300 text-sm font-medium hover:underline">View All</button>
                                </div>
                                <div className="bg-white dark:bg-background-light dark:bg-background-dark/50 border border-slate-200 dark:border-primary/20 rounded-xl overflow-hidden shadow-sm">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-slate-50 dark:bg-primary/20 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-primary/20 uppercase text-[10px]">
                                                <tr>
                                                    <th className="px-6 py-3">Source</th>
                                                    <th className="px-6 py-3">Waste Type</th>
                                                    <th className="px-6 py-3">Weight (kg)</th>
                                                    <th className="px-6 py-3 text-right">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-primary/10">
                                                {batches.map(batch => (
                                                    <tr key={batch.id} className="hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors group cursor-pointer" onClick={() => toast(`Viewing ${batch.id} details`)}>
                                                        <td className="px-6 py-4">
                                                            <div className="font-medium text-slate-900 dark:text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">{batch.source}</div>
                                                            <div className="text-xs text-slate-500">{batch.time}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2 py-1 rounded text-[11px] font-bold uppercase
                                                                ${batch.type === 'PLASTIC' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                                                                    batch.type === 'METAL' ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-600 dark:text-slate-300' :
                                                                        batch.type === 'Organic' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' :
                                                                            'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'}`}>
                                                                {batch.type}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 font-mono">{batch.weight}</td>
                                                        <td className="px-6 py-4 text-right">
                                                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase
                                                                ${batch.status === 'PENDING' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
                                                                    batch.status === 'Processing' ? 'bg-primary/20 text-primary dark:text-slate-200' :
                                                                        'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'}`}>
                                                                {batch.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Chart Column */}
                            <div className="lg:col-span-1 flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-bold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">bar_chart</span>
                                        Intake by Type
                                    </h2>
                                </div>
                                <div className="bg-white dark:bg-background-light dark:bg-background-dark/50 border border-slate-200 dark:border-primary/20 rounded-xl p-4 shadow-sm flex-1 flex flex-col justify-center min-h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={typeData} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.2} />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="type" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 'bold' }} />
                                            <RechartsTooltip cursor={{ fill: '#334155', opacity: 0.1 }} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} itemStyle={{ color: '#10b981', fontWeight: 'bold' }} />
                                            <Bar dataKey="amount" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

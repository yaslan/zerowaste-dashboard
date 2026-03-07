import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useWasteStore from '../store/useWasteStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function UserDashboard() {
    const user = useWasteStore(state => state.user);
    const userBalance = useWasteStore(state => state.userBalance);
    const transactions = useWasteStore(state => state.transactions || []);
    const logout = useWasteStore(state => state.logout);
    const batches = useWasteStore(state => state.batches || []);

    const [activeTab, setActiveTab] = useState('overview');
    const [darkMode, setDarkMode] = useState(false);
    const [showNewTopicModal, setShowNewTopicModal] = useState(false);
    const [newTopicTitle, setNewTopicTitle] = useState('');
    const [newTopicCategory, setNewTopicCategory] = useState('General Discussion');
    const [newTopicBody, setNewTopicBody] = useState('');

    const [forumPosts, setForumPosts] = useState([
        { title: "Which bin do I use for empty deodorant spray cans?", author: "Ahmet Y.", avatar: "A", time: "2 hours ago", replies: 4, upvotes: 12, tags: ["Sorting", "Metal"], isAnswered: true },
        { title: "Are pizza boxes recyclable if they have a little grease on them?", author: "Elif S.", avatar: "E", time: "5 hours ago", replies: 15, upvotes: 34, tags: ["Sorting", "Paper"], isAnswered: true },
        { title: "Smart Bin in Kad\u0131k\u00f6y Moda is full, how long until pickup?", author: "Can G.", avatar: "C", time: "1 day ago", replies: 1, upvotes: 3, tags: ["Smart Bin"], isAnswered: false },
        { title: "Suggestions for composting at home in a small apartment", author: "Zeynep T.", avatar: "Z", time: "2 days ago", replies: 8, upvotes: 21, tags: ["Compost", "Tips"], isAnswered: true },
    ]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    // Mock user-specific data filtering 
    const myPickups = batches.filter(b => b.source === 'Citizen App' || b.source === 'User Dashboard').slice(0, 5);
    const totalMyWeight = myPickups.reduce((sum, b) => sum + b.weight, 0);

    // Chart Data
    const impactData = [
        { name: 'Mon', recycled: 12 },
        { name: 'Tue', recycled: 15 },
        { name: 'Wed', recycled: 8 },
        { name: 'Thu', recycled: 22 },
        { name: 'Fri', recycled: 14 },
        { name: 'Sat', recycled: 30 },
        { name: 'Sun', recycled: 25 },
    ];

    const handleRequestPickup = (e) => {
        e.preventDefault();
        toast.success('Pickup request submitted successfully! Our team will contact you soon.');
    };

    return (
        <div className={`min-h-screen flex ${darkMode ? 'dark' : ''} bg-slate-50 dark:bg-slate-900 transition-colors font-display`}>
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden lg:flex flex-col text-slate-800 dark:text-slate-200">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="bg-emerald-500 rounded-xl p-2 group-hover:bg-emerald-400 transition-colors">
                            <span className="material-symbols-outlined text-white">recycling</span>
                        </div>
                        <span className="font-black text-xl tracking-tight">Zero<span className="text-emerald-500">Waste</span></span>
                    </Link>
                </div>

                <div className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <p className="px-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">My Panel</p>
                    {[
                        { id: 'overview', icon: 'home', label: 'Overview' },
                        { id: 'pickups', icon: 'local_shipping', label: 'My Pickups' },
                        { id: 'rewards', icon: 'redeem', label: 'Rewards & Tokens' },
                        { id: 'community', icon: 'group', label: 'Community' },
                        { id: 'map', icon: 'map', label: 'Drop-off Points' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === item.id
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                                : 'hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-400'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex items-center gap-3 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl mb-4">
                        <div className="size-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 overflow-hidden">
                            <span className="material-symbols-outlined text-[18px]">person</span>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold truncate text-slate-900 dark:text-white">{user?.email || 'Guest User'}</p>
                            <p className="text-[10px] text-slate-500">Eco Citizen</p>
                        </div>
                    </div>
                    <button onClick={() => { if (user) logout(); toast.success('Logged out successfully'); }} className="w-full flex items-center gap-3 px-4 py-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        {user ? 'Sign Out' : 'Sign In'}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                <header className="h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white capitalize">{activeTab.replace('-', ' ')}</h2>
                    <div className="flex items-center gap-4">
                        <button onClick={() => toast("You have 1 new message from City Hall")} className="relative text-slate-500 hover:text-emerald-500 transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute -top-1 -right-1 size-2 bg-rose-500 rounded-full"></span>
                        </button>
                        <button onClick={toggleDarkMode} className="text-slate-500 hover:text-emerald-500 transition-colors">
                            <span className="material-symbols-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span>
                        </button>
                        {/* Mobile menu toggle goes here */}
                    </div>
                </header>

                <div className="p-8 pb-20 max-w-7xl mx-auto w-full space-y-8">
                    {activeTab === 'overview' ? (
                        <>
                            {/* Greeting */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-black text-slate-900 dark:text-white">Welcome back, Eco Warrior! 🌱</h1>
                                    <p className="text-slate-500 dark:text-slate-400 mt-1">Here is your personal environmental impact summary.</p>
                                </div>
                                <button onClick={() => document.getElementById('pickup-form').scrollIntoView({ behavior: 'smooth' })} className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">add_circle</span> Request Pickup
                                </button>
                            </div>

                            {/* KPI Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                                    <div className="absolute right-[-20px] top-[-20px] text-emerald-500/10">
                                        <span className="material-symbols-outlined text-[120px]">account_balance_wallet</span>
                                    </div>
                                    <h3 className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-2 relative z-10">My EcoTokens Balance</h3>
                                    <div className="flex items-end gap-2 relative z-10">
                                        <span className="text-4xl font-black text-slate-900 dark:text-white">{userBalance.toFixed(0)}</span>
                                        <span className="text-emerald-500 font-bold mb-1 tracking-wider">ET</span>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                                    <div className="absolute right-[-20px] top-[-20px] text-blue-500/10">
                                        <span className="material-symbols-outlined text-[120px]">recycling</span>
                                    </div>
                                    <h3 className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-2 relative z-10">Total Recycled Volume</h3>
                                    <div className="flex items-end gap-2 relative z-10">
                                        <span className="text-4xl font-black text-slate-900 dark:text-white">{totalMyWeight > 0 ? totalMyWeight : 126.5}</span>
                                        <span className="text-blue-500 font-bold mb-1 tracking-wider">KG</span>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                                    <div className="absolute right-[-20px] top-[-20px] text-purple-500/10">
                                        <span className="material-symbols-outlined text-[120px]">co2</span>
                                    </div>
                                    <h3 className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-2 relative z-10">Carbon Offset Estimate</h3>
                                    <div className="flex items-end gap-2 relative z-10">
                                        <span className="text-4xl font-black text-slate-900 dark:text-white">+48</span>
                                        <span className="text-purple-500 font-bold mb-1 tracking-wider">kg CO₂e</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Personal Recycling Chart */}
                                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Weekly Recycling Pattern</h3>
                                            <p className="text-xs text-slate-500">Your contribution over the last 7 days</p>
                                        </div>
                                        <select className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm outline-none text-slate-700 dark:text-slate-300">
                                            <option>This Week</option>
                                            <option>Last Week</option>
                                        </select>
                                    </div>
                                    <div className="flex-1 min-h-[250px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={impactData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorRecycling" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '12px', fontSize: '13px' }}
                                                    itemStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                                                />
                                                <Area type="monotone" dataKey="recycled" name="Recycled (kg)" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRecycling)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Pickup Request Form */}
                                <div id="pickup-form" className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Request a Pickup</h3>
                                    <p className="text-xs text-slate-500 mb-6">Schedule bulk waste collection at your door</p>

                                    <form onSubmit={handleRequestPickup} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Waste Type</label>
                                            <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-slate-700 dark:text-slate-300">
                                                <option>Mixed Recyclables (Plastic/Paper/Glass)</option>
                                                <option>Electronic Waste (e-Waste)</option>
                                                <option>Bulky Items (Furniture)</option>
                                                <option>Organic/Compost</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Estimated Volume</label>
                                            <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-slate-700 dark:text-slate-300">
                                                <option>1-3 Bags (Standard)</option>
                                                <option>4-6 Bags (Large)</option>
                                                <option>Truck load / Extremely Heavy</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Preferred Date</label>
                                            <input type="date" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-slate-700 dark:text-slate-300" />
                                        </div>
                                        <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-emerald-500/20 mt-2">
                                            Confirm Request
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Recent Transactions list */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Activities</h3>
                                    <button className="text-emerald-500 text-sm font-bold hover:underline">View Ledger</button>
                                </div>
                                <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                    {transactions.slice(0, 4).map((tx, i) => (
                                        <div key={i} className="p-4 px-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className={`size-10 rounded-full flex items-center justify-center ${tx.type === 'earn' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400'}`}>
                                                    <span className="material-symbols-outlined text-[20px]">{tx.type === 'earn' ? 'arrow_downward' : 'arrow_upward'}</span>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white text-sm">{tx.title}</p>
                                                    <p className="text-xs text-slate-500">{tx.time}</p>
                                                </div>
                                            </div>
                                            <div className={`font-mono font-bold ${tx.type === 'earn' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                                                {tx.type === 'earn' ? '+' : '-'}{tx.amount} ET
                                            </div>
                                        </div>
                                    ))}
                                    {transactions.length === 0 && (
                                        <div className="p-8 text-center text-slate-500">
                                            No recent activities found. Start recycling!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : activeTab === 'pickups' ? (
                        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
                            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">local_shipping</span>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Pickup History</h2>
                            <p className="text-slate-500 mt-2 max-w-sm mx-auto">Track your past and upcoming waste collections. You have no pending pick-up requests.</p>
                        </div>
                    ) : activeTab === 'rewards' ? (
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-xl flex flex-col items-center justify-center text-center min-h-[400px]">
                            <span className="material-symbols-outlined text-6xl mb-4 text-emerald-200">redeem</span>
                            <h2 className="text-3xl font-black">Marketplace Coming Soon</h2>
                            <p className="text-emerald-100 mt-3 max-w-md mx-auto">Use your EcoTokens to claim free bus passes, coffee discounts, and local event tickets.</p>
                            <button className="mt-8 bg-white text-emerald-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">Browse Catalog</button>
                        </div>
                    ) : activeTab === 'community' ? (
                        <div className="flex flex-col space-y-8 pb-10">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Eco Citizen Community</h1>
                                    <p className="text-slate-500 dark:text-slate-400">Ask questions, share recycling tips, and discuss with neighbors in your area.</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => toast('Search opened...')} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-500">
                                        <span className="material-symbols-outlined text-[18px]">search</span>
                                    </button>
                                    <button onClick={() => setShowNewTopicModal(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
                                        <span className="material-symbols-outlined text-[16px]">add</span> New Topic
                                    </button>
                                </div>
                            </div>

                            {/* Ask Question Box */}
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex gap-4 shadow-sm">
                                <div className="size-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 font-bold shrink-0">
                                    {user?.email?.charAt(0).toUpperCase() || 'M'}
                                </div>
                                <div className="flex-1 space-y-3">
                                    <textarea
                                        id="user-community-textarea"
                                        placeholder="Have a question about waste sorting or local policies? Ask the community..."
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none h-24 text-slate-900 dark:text-white"
                                    ></textarea>
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2 text-slate-400">
                                            <span onClick={() => toast('Image upload dialog opened.')} className="material-symbols-outlined text-[18px] cursor-pointer hover:text-emerald-500 transition-colors">image</span>
                                            <span onClick={() => toast('Add URL link dialog opened.')} className="material-symbols-outlined text-[18px] cursor-pointer hover:text-emerald-500 transition-colors">link</span>
                                        </div>
                                        <button onClick={() => {
                                            const ta = document.getElementById('user-community-textarea');
                                            const text = ta?.value?.trim();
                                            if (!text) { toast.error('Please write something first.'); return; }
                                            const userName = user?.email?.split('@')[0] || 'You';
                                            setForumPosts(prev => [{
                                                title: text,
                                                author: userName,
                                                avatar: userName.charAt(0).toUpperCase(),
                                                time: 'Just now',
                                                replies: 0,
                                                upvotes: 1,
                                                tags: ['New'],
                                                isAnswered: false,
                                            }, ...prev]);
                                            ta.value = '';
                                            toast.success('Your question has been posted!');
                                        }} className="px-6 py-2.5 bg-emerald-500 text-white text-sm font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-md">
                                            Post Question
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {forumPosts.map((post, i) => (
                                    <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex gap-4 hover:border-emerald-500/40 transition-colors cursor-pointer shadow-sm" onClick={() => toast('Opening discussion thread...')}>
                                        <div className="flex flex-col items-center gap-1 min-w-[50px]">
                                            <button className="text-slate-400 hover:text-emerald-500 transition-colors"><span className="material-symbols-outlined">expand_less</span></button>
                                            <span className="font-bold text-slate-700 dark:text-slate-300">{post.upvotes}</span>
                                            <button className="text-slate-400 hover:text-rose-500 transition-colors"><span className="material-symbols-outlined">expand_more</span></button>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-500 transition-colors">{post.title}</h3>
                                                {post.isAnswered && (
                                                    <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[12px]">check_circle</span> Answered
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 mb-3">
                                                {post.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] font-medium bg-slate-100 dark:bg-slate-900 text-slate-500 px-2 py-0.5 rounded-md">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-slate-500">
                                                <div className="flex items-center gap-2">
                                                    <div className="size-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                                                        {post.avatar}
                                                    </div>
                                                    <span className="font-medium text-slate-700 dark:text-slate-300">{post.author}</span>
                                                    <span>•</span>
                                                    <span>{post.time}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 font-medium hover:text-emerald-500 transition-colors">
                                                    <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                                                    {post.replies} Replies
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Interactive Map Placeholder</h2>
                            <p className="text-slate-500 mt-2">Find closest drop-off points for specific batteries or hazardous wastes.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* New Topic Modal */}
            {showNewTopicModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col scale-100 relative">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                                <span className="material-symbols-outlined text-emerald-500">edit_document</span>
                                Create New Topic
                            </h3>
                            <button onClick={() => setShowNewTopicModal(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors bg-slate-100 dark:bg-slate-700/50 p-2 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Topic Title</label>
                                <input type="text" value={newTopicTitle} onChange={e => setNewTopicTitle(e.target.value)} placeholder="e.g. How to recycle batteries safely?" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category (Tag)</label>
                                <select value={newTopicCategory} onChange={e => setNewTopicCategory(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white">
                                    <option>General Discussion</option>
                                    <option>Recycling Tips & Hacks</option>
                                    <option>Local Events</option>
                                    <option>Site & Bins Feedback</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Detailed Description</label>
                                <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 transition-shadow">
                                    <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 p-2 flex gap-1">
                                        <button className="p-1.5 text-slate-400 hover:text-emerald-500 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition" title="Bold"><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
                                        <button className="p-1.5 text-slate-400 hover:text-emerald-500 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition" title="Italic"><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
                                        <div className="w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>
                                        <button className="p-1.5 text-slate-400 hover:text-emerald-500 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition" title="Bullet List"><span className="material-symbols-outlined text-[18px]">format_list_bulleted</span></button>
                                        <button className="p-1.5 text-slate-400 hover:text-emerald-500 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition" title="Add Image"><span className="material-symbols-outlined text-[18px]">image</span></button>
                                    </div>
                                    <textarea rows={5} value={newTopicBody} onChange={e => setNewTopicBody(e.target.value)} placeholder="Write your full post here..." className="w-full bg-white dark:bg-slate-900 p-4 text-sm outline-none resize-none text-slate-900 dark:text-white"></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3 rounded-b-2xl">
                            <button onClick={() => setShowNewTopicModal(false)} className="px-6 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => {
                                if (!newTopicTitle.trim()) { toast.error('Please enter a topic title.'); return; }
                                const userName = user?.email?.split('@')[0] || 'You';
                                const categoryTag = newTopicCategory.split(' ')[0];
                                setForumPosts(prev => [{
                                    title: newTopicTitle.trim(),
                                    author: userName,
                                    avatar: userName.charAt(0).toUpperCase(),
                                    time: 'Just now',
                                    replies: 0,
                                    upvotes: 1,
                                    tags: [categoryTag],
                                    isAnswered: false,
                                }, ...prev]);
                                setNewTopicTitle('');
                                setNewTopicCategory('General Discussion');
                                setNewTopicBody('');
                                toast.success('Your new topic has been published to the community!');
                                setShowNewTopicModal(false);
                            }} className="px-6 py-2.5 bg-emerald-500 text-white text-sm font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
                                Publish Topic
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

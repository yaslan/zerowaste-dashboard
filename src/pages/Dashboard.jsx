import { useState, lazy, Suspense, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useWasteStore from '../store/useWasteStore'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

// Lazy load Leaflet components (requires window/DOM)
const LeafletMap = lazy(() => import('../components/LeafletMap'))

const mapMarkers = [
  { lat: 41.2850, lng: 36.3250, label: 'Bahçelievler Mh.', density: 'High', weight: 1200, color: '#0bda46', radius: 18 },
  { lat: 41.2890, lng: 36.3320, label: 'Kılıçdede Mh.', density: 'Normal', weight: 850, color: '#7c3aed', radius: 12 },
  { lat: 41.2780, lng: 36.3200, label: 'Kadıköy Mh.', density: 'High', weight: 2100, color: '#0bda46', radius: 22 },
  { lat: 41.2910, lng: 36.3380, label: 'İstasyon Mh.', density: 'Normal', weight: 600, color: '#7c3aed', radius: 10 },
  { lat: 41.2730, lng: 36.3400, label: 'Derebahçe Mh.', density: 'Low', weight: 320, color: '#64748b', radius: 8 },
];

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Dashboard() {
  const navigate = useNavigate();
  const { totalRecycledTons, ecoTokens, carbonOffset, batches, logout, user } = useWasteStore();

  // Dynamically compute pie chart data from batches
  const pieData = useMemo(() => {
    const types = { Plastic: 0, Paper: 0, Glass: 0, Other: 0 };
    batches.forEach(b => {
      const t = b.type?.toUpperCase?.() || '';
      if (t.includes('PLASTIC')) types.Plastic += b.weight;
      else if (t.includes('PAPER')) types.Paper += b.weight;
      else if (t.includes('GLASS')) types.Glass += b.weight;
      else types.Other += b.weight;
    });
    const total = Object.values(types).reduce((a, b) => a + b, 0) || 1;
    return [
      { name: 'Plastic', value: +((types.Plastic / total) * 100).toFixed(1), color: '#60a5fa' },
      { name: 'Paper', value: +((types.Paper / total) * 100).toFixed(1), color: '#fbbf24' },
      { name: 'Glass', value: +((types.Glass / total) * 100).toFixed(1), color: '#34d399' },
      { name: 'Other', value: +((types.Other / total) * 100).toFixed(1), color: '#64748b' },
    ];
  }, [batches]);

  // Dynamically compute bar chart (last 7 batches mapped to days)
  const barData = useMemo(() => {
    const today = new Date().getDay();
    return Array.from({ length: 7 }, (_, i) => {
      const dayIdx = (today - 6 + i + 7) % 7;
      const dayBatches = batches.filter(b => {
        if (!b.time) return false;
        const d = new Date(b.created_at || Date.now());
        return d.getDay() === dayIdx;
      });
      const weight = dayBatches.reduce((s, b) => s + (b.weight || 0), 0);
      return { name: WEEK_DAYS[dayIdx], weight: weight || Math.floor(100 + Math.random() * 150) };
    });
  }, [batches]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);
  const [adminTopicTitle, setAdminTopicTitle] = useState('');
  const [adminTopicCategory, setAdminTopicCategory] = useState('General Discussion');
  const [adminTopicBody, setAdminTopicBody] = useState('');

  const [adminForumPosts, setAdminForumPosts] = useState([
    { title: "Which bin do I use for empty deodorant spray cans?", author: "Ahmet Y.", avatar: "A", time: "2 hours ago", replies: 4, upvotes: 12, tags: ["Sorting", "Metal"], isAnswered: true },
    { title: "Are pizza boxes recyclable if they have a little grease on them?", author: "Elif S.", avatar: "E", time: "5 hours ago", replies: 15, upvotes: 34, tags: ["Sorting", "Paper"], isAnswered: true },
    { title: "Smart Bin in Kad\u0131k\u00f6y Moda is full, how long until pickup?", author: "Can G.", avatar: "C", time: "1 day ago", replies: 1, upvotes: 3, tags: ["Smart Bin"], isAnswered: false },
    { title: "Suggestions for composting at home in a small apartment", author: "Zeynep T.", avatar: "Z", time: "2 days ago", replies: 8, upvotes: 21, tags: ["Compost", "Tips"], isAnswered: true },
  ]);

  // Toggle dark mode on html element
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  // Filtered batches for search
  const filteredBatches = useMemo(() =>
    batches.filter(b =>
      !searchQuery ||
      b.source?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id?.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [batches, searchQuery]
  );

  // Dynamic KPI badges based on new batches vs base
  const pendingCount = batches.filter(b => b.status === 'PENDING').length;
  const recycledGrowth = batches.length > 4 ? `+${((batches.length - 4) * 2.1).toFixed(1)}%` : '+12.5%';
  const tokenGrowth = batches.length > 4 ? `+${((batches.length - 4) * 1.3).toFixed(1)}%` : '+5.2%';

  const handleExport = () => {
    const id = toast.loading('Generating PDF Report...');
    setTimeout(() => {
      toast.success('Report successfully downloaded!', { id });
    }, 2000);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-border-dark bg-background-light dark:bg-background-dark hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <span className="material-symbols-outlined text-slate-900 dark:text-white">recycling</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">ZeroWaste</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {[
            { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
            { id: 'map', icon: 'map', label: 'Live Map' },
            { id: 'analytics', icon: 'bar_chart', label: 'Analytics' },
            { id: 'tokens', icon: 'token', label: 'EcoTokens' },
            { id: 'community', icon: 'group', label: 'Community' },
            { id: 'browser', icon: 'language', label: 'Web Browser' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === item.id
                ? 'bg-primary text-white'
                : 'text-slate-500 dark:text-slate-400 hover:bg-border-dark hover:text-slate-900 dark:text-white'
                }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-border-dark space-y-2">
          <div className="flex items-center gap-3 p-2 hover:bg-slate-200 dark:hover:bg-border-dark rounded-lg cursor-pointer transition-colors" onClick={() => navigate('/user-dashboard')}>
            <div className="size-10 rounded-full bg-primary/30 flex items-center justify-center text-primary-light">
              <span className="material-symbols-outlined">account_circle</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate text-slate-900 dark:text-white pb-0.5" title="Go to Citizen Panel">{user?.email || 'Municipality Admin'}</p>
              <p className="text-xs text-slate-500 truncate">Go to Citizen Panel &rarr;</p>
            </div>
            <span className="material-symbols-outlined text-slate-500 text-sm">open_in_new</span>
          </div>

          <button
            onClick={async () => {
              await logout();
              toast('Logged out successfully');
            }}
            className="w-full flex items-center gap-3 p-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 rounded-lg cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span className="text-sm font-bold">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-background-dark">
        {/* Top Nav */}
        <header className="h-16 border-b border-slate-200 dark:border-border-dark flex items-center justify-between px-8 sticky top-0 bg-background-light dark:bg-background-dark/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">search</span>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-surface-dark border-slate-200 dark:border-border-dark rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-primary focus:border-primary outline-none"
                placeholder="Search batches, districts, or types..."
                type="text"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 dark:text-white">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full border border-primary/30 cursor-pointer pointer-events-auto hover:bg-primary/30 transition-colors" onClick={() => toast.success('All blockchain nodes synchronized.')}
            >
              <span className="size-2 rounded-full bg-accent-green animate-pulse"></span>
              <span className="text-xs font-medium text-accent-green">System Live</span>
            </div>
            {/* Notification bell with real pending count */}
            <button
              onClick={() => pendingCount > 0
                ? toast(`⚠️ ${pendingCount} batch${pendingCount > 1 ? 'es' : ''} waiting for processing`, { duration: 4000 })
                : toast.success('No unread alerts — all batches processed!')
              }
              className="relative text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined">notifications</span>
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 size-4 bg-red-500 rounded-full text-[9px] text-slate-900 dark:text-white flex items-center justify-center font-bold animate-pulse">
                  {pendingCount}
                </span>
              )}
            </button>
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="relative text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <div className="h-8 w-[1px] bg-border-dark"></div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Green City Initiative {new Date().getFullYear()}</span>
            </div>
          </div>
        </header >

        <div className="p-8 space-y-8">
          {/* Tab Content Logic */}
          {activeTab === 'browser' ? (
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark overflow-hidden flex flex-col h-[600px]">
              <div className="p-4 border-b border-slate-200 dark:border-border-dark flex items-center justify-between bg-slate-50 dark:bg-background-dark/50">
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="material-symbols-outlined text-sm cursor-not-allowed">arrow_back</span>
                  <span className="material-symbols-outlined text-sm cursor-not-allowed">arrow_forward</span>
                  <span className="material-symbols-outlined text-sm cursor-pointer hover:text-slate-900 dark:hover:text-white" onClick={() => toast('Refreshing frame...')}>refresh</span>
                </div>
                <div className="flex-1 max-w-2xl mx-4 bg-white dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-full px-4 py-1.5 text-xs text-slate-500 font-mono flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  https://localhost:5173/municipality-dashboard (Nested Frame view)
                </div>
                <div className="material-symbols-outlined text-slate-500 hover:text-red-500 cursor-pointer text-sm" onClick={() => setActiveTab('dashboard')}>close</div>
              </div>
              <div className="flex-1 bg-slate-100 dark:bg-background-dark flex items-center justify-center p-8">
                {/* Iframe content visual placeholder since embedding self may cause infinite loop loop with hot reload sometimes */}
                <div className="text-center space-y-4">
                  <span className="material-symbols-outlined text-4xl text-slate-400">language</span>
                  <h3 className="font-bold text-slate-900 dark:text-white">Web Browser Integrated Simulator</h3>
                  <p className="text-sm text-slate-500 max-w-sm">This is a mockup integration tab for web browsing within the dashboard view.</p>
                  <button className="text-primary font-bold text-sm px-4 py-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors" onClick={() => window.open('http://localhost:5173/municipality-dashboard', '_blank')} >Open in Native Window Tab ↗</button>
                </div>
              </div>
            </div>
          ) : activeTab === 'map' ? (
            <div className="flex flex-col h-[calc(100vh-10rem)]">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Live Operations Map</h1>
                  <p className="text-slate-500 dark:text-slate-400">Real-time GPS tracking of collector trucks and active smart bins.</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg text-sm font-medium hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">filter_list</span> Filters
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg text-sm font-medium hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">my_location</span> Recenter
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark overflow-hidden flex relative">
                {/* Map Container */}
                <div className="flex-1 relative z-0">
                  <Suspense fallback={<div className="flex items-center justify-center h-full bg-slate-800 text-slate-500 text-sm">Loading Live Map Engine...</div>}>
                    <LeafletMap markers={mapMarkers} />
                  </Suspense>
                </div>

                {/* Control Panel / Overlay Side */}
                <div className="w-80 border-l border-slate-200 dark:border-border-dark bg-background-light/95 dark:bg-surface-dark/95 backdrop-blur-md flex flex-col z-10">
                  <div className="p-4 border-b border-slate-200 dark:border-border-dark">
                    <h3 className="font-bold text-slate-900 dark:text-white">Active Units</h3>
                  </div>
                  <div className="p-4 flex-1 overflow-y-auto space-y-4">
                    {/* Unit 1 */}
                    <div className="p-3 bg-white dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-blue-500">local_shipping</span> Truck 04 (Bahçelievler)
                        </span>
                        <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                      </div>
                      <div className="text-xs text-slate-500 flex justify-between">
                        <span>Capacity: 85%</span>
                        <span>Speed: 32 km/h</span>
                      </div>
                    </div>
                    {/* Unit 2 */}
                    <div className="p-3 bg-white dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-blue-500">local_shipping</span> Truck 11 (Kılıçdede)
                        </span>
                        <span className="size-2 bg-yellow-500 rounded-full"></span>
                      </div>
                      <div className="text-xs text-slate-500 flex justify-between">
                        <span>Capacity: 45%</span>
                        <span>Status: Idle</span>
                      </div>
                    </div>

                    <h4 className="font-bold text-xs text-slate-500 pt-4 uppercase tracking-wider">High Density Zones</h4>
                    {mapMarkers.filter(m => m.density === 'High').map((marker, i) => (
                      <div key={i} className="flex justify-between items-center p-2 hover:bg-slate-100 dark:hover:bg-background-dark rounded cursor-pointer" onClick={() => toast(`Panning to ${marker.label}...`)}>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-red-500 text-sm">warning</span> {marker.label}
                        </span>
                        <span className="text-xs text-slate-500">{marker.weight} kg</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'analytics' ? (
            <div className="flex flex-col space-y-8 pb-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Platform Analytics</h1>
                  <p className="text-slate-500 dark:text-slate-400">Deep dive into collection habits, waste generators, and facility production metrics.</p>
                </div>
                <div className="flex gap-2">
                  <select className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer text-slate-700 dark:text-slate-300">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Year to Date</option>
                  </select>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors text-sm">
                    <span className="material-symbols-outlined text-[16px]">cloud_download</span> CSV
                  </button>
                </div>
              </div>

              {/* Analytics Key Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Waste Generators', value: '14,285', sub: '+124 this week', icon: 'groups' },
                  { label: 'Active Smart Bins', value: '842', sub: '92% operational', icon: 'delete' },
                  { label: 'Avg Collection Dist.', value: '12.4 km', sub: '-1.2km optimized', icon: 'route' },
                  { label: 'Contamination Rate', value: '4.2%', sub: 'Target < 3.0%', icon: 'warning', color: 'text-red-500' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`material-symbols-outlined text-[24px] ${stat.color || 'text-primary'}`}>{stat.icon}</span>
                    </div>
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</h4>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">{stat.sub}</p>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Trend Chart */}
                <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark flex flex-col">
                  <div className="p-6 border-b border-slate-200 dark:border-border-dark">
                    <h3 className="font-bold text-lg">Daily Collection Trends</h3>
                    <p className="text-xs text-slate-500">Volume collected over the past 7 days</p>
                  </div>
                  <div className="p-6 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <RechartsTooltip
                          cursor={{ fill: 'rgba(16, 185, 129, 0.05)' }}
                          contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                          itemStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                          formatter={(value) => [`${value} kg`, 'Collected']}
                        />
                        <Bar dataKey="weight" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Top Generators Table */}
                <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark flex flex-col">
                  <div className="p-6 border-b border-slate-200 dark:border-border-dark flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">Top Waste Generators</h3>
                      <p className="text-xs text-slate-500">High-yield collection points (Corporate/Industrial)</p>
                    </div>
                  </div>
                  <div className="flex-1 overflow-x-auto p-0">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 dark:bg-background-dark/50 text-slate-500 font-medium">
                        <tr>
                          <th className="px-6 py-3">Facility Name</th>
                          <th className="px-6 py-3">Primary Target</th>
                          <th className="px-6 py-3 text-right">Yield (MT)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-border-dark">
                        {[
                          { name: 'EcoCorp Industrial', type: 'Metal / Tech', yield: 18.5 },
                          { name: 'University Campus B', type: 'Paper / Plastics', yield: 12.1 },
                          { name: 'City Hospital Complex', type: 'Glass / Mixed', yield: 9.8 },
                          { name: 'BioClean Solutions', type: 'Organics', yield: 8.4 },
                        ].map((gen, i) => (
                          <tr key={i} className="hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => toast(`Viewing ${gen.name}`)}>
                            <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{gen.name}</td>
                            <td className="px-6 py-4 text-slate-500">{gen.type}</td>
                            <td className="px-6 py-4 font-mono text-right text-primary-light font-bold">{gen.yield}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'tokens' ? (
            <div className="flex flex-col space-y-8 pb-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">EcoTokens Economy</h1>
                  <p className="text-slate-500 dark:text-slate-400">Manage the city-wide reward currency and marketplace redemptions.</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-colors shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-[16px]">mintmark</span> Mint Tokens
                  </button>
                </div>
              </div>

              {/* Token KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-primary to-accent-green p-6 rounded-xl text-white shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="material-symbols-outlined text-[24px]">account_balance</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded font-bold">+2.4M Minted</span>
                  </div>
                  <h4 className="text-4xl font-black mb-1">{(ecoTokens * 3.4).toLocaleString(undefined, { maximumFractionDigits: 0 })}</h4>
                  <p className="text-sm font-medium text-white/80">Total Supply</p>
                </div>
                <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark">
                  <div className="flex items-center justify-between mb-2">
                    <span className="material-symbols-outlined text-[24px] text-amber-500">storefront</span>
                  </div>
                  <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-1">{(ecoTokens * 1.8).toLocaleString(undefined, { maximumFractionDigits: 0 })}</h4>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Circulating (Users)</p>
                </div>
                <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark">
                  <div className="flex items-center justify-between mb-2">
                    <span className="material-symbols-outlined text-[24px] text-red-500">local_fire_department</span>
                  </div>
                  <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-1">{(ecoTokens * 0.4).toLocaleString(undefined, { maximumFractionDigits: 0 })}</h4>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tokens Burned</p>
                </div>
              </div>

              {/* Grid Layout that mimics a Blockchain Explorer */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Ledger */}
                <div className="lg:col-span-2 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark flex flex-col">
                  <div className="p-6 border-b border-slate-200 dark:border-border-dark">
                    <h3 className="font-bold text-lg">Network Transfers</h3>
                    <p className="text-xs text-slate-500">Live token emissions and redemption ledger.</p>
                  </div>
                  <div className="flex-1 overflow-x-auto p-0">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 dark:bg-background-dark/50 text-slate-500 font-medium">
                        <tr>
                          <th className="px-6 py-3">Tx Hash</th>
                          <th className="px-6 py-3">Action</th>
                          <th className="px-6 py-3">Amount</th>
                          <th className="px-6 py-3">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-border-dark font-mono text-xs">
                        {[
                          { hash: '0x1a...b9f2', action: 'Smart Bin Reward', amount: '+120 TKN', style: 'text-accent-green text-right font-bold' },
                          { hash: '0x4f...e32c', action: 'Marketplace (Bus Pass)', amount: '-450 TKN', style: 'text-red-500 text-right font-bold' },
                          { hash: '0x88...19ae', action: 'Collector Shift Bonus', amount: '+800 TKN', style: 'text-accent-green text-right font-bold' },
                          { hash: '0x2b...c441', action: 'Smart Bin Reward', amount: '+15 TKN', style: 'text-accent-green text-right font-bold' },
                          { hash: '0x99...fa00', action: 'Marketplace (Coffee)', amount: '-50 TKN', style: 'text-red-500 text-right font-bold' },
                        ].map((tx, i) => (
                          <tr key={i} className="hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => toast(`Explorer hash copied: ${tx.hash}`)}>
                            <td className="px-6 py-4 text-slate-400 dark:text-slate-500">{tx.hash}</td>
                            <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-sans">{tx.action}</td>
                            <td className={`px-6 py-4 ${tx.style}`}>{tx.amount}</td>
                            <td className="px-6 py-4 text-slate-400">Just now</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Summary Pie */}
                <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark flex flex-col p-6">
                  <h3 className="font-bold text-lg mb-6">Marketplace Trends</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2 text-slate-900 dark:text-white font-medium">
                        <span>Public Transport Passes</span>
                        <span>65%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-background-dark rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2 text-slate-900 dark:text-white font-medium">
                        <span>Local Coffee Discounts</span>
                        <span>22%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-background-dark rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2 text-slate-900 dark:text-white font-medium">
                        <span>Utility Bill Credits</span>
                        <span>13%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-background-dark rounded-full h-2">
                        <div className="bg-accent-green h-2 rounded-full" style={{ width: '13%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'community' ? (
            <div className="flex flex-col space-y-8 pb-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Community Forum</h1>
                  <p className="text-slate-500 dark:text-slate-400">Ask questions, share recycling tips, and discuss with Eco Citizens in your area.</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toast('Search opened...')} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-500">
                    <span className="material-symbols-outlined text-[18px]">search</span>
                  </button>
                  <button onClick={() => setShowNewTopicModal(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-colors shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-[16px]">add</span> New Topic
                  </button>
                </div>
              </div>

              {/* Ask Question Box */}
              <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark flex gap-4">
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary-light font-bold shrink-0">
                  U
                </div>
                <div className="flex-1 space-y-3">
                  <textarea
                    id="admin-community-textarea"
                    placeholder="Have a question about waste sorting or local policies? Ask the community..."
                    className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary outline-none resize-none h-20 text-slate-900 dark:text-white"
                  ></textarea>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 text-slate-400">
                      <span onClick={() => toast('Image upload dialog opened.')} className="material-symbols-outlined text-[18px] cursor-pointer hover:text-primary transition-colors">image</span>
                      <span onClick={() => toast('Add URL link dialog opened.')} className="material-symbols-outlined text-[18px] cursor-pointer hover:text-primary transition-colors">link</span>
                    </div>
                    <button onClick={() => {
                      const ta = document.getElementById('admin-community-textarea');
                      const text = ta?.value?.trim();
                      if (!text) { toast.error('Please write something first.'); return; }
                      const userName = user?.email?.split('@')[0] || 'Admin';
                      setAdminForumPosts(prev => [{
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
                    }} className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-light transition-colors shadow-md">
                      Post Question
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {adminForumPosts.map((post, i) => (
                  <div key={i} className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark flex gap-4 hover:border-primary/40 transition-colors cursor-pointer" onClick={() => toast('Opening discussion thread...')}>
                    <div className="flex flex-col items-center gap-1 min-w-[50px]">
                      <button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">expand_less</span></button>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{post.upvotes}</span>
                      <button className="text-slate-400 hover:text-rose-500 transition-colors"><span className="material-symbols-outlined">expand_more</span></button>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{post.title}</h3>
                        {post.isAnswered && (
                          <span className="bg-accent-green/10 text-accent-green text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">check_circle</span> Answered
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-medium bg-slate-100 dark:bg-background-dark text-slate-500 px-2 py-0.5 rounded">
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
                        <div className="flex items-center gap-1.5 font-medium hover:text-primary transition-colors">
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
            <>
              {/* Hero Section */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Waste Management Dashboard</h1>
                  <p className="text-slate-500 dark:text-slate-400">Real-time municipality recycling goals and environmental impact tracking.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg text-sm font-medium hover:bg-primary/20 hover:border-primary/50 transition-all">
                    <span className="material-symbols-outlined text-sm">download</span> Export Report
                  </button>
                  <button onClick={() => toast('Feature: Assigning new collectors...')} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-light active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-sm">add</span> New Task
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark flex flex-col gap-4 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => toast('Displaying recycled volume trends...')}>
                  <div className="flex justify-between items-start">
                    <div className="bg-primary/30 p-2 rounded-lg text-primary-light">
                      <span className="material-symbols-outlined filled-icon">delete_sweep</span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${batches.length > 4 ? 'text-accent-green bg-accent-green/10' : 'text-accent-green bg-accent-green/10'
                      }`}>{recycledGrowth}</span>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Recycled</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">{totalRecycledTons.toLocaleString()} <span className="text-lg font-normal text-slate-500">Tons</span></p>
                  </div>
                </div>
                <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark flex flex-col gap-4 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => toast('Displaying Token Distribution...')}>
                  <div className="flex justify-between items-start">
                    <div className="bg-primary/30 p-2 rounded-lg text-primary-light">
                      <span className="material-symbols-outlined filled-icon">generating_tokens</span>
                    </div>
                    <span className="text-accent-green text-xs font-bold bg-accent-green/10 px-2 py-1 rounded">{tokenGrowth}</span>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">EcoTokens Distributed</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">{ecoTokens.toLocaleString()} <span className="text-lg font-normal text-slate-500">ET</span></p>
                  </div>
                </div>
                <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark flex flex-col gap-4 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => toast('Displaying Carbon offset goals...')}>
                  <div className="flex justify-between items-start">
                    <div className="bg-primary/30 p-2 rounded-lg text-primary-light">
                      <span className="material-symbols-outlined filled-icon">co2</span>
                    </div>
                    <span className="text-red-400 text-xs font-bold bg-red-400/10 px-2 py-1 rounded">-8.1%</span>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Carbon Offset</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">{carbonOffset.toLocaleString()} <span className="text-lg font-normal text-slate-500">MT CO2e</span></p>
                  </div>
                </div>
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Map Section */}
                <div className="lg:col-span-2 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-slate-200 dark:border-border-dark flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">City Collection Density</h3>
                      <p className="text-xs text-slate-500">Live heatmap of waste pickup requests across districts</p>
                    </div>
                    <select onChange={(e) => toast(`Map timeframe changed to: ${e.target.value}`)} className="bg-background-light dark:bg-background-dark border-slate-200 dark:border-border-dark rounded-lg text-xs py-1 px-3 focus:ring-primary outline-none text-slate-500 dark:text-slate-400 cursor-pointer">
                      <option>Last 24 Hours</option>
                      <option>Last 7 Days</option>
                    </select>
                  </div>
                  <div className="relative flex-1 min-h-[400px]">
                    <Suspense fallback={<div className="flex items-center justify-center h-full bg-slate-800 text-slate-500 text-sm">Loading map...</div>}>
                      <LeafletMap markers={mapMarkers} />
                    </Suspense>

                    {/* Legend overlay */}
                    <div className="absolute bottom-4 left-4 z-[1000] bg-background-light dark:bg-background-dark/90 backdrop-blur p-3 rounded-lg border border-slate-200 dark:border-border-dark text-[10px] space-y-2">
                      <p className="font-bold uppercase tracking-wider text-slate-500 mb-2">Density Legend</p>
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-accent-green"></span> <span>High Activity</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-primary-light"></span> <span>Normal Flow</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-slate-600"></span> <span>Low Priority</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts Section */}
                <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark flex flex-col">
                  <div className="p-6 border-b border-slate-200 dark:border-border-dark">
                    <h3 className="font-bold text-lg">Waste Distribution</h3>
                    <p className="text-xs text-slate-500">Breakdown by material type</p>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-around">
                    <div className="h-[240px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} style={{ outline: 'none' }} />
                            ))}
                          </Pie>
                          <RechartsTooltip
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                            itemStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                            formatter={(value) => [`${value}%`, 'Share']}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 text-xs mt-2">
                      {pieData.map(item => (
                        <div key={item.name} className="flex items-center gap-1.5 cursor-pointer" onClick={() => toast(`Opening ${item.name} details`)}>
                          <span className="size-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                          <span className="text-slate-600 dark:text-slate-300 font-medium">{item.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 p-4 bg-primary/10 rounded-xl border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer" onClick={() => toast('Deploying new bins to Central Plaza...', { icon: '🚚' })}>
                      <div className="flex items-center gap-3 text-accent-green mb-2">
                        <span className="material-symbols-outlined text-sm">tips_and_updates</span>
                        <span className="text-xs font-bold uppercase tracking-wider">Optimization Insight</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Plastic collection increased by 15% in District 4. Consider deploying additional bins to "Central Plaza" zone. Click to action.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-border-dark flex items-center justify-between">
                  <h3 className="font-bold text-lg">Recent Collections</h3>
                  <button onClick={() => toast('Loading full collection history...')} className="text-primary-light hover:text-accent-green text-sm font-medium transition-colors">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-background-light dark:bg-background-dark/50 text-slate-500 font-medium whitespace-nowrap">
                      <tr>
                        <th className="px-6 py-4">Pickup ID</th>
                        <th className="px-6 py-4">District</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Weight</th>
                        <th className="px-6 py-4">Tokens Awarded</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-border-dark">
                      {filteredBatches.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                            <span className="material-symbols-outlined text-3xl block mb-2">search_off</span>
                            No results for &ldquo;{searchQuery}&rdquo;
                          </td>
                        </tr>
                      )}
                      {filteredBatches.slice(0, 8).map(batch => (
                        <tr key={batch.id} className="hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => toast(`Tracking Pickup #${batch.id}`)}>
                          <td className="px-6 py-4 font-mono text-slate-500 dark:text-slate-400">#{batch.id}</td>
                          <td className="px-6 py-4 text-slate-900 dark:text-white hover:text-primary transition-colors">{batch.source}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${batch.type.includes('PLASTIC') ? 'bg-blue-500/10 text-blue-400' :
                              batch.type.includes('GLASS') ? 'bg-accent-green/10 text-accent-green' :
                                batch.type.includes('PAPER') ? 'bg-amber-500/10 text-amber-400' :
                                  'bg-slate-500/10 text-slate-500 dark:text-slate-400'
                              }`}>{batch.type}</span>
                          </td>
                          <td className="px-6 py-4 text-slate-900 dark:text-white">{batch.weight} kg</td>
                          <td className="px-6 py-4 font-bold text-accent-green">+{Math.floor(batch.weight)} ET</td>
                          <td className="px-6 py-4">
                            <span className={`flex items-center gap-2 ${batch.status === 'Verified' ? 'text-accent-green' :
                              batch.status === 'Processing' ? 'text-primary-light animate-pulse' :
                                'text-amber-400'
                              }`}>
                              <span className={`size-1.5 rounded-full ${batch.status === 'Verified' ? 'bg-accent-green' :
                                batch.status === 'Processing' ? 'bg-primary-light' :
                                  'bg-amber-400'
                                }`}></span>
                              {batch.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )
          }

        </div >

        {/* Footer */}
        < footer className="p-8 border-t border-slate-200 dark:border-border-dark flex flex-col md:flex-row items-center justify-between text-slate-500 text-xs gap-4 mt-auto" >
          <p>© {new Date().getFullYear()} ZeroWaste City Initiative. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer" onClick={() => toast('Privacy Policy downloaded')}>Privacy Policy</a>
            <a className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer" onClick={() => toast('Redirecting to Docs...')}>API Documentation</a>
            <a className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer" onClick={() => toast('Opening Support Ticket window')}>Support</a>
          </div>
        </footer >
      </main >

      {/* New Topic Modal */}
      {showNewTopicModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-surface-dark rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-border-dark flex flex-col scale-100 relative">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-border-dark">
              <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-primary">edit_document</span>
                Create New Topic
              </h3>
              <button onClick={() => setShowNewTopicModal(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors bg-slate-100 dark:bg-border-dark p-2 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Topic Title</label>
                <input type="text" value={adminTopicTitle} onChange={e => setAdminTopicTitle(e.target.value)} placeholder="e.g. How to recycle batteries safely?" className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category (Tag)</label>
                <select value={adminTopicCategory} onChange={e => setAdminTopicCategory(e.target.value)} className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white">
                  <option>General Discussion</option>
                  <option>Recycling Tips & Hacks</option>
                  <option>Local Events</option>
                  <option>Site & Bins Feedback</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Detailed Description</label>
                <div className="border border-slate-200 dark:border-border-dark rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary transition-shadow">
                  <div className="bg-slate-50 dark:bg-background-dark/50 border-b border-slate-200 dark:border-border-dark p-2 flex gap-1">
                    <button className="p-1.5 text-slate-400 hover:text-primary rounded hover:bg-slate-200 dark:hover:bg-border-dark transition" title="Bold"><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
                    <button className="p-1.5 text-slate-400 hover:text-primary rounded hover:bg-slate-200 dark:hover:bg-border-dark transition" title="Italic"><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
                    <div className="w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>
                    <button className="p-1.5 text-slate-400 hover:text-primary rounded hover:bg-slate-200 dark:hover:bg-border-dark transition" title="Bullet List"><span className="material-symbols-outlined text-[18px]">format_list_bulleted</span></button>
                    <button className="p-1.5 text-slate-400 hover:text-primary rounded hover:bg-slate-200 dark:hover:bg-border-dark transition" title="Add Image"><span className="material-symbols-outlined text-[18px]">image</span></button>
                  </div>
                  <textarea rows={5} value={adminTopicBody} onChange={e => setAdminTopicBody(e.target.value)} placeholder="Write your full post here..." className="w-full bg-white dark:bg-surface-dark p-4 text-sm outline-none resize-none text-slate-900 dark:text-white"></textarea>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-50 dark:bg-background-dark/80 border-t border-slate-200 dark:border-border-dark flex justify-end gap-3 rounded-b-2xl">
              <button onClick={() => setShowNewTopicModal(false)} className="px-6 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-border-dark rounded-xl transition-colors">
                Cancel
              </button>
              <button onClick={() => {
                if (!adminTopicTitle.trim()) { toast.error('Please enter a topic title.'); return; }
                const userName = user?.email?.split('@')[0] || 'Admin';
                const categoryTag = adminTopicCategory.split(' ')[0];
                setAdminForumPosts(prev => [{
                  title: adminTopicTitle.trim(),
                  author: userName,
                  avatar: userName.charAt(0).toUpperCase(),
                  time: 'Just now',
                  replies: 0,
                  upvotes: 1,
                  tags: [categoryTag],
                  isAnswered: false,
                }, ...prev]);
                setAdminTopicTitle('');
                setAdminTopicCategory('General Discussion');
                setAdminTopicBody('');
                toast.success('Your new topic has been published to the community!');
                setShowNewTopicModal(false);
              }} className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-light transition-colors shadow-lg shadow-primary/20">
                Publish Topic
              </button>
            </div>
          </div>
        </div>
      )}
    </div >
  )
}

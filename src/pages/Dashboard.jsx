import { useState } from 'react'
import toast from 'react-hot-toast'
import useWasteStore from '../store/useWasteStore'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import '../index.css'

const pieData = [
  { name: 'Plastic', value: 42, color: '#60a5fa' },
  { name: 'Paper', value: 28, color: '#fbbf24' },
  { name: 'Glass', value: 18, color: '#34d399' },
  { name: 'Other', value: 12, color: '#64748b' },
];

const barData = [
  { name: 'Mon', weight: 120 },
  { name: 'Tue', weight: 154 },
  { name: 'Wed', weight: 132 },
  { name: 'Thu', weight: 180 },
  { name: 'Fri', weight: 210 },
  { name: 'Sat', weight: 250 },
  { name: 'Sun', weight: 195 },
];

export default function Dashboard() {
  const { totalRecycledTons, ecoTokens, carbonOffset, batches } = useWasteStore();

  const handleExport = () => {
    const id = toast.loading('Generating PDF Report...');
    setTimeout(() => {
      toast.success('Report successfully downloaded!', { id });
    }, 2000);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-border-dark bg-background-dark hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <span className="material-symbols-outlined text-white">recycling</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">ZeroWaste</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-white" href="#">
            <span className="material-symbols-outlined filled-icon">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </a>
          <a onClick={(e) => { e.preventDefault(); toast('Loading live map data...') }} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-border-dark hover:text-white transition-colors cursor-pointer" href="#">
            <span className="material-symbols-outlined">map</span>
            <span className="text-sm font-medium">Live Map</span>
          </a>
          <a onClick={(e) => { e.preventDefault(); toast('Fetching latest analytics...') }} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-border-dark hover:text-white transition-colors cursor-pointer" href="#">
            <span className="material-symbols-outlined">bar_chart</span>
            <span className="text-sm font-medium">Analytics</span>
          </a>
          <a onClick={(e) => { e.preventDefault(); toast('EcoTokens smart contract online', { icon: '🟢' }) }} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-border-dark hover:text-white transition-colors cursor-pointer" href="#">
            <span className="material-symbols-outlined">token</span>
            <span className="text-sm font-medium">EcoTokens</span>
          </a>
          <a onClick={(e) => { e.preventDefault(); toast('Loading Community Forum') }} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-border-dark hover:text-white transition-colors cursor-pointer" href="#">
            <span className="material-symbols-outlined">group</span>
            <span className="text-sm font-medium">Community</span>
          </a>
        </nav>
        <div className="p-4 border-t border-border-dark">
          <div className="flex items-center gap-3 p-2 hover:bg-border-dark rounded-lg cursor-pointer transition-colors" onClick={() => toast('Opening Admin Settings')}>
            <div className="size-10 rounded-full bg-primary/30 flex items-center justify-center text-primary-light">
              <span className="material-symbols-outlined">account_circle</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate">Municipality Admin</p>
              <p className="text-xs text-slate-500 truncate">City Waste Division</p>
            </div>
            <span className="material-symbols-outlined text-slate-500 text-sm">settings</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-background-dark">
        {/* Top Nav */}
        <header className="h-16 border-b border-border-dark flex items-center justify-between px-8 sticky top-0 bg-background-dark/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">search</span>
              <input className="w-full bg-surface-dark border-border-dark rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-primary focus:border-primary outline-none" placeholder="Search districts, reports, or users..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full border border-primary/30 cursor-pointer pointer-events-auto hover:bg-primary/30 transition-colors" onClick={() => toast.success('All blockchain nodes synchronized.')}>
              <span className="size-2 rounded-full bg-accent-green animate-pulse"></span>
              <span className="text-xs font-medium text-accent-green">System Live</span>
            </div>
            <button onClick={() => toast('No unread priority alerts')} className="relative text-slate-400 hover:text-white transition-colors cursor-pointer">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute -top-1 -right-1 size-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <div className="h-8 w-[1px] bg-border-dark"></div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400">Green City Initiative 2024</span>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white mb-2">Waste Management Dashboard</h1>
              <p className="text-slate-400">Real-time municipality recycling goals and environmental impact tracking.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-surface-dark border border-border-dark rounded-lg text-sm font-medium hover:bg-primary/20 hover:border-primary/50 transition-all">
                <span className="material-symbols-outlined text-sm">download</span> Export Report
              </button>
              <button onClick={() => toast('Feature: Assigning new collectors...')} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-light active:scale-95 transition-all">
                <span className="material-symbols-outlined text-sm">add</span> New Task
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-dark p-6 rounded-xl border border-border-dark flex flex-col gap-4 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => toast('Displaying recycled volume trends...')}>
              <div className="flex justify-between items-start">
                <div className="bg-primary/30 p-2 rounded-lg text-primary-light">
                  <span className="material-symbols-outlined filled-icon">delete_sweep</span>
                </div>
                <span className="text-accent-green text-xs font-bold bg-accent-green/10 px-2 py-1 rounded">+12.5%</span>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Recycled</p>
                <p className="text-3xl font-black text-white">{totalRecycledTons.toLocaleString()} <span className="text-lg font-normal text-slate-500">Tons</span></p>
              </div>
            </div>
            <div className="bg-surface-dark p-6 rounded-xl border border-border-dark flex flex-col gap-4 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => toast('Displaying Token Distribution...')}>
              <div className="flex justify-between items-start">
                <div className="bg-primary/30 p-2 rounded-lg text-primary-light">
                  <span className="material-symbols-outlined filled-icon">generating_tokens</span>
                </div>
                <span className="text-accent-green text-xs font-bold bg-accent-green/10 px-2 py-1 rounded">+5.2%</span>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">EcoTokens Distributed</p>
                <p className="text-3xl font-black text-white">{ecoTokens.toLocaleString()} <span className="text-lg font-normal text-slate-500">ET</span></p>
              </div>
            </div>
            <div className="bg-surface-dark p-6 rounded-xl border border-border-dark flex flex-col gap-4 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => toast('Displaying Carbon offset goals...')}>
              <div className="flex justify-between items-start">
                <div className="bg-primary/30 p-2 rounded-lg text-primary-light">
                  <span className="material-symbols-outlined filled-icon">co2</span>
                </div>
                <span className="text-red-400 text-xs font-bold bg-red-400/10 px-2 py-1 rounded">-8.1%</span>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Carbon Offset</p>
                <p className="text-3xl font-black text-white">{carbonOffset.toLocaleString()} <span className="text-lg font-normal text-slate-500">MT CO2e</span></p>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Section */}
            <div className="lg:col-span-2 bg-surface-dark rounded-xl border border-border-dark overflow-hidden flex flex-col">
              <div className="p-6 border-b border-border-dark flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">City Collection Density</h3>
                  <p className="text-xs text-slate-500">Live heatmap of waste pickup requests across districts</p>
                </div>
                <select onChange={(e) => toast(`Map timeframe changed to: ${e.target.value}`)} className="bg-background-dark border-border-dark rounded-lg text-xs py-1 px-3 focus:ring-primary outline-none text-slate-400 cursor-pointer">
                  <option>Last 24 Hours</option>
                  <option>Last 7 Days</option>
                </select>
              </div>
              <div className="relative flex-1 min-h-[400px] bg-slate-800">
                <img className="w-full h-full object-cover opacity-60 grayscale brightness-50" data-alt="Modern dark satellite city map view" data-location="Metropolis Central" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp6QTQdue1uLKJ513M1f6SHIIV4NV6rBYYtkrolPYyzF8Wuy-97zOg-QgjbbqVaqxaGw7C9l1eacAo_AOkRSRDgwR-_Gk634MEr_x1Z5z8K8maF8r3pMwoiVY0LgWZI4-B6zAxZZNlq3X5T2pV8YpFsNhGQUIvgTDnmGtJ3EzSgJCEw_Tw-V6zmJWFv8MWyoa58dxeaSm9w1ZjFq_zXApVe3AiWkVW3JiQm4dVm8sqXaq43id-6nqdYtBZzZOQEo5FhfIjSEjM3CY" alt="City Map" />
                <div className="absolute top-1/4 left-1/3 size-16 bg-accent-green/30 rounded-full animate-[ping_3s_ease-in-out_infinite] flex items-center justify-center cursor-pointer" onClick={() => toast.success('District 1: High yield detected')}>
                  <div className="size-4 bg-accent-green rounded-full shadow-[0_0_15px_#0bda46]"></div>
                </div>
                <div className="absolute bottom-1/3 right-1/4 size-24 bg-accent-green/20 rounded-full animate-[ping_4s_ease-in-out_infinite] flex items-center justify-center cursor-pointer" onClick={() => toast.success('District 4: Optimal flow')}>
                  <div className="size-6 bg-accent-green rounded-full shadow-[0_0_20px_#0bda46]"></div>
                </div>
                <div className="absolute top-1/2 right-1/2 size-12 bg-primary/40 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform" onClick={() => toast('District 2: Sorting facility active')}>
                  <div className="size-3 bg-primary-light rounded-full"></div>
                </div>
                <div className="absolute bottom-4 left-4 bg-background-dark/90 backdrop-blur p-3 rounded-lg border border-border-dark text-[10px] space-y-2">
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
            <div className="bg-surface-dark rounded-xl border border-border-dark flex flex-col">
              <div className="p-6 border-b border-border-dark">
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
                      <span className="text-slate-300 font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-primary/10 rounded-xl border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer" onClick={() => toast('Deploying new bins to Central Plaza...', { icon: '🚚' })}>
                  <div className="flex items-center gap-3 text-accent-green mb-2">
                    <span className="material-symbols-outlined text-sm">tips_and_updates</span>
                    <span className="text-xs font-bold uppercase tracking-wider">Optimization Insight</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Plastic collection increased by 15% in District 4. Consider deploying additional bins to "Central Plaza" zone. Click to action.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-surface-dark rounded-xl border border-border-dark overflow-hidden">
            <div className="p-6 border-b border-border-dark flex items-center justify-between">
              <h3 className="font-bold text-lg">Recent Collections</h3>
              <button onClick={() => toast('Loading full collection history...')} className="text-primary-light hover:text-accent-green text-sm font-medium transition-colors">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-background-dark/50 text-slate-500 font-medium whitespace-nowrap">
                  <tr>
                    <th className="px-6 py-4">Pickup ID</th>
                    <th className="px-6 py-4">District</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Weight</th>
                    <th className="px-6 py-4">Tokens Awarded</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-dark">
                  {batches.slice(0, 5).map(batch => (
                    <tr key={batch.id} className="hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => toast(`Tracking Pickup #${batch.id}`)}>
                      <td className="px-6 py-4 font-mono text-slate-400">#{batch.id}</td>
                      <td className="px-6 py-4 text-white hover:text-primary transition-colors">{batch.source}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${batch.type.includes('PLASTIC') ? 'bg-blue-500/10 text-blue-400' :
                            batch.type.includes('GLASS') ? 'bg-accent-green/10 text-accent-green' :
                              batch.type.includes('PAPER') ? 'bg-amber-500/10 text-amber-400' :
                                'bg-slate-500/10 text-slate-400'
                          }`}>{batch.type}</span>
                      </td>
                      <td className="px-6 py-4 text-white">{batch.weight} kg</td>
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
        </div>

        {/* Footer */}
        <footer className="p-8 border-t border-border-dark flex flex-col md:flex-row items-center justify-between text-slate-500 text-xs gap-4 mt-auto">
          <p>© 2024 ZeroWaste City Initiative. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-white transition-colors cursor-pointer" onClick={() => toast('Privacy Policy downloaded')}>Privacy Policy</a>
            <a className="hover:text-white transition-colors cursor-pointer" onClick={() => toast('Redirecting to Docs...')}>API Documentation</a>
            <a className="hover:text-white transition-colors cursor-pointer" onClick={() => toast('Opening Support Ticket window')}>Support</a>
          </div>
        </footer>
      </main>
    </div>
  )
}

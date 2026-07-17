
import React from 'react';
import MetricCard from './MetricCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Deadline, FileActivity } from '../types';

const data: FileActivity[] = [
  { day: 'Mon', uploads: 4, tasks: 2 },
  { day: 'Tue', uploads: 3, tasks: 5 },
  { day: 'Wed', uploads: 8, tasks: 3 },
  { day: 'Thu', uploads: 5, tasks: 6 },
  { day: 'Fri', uploads: 12, tasks: 8 },
  { day: 'Sat', uploads: 7, tasks: 4 },
  { day: 'Sun', uploads: 2, tasks: 1 },
];

const deadlines: Deadline[] = [
  { id: '1', title: 'Q4 Financial Report', dueDate: 'Today', priority: 'high', folder: 'Finance' },
  { id: '2', title: 'Product Roadmap Update', dueDate: 'Tomorrow', priority: 'medium', folder: 'Product' },
  { id: '3', title: 'Client Feedback Survey', dueDate: 'Jan 15', priority: 'low', folder: 'Marketing' },
];

const DashboardView: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
            Dashboard <span className="gradient-text">Overview</span>
          </h1>
          <p className="text-gray-400 mt-3 text-lg font-medium flex items-center gap-3">
            <span className="text-cyan-400">Ava Gibbs,</span> you have 24 active tasks across 4 projects.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="glass px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-300 flex items-center gap-3 border border-white/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
              LIVE ANALYTICS
           </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Upcoming Deadlines" 
          value="12" 
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
          trend="+2 vs last week"
          color="cyan"
        />
        <MetricCard 
          label="High Priority Items" 
          value="04" 
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>}
          trend="Immediate attention"
          color="amber"
        />
        <MetricCard 
          label="Task Completion" 
          value="85%" 
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
          trend="↑ 12% boost"
          color="emerald"
        />
        <MetricCard 
          label="Storage Allocated" 
          value="12.4GB" 
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19c.3 0 .5-.2.5-.5V10c0-1.7-1.3-3-3-3H7a4 4 0 0 0-4 4v8c0 .5.2.7.5.7h14z"/><path d="M12 2v5"/><path d="M12 18v3"/><path d="M21 12h3"/><path d="M0 12h3"/></svg>}
          trend="65% of 20GB"
          color="indigo"
        />
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Activity Chart */}
        <div className="lg:col-span-2 glass rounded-[32px] p-8 border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-10 relative z-10">
            <div>
              <h2 className="text-2xl font-black tracking-tight">Productivity Flow</h2>
              <p className="text-sm text-gray-500 font-medium">Monitoring your upload patterns and task speed</p>
            </div>
            <div className="flex gap-2">
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold transition-colors">DAILY</button>
                <button className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 rounded-xl px-4 py-2 text-xs font-bold transition-colors">WEEKLY</button>
            </div>
          </div>
          <div className="h-[350px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 12, fontWeight: 600}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 12, fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#fff', fontWeight: 700 }}
                  cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="uploads" stroke="#22d3ee" fillOpacity={1} fill="url(#colorUploads)" strokeWidth={4} />
                <Area type="monotone" dataKey="tasks" stroke="#818cf8" fillOpacity={1} fill="url(#colorTasks)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Deadlines List */}
        <div className="glass rounded-[32px] p-8 border border-white/5 flex flex-col shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black tracking-tight">Deadlines</h2>
            <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
          <div className="space-y-4 flex-1">
            {deadlines.map((deadline) => (
              <div key={deadline.id} className="group relative p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${
                  deadline.priority === 'high' ? 'bg-rose-500' :
                  deadline.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                }`}></div>
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-sm font-bold truncate group-hover:text-cyan-400 transition-colors pr-4">{deadline.title}</h3>
                   <span className="text-[10px] font-black text-white/40 group-hover:text-white/80 uppercase tracking-tighter shrink-0">{deadline.dueDate}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-0.5 rounded-md uppercase tracking-wider">{deadline.folder}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      deadline.priority === 'high' ? 'bg-rose-500' : 'bg-amber-500'
                    }`}></span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-white/5 relative group hover:scale-[1.02] transition-transform cursor-help">
             <div className="relative z-10">
               <div className="flex items-center gap-2 mb-2">
                 <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                 <p className="text-xs font-black text-cyan-400 uppercase tracking-widest">SMART SUMMARY</p>
               </div>
               <p className="text-sm font-medium text-gray-300 leading-relaxed">
                 You are <span className="text-white font-bold">18% faster</span> this month. Keep this momentum to clear your Q4 targets early.
               </p>
             </div>
          </div>
        </div>
      </div>

      {/* Grid of smaller cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
          {[
            { label: 'Total Files', val: '1,248', icon: <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>, color: 'text-cyan-400' },
            { label: 'Cloud Folders', val: '42', icon: <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>, color: 'text-indigo-400' },
            { label: 'Team Members', val: '12', icon: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>, color: 'text-emerald-400' },
            { label: 'Security Score', val: '98%', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>, color: 'text-rose-400' }
          ].map((item, i) => (
            <div key={i} className="glass p-6 rounded-3xl border border-white/5 flex items-center gap-5 hover:bg-white/5 transition-colors cursor-default">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${item.color}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{item.icon}</svg>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{item.label}</p>
                <p className="text-xl font-bold mt-0.5">{item.val}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashboardView;

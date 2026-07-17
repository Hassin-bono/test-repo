
import React from 'react';
import { Metric } from '../types';

const MetricCard: React.FC<Metric> = ({ label, value, icon, trend, color }) => {
  const colorMap = {
    cyan: 'from-cyan-500 to-cyan-400',
    amber: 'from-amber-500 to-amber-400',
    emerald: 'from-emerald-500 to-emerald-400',
    rose: 'from-rose-500 to-rose-400',
    indigo: 'from-indigo-500 to-indigo-400',
  };

  const textMap = {
    cyan: 'text-cyan-400',
    amber: 'text-amber-400',
    emerald: 'text-emerald-400',
    rose: 'text-rose-400',
    indigo: 'text-indigo-400',
  };

  const bgMap = {
    cyan: 'bg-cyan-500/10 border-cyan-500/20',
    amber: 'bg-amber-500/10 border-amber-500/20',
    emerald: 'bg-emerald-500/10 border-emerald-500/20',
    rose: 'bg-rose-500/10 border-rose-500/20',
    indigo: 'bg-indigo-500/10 border-indigo-500/20',
  };

  return (
    <div className="glass group relative p-6 rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
      <div className={`absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${textMap[color]}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
      </div>

      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300 ${bgMap[color]}`}>
        <div className={textMap[color]}>{icon}</div>
      </div>

      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{label}</h3>
        <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight">{value}</span>
        </div>
        {trend && (
           <div className="mt-2 text-xs font-semibold text-gray-500 flex items-center gap-1">
              <span className={textMap[color]}>{trend}</span>
           </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;

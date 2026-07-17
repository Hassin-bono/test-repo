
import React from 'react';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  onToggleAi: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleAi }) => {
  const navItems = [
    { path: '/', label: 'Overview' },
    { path: '/files', label: 'Files' },
    { path: '/deadlines', label: 'Deadlines' },
    { path: '/tasks', label: 'Tasks' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl border border-white/10 px-6 h-16 flex items-center justify-between shadow-2xl shadow-black/50">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-xl glow-cyan flex items-center justify-center shadow-lg shadow-cyan-500/20">
             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19c.3 0 .5-.2.5-.5V10c0-1.7-1.3-3-3-3H7a4 4 0 0 0-4 4v8c0 .5.2.7.5.7h14z"/><path d="M12 2v5"/><path d="M12 18v3"/><path d="M21 12h3"/><path d="M0 12h3"/></svg>
          </div>
          <span className="text-xl font-bold tracking-tighter hidden sm:block">Cloudlette<span className="text-cyan-400">.</span></span>
        </div>

        {/* Centered Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${
                  isActive 
                    ? 'text-cyan-400 bg-white/5' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {item.label}
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 scale-0'}`
                }
              >
                {/* Visual indicator dot */}
                <span></span>
              </NavLink>
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleAi}
            className="p-2 rounded-xl text-gray-400 hover:text-cyan-400 transition-all group relative"
            title="AI Assistant"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"/><circle cx="17" cy="7" r="5"/></svg>
            <span className="absolute top-0 right-0 w-2 h-2 bg-cyan-400 rounded-full border-2 border-[#030712] animate-pulse"></span>
          </button>
          
          <div className="w-[1px] h-6 bg-white/10 mx-1 hidden sm:block"></div>

          <div className="flex items-center gap-3 pl-1 group cursor-pointer">
            <div className="flex flex-col items-end hidden lg:flex">
              <span className="text-xs font-bold text-white leading-none">Ava Gibbs</span>
              <span className="text-[10px] text-gray-500 font-medium">Pro Member</span>
            </div>
            <div className="w-9 h-9 rounded-xl border border-white/10 overflow-hidden ring-2 ring-transparent group-hover:ring-cyan-500/30 transition-all shadow-lg">
              <img src="https://picsum.photos/seed/ava/100" alt="Ava" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

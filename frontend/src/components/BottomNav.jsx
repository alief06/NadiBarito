import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Map, Utensils, Calendar } from 'lucide-react';

const BottomNav = () => {
    const navItems = [
        { to: '/', icon: <Home size={20} />, label: 'Home' },
        { to: '/explore', icon: <Compass size={20} />, label: 'Wisata' },
        { to: '/culinary', icon: <Utensils size={20} />, label: 'Kuliner' },
        { to: '/map', icon: <Map size={20} />, label: 'Peta' },
        { to: '/planner', icon: <Calendar size={20} />, label: 'Planner' },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/80 backdrop-blur-2xl border-t border-white/5 px-6 py-4 z-50 flex justify-between items-center shadow-2xl">
            {navItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => `flex flex-col items-center gap-1.5 transition-all duration-300 ${isActive ? 'text-[#f97316] scale-110' : 'text-white/20 hover:text-white/40'
                        }`}
                >
                    <div className={`${({ isActive }) => isActive ? 'drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]' : ''}`}>
                        {item.icon}
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-widest">{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomNav;

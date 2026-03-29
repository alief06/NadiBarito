import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Map, Calendar, User } from 'lucide-react';

const BottomNav = () => {
    const navItems = [
        { to: '/', icon: <Home size={20} />, label: 'Home' },
        { to: '/explore', icon: <Compass size={20} />, label: 'Explore' },
        { to: '/map', icon: <Map size={20} />, label: 'Map' },
        { to: '/planner', icon: <Calendar size={20} />, label: 'Planner' },
        { to: '/dashboard', icon: <User size={20} />, label: 'Akun' },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-heritage-dark-surface/90 backdrop-blur-lg border-t border-gray-100 dark:border-white/5 px-6 py-3 z-50 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            {navItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-heritage-gold' : 'text-gray-400 dark:text-gray-500'
                        }`}
                >
                    {item.icon}
                    <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomNav;

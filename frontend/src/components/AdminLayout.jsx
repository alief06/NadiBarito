import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    MapPin,
    Utensils,
    LogOut,
    Home,
    ChevronRight,
    Search,
    Settings,
    Bell,
    Layers,
    Menu,
    X,
    Users,
    MessageSquare,
    Calendar,
    BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const navItems = [
        { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/places', icon: <MapPin size={20} />, label: 'Wisata' },
        { path: '/admin/culinary', icon: <Utensils size={20} />, label: 'Kuliner' },
        { path: '/admin/events', icon: <Calendar size={20} />, label: 'Event' },
        { path: '/admin/culture', icon: <BookOpen size={20} />, label: 'Budaya' },
        { path: '/admin/users', icon: <Users size={20} />, label: 'Users' },
        { path: '/admin/reviews', icon: <MessageSquare size={20} />, label: 'Reviews' },
    ];

    return (
        <div className="flex min-h-screen bg-heritage-cream/30 dark:bg-heritage-dark overflow-hidden transition-colors duration-500">
            {/* Sidebar */}
            <aside
                className={`bg-heritage-brown text-white transition-all duration-500 ease-in-out hidden md:flex flex-col sticky top-0 h-screen ${isSidebarOpen ? 'w-72' : 'w-24'}`}
            >
                {/* Brand */}
                <div className="p-24 border-b border-white/10 flex items-center justify-between overflow-hidden h-32">
                    <Link to="/admin" className="flex items-center gap-12 group">
                        <div className={`h-16 transition-all duration-500 ${isSidebarOpen ? 'w-auto' : 'w-16 overflow-hidden'}`}>
                            <img src={logo} alt="NirantaJogja" className="h-full w-auto object-contain brightness-110" />
                        </div>
                    </Link>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 p-16 space-y-8 mt-16 overflow-hidden">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-12 px-16 py-12 rounded-2xl transition-all duration-300 relative group ${location.pathname === item.path
                                ? 'bg-heritage-gold text-heritage-brown font-bold shadow-xl shadow-heritage-gold/20'
                                : 'hover:bg-white/10 text-white/70 hover:text-white'
                                }`}
                        >
                            <div className="min-w-[20px]">{item.icon}</div>
                            {isSidebarOpen && <span className="whitespace-nowrap">{item.label}</span>}
                            {location.pathname === item.path && isSidebarOpen && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute left-0 w-1 h-24 bg-heritage-cream rounded-full"
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="p-16 border-t border-white/10 space-y-8">
                    <Link to="/" className="flex items-center gap-12 px-16 py-12 rounded-2xl hover:bg-white/10 transition-colors text-white/70 hover:text-white overflow-hidden">
                        <Home size={20} />
                        {isSidebarOpen && <span className="whitespace-nowrap">Lihat Website</span>}
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-12 px-16 py-12 rounded-2xl hover:bg-red-500/20 text-red-400 transition-colors overflow-hidden"
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="whitespace-nowrap">Keluar</span>}
                    </button>

                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="hidden md:flex items-center justify-center gap-12 px-16 py-12 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors text-white/40 w-full"
                    >
                        {isSidebarOpen ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Header */}
                <header className="bg-white/80 dark:bg-heritage-dark-surface/80 backdrop-blur-xl h-20 shadow-sm flex items-center justify-between px-32 sticky top-0 z-[100] border-b border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-16">
                        <div className="flex items-center gap-8 text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">
                            <span className="text-heritage-brown dark:text-heritage-gold">Control</span>
                            <ChevronRight size={14} />
                            <span className="text-gray-300 capitalize font-medium">{location.pathname.split('/').pop() || 'Dashboard'}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-24 relative">
                        {/* Search Bar */}
                        <div className="hidden lg:flex items-center relative group">
                            <Search className="absolute left-12 text-gray-300 group-focus-within:text-heritage-gold transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Cari data..."
                                className="pl-40 pr-16 py-8 rounded-full bg-gray-50 dark:bg-black/20 border border-transparent focus:border-heritage-gold/30 focus:outline-none text-small font-medium transition-all w-64 focus:w-80"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="p-8 text-gray-400 hover:text-heritage-gold transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-8 right-8 w-8 h-8 bg-red-500 border-2 border-white dark:border-heritage-dark rounded-full"></span>
                        </button>

                        {/* User Profile */}
                        <div className="relative border-l border-gray-100 dark:border-white/5 pl-24">
                            <button
                                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                className="flex items-center gap-12 group focus:outline-none"
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="text-small font-bold text-heritage-brown dark:text-heritage-gold group-hover:opacity-80 transition-opacity">{user?.name || 'Administrator'}</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold opacity-60">Admin Portal</p>
                                </div>
                                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-heritage-gold to-heritage-brown text-white flex items-center justify-center font-bold shadow-lg shadow-heritage-gold/20 rotate-3 group-hover:rotate-0 transition-transform">
                                    {user?.name?.[0] || 'A'}
                                </div>
                            </button>

                            <AnimatePresence>
                                {showProfileDropdown && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-16 w-64 bg-white dark:bg-heritage-dark-surface rounded-[24px] shadow-2xl border border-black/5 dark:border-white/5 py-12 z-[110] overflow-hidden"
                                    >
                                        <div className="px-16 py-12 border-b border-gray-50 dark:border-white/5 mb-8">
                                            <p className="text-small font-bold dark:text-white line-clamp-1">{user?.name}</p>
                                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-4">Full Access</p>
                                        </div>
                                        <button className="w-full flex items-center gap-12 px-16 py-12 text-small font-bold text-gray-600 dark:text-white/70 hover:bg-heritage-cream/30 dark:hover:bg-white/5 transition-colors">
                                            <Settings size={16} className="text-heritage-gold" />
                                            Pengaturan Akun
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-12 px-16 py-12 text-small font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                        >
                                            <LogOut size={16} />
                                            Log Out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-32 lg:p-48 overflow-y-auto custom-scrollbar">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={location.pathname}
                        className="max-w-[1600px] mx-auto"
                    >
                        <Outlet />
                    </motion.div>
                </main>
            </div>

            {/* Mobile Sidebar Overlay (could be added later for better mobile UX) */}
            <AnimatePresence>
                {showProfileDropdown && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[105]"
                        onClick={() => setShowProfileDropdown(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminLayout;

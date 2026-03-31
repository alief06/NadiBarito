import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    Menu, Map as MapIcon, Utensils, Compass,
    Calendar, User, LayoutDashboard, Sun,
    Moon, LogOut, Globe, X, Cpu, Sparkles
} from 'lucide-react';
import Logo from './Logo';
import Button from './Button';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [lang, setLang] = useState(i18n.language.toUpperCase());

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    const toggleLang = () => {
        const newLang = i18n.language === 'ID' ? 'EN' : 'ID';
        i18n.changeLanguage(newLang);
        setLang(newLang);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) setUser(JSON.parse(storedUser));
        } catch (err) {
            console.error("Failed to parse user from localStorage", err);
        }
    }, []);

    const navLinks = [
        { to: '/explore', icon: <Compass size={16} />, label: t('nav.explore') },
        { to: '/history', icon: <Calendar size={16} />, label: t('nav.history') },
        { to: '/culture', icon: <Globe size={16} />, label: t('nav.culture') },
        { to: '/modern', icon: <Cpu size={16} />, label: t('nav.modern') },
        { to: '/culinary', icon: <Utensils size={16} />, label: t('nav.culinary') },
        { to: '/map', icon: <MapIcon size={16} />, label: t('nav.map') },
        { to: '/planner', icon: <Calendar size={16} />, label: t('nav.planner') },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-16 md:px-32 ${
                isScrolled
                    ? 'bg-white/80 dark:bg-heritage-dark-surface/80 backdrop-blur-xl shadow-lg shadow-black/5 py-4 border-b border-black/5 dark:border-white/5'
                    : 'bg-transparent py-12'
            }`}
        >
            <div className="max-w-container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex flex-row items-center gap-4 group">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="w-10 h-10 md:w-12 md:h-12 text-[#f97316] drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]"
                    >
                        <Logo />
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col"
                    >
                        <span className="text-2xl md:text-3xl font-bold tracking-[0.2em] text-[#f97316] font-sans uppercase">
                            NADIBARITO
                        </span>
                        <span className="text-[10px] md:text-[12px] text-white/50 tracking-[0.1em] font-medium uppercase mt-1">
                            The Digital Pulse of Thousand Rivers
                        </span>
                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <div className={`hidden lg:flex gap-4 xl:gap-8 items-center px-8 py-4 rounded-full transition-colors duration-500 ${
                    !isScrolled ? 'bg-black/10 dark:bg-white/10 backdrop-blur-md border border-white/10' : ''
                }`}>
                    {navLinks.map((link) => (
                        <NavLinkItem
                            key={link.to}
                            to={link.to}
                            icon={link.icon}
                            label={link.label}
                            isActive={location.pathname === link.to}
                            isScrolled={isScrolled}
                        />
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex gap-4 lg:gap-8 items-center shrink-0">
                    {/* Ask AI Button */}
                    <button className="flex items-center gap-2 px-6 lg:px-8 py-3 rounded-full transition-all duration-300 bg-[#f59e0b] hover:bg-yellow-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)] border-none whitespace-nowrap">
                        <Sparkles size={14} className="text-black" />
                        <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest">Tanya AI</span>
                    </button>

                    {/* Language Toggle */}
                    <div className="flex items-center border-l border-white/20 pl-4 lg:pl-6 ml-2 lg:ml-4">
                        <button onClick={toggleLang} className="flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white px-2 py-2 transition-colors">
                            <Globe size={14} />
                            <span>{lang}</span>
                        </button>
                    </div>

                    {/* User Profile / Auth */}
                    {user ? (
                        <div className="relative ml-2">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className={`flex items-center gap-3 p-2 pr-4 lg:pr-6 rounded-full border transition-all ${
                                    !isScrolled ? 'border-white/20 hover:bg-black/20 text-white backdrop-blur-md' : 'border-black/10 dark:border-white/10 hover:shadow-md'
                                }`}
                            >
                                <div className="w-8 h-8 rounded-full bg-heritage-gold flex items-center justify-center text-black font-bold text-xs shrink-0">
                                    {user.name?.[0]}
                                </div>
                                <span className="text-xs font-bold truncate max-w-[80px] lg:max-w-none">{user.name}</span>
                            </button>

                            <AnimatePresence>
                                {showDropdown && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="absolute right-0 mt-8 w-56 bg-white/95 dark:bg-heritage-dark-surface/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/5 dark:border-white/10 py-8 z-[60] overflow-hidden"
                                    >
                                        <Link
                                            to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                            className="flex items-center gap-12 px-16 py-12 text-small font-bold text-gray-700 dark:text-gray-200 hover:bg-heritage-gold/10 transition-colors"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            <LayoutDashboard size={14} className="text-heritage-gold" />
                                            {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-12 px-16 py-12 text-small font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors border-t border-black/5 dark:border-white/5"
                                        >
                                            <LogOut size={14} />
                                            Log Out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex gap-8">
                            <Button variant={!isScrolled ? 'outline' : 'ghost'} size="sm" onClick={() => navigate('/login')} className={!isScrolled ? 'border-white/30 text-white hover:bg-white hover:text-black' : ''}>
                                {lang === 'ID' ? 'Masuk' : 'Login'}
                            </Button>
                            <Button variant="primary" size="sm" onClick={() => navigate('/register')} className="shadow-lg shadow-heritage-brown/20">
                                {lang === 'ID' ? 'Daftar' : 'Join'}
                            </Button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`md:hidden p-8 rounded-full border backdrop-blur-md focus:outline-none transition-colors ${
                        !isScrolled ? 'border-white/20 text-white bg-black/10' : 'border-black/10 dark:border-white/10 text-heritage-brown dark:text-heritage-gold'
                    }`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute top-full left-0 right-0 md:hidden bg-white/95 dark:bg-heritage-dark-surface/95 backdrop-blur-xl border-t border-black/5 dark:border-white/10 shadow-2xl overflow-hidden"
                    >
                        <div className="flex flex-col gap-4 p-24">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.to}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        to={link.to}
                                        className="flex items-center gap-16 px-16 py-12 rounded-xl text-small font-bold text-heritage-brown dark:text-heritage-gold hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <div className="p-8 rounded-full bg-heritage-gold/10 text-heritage-gold">
                                            {link.icon}
                                        </div>
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <div className="grid grid-cols-2 gap-12 pt-16 mt-8 border-t border-black/5 dark:border-white/10">
                                <button onClick={toggleLang} className="flex items-center justify-center gap-8 py-12 rounded-xl bg-black/5 dark:bg-white/5 text-xs font-bold">
                                    <Globe size={16} /> {lang}
                                </button>
                                <button onClick={() => setDarkMode(!darkMode)} className="flex items-center justify-center gap-8 py-12 rounded-xl bg-black/5 dark:bg-white/5 text-xs font-bold">
                                    {darkMode ? <Sun size={16} /> : <Moon size={16} />} Theme
                                </button>
                            </div>
                            {!user && (
                                <div className="flex flex-col gap-8 mt-12">
                                    <Button variant="primary" onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}>Login</Button>
                                    <Button variant="outline" onClick={() => { navigate('/register'); setIsMobileMenuOpen(false); }}>Register</Button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {showDropdown && (
                <div
                    className="fixed inset-0 z-[55]"
                    onClick={() => setShowDropdown(false)}
                />
            )}
        </nav>
    );
};

const NavLinkItem = ({ to, icon, label, isActive, isScrolled }) => (
    <Link to={to} className={`relative flex items-center gap-6 font-bold text-xs uppercase tracking-wider transition-all duration-300 group py-4 ${
        isActive
            ? (isScrolled ? 'text-heritage-brown dark:text-heritage-gold' : 'text-white')
            : (isScrolled ? 'text-heritage-brown/60 dark:text-heritage-dark-text/60 hover:text-heritage-brown dark:hover:text-heritage-gold' : 'text-white/70 hover:text-white')
        }`}>
        <span className="group-hover:scale-110 transition-transform opacity-70 group-hover:opacity-100">{icon}</span>
        <span>{label}</span>
        {isActive && (
            <motion.div
                layoutId="nav-underline"
                className={`absolute -bottom-6 left-0 right-0 h-2 rounded-full ${isScrolled ? 'bg-heritage-brown dark:bg-heritage-gold' : 'bg-white'}`}
            />
        )}
    </Link>
);

export default Navbar;


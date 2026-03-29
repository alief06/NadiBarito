import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    Menu, Map as MapIcon, Utensils, Compass,
    Calendar, User, LayoutDashboard, Sun,
    Moon, LogOut, Globe, X, Cpu, Sparkles
} from 'lucide-react';
import logo from '../assets/logo.png';
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
        { to: '/explore', icon: <Compass size={18} />, label: t('nav.explore') },
        { to: '/history', icon: <Calendar size={18} />, label: t('nav.history') },
        { to: '/culture', icon: <Globe size={18} />, label: t('nav.culture') },
        { to: '/modern', icon: <Cpu size={18} />, label: t('nav.modern') },
        { to: '/culinary', icon: <Utensils size={18} />, label: t('nav.culinary') },
        { to: '/map', icon: <MapIcon size={18} />, label: t('nav.map') },
        { to: '/planner', icon: <Calendar size={18} />, label: t('nav.planner') },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-16 md:px-32 ${isScrolled
                ? 'bg-white/90 dark:bg-heritage-dark/90 backdrop-blur-xl shadow-lg py-4'
                : 'bg-heritage-cream/50 dark:bg-heritage-dark/50 backdrop-blur-md py-8'
                }`}
        >
            <div className="max-w-container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-12 group">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="h-14 md:h-20"
                    >
                        <img
                            src={logo}
                            alt="NirantaJogja"
                            className="h-full w-auto object-contain brightness-110"
                        />
                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-16 lg:gap-24 items-center">
                    {navLinks.map((link) => (
                        <NavLinkItem
                            key={link.to}
                            to={link.to}
                            icon={link.icon}
                            label={link.label}
                            isActive={location.pathname === link.to}
                        />
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex gap-16 items-center">
                    {/* Language Toggle */}
                    <button
                        onClick={toggleLang}
                        className="flex items-center gap-4 px-12 py-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-small font-semibold text-heritage-brown dark:text-heritage-gold"
                    >
                        <Globe size={16} />
                        {lang}
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-heritage-brown dark:text-heritage-gold transition-colors"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* User Profile */}
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-8 p-4 pr-12 rounded-full border border-black/10 dark:border-white/10 hover:shadow-md transition-all focus:outline-none"
                            >
                                <div className="w-32 h-32 rounded-full bg-heritage-gold flex items-center justify-center text-heritage-brown font-bold text-sm">
                                    {user.name?.[0]}
                                </div>
                                <span className="text-small font-bold text-heritage-brown dark:text-heritage-dark-text">{user.name}</span>
                            </button>

                            <AnimatePresence>
                                {showDropdown && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-8 w-56 bg-white dark:bg-heritage-dark-surface rounded-2xl shadow-2xl border border-black/5 dark:border-white/5 py-8 z-[60] overflow-hidden"
                                    >
                                        <Link
                                            to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                            className="flex items-center gap-12 px-16 py-12 text-body text-gray-700 dark:text-gray-200 hover:bg-heritage-cream/50 dark:hover:bg-white/5 transition-colors font-bold"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            <LayoutDashboard size={18} className="text-heritage-gold" />
                                            {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                                        </Link>
                                        <Link
                                            to="/profile"
                                            className="flex items-center gap-12 px-16 py-12 text-body text-gray-700 dark:text-gray-200 hover:bg-heritage-cream/50 dark:hover:bg-white/5 transition-colors font-bold"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            <User size={18} className="text-heritage-gold" />
                                            Profil Saya
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-12 px-16 py-12 text-body text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors border-t border-black/5 dark:border-white/5 font-bold"
                                        >
                                            <LogOut size={18} />
                                            Log Out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex gap-8">
                            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                                {lang === 'ID' ? 'Masuk' : 'Login'}
                            </Button>
                            <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
                                {lang === 'ID' ? 'Daftar' : 'Join'}
                            </Button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-8 text-heritage-brown dark:text-heritage-gold focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-heritage-dark overflow-hidden transition-colors border-t border-black/5 dark:border-white/5"
                    >
                        <div className="flex flex-col gap-16 p-24">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="flex items-center gap-12 text-h3 font-semibold text-heritage-brown dark:text-heritage-gold"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            ))}
                            <div className="grid grid-cols-2 gap-16 pt-16 border-t border-black/5 dark:border-white/5">
                                <button onClick={toggleLang} className="flex items-center justify-center gap-8 py-12 rounded-xl bg-black/5 dark:bg-white/5 text-small font-bold">
                                    <Globe size={18} /> {lang}
                                </button>
                                <button onClick={() => setDarkMode(!darkMode)} className="flex items-center justify-center gap-8 py-12 rounded-xl bg-black/5 dark:bg-white/5 text-small font-bold">
                                    {darkMode ? <Sun size={18} /> : <Moon size={18} />} Theme
                                </button>
                            </div>
                            {!user && (
                                <div className="flex flex-col gap-8">
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

const NavLinkItem = ({ to, icon, label, isActive }) => (
    <Link to={to} className={`relative flex items-center gap-8 font-semibold transition-all duration-300 group py-8 ${isActive
        ? 'text-heritage-gold'
        : 'text-heritage-brown/70 dark:text-heritage-dark-text/70 hover:text-heritage-gold'
        }`}>
        <span className="group-hover:scale-110 transition-transform">{icon}</span>
        <span>{label}</span>
        {isActive && (
            <motion.div
                layoutId="nav-underline"
                className="absolute -bottom-4 left-0 right-0 h-2 bg-heritage-gold rounded-full"
            />
        )}
    </Link>
);

export default Navbar;

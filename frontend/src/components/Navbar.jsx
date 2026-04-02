import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    Menu, Map as MapIcon, Utensils, Compass,
    Calendar, Sun, Moon, Globe, X, Cpu, Sparkles
} from 'lucide-react';
import Logo from './Logo';
import Button from './Button';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [lang, setLang] = useState(i18n.language.toUpperCase());

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

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
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-6 md:px-12 ${isScrolled
                    ? 'bg-[#0a0a0a]/90 backdrop-blur-2xl py-3 border-b border-white/5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]'
                    : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-[1600px] mx-auto grid grid-cols-3 items-center">
                
                {/* Left Navigation Group */}
                <div className={`hidden lg:flex items-center gap-1 xl:gap-2 px-4 py-2 rounded-full border transition-all duration-700 justify-start w-fit ${
                    !isScrolled 
                    ? 'bg-white/5 border-white/10 backdrop-blur-md' 
                    : 'bg-white/5 border-transparent'
                }`}>
                    {navLinks.slice(0, 3).map((link) => (
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

                {/* Center: Majestic Logo Identity */}
                <div className="flex flex-col items-center justify-center">
                    <Link to="/" className="flex flex-col items-center group gap-2">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className={`${isScrolled ? 'w-10 h-10' : 'w-16 h-16'} text-[#f97316] drop-shadow-[0_0_20px_rgba(249,115,22,0.6)] transition-all duration-500`}
                        >
                            <Logo />
                        </motion.div>
                        {!isScrolled && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center text-center"
                            >
                                <span className="text-xl font-serif font-bold tracking-[0.3em] text-white uppercase leading-tight">
                                    Nadi<span className="text-[#f97316]">Barito</span>
                                </span>
                                <span className="text-[7px] text-white/30 tracking-[0.2em] font-mono font-medium uppercase">
                                    The River's Heartbeat
                                </span>
                            </motion.div>
                        )}
                        {isScrolled && (
                             <span className="text-xs font-serif font-bold tracking-[0.2em] text-white uppercase">
                                Nadi<span className="text-[#f97316]">Barito</span>
                            </span>
                        )}
                    </Link>
                </div>

                {/* Right Navigation & Actions Group */}
                <div className="flex items-center justify-end gap-6">
                    <div className={`hidden lg:flex items-center gap-1 xl:gap-2 px-4 py-2 rounded-full border transition-all duration-700 ${
                        !isScrolled 
                        ? 'bg-white/5 border-white/10 backdrop-blur-md' 
                        : 'bg-white/5 border-transparent'
                    }`}>
                        {navLinks.slice(3).map((link) => (
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

                    {/* Language Toggle */}
                    <div className="hidden md:flex items-center dark:border-white/10 ml-2">
                        <button onClick={toggleLang} className="flex items-center gap-2 text-[10px] font-bold text-white/80 hover:text-white px-3 py-2 rounded-full border border-white/10 bg-white/5 transition-all uppercase tracking-widest">
                            <Globe size={12} />
                            <span>{lang}</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden p-3 rounded-xl border backdrop-blur-md focus:outline-none transition-all ${
                            !isScrolled 
                            ? 'border-white/20 text-white bg-white/5' 
                            : 'border-white/10 text-heritage-gold bg-white/5'
                        }`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu (Same as before, hidden logic remains) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute top-full left-0 right-0 md:hidden bg-[#0a0a0a]/95 backdrop-blur-2xl border-t border-white/5 shadow-2xl overflow-hidden"
                    >
                        <div className="flex flex-col gap-2 p-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.to}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                >
                                    <Link
                                        to={link.to}
                                        className="flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-bold text-white/70 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <div className="text-[#f97316]">
                                            {link.icon}
                                        </div>
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const NavLinkItem = ({ to, icon, label, isActive, isScrolled }) => (
    <Link to={to} className={`relative flex items-center gap-2 font-bold text-[10px] uppercase tracking-[0.1em] font-sans transition-all duration-300 group py-2 px-4 rounded-full ${
        isActive
        ? 'text-white bg-white/10'
        : 'text-white/50 hover:text-white hover:bg-white/5'
    }`}>
        <span className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform">{icon}</span>
        <span>{label}</span>
    </Link>
);

export default Navbar;


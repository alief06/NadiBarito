import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, Map as MapIcon, Utensils, Compass,
    Calendar, Globe, X, Cpu, Target
} from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { to: '/explore', icon: <Compass size={16} />, label: 'Destinasi' },
        { to: '/history', icon: <Calendar size={16} />, label: 'Sejarah' },
        { to: '/culture', icon: <Globe size={16} />, label: 'Budaya' },
        { to: '/modern', icon: <Cpu size={16} />, label: 'Modern City' },
        { to: '/culinary', icon: <Utensils size={16} />, label: 'Gastronomi' },
        { to: '/map', icon: <MapIcon size={16} />, label: 'Peta Karsa' }
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-6 md:px-12 ${isScrolled
                    ? 'bg-[#050505]/90 backdrop-blur-3xl py-4 border-b border-white/5 shadow-2xl'
                    : 'bg-transparent py-8'
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                
                {/* Branding - Left */}
                <Link to="/" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 text-[#f97316] drop-shadow-[0_0_15px_rgba(249,115,22,0.5)] group-hover:scale-110 transition-transform duration-500">
                        <Logo />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-serif font-bold tracking-[0.2em] text-white uppercase leading-none">
                            Nadi<span className="text-[#f97316]">Barito</span>
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation - Center */}
                <div className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-3xl px-4 py-2 rounded-full absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.to}
                            to={link.to} 
                            className={`relative flex items-center gap-2 font-bold text-[10px] uppercase tracking-[0.1em] transition-all duration-300 group py-2 px-4 rounded-full ${
                            location.pathname === link.to
                            ? 'text-white bg-[#f97316] shadow-[0_0_20px_rgba(249,115,22,0.4)]'
                            : 'text-white/50 hover:text-white hover:bg-white/10'
                        }`}>
                            <span className="opacity-70 group-hover:opacity-100">{link.icon}</span>
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </div>

                {/* Actions - Right */}
                <div className="flex items-center gap-6">
                    <Link to="/planner" className="hidden lg:flex items-center gap-2 text-[10px] font-bold text-white bg-white/5 hover:bg-[#f97316] hover:text-white px-6 py-3 rounded-full border border-white/10 transition-all uppercase tracking-widest shadow-lg">
                        <Calendar size={14} /> Smart Planner
                    </Link>

                    {/* Admin Secret Portal Icon */}
                    <button 
                        onClick={() => navigate('/super-secret-admin-nadibarito')}
                        className="hidden md:flex p-2 text-white/20 hover:text-[#f97316] transition-colors hover:scale-110"
                        title="Command Center"
                    >
                        <Target size={18} />
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-3 rounded-xl border border-white/10 text-white bg-white/5 backdrop-blur-md"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 right-0 lg:hidden bg-[#050505]/95 backdrop-blur-3xl border-t border-white/5 shadow-3xl overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
                                        location.pathname === link.to ? 'bg-[#f97316] text-white' : 'text-white/70 hover:bg-white/5'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <div className={location.pathname === link.to ? 'text-white' : 'text-[#f97316]'}>
                                        {link.icon}
                                    </div>
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                to="/planner"
                                className="flex items-center gap-4 px-6 py-4 mt-4 rounded-2xl text-xs font-bold uppercase tracking-widest bg-white/5 text-white border border-white/10"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Calendar size={16} className="text-[#f97316]" /> Smart Planner
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

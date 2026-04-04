import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import { motion } from 'framer-motion';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-[#050505] transition-colors duration-500">
            <Navbar />
            <main className="pt-24 pb-16 md:pb-0">
                <div className="selection:bg-[#f97316]/30">
                    <Outlet />
                </div>
            </main>
            <BottomNav />

            <footer className="bg-[#050505] text-white py-32 px-6 border-t border-white/5 relative overflow-hidden">
                {/* Decorative background pulse */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#f97316]/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left relative z-10">
                    <div className="flex flex-col items-center md:items-start group">
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="flex flex-col mb-6 cursor-pointer"
                        >
                            <span className="text-3xl font-serif font-bold tracking-tighter text-white uppercase group-hover:text-[#f97316] transition-colors">
                                NADI<span className="text-[#f97316] group-hover:text-white transition-colors">BARITO</span>
                            </span>
                            <span className="text-[10px] text-white/30 tracking-[0.4em] font-bold uppercase mt-2">
                                Pulse of the Thousand Rivers
                            </span>
                        </motion.div>
                        <p className="text-white/40 max-w-sm text-sm font-serif italic leading-relaxed border-l border-white/10 pl-6">
                            "Kayuh Baimbai" — Mendayung bersama-sama membawa memori dan karsa dari riak Sungai Barito melintasi garis masa depan digital.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-10 text-[10px] font-bold uppercase tracking-widest text-white/50">
                        <span className="hover:text-[#f97316] cursor-pointer transition-all duration-300">Tentang Kami</span>
                        <span className="hover:text-[#f97316] cursor-pointer transition-all duration-300">Kontak</span>
                        <span className="hover:text-[#f97316] cursor-pointer transition-all duration-300">Kebijakan Privasi</span>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#f97316]/40">
                            © 2026 NADIBARITO.
                        </div>
                        <div className="text-[8px] text-white/20 uppercase tracking-tighter">
                            National Competition Build • v2.1.0-Release
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;

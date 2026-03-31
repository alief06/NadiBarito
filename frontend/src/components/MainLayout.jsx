import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import logo from '../assets/logo.png';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-heritage-cream dark:bg-heritage-dark transition-colors duration-300">
            <Navbar />
            <main className="pt-24 pb-16 md:pb-0">
                <Outlet />
            </main>
            <BottomNav />

            <footer className="bg-heritage-brown text-white py-24 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start group">
                        <div className="flex flex-col mb-4">
                            <span className="text-2xl font-bold tracking-[0.2em] bg-gradient-to-r from-orange-400 to-yellow-600 bg-clip-text text-transparent font-sans uppercase">
                                NADIBARITO
                            </span>
                            <span className="text-[10px] text-white/50 tracking-[0.1em] font-medium uppercase mt-1">
                                Pulse of the Thousand Rivers
                            </span>
                        </div>
                        <p className="opacity-70 max-w-sm">Membawa tradisi Kalimantan Selatan ke era digital dengan solusi cerdas untuk pariwisata.</p>
                    </div>
                    <div className="flex gap-8 opacity-90">
                        <span className="hover:text-heritage-gold cursor-pointer transition-colors">Tentang Kami</span>
                        <span className="hover:text-heritage-gold cursor-pointer transition-colors">Kontak</span>
                        <span className="hover:text-heritage-gold cursor-pointer transition-colors">Kebijakan Privasi</span>
                    </div>
                    <div className="text-sm opacity-50">
                        © 2026 NADIBARITO. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map as MapIcon, Home, ArrowLeft, Compass } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const NotFound = () => {
    return (
        <PageTransition>
            <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 overflow-hidden relative selection:bg-[#f97316]/30">
                {/* Immersive background elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-[500px] h-[500px] border border-white/5 rounded-full blur-3xl bg-[#f97316]/5 animate-pulse" />
                    <div className="absolute bottom-20 right-20 w-[600px] h-[600px] border border-white/5 rounded-full blur-3xl bg-[#f97316]/5 animate-pulse delay-1000" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl w-full text-center relative z-10 space-y-12"
                >
                    <div className="relative inline-block group">
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 6,
                                ease: "easeInOut"
                            }}
                            className="text-[#f97316] relative z-10"
                        >
                            <Compass size={180} strokeWidth={0.5} className="drop-shadow-[0_0_50px_rgba(249,115,22,0.3)]" />
                        </motion.div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18rem] font-serif font-black text-white/5 -z-10 tracking-tighter italic">
                            404
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight italic">
                            Koordinat <span className="text-[#f97316]">Hilang</span>
                        </h2>
                        <p className="text-white/40 max-w-lg mx-auto leading-relaxed text-lg font-serif italic border-l-2 border-[#f97316]/30 pl-8">
                            Sepertinya Anda telah melampaui batas cakrawala Nadi Barito. Halaman yang Anda cari sedang mengembara di luar peta digital kami.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                        <Link 
                            to="/" 
                            className="bg-white text-black font-bold py-5 px-10 rounded-2xl flex items-center justify-center gap-4 uppercase text-[10px] tracking-widest hover:bg-[#f97316] hover:text-white transition-all shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)] active:scale-95"
                        >
                            <Home size={18} />
                            Kembali ke Pusat
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="bg-white/5 border border-white/10 text-white font-bold py-5 px-10 rounded-2xl flex items-center justify-center gap-4 uppercase text-[10px] tracking-widest hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
                        >
                            <ArrowLeft size={18} />
                            Cakrawala Terakhir
                        </button>
                    </div>

                    <div className="pt-20 opacity-20 pointer-events-none">
                        <div className="flex justify-center items-center gap-4 text-[#f97316] text-[8px] font-bold uppercase tracking-[0.5em]">
                            <div className="w-12 h-px bg-[#f97316]" />
                            The Digital Pulse of Thousand Rivers
                            <div className="w-12 h-px bg-[#f97316]" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default NotFound;

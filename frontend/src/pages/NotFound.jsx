import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map as MapIcon, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-heritage-cream flex items-center justify-center px-6 overflow-hidden relative">
            {/* Artistic background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 border-2 border-heritage-gold rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 border border-heritage-gold rounded-full"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full text-center relative z-10"
            >
                <div className="mb-8 relative inline-block">
                    <motion.div
                        animate={{
                            rotate: [0, 5, -5, 0],
                            y: [0, -10, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 4,
                            ease: "easeInOut"
                        }}
                        className="text-heritage-gold"
                    >
                        <MapIcon size={120} strokeWidth={1} />
                    </motion.div>
                    <div className="absolute -top-4 -right-4 bg-heritage-brown text-white w-14 h-14 rounded-full flex items-center justify-center font-heritage font-bold text-2xl border-4 border-heritage-cream">
                        ?
                    </div>
                </div>

                <h1 className="text-8xl font-heritage font-bold text-heritage-brown mb-2">404</h1>
                <h2 className="text-2xl font-bold text-heritage-brown uppercase tracking-widest mb-6">Halaman Hilang</h2>

                <p className="text-gray-600 mb-10 leading-relaxed">
                    Sepertinya Anda tersesat di lorong waktu Kalimantan Selatan. Halaman yang Anda cari tidak dapat ditemukan di peta kami.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/" className="btn-primary flex items-center justify-center gap-2">
                        <Home size={18} />
                        Kembali ke Beranda
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="btn-secondary flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        Halaman Sebelumnya
                    </button>
                </div>
            </motion.div>

            {/* Decorative Kalsel Motif */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-heritage-brown/5 flex justify-center items-end opacity-20">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-12 h-12 border-t-2 border-r-2 border-heritage-gold rotate-45 transform translate-y-6 mx-2"></div>
                ))}
            </div>
        </div>
    );
};

export default NotFound;

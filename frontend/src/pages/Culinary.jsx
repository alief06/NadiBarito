import React, { useState, useEffect, useMemo } from 'react';
import { useTourismStore } from '../store/useTourismStore';
import { Search, Utensils, Loader2, SlidersHorizontal, MapPin, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CulinaryCard from '../components/CulinaryCard';
import { CulinarySkeleton } from '../components/Skeleton';
import PageTransition from '../components/PageTransition';
import { Container, Section, Grid } from '../components/Layout';
import Button from '../components/Button';

const Culinary = () => {
    const { culinary } = useTourismStore();
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const filteredCulinary = useMemo(() => {
        return culinary.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                                item.category.toLowerCase().includes(search.toLowerCase());
            const matchesPrice = !priceRange || item.priceRange.toLowerCase().includes(priceRange.toLowerCase());
            return matchesSearch && matchesPrice;
        });
    }, [culinary, search, priceRange]);

    return (
        <PageTransition>
            <div className="bg-[#050505] min-h-screen pb-20">
                <Section>
                    <Container>
                        {/* Dramatic Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-24 pt-12 md:pt-20 text-center"
                        >
                            <span className="text-[#f97316] text-[10px] font-bold uppercase tracking-widest bg-[#f97316]/10 px-6 py-2 rounded-full border border-[#f97316]/20 mb-6 inline-block">
                                Simfoni Gastronomi Banjar
                            </span>
                            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight tracking-tight">
                                Cita Rasa <span className="text-[#f97316]">Nadi Barito</span>
                            </h1>
                            <p className="max-w-2xl mx-auto text-lg text-white/40 leading-relaxed italic font-serif">
                                Menjelajahi jejak rempah legendaris, dari kehangatan Soto Banjar hingga manisnya Bingka yang memikat setiap karsa.
                            </p>
                        </motion.div>

                        {/* Immersive Search & Filters */}
                        <div className="flex flex-col md:flex-row gap-8 mb-16 items-center max-w-4xl mx-auto">
                            <div className="flex-1 w-full relative group">
                                <div className="absolute inset-0 bg-[#f97316]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-[#f97316]/50 transition-colors" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Cari narasi rasa atau aroma khas..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-16 pr-8 py-5 rounded-[2rem] bg-white/5 border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#f97316]/50 transition-all font-serif italic text-lg shadow-2xl"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-3 px-8 py-5 rounded-full border transition-all text-[10px] font-bold uppercase tracking-widest ${
                                    showFilters ? 'bg-[#f97316] border-[#f97316] text-white' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                                }`}
                            >
                                <SlidersHorizontal size={18} />
                                Filter Karsa
                            </button>
                        </div>

                        {/* Refined Filters */}
                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden mb-16 max-w-4xl mx-auto"
                                >
                                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 flex flex-wrap gap-6 items-center justify-center">
                                        <div className="flex items-center gap-4">
                                            <span className="text-[9px] font-bold uppercase tracking-meta text-white/20">Klasifikasi Harga:</span>
                                            <div className="flex flex-wrap gap-3">
                                                {['', '25k', '5k'].map((range) => (
                                                    <button
                                                        key={range}
                                                        onClick={() => setPriceRange(range)}
                                                        className={`px-6 py-2 rounded-full text-[10px] font-bold border transition-all tracking-widest ${priceRange === range
                                                            ? 'bg-[#f97316] text-white border-[#f97316] shadow-[0_5px_15px_rgba(249,115,22,0.3)]'
                                                            : 'bg-transparent text-white/30 border-white/10 hover:border-[#f97316]/50'
                                                            }`}
                                                    >
                                                        {range === '' ? 'SEMUA' : `Rp ${range}`}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Artistic Results Grid */}
                        {loading ? (
                            <Grid cols={3} gap={12}>
                                {[...Array(6)].map((_, i) => (
                                    <CulinarySkeleton key={i} />
                                ))}
                            </Grid>
                        ) : filteredCulinary.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-32 rounded-[3.5rem] bg-white/5 border border-dashed border-white/5"
                            >
                                <Utensils className="mx-auto text-white/10 mb-8" size={64} />
                                <h3 className="text-3xl font-serif font-bold text-white mb-4 italic">Belum Ada Aroma Rasa</h3>
                                <p className="text-white/30 text-sm italic font-serif">Kriteria ini belum menemukan jejak kulinernya. Silakan coba karsa lainnya.</p>
                                <button className="mt-8 text-[#f97316] font-bold uppercase text-[10px] tracking-widest hover:underline" onClick={() => { setSearch(''); setPriceRange(''); }}>Reset Filter</button>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {filteredCulinary.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <CulinaryCard item={item} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </Container>
                </Section>
            </div>
        </PageTransition>
    );
};

export default Culinary;

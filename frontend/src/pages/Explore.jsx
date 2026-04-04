import React, { useState, useEffect, useMemo } from 'react';
import PlaceCard from '../components/PlaceCard';
import { Search, Compass, Sparkles, SlidersHorizontal, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlaceSkeleton } from '../components/Skeleton';
import PageTransition from '../components/PageTransition';
import { Container, Section, Grid } from '../components/Layout';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { useTourismStore } from '../store/useTourismStore';
import Fuse from 'fuse.js';

const Explore = () => {
    const { places } = useTourismStore();
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Initialize Fuse.js for fuzzy search
    const fuse = useMemo(() => new Fuse(places, {
        keys: ['name', 'description', 'category'],
        threshold: 0.35,
        includeMatches: true
    }), [places]);

    const filteredPlaces = useMemo(() => {
        let results;
        if (search) {
            results = fuse.search(search).map(r => r.item);
        } else {
            results = [...places];
        }

        if (category) {
            results = results.filter(p => p.category === category);
        }
        return results;
    }, [search, category, places, fuse]);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const recommendations = useMemo(() => places.slice(0, 4), [places]);

    const categories = [
        { id: '', label: 'Semua Kategori' },
        { id: 'River Experience', label: 'River Experience' },
        { id: 'Religious Heritage', label: 'Religious Heritage' },
        { id: 'Urban Landmark', label: 'Urban Landmark' }
    ];

    return (
        <PageTransition>
            <div className="bg-[#050505] min-h-screen pb-20">
                <Section>
                    <Container>
                        {/* Immersive Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-24 pt-12 md:pt-20 text-center"
                        >
                            <span className="text-[#f97316] text-[10px] font-bold uppercase tracking-widest bg-[#f97316]/10 px-6 py-2 rounded-full border border-[#f97316]/20 mb-6 inline-block">
                                Ekspedisi Nadi Barito
                            </span>
                            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight tracking-tight">
                                Jelajah <span className="text-[#f97316]">Istimewa</span>
                            </h1>
                            <p className="max-w-2xl mx-auto text-lg text-white/40 leading-relaxed italic font-serif">
                                Menemukan oase budaya dan saksi sejarah di tanah Seribu Sungai. Setiap koordinat menyimpan cerita yang menanti untuk Anda tuliskan kembali.
                            </p>
                        </motion.div>

                        {/* Search & Categories Node */}
                        <div className="flex flex-col md:flex-row gap-8 mb-16 items-center max-w-5xl mx-auto">
                            <div className="flex-1 w-full relative group">
                                <div className="absolute inset-0 bg-[#f97316]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-[#f97316]/50 transition-colors" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Cari pasar terapung, masjid, atau ikon kota..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-16 pr-8 py-5 rounded-[2.5rem] bg-white/5 border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#f97316]/50 transition-all font-serif italic text-lg shadow-2xl"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setCategory(cat.id)}
                                        className={`px-8 py-4 rounded-full whitespace-nowrap text-[10px] font-bold border transition-all uppercase tracking-widest ${category === cat.id
                                            ? 'bg-[#f97316] text-white border-[#f97316] shadow-[0_10px_20px_-10px_rgba(249,115,22,0.5)]'
                                            : 'bg-white/5 text-white/40 border-white/5 hover:border-[#f97316]/30'
                                            }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {loading ? (
                            <Grid cols={3} gap={10}>
                                {[...Array(6)].map((_, i) => (
                                    <PlaceSkeleton key={i} />
                                ))}
                            </Grid>
                        ) : (
                            <div className="space-y-32">
                                {/* Seasonal Recommendations */}
                                <AnimatePresence>
                                    {!search && !category && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            className="pt-10"
                                        >
                                            <div className="flex items-center gap-6 mb-12">
                                                <div className="w-12 h-px bg-white/10" />
                                                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#f97316] flex items-center gap-3">
                                                    <Sparkles size={16} /> Pilihan Kurator
                                                </h2>
                                                <div className="flex-1 h-px bg-white/10" />
                                            </div>
                                            <Grid cols={4} gap={8}>
                                                {recommendations.map((place) => (
                                                    <PlaceCard key={`rec-${place.id}`} place={place} isCompact={true} />
                                                ))}
                                            </Grid>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Results Grid */}
                                <div className="space-y-12">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <h2 className="text-3xl font-serif font-bold text-white mb-2">Semua Destinasi</h2>
                                            <p className="text-white/20 text-xs uppercase tracking-widest font-bold">Ditemukan {filteredPlaces.length} Koordinat</p>
                                        </div>
                                    </div>

                                    {filteredPlaces.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                            {filteredPlaces.map((place, index) => (
                                                <motion.div
                                                    key={place.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <PlaceCard place={place} />
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-40 rounded-[3.5rem] bg-white/5 border border-dashed border-white/5"
                                        >
                                            <Compass className="mx-auto text-white/10 mb-8 animate-pulse" size={64} />
                                            <h3 className="text-3xl font-serif font-bold text-white mb-4 italic">Koordinat Tidak Ditemukan</h3>
                                            <p className="text-white/30 text-sm max-w-md mx-auto italic font-serif">Peta kami belum mencatat lokasi ini. Cobalah kata kunci lain untuk melanjutkan ekspedisi.</p>
                                            <button className="mt-8 text-[#f97316] font-bold uppercase text-[10px] tracking-widest hover:underline" onClick={() => { setSearch(''); setCategory(''); }}>Tampilkan Semua</button>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        )}
                    </Container>
                </Section>
            </div>
        </PageTransition>
    );
};

export default Explore;

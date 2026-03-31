import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import PlaceCard from '../components/PlaceCard';
import { Search, Filter, Compass, Sparkles, SlidersHorizontal, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlaceSkeleton } from '../components/Skeleton';
import PageTransition from '../components/PageTransition';
import { getRecommendations } from '../utils/recommendationSystem';
import { Container, Section, Grid } from '../components/Layout';
import Button from '../components/Button';
import Badge from '../components/Badge';

const Explore = () => {
    const [places, setPlaces] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [user, setUser] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/places`, {
                    params: { category, search }
                });
                setPlaces(response.data);

                if (!search && !category) {
                    const favIds = user?.favorites || [];
                    const recs = getRecommendations(response.data, [], favIds);
                    setRecommendations(recs);
                } else {
                    setRecommendations([]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchPlaces, 400);
        return () => clearTimeout(debounce);
    }, [search, category, user]);

    const categories = [
        { id: '', label: 'Semua' },
        { id: 'Budaya', label: 'Budaya' },
        { id: 'Alam', label: 'Alam' },
        { id: 'Sejarah', label: 'Sejarah' }
    ];

    return (
        <PageTransition>
            <div className="bg-heritage-cream dark:bg-heritage-dark min-h-screen">
                <Section>
                    <Container>
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-48"
                        >
                            <h1 className="text-h1 font-heritage mb-16">
                                Destinasi <span className="text-heritage-gold">Istimewa</span>
                            </h1>
                            <p className="max-w-2xl text-body opacity-80 leading-relaxed">
                                Jelajahi keajaiban budaya, keindahan alam, dan saksi bisu sejarah yang menjadikan Kalimantan Selatan sebagai jantung tradisi Pulau Jawa.
                            </p>
                        </motion.div>

                        {/* Search & Categories */}
                        <div className="flex flex-col md:flex-row gap-16 mb-48 items-end">
                            <div className="flex-1 w-full">
                                <div className="relative">
                                    <Search className="absolute left-16 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Cari candi, pantai, atau museum..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-48 pr-16 py-16 rounded-2xl bg-white dark:bg-heritage-dark-surface border border-black/5 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-heritage-gold/50 transition-all font-medium text-body shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-12 w-full md:w-auto overflow-x-auto pb-8 md:pb-0 scrollbar-hide">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setCategory(cat.id)}
                                        className={`px-24 py-12 rounded-full whitespace-nowrap text-small font-bold border transition-all ${category === cat.id
                                            ? 'bg-heritage-gold text-white border-heritage-gold shadow-md'
                                            : 'bg-white dark:bg-heritage-dark-surface text-gray-500 border-black/5 dark:border-white/5 hover:border-heritage-gold'
                                            }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {loading ? (
                            <Grid cols={3}>
                                {[...Array(6)].map((_, i) => (
                                    <PlaceSkeleton key={i} />
                                ))}
                            </Grid>
                        ) : (
                            <>
                                {/* Recommendations */}
                                <AnimatePresence>
                                    {recommendations.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            className="mb-64"
                                        >
                                            <div className="flex items-center gap-12 mb-24">
                                                <div className="p-8 bg-heritage-gold/10 rounded-xl text-heritage-gold">
                                                    <Sparkles size={24} />
                                                </div>
                                                <h2 className="text-h3 font-heritage font-bold">Rekomendasi Untuk Anda</h2>
                                            </div>
                                            <Grid cols={4}>
                                                {recommendations.map((place) => (
                                                    <PlaceCard key={`rec-${place._id}`} place={place} isCompact={true} />
                                                ))}
                                            </Grid>
                                            <div className="h-px bg-black/5 dark:bg-white/5 mt-48" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Main Results */}
                                {places.length > 0 ? (
                                    <Grid cols={3}>
                                        {places.map((place) => (
                                            <PlaceCard key={place._id} place={place} />
                                        ))}
                                    </Grid>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-64 rounded-[40px] bg-white dark:bg-heritage-dark-surface border-2 border-dashed border-heritage-gold/20"
                                    >
                                        <Compass className="mx-auto text-heritage-gold/30 mb-16" size={64} />
                                        <h3 className="text-h3 font-bold mb-8">Destinasi Tidak Ditemukan</h3>
                                        <p className="text-body opacity-60">Maaf, kami tidak menemukan tempat yang sesuai dengan pencarian Anda.</p>
                                        <Button variant="outline" className="mt-24" onClick={() => { setSearch(''); setCategory(''); }}>Tampilkan Semua</Button>
                                    </motion.div>
                                )}
                            </>
                        )}
                    </Container>
                </Section>
            </div>
        </PageTransition>
    );
};

export default Explore;

import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Search, Utensils, Loader2, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CulinaryCard from '../components/CulinaryCard';
import { CulinarySkeleton } from '../components/Skeleton';
import PageTransition from '../components/PageTransition';
import { Container, Section, Grid } from '../components/Layout';
import { Input, Select } from '../components/Input';
import Button from '../components/Button';

const Culinary = () => {
    const [culinary, setCulinary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchCulinary = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/culinary`, {
                    params: { priceRange, search }
                });
                setCulinary(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchCulinary, 400);
        return () => clearTimeout(debounce);
    }, [search, priceRange]);

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
                                Cita Rasa <span className="text-heritage-gold">Kalsel</span>
                            </h1>
                            <p className="max-w-2xl text-body opacity-80 leading-relaxed">
                                Dari kehangatan Gudeg hingga aroma kopi legendaris, temukan pengalaman kuliner yang akan memanjakan setiap selera Anda di jantung Kalimantan Selatan.
                            </p>
                        </motion.div>

                        {/* Search & Filters */}
                        <div className="flex flex-col md:flex-row gap-16 mb-48 items-end">
                            <div className="flex-1 w-full">
                                <div className="relative">
                                    <Search className="absolute left-16 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Cari masakan atau restoran..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-48 pr-16 py-16 rounded-2xl bg-white dark:bg-heritage-dark-surface border border-black/5 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-heritage-gold/50 transition-all font-medium text-body shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-12 w-full md:w-auto">
                                <Button
                                    variant={showFilters ? 'primary' : 'outline'}
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex-1 md:flex-none"
                                >
                                    <SlidersHorizontal size={20} className="mr-8" />
                                    Filter
                                </Button>
                            </div>
                        </div>

                        {/* Collapsible Filters */}
                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden mb-48"
                                >
                                    <div className="p-24 rounded-3xl bg-white dark:bg-heritage-dark-surface border border-black/5 dark:border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24">
                                        <div className="flex flex-col gap-8">
                                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Range Harga</span>
                                            <div className="flex flex-wrap gap-8">
                                                {['', 'Murah', 'Populer', 'Premium'].map((range) => (
                                                    <button
                                                        key={range}
                                                        onClick={() => setPriceRange(range)}
                                                        className={`px-12 py-6 rounded-full text-xs font-bold border transition-all ${priceRange === range
                                                            ? 'bg-heritage-gold text-white border-heritage-gold'
                                                            : 'bg-transparent text-gray-500 border-gray-200 dark:border-white/10 hover:border-heritage-gold'
                                                            }`}
                                                    >
                                                        {range || 'Semua'}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Results */}
                        {loading ? (
                            <Grid cols={3}>
                                {[...Array(6)].map((_, i) => (
                                    <CulinarySkeleton key={i} />
                                ))}
                            </Grid>
                        ) : culinary.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-64 rounded-3xl bg-white dark:bg-heritage-dark-surface border-2 border-dashed border-heritage-gold/20"
                            >
                                <Utensils className="mx-auto text-heritage-gold/30 mb-16" size={64} />
                                <h3 className="text-h3 font-bold mb-8">Belum Ada Hasil</h3>
                                <p className="text-body opacity-60">Tidak dapat menemukan kuliner yang sesuai dengan kriteria Anda.</p>
                                <Button variant="outline" className="mt-24" onClick={() => { setSearch(''); setPriceRange(''); }}>Reset Filter</Button>
                            </motion.div>
                        ) : (
                            <Grid cols={3}>
                                {culinary.map((item) => (
                                    <CulinaryCard key={item._id} item={item} />
                                ))}
                            </Grid>
                        )}
                    </Container>
                </Section>
            </div>
        </PageTransition>
    );
};

export default Culinary;

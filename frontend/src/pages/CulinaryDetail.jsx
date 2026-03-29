import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { Star, MapPin, Loader2, ArrowLeft, Send, Utensils, Heart, Share2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const CulinaryDetail = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [submitting, setSubmitting] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const [itemRes, reviewsRes] = await Promise.all([
                    api.get(`/culinary/${id}`),
                    api.get(`/reviews/${id}`)
                ]);
                setItem(itemRes.data);
                setReviews(reviewsRes.data);

                // Check if favorite
                const user = JSON.parse(localStorage.getItem('user'));
                if (user?.favorites?.includes(id)) {
                    setIsFavorite(true);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    const handleToggleFavorite = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Silakan login untuk menyimpan favorit');
            return;
        }

        try {
            await api.post('/users/favorites/toggle', { userId: user.id, placeId: id });
            setIsFavorite(!isFavorite);

            // Sync localStorage
            const updatedUser = { ...user };
            if (!isFavorite) {
                updatedUser.favorites = [...(updatedUser.favorites || []), id];
            } else {
                updatedUser.favorites = updatedUser.favorites.filter(fid => fid !== id);
            }
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Silakan login terlebih dahulu untuk memberikan ulasan.');
            return;
        }

        try {
            setSubmitting(true);
            const response = await api.post('/reviews', {
                userId: user.id,
                placeId: id,
                rating,
                comment
            });
            setReviews([response.data, ...reviews]);
            setComment('');
            setRating(5);
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-heritage-cream dark:bg-heritage-dark text-heritage-gold">
            <Loader2 className="animate-spin" size={48} />
        </div>
    );

    if (!item) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-heritage-cream dark:bg-heritage-dark px-6 text-center">
            <h2 className="text-3xl font-heritage font-bold text-heritage-brown dark:text-heritage-gold mb-4">Hidangan Tidak Ditemukan</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">Maaf, menu yang Anda cari mungkin sudah tidak tersedia atau sedang dalam pembaruan.</p>
            <Link to="/culinary" className="btn-secondary px-8">Kembali ke Kuliner</Link>
        </div>
    );

    return (
        <PageTransition>
            <div className="pb-20 bg-heritage-cream dark:bg-heritage-dark min-h-screen transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-6">
                    <Link to="/culinary" className="flex items-center gap-2 text-heritage-brown dark:text-heritage-gold hover:opacity-70 transition-all mb-8 group w-fit">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold uppercase tracking-widest text-xs">Menu Utama Kuliner</span>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                        {/* Image Section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                        >
                            <img
                                src={item.images?.[0] || 'https://via.placeholder.com/800x1000'}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Action Buttons */}
                            <div className="absolute top-6 right-6 flex flex-col gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleToggleFavorite}
                                    className="p-3 bg-white/90 dark:bg-black/40 backdrop-blur-md rounded-full shadow-xl text-red-500"
                                >
                                    <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-3 bg-white/90 dark:bg-black/40 backdrop-blur-md rounded-full shadow-xl text-heritage-brown dark:text-heritage-gold"
                                >
                                    <Share2 size={24} />
                                </motion.button>
                            </div>

                            {item.isHalal && (
                                <div className="absolute bottom-6 left-6 bg-green-600/90 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest shadow-2xl">
                                    Sertifikasi Halal
                                </div>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col"
                        >
                            <div className="mb-6 flex gap-3">
                                <span className="bg-heritage-gold/20 dark:bg-white/10 text-heritage-gold dark:text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-heritage-gold/10 dark:border-white/5">
                                    {item.priceRange}
                                </span>
                                <span className="bg-heritage-brown/10 dark:bg-white/5 text-heritage-brown dark:text-gray-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-heritage-gold/5">
                                    Kuliner Khas
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heritage font-bold text-heritage-brown dark:text-heritage-gold mb-6 leading-tight">
                                {item.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 mb-8">
                                <div className="flex items-center gap-2 bg-white dark:bg-heritage-dark-surface px-4 py-2 rounded-2xl shadow-sm border border-heritage-gold/5">
                                    <div className="flex text-heritage-gold">
                                        <Star size={20} fill="currentColor" />
                                    </div>
                                    <span className="font-bold text-lg dark:text-white">{item.rating}</span>
                                    <span className="text-gray-400 text-sm ml-1">({reviews.length} ulasan)</span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                    <MapPin size={20} className="text-heritage-gold" />
                                    <span className="font-medium">{item.location?.address || 'Yogyakarta'}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 rounded-2xl bg-white dark:bg-heritage-dark-surface border border-heritage-gold/5 flex items-center gap-3">
                                    <Clock className="text-heritage-gold" size={20} />
                                    <div>
                                        <div className="text-[10px] uppercase font-bold text-gray-400">Jam Buka</div>
                                        <div className="text-sm font-bold dark:text-white">08:00 - 21:00</div>
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white dark:bg-heritage-dark-surface border border-heritage-gold/5 flex items-center gap-3">
                                    <Utensils className="text-heritage-gold" size={20} />
                                    <div>
                                        <div className="text-[10px] uppercase font-bold text-gray-400">Tipe</div>
                                        <div className="text-sm font-bold dark:text-white">Makan di Tempat</div>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic text-lg opacity-90">
                                    "{item.description || "Nikmati kelezatan warisan budaya dalam setiap gigitan. Resep otentik yang dijaga secara turun-temurun."}"
                                </p>
                            </div>

                            <div className="mt-auto pt-8 border-t border-heritage-gold/10 dark:border-white/5 flex gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 bg-heritage-gold text-white dark:text-heritage-brown py-4 rounded-2xl font-bold text-lg shadow-xl shadow-heritage-gold/20"
                                >
                                    Pesan Sekarang
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        const url = `https://www.google.com/maps/dir/?api=1&destination=${item.location.lat},${item.location.lng}`;
                                        window.open(url, '_blank');
                                    }}
                                    className="px-6 border-2 border-heritage-brown dark:border-heritage-gold text-heritage-brown dark:text-heritage-gold rounded-2xl font-bold hover:bg-heritage-brown hover:text-white dark:hover:bg-heritage-gold dark:hover:text-heritage-brown transition-all shadow-lg"
                                >
                                    Rute
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Review Section */}
                    <div className="bg-white dark:bg-heritage-dark-surface rounded-[40px] p-8 md:p-12 shadow-2xl border border-heritage-gold/5 dark:border-white/5">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
                            <div className="w-full lg:w-3/5">
                                <div className="flex justify-between items-center mb-10">
                                    <h2 className="text-3xl font-heritage font-bold text-heritage-brown dark:text-white">Apa Kata Foodies?</h2>
                                    <div className="text-sm font-bold text-heritage-gold uppercase tracking-widest">{reviews.length} Review</div>
                                </div>

                                <div className="space-y-8 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                                    <AnimatePresence>
                                        {reviews.length === 0 ? (
                                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="italic text-gray-400 dark:text-gray-500 py-12 text-center text-lg">
                                                Belum ada ulasan rasa. Jadilah orang pertama yang menceritakan kelezatan ini!
                                            </motion.p>
                                        ) : (
                                            reviews.map((review, idx) => (
                                                <motion.div
                                                    key={review._id || idx}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="p-6 rounded-2xl bg-heritage-cream/20 dark:bg-white/5 border border-transparent hover:border-heritage-gold/10 transition-all group"
                                                >
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-heritage-gold/20 flex items-center justify-center text-heritage-gold font-bold">
                                                                {review.userId?.name?.[0] || 'U'}
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-heritage-brown dark:text-white">{review.userId?.name || 'Foodie'}</div>
                                                                <div className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-tighter">Verified Reviewer</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-1 text-heritage-gold">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "opacity-30"} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-600 dark:text-gray-400 italic">"{review.comment}"</p>
                                                </motion.div>
                                            ))
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="w-full lg:w-2/5 sticky top-32">
                                <div className="p-8 rounded-3xl bg-heritage-brown dark:bg-heritage-gold text-white dark:text-heritage-brown shadow-2xl">
                                    <h3 className="text-2xl font-heritage font-bold mb-6">Beri Rating Rasa</h3>
                                    <form onSubmit={handleSubmitReview} className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-3">Rating Kelezatan</label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map(num => (
                                                    <motion.button
                                                        key={num}
                                                        type="button"
                                                        whileHover={{ scale: 1.2 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => setRating(num)}
                                                        className={`p-1 transition-colors ${rating >= num ? 'text-white dark:text-heritage-brown' : 'text-white/30 dark:text-heritage-brown/30'}`}
                                                    >
                                                        <Star fill={rating >= num ? 'currentColor' : 'none'} size={32} />
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-3">Ulasan Singkat</label>
                                            <textarea
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                className="w-full bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/10 rounded-2xl p-4 outline-none focus:bg-white/20 dark:focus:bg-black/20 transition-all min-h-[120px] placeholder:text-white/30 dark:placeholder:text-black/30 text-white dark:text-heritage-brown font-medium"
                                                placeholder="Bagaimana rasanya? Ceritakan tekstur dan aromanya..."
                                                required
                                            />
                                        </div>
                                        <motion.button
                                            type="submit"
                                            disabled={submitting}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full bg-heritage-gold dark:bg-heritage-brown text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 shadow-xl"
                                        >
                                            {submitting ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                                            Bagikan Rasa
                                        </motion.button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default CulinaryDetail;

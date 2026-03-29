import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { MessageSquare, Trash2, Star, User, MapPin, Loader2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data } = await api.get('/reviews/admin/all');
                setReviews(data);
            } catch (err) {
                console.error("Failed to fetch reviews", err);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus ulasan ini?')) return;
        try {
            await api.delete(`/reviews/admin/${id}`);
            setReviews(reviews.filter(r => r._id !== id));
        } catch (err) {
            alert('Gagal menghapus ulasan');
        }
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-heritage-gold" size={40} />
        </div>
    );

    return (
        <div className="space-y-32">
            <div>
                <h1 className="text-3xl font-heritage font-bold text-heritage-brown">Moderasi <span className="text-heritage-gold">Ulasan</span></h1>
                <p className="text-gray-500 mt-2 text-small">Hapus ulasan atau komentar yang tidak sesuai dengan kebijakan komunitas.</p>
            </div>

            <div className="grid grid-cols-1 gap-16">
                <AnimatePresence>
                    {reviews.map((review) => (
                        <motion.div
                            key={review._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white p-24 rounded-[24px] shadow-lg border border-heritage-gold/5 flex flex-col md:flex-row justify-between gap-16"
                        >
                            <div className="flex-1 space-y-12">
                                <div className="flex items-center gap-12">
                                    <div className="w-10 h-10 rounded-full bg-heritage-brown text-white flex items-center justify-center font-bold">
                                        {review.userId?.name?.[0] || 'U'}
                                    </div>
                                    <div>
                                        <p className="font-bold text-heritage-brown">{review.userId?.name || 'Unknown User'}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{review.userId?.email}</p>
                                    </div>
                                    <div className="flex gap-1 text-heritage-gold ml-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                    <MapPin size={12} className="text-heritage-gold" />
                                    <span className="font-bold">{review.placeId?.name || 'Unknown Place'}</span>
                                    <span className="opacity-40">•</span>
                                    <span>{new Date(review.createdAt).toLocaleDateString('id-ID')}</span>
                                </div>
                                <p className="text-gray-600 italic bg-heritage-cream/20 p-16 rounded-2xl border border-heritage-gold/5">
                                    "{review.comment}"
                                </p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleDelete(review._id)}
                                    className="w-full md:w-auto flex items-center justify-center gap-2 px-20 py-12 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold text-sm shadow-sm"
                                >
                                    <ShieldAlert size={18} />
                                    Hapus Ulasan
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {reviews.length === 0 && (
                    <div className="text-center py-40 bg-white rounded-[32px] border border-dashed border-gray-200">
                        <MessageSquare className="mx-auto text-gray-200 mb-8" size={64} />
                        <p className="text-gray-400 font-bold">Belum ada ulasan untuk dimoderasi.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminReviews;

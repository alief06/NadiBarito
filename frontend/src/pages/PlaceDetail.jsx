import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTourismStore } from '../store/useTourismStore';
import { Star, MapPin, Loader2, ArrowLeft, Send, Heart, Share2, Sparkles, Landmark, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import { toast } from 'sonner';

const PlaceDetail = () => {
    const { id } = useParams();
    const { places, reviews, addReview, favorites, toggleFavorite } = useTourismStore();
    
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [name, setName] = useState('');

    useEffect(() => {
        const foundPlace = places.find(p => String(p.id) === String(id));
        setPlace(foundPlace);
        setLoading(false);
    }, [id, places]);

    const isFavorite = favorites.includes(id) || favorites.includes(Number(id)) || favorites.includes(String(id));
    const placeReviews = reviews.filter(r => String(r.targetId) === String(id));

    const handleToggleFavorite = () => {
        toggleFavorite(id);
        toast.success(isFavorite ? 'Dihapus dari favorit' : 'Ditambahkan ke favorit');
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (!name.trim()) return toast.error('Nama wajib diisi');
        
        addReview({
            targetId: id,
            name,
            rating,
            comment
        });
        
        setComment('');
        setName('');
        setRating(5);
        toast.success('Ulasan berhasil dikirim!');
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] text-[#f97316]">
            <Loader2 className="animate-spin" size={48} />
        </div>
    );

    if (!place) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] px-6 text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">Tempat Tidak Ditemukan</h2>
            <p className="text-white/40 mb-8 max-w-md">Destinasi ini mungkin telah dipindahkan atau dihapus oleh Admin.</p>
            <Link to="/explore" className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all">Kembali Jelajah</Link>
        </div>
    );

    return (
        <PageTransition>
            <SEO 
                title={place.name} 
                description={place.description} 
                image={place.image} 
                url={`https://nadibarito.com/place/${id}`}
                category={place.category}
            />
            <div className="pb-20 bg-[#050505] min-h-screen selection:bg-[#f97316]/30">
                <div className="max-w-7xl mx-auto px-6">
                    <Link to="/explore" className="flex items-center gap-3 text-white/40 hover:text-[#f97316] transition-all mb-12 group w-fit pt-12">
                        <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform duration-500" />
                        <span className="font-bold uppercase tracking-[0.3em] text-[10px]">Portal Jelajah</span>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-start">
                        {/* Image Gallery */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group h-[650px] rounded-[4rem] overflow-hidden shadow-3xl border border-white/5"
                        >
                            <img
                                src={place.image}
                                alt={place.name}
                                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />

                            {/* Legendary Overlay */}
                            {place.isLegendary && (
                                <div className="absolute top-10 left-10 z-20">
                                    <div className="flex items-center gap-3 px-6 py-3 bg-yellow-500/10 backdrop-blur-3xl border border-yellow-500/50 rounded-full shadow-[0_0_30px_rgba(234,179,8,0.4)]">
                                        <Sparkles size={16} className="text-yellow-400 animate-pulse" />
                                        <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-[0.3em] italic font-serif">Heritage Legend</span>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="absolute bottom-10 right-10 flex gap-4 z-20">
                                <button
                                    onClick={handleToggleFavorite}
                                    className={`p-6 backdrop-blur-3xl rounded-[2rem] shadow-3xl transition-all duration-500 ${isFavorite ? 'bg-[#f97316] text-white' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}
                                >
                                    <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
                                </button>
                                <button className="p-6 bg-white/5 backdrop-blur-3xl rounded-[2rem] shadow-3xl text-white border border-white/10 hover:bg-white/10 transition-all duration-500">
                                    <Share2 size={24} />
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col space-y-10"
                        >
                            <div className="flex flex-wrap gap-4 items-center">
                                <span className="bg-[#f97316]/10 text-[#f97316] px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] border border-[#f97316]/20">
                                    {place.category}
                                </span>
                                <span className="bg-white/5 text-white/40 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] border border-white/5 italic font-serif">
                                    {place.district}
                                </span>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-serif font-black text-white leading-none tracking-tighter italic">
                                {place.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-10">
                                <div className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-[2rem] border border-white/5">
                                    <Star size={24} className="text-[#f97316]" fill="#f97316" />
                                    <span className="font-bold text-3xl text-white font-serif">{place.rating}</span>
                                    <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest ml-1">{placeReviews.length || '0'} Narasi</span>
                                </div>

                                <div className="flex items-center gap-4 text-white/40 italic font-serif">
                                    <MapPin size={24} className="text-[#f97316]" />
                                    <span className="text-lg leading-none border-b border-white/10 pb-1">Banjarmasin, Indonesia</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <Landmark size={20} className="text-[#f97316]" />
                                    <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.5em]">Filosofi Tempat</h4>
                                </div>
                                <p className="text-2xl text-white/60 leading-relaxed font-serif italic border-l-2 border-[#f97316]/30 pl-10 py-2">
                                    {place.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-10">
                                <button className="bg-white text-black py-6 rounded-[2rem] font-black uppercase text-[12px] tracking-[0.4em] hover:bg-[#f97316] hover:text-white transition-all duration-700 shadow-3xl active:scale-95">
                                    Dapatkan Tiket
                                </button>
                                <button 
                                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`, '_blank')}
                                    className="bg-white/5 border border-white/10 text-white py-6 rounded-[2rem] font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-white/10 transition-all duration-500 flex items-center justify-center gap-4 group"
                                >
                                    <Navigation size={18} className="group-hover:rotate-45 transition-transform" />
                                    Akses Rute
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Review Section */}
                    <div className="max-w-5xl mx-auto space-y-24 py-32 border-t border-white/5">
                        <div className="text-center space-y-6">
                            <h2 className="text-5xl md:text-7xl font-serif font-black text-white italic tracking-tighter">Apa Kata <span className="text-[#f97316]">Peziarah?</span></h2>
                            <p className="text-white/40 text-lg max-w-xl mx-auto italic font-serif">Tinggalkan jejak cerita Anda tentang kemegahan dan karsa di tempat ini.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-24 items-start">
                            {/* Review Form */}
                            <div className="bg-white/2 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/5 space-y-10 shadow-3xl sticky top-32">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#f97316]">Tinggalkan Narasi</h3>
                                <form onSubmit={handleSubmitReview} className="space-y-6">
                                    <input 
                                        placeholder="Nama Lengkap" 
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 p-6 rounded-[2rem] text-sm focus:outline-none focus:ring-1 focus:ring-[#f97316] transition-all"
                                    />
                                    <div className="flex gap-4 py-4 justify-center">
                                        {[1,2,3,4,5].map(num => (
                                            <button 
                                                key={num} 
                                                type="button" 
                                                onClick={() => setRating(num)}
                                                className={`transition-all duration-500 ${rating >= num ? 'text-[#f97316] scale-125' : 'text-white/5 hover:text-white/20'}`}
                                            >
                                                <Star size={32} fill={rating >= num ? "currentColor" : "none"} strokeWidth={1.5} />
                                            </button>
                                        ))}
                                    </div>
                                    <textarea 
                                        placeholder="Bagikan pengalaman unik dan karsa Anda..." 
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                        rows={6}
                                        className="w-full bg-black/50 border border-white/10 p-8 rounded-[2.5rem] text-sm focus:outline-none focus:ring-1 focus:ring-[#f97316] transition-all italic font-serif"
                                    />
                                    <button type="submit" className="w-full bg-white text-black font-black py-6 rounded-[2.5rem] uppercase text-[12px] tracking-[0.4em] hover:bg-[#f97316] hover:text-white transition-all duration-700 shadow-3xl">
                                        Kirim Narasi
                                    </button>
                                </form>
                            </div>

                            {/* Reviews List */}
                            <div className="space-y-12">
                                <AnimatePresence mode="popLayout">
                                    {placeReviews.length === 0 ? (
                                        <div className="text-center py-32 text-white/5 italic font-serif text-3xl border border-white/5 border-dashed rounded-[4rem]">
                                            Belum ada ulasan. <br/> Jadilah yang pertama memberikan narasi.
                                        </div>
                                    ) : (
                                        placeReviews.map((review) => (
                                            <motion.div 
                                                key={review.id}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-white/2 p-10 rounded-[3rem] border border-white/5 space-y-6"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <div className="font-bold text-white text-lg font-serif italic">{review.name}</div>
                                                        <div className="text-[9px] text-[#f97316] uppercase tracking-[0.4em] font-bold mt-1">{review.date}</div>
                                                    </div>
                                                    <div className="flex gap-1 text-[#f97316]">
                                                        {Array.from({length: review.rating}).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                                    </div>
                                                </div>
                                                <p className="text-white/40 text-lg leading-relaxed italic font-serif border-l border-white/5 pl-8">"{review.comment}"</p>
                                            </motion.div>
                                        ))
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default PlaceDetail;

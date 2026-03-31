import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import {
    User as UserIcon,
    Calendar,
    Heart,
    MessageSquare,
    ChevronRight,
    Loader2,
    MapPin,
    ArrowRight,
    Star
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({ plans: 0, favorites: 0, reviews: 0 });
    const [itineraries, setItineraries] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('plans');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Dashboard | NADIBARITO';
        const storedUser = JSON.parse(localStorage.getItem('nadibarito_user'));
        if (!storedUser) {
            navigate('/login');
            return;
        }
        setUser(storedUser);

        const fetchDashboardData = async () => {
            try {
                const [itineraryRes, favoriteRes, reviewRes] = await Promise.all([
                    api.get(`/itinerary?userId=${storedUser.id}`),
                    api.get(`/api/users/favorites/${storedUser.id}`),
                    api.get(`/api/reviews/user/${storedUser.id}`)
                ]);

                setItineraries(itineraryRes.data);
                setFavorites(favoriteRes.data);
                setReviews(reviewRes.data);
                setStats({
                    plans: itineraryRes.data.length,
                    favorites: favoriteRes.data.length,
                    reviews: reviewRes.data.length
                });
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    if (!user) return null;

    const tabs = [
        { id: 'plans', label: 'Rencana Trip', icon: <Calendar size={18} />, count: stats.plans },
        { id: 'favorites', label: 'Favorit', icon: <Heart size={18} />, count: stats.favorites },
        { id: 'reviews', label: 'Ulasan Anda', icon: <MessageSquare size={18} />, count: stats.reviews },
    ];

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header Section */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-sm border border-white/10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/10 blur-[80px] rounded-full"></div>
                    
                    <div className="w-24 h-24 bg-[#112F36] border border-[#f97316]/30 rounded-full flex items-center justify-center text-[#f97316] text-3xl font-bold shadow-lg shadow-[#f97316]/20 z-10">
                        {user.name?.[0] || 'U'}
                    </div>
                    <div className="flex-1 text-center md:text-left z-10">
                        <h1 className="text-3xl font-sans font-bold text-white tracking-wide">
                            Selamat Datang di Banua, <span className="text-[#f97316]">{user.name}</span>!
                        </h1>
                        <p className="text-white/50 mt-1">Siap menjelajahi Sungai Barito dan sekitarnya hari ini?</p>
                    </div>
                    <div className="flex gap-4 z-10">
                        <Link to="/profile" className="px-6 py-4 rounded-2xl border border-white/20 text-white font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
                            Profil <UserIcon size={18} />
                        </Link>
                        <Link to="/planner" className="bg-[#f97316] hover:bg-orange-600 text-white rounded-2xl flex items-center gap-2 px-6 shadow-[0_4px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_4px_25px_rgba(249,115,22,0.5)] transition-all font-bold">
                            Buat Trip <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`p-6 rounded-2xl border transition-all text-left flex items-center justify-between group ${activeTab === tab.id
                                ? 'bg-[#f97316]/10 text-[#f97316] border-[#f97316]/50 shadow-[0_0_20px_rgba(249,115,22,0.2)]'
                                : 'bg-white/5 text-white/70 border-white/10 hover:border-[#f97316]/30 hover:bg-white/10'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${activeTab === tab.id ? 'bg-[#f97316]/20 text-[#f97316]' : 'bg-white/10 text-white/50'}`}>
                                    {tab.icon}
                                </div>
                                <div>
                                    <p className={`text-xs uppercase tracking-widest font-bold ${activeTab === tab.id ? 'text-[#f97316]' : 'text-white/40'}`}>
                                        {tab.label}
                                    </p>
                                    <h4 className={`text-2xl font-bold ${activeTab === tab.id ? 'text-white' : 'text-white/80'}`}>{tab.count}</h4>
                                </div>
                            </div>
                            <ChevronRight size={20} className={`${activeTab === tab.id ? 'text-[#f97316]' : 'text-white/20 group-hover:text-[#f97316]'} transition-colors`} />
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="animate-spin text-heritage-gold" size={40} />
                        </div>
                    ) : (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {activeTab === 'plans' && (
                                <div className="space-y-6">
                                    {itineraries.length === 0 ? (
                                        <EmptyState icon={<Calendar size={48} />} title="Belum Ada Rencana" desc="Ayo buat rencana perjalanan cerdas pertamamu!" link="/planner" btnText="Mulai Sekarang" />
                                    ) : (
                                        <div className="grid gap-6">
                                            {itineraries.map((plan) => (
                                                <TripCard key={plan._id} plan={plan} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'favorites' && (
                                <div className="space-y-6">
                                    {favorites.length === 0 ? (
                                        <EmptyState icon={<Heart size={48} />} title="Koleksi Kosong" desc="Simpan tempat wisata favoritmu agar mudah ditemukan nanti." link="/explore" btnText="Jelajahi Wisata" />
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {favorites.map((item) => (
                                                <FavoriteCard key={item._id} item={item} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="space-y-6">
                                    {reviews.length === 0 ? (
                                        <EmptyState icon={<MessageSquare size={48} />} title="Belum Ada Ulasan" desc="Bagikan pengalamanmu di tempat yang sudah kamu kunjungi." link="/explore" btnText="Tulis Ulasan" />
                                    ) : (
                                        <div className="grid gap-6">
                                            {reviews.map((review) => (
                                                <ReviewCard key={review._id} review={review} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

const EmptyState = ({ icon, title, desc, link, btnText }) => (
    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-16 text-center shadow-sm border border-dashed border-white/20 relative z-10">
        <div className="text-white/20 mb-6 flex justify-center">{icon}</div>
        <h3 className="text-2xl font-sans font-bold text-white mb-2 tracking-wide">{title}</h3>
        <p className="text-white/50 mb-8 max-w-md mx-auto">{desc}</p>
        <Link to={link} className="bg-white/10 hover:bg-[#f97316] text-white px-6 py-3 rounded-xl font-bold transition-colors inline-block">{btnText}</Link>
    </div>
);

import { Compass } from 'lucide-react';
const TripCard = ({ plan }) => (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/10 hover:border-[#f97316]/50 hover:bg-white/10 transition-all group relative z-10">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h4 className="text-xl font-bold text-white group-hover:text-[#f97316] transition-colors">Ekspedisi Banjarmasin {plan.duration} Hari</h4>
                <div className="flex items-center gap-2 text-sm text-white/40 mt-2">
                    <Compass size={14} className="text-[#f97316]" />
                    <span>Dirintis pada {new Date(plan.createdAt).toLocaleDateString('id-ID')}</span>
                </div>
            </div>
            <span className="bg-[#f97316]/10 border border-[#f97316]/20 text-[#f97316] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {plan.budget} Budget
            </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
            {plan.preferences.map((pref, i) => (
                <span key={i} className="text-[10px] bg-white/10 text-white/70 px-3 py-1.5 rounded-md font-bold uppercase tracking-wider">
                    {pref}
                </span>
            ))}
        </div>
        <Link to={`/planner`} className="text-white/50 font-bold text-sm flex items-center gap-1 hover:text-[#f97316] transition-colors">
            Lihat Rute <ChevronRight size={16} />
        </Link>
    </div>
);

const FavoriteCard = ({ item }) => (
    <Link to={`/place/${item._id}`} className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm border border-white/10 hover:border-[#f97316]/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all group relative z-10 block">
        <div className="h-40 overflow-hidden relative">
            <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
            <div className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-red-500 shadow-sm">
                <Heart size={16} fill="#ef4444" />
            </div>
        </div>
        <div className="p-5">
            <h5 className="font-bold text-white truncate text-lg">{item.name}</h5>
            <div className="flex items-center gap-1.5 text-xs text-[#f97316] mt-2 font-medium">
                <MapPin size={12} />
                <span className="truncate uppercase tracking-wider">{item.category || 'Wisata'}</span>
            </div>
        </div>
    </Link>
);

const ReviewCard = ({ review }) => (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/10 relative z-10">
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                    <img src={review.placeId?.images?.[0]} alt="" className="w-full h-full object-cover opacity-80" />
                </div>
                <div>
                    <h5 className="font-bold text-white text-lg">{review.placeId?.name}</h5>
                    <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < review.rating ? "#f97316" : "none"} color={i < review.rating ? "#f97316" : "#333"} />
                        ))}
                    </div>
                </div>
            </div>
            <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">{new Date(review.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="text-white/60 text-sm leading-relaxed">"{review.comment}"</p>
    </div>
);

export default UserDashboard;

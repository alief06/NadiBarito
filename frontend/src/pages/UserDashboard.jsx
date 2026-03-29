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
        const storedUser = JSON.parse(localStorage.getItem('user'));
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
        <div className="min-h-screen bg-heritage-cream pt-8 pb-20">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header Section */}
                <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-heritage-gold/10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-24 h-24 bg-heritage-gold rounded-full flex items-center justify-center text-heritage-brown text-3xl font-bold shadow-lg shadow-heritage-gold/20">
                        {user.name?.[0] || 'U'}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-heritage font-bold text-heritage-brown">
                            Sugeng Rawuh, <span className="text-heritage-gold">{user.name}</span>!
                        </h1>
                        <p className="text-gray-500 mt-1">Siap untuk petualangan berikutnya di Yogyakarta?</p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/profile" className="px-6 py-4 rounded-2xl border border-heritage-gold/20 text-heritage-brown font-bold flex items-center gap-2 hover:bg-heritage-gold/10 transition-all">
                            Profil <UserIcon size={18} />
                        </Link>
                        <Link to="/planner" className="btn-primary flex items-center gap-2 px-6">
                            Buat Trip <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`p-6 rounded-2xl border transition-all text-left flex items-center justify-between group ${activeTab === tab.id
                                ? 'bg-heritage-brown text-white border-heritage-brown shadow-xl'
                                : 'bg-white text-heritage-brown border-gray-100 hover:border-heritage-gold'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${activeTab === tab.id ? 'bg-white/10' : 'bg-heritage-gold/10'}`}>
                                    {tab.icon}
                                </div>
                                <div>
                                    <p className={`text-xs uppercase tracking-widest font-bold ${activeTab === tab.id ? 'text-heritage-gold' : 'text-gray-400'}`}>
                                        {tab.label}
                                    </p>
                                    <h4 className="text-2xl font-bold">{tab.count}</h4>
                                </div>
                            </div>
                            <ChevronRight size={20} className={`${activeTab === tab.id ? 'text-heritage-gold' : 'text-gray-200 group-hover:text-heritage-gold'} transition-colors`} />
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
    <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-dashed border-heritage-gold/30">
        <div className="text-gray-300 mb-6 flex justify-center">{icon}</div>
        <h3 className="text-2xl font-heritage font-bold text-heritage-brown mb-2">{title}</h3>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">{desc}</p>
        <Link to={link} className="btn-primary inline-block">{btnText}</Link>
    </div>
);

const TripCard = ({ plan }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-heritage-gold/10 hover:shadow-md transition-shadow group">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h4 className="text-xl font-bold text-heritage-brown group-hover:text-heritage-gold transition-colors">Trip Jogja {plan.duration} Hari</h4>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <Calendar size={14} />
                    <span>Dibuat pada {new Date(plan.createdAt).toLocaleDateString('id-ID')}</span>
                </div>
            </div>
            <span className="bg-heritage-gold/10 text-heritage-gold px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {plan.budget} Budget
            </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
            {plan.preferences.map((pref, i) => (
                <span key={i} className="text-[10px] bg-heritage-cream text-heritage-brown px-2 py-1 rounded font-bold">
                    {pref}
                </span>
            ))}
        </div>
        <Link to={`/planner`} className="text-heritage-brown font-bold text-sm flex items-center gap-1 hover:text-heritage-gold transition-colors">
            Lihat Rincian <ChevronRight size={16} />
        </Link>
    </div>
);

const FavoriteCard = ({ item }) => (
    <Link to={`/place/${item._id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
        <div className="h-40 overflow-hidden relative">
            <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full text-red-500 shadow-sm">
                <Heart size={16} fill="currentColor" />
            </div>
        </div>
        <div className="p-4">
            <h5 className="font-bold text-heritage-brown truncate">{item.name}</h5>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                <MapPin size={12} />
                <span className="truncate">{item.category || 'Wisata'}</span>
            </div>
        </div>
    </Link>
);

const ReviewCard = ({ review }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
                    <img src={review.placeId?.images?.[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h5 className="font-bold text-heritage-brown">{review.placeId?.name}</h5>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill={i < review.rating ? "#D4A017" : "none"} color={i < review.rating ? "#D4A017" : "#E5E7EB"} />
                        ))}
                    </div>
                </div>
            </div>
            <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="text-gray-600 text-sm italic">"{review.comment}"</p>
    </div>
);

export default UserDashboard;

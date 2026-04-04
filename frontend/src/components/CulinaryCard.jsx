import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Heart, Sparkles, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTourismStore } from '../store/useTourismStore';
import Card, { CardContent } from './Card';
import Button from './Button';
import Badge from './Badge';
import { toast } from 'sonner';

const CulinaryCard = ({ item, isCompact = false }) => {
    const { favorites, toggleFavorite } = useTourismStore();
    
    // Support both _id (legacy) and id (new store)
    const itemId = item.id || item._id;
    const isFavorite = favorites.includes(Number(itemId)) || favorites.includes(itemId) || favorites.includes(String(itemId));

    const handleToggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(itemId);
        toast.success(isFavorite ? 'Dihapus dari favorit' : 'Ditambahkan ke favorit');
    };

    if (isCompact) {
        return (
            <Card className="flex flex-col h-full group border-0 bg-white/2 backdrop-blur-3xl hover:bg-white/5 transition-all rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={item.image || 'https://images.unsplash.com/photo-1547928576-a4a33237ce35'}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 grayscale group-hover:grayscale-0 transition-transform duration-1000"
                    />
                    <div className="absolute top-4 right-4">
                        <Badge variant="gold" size="sm" className="backdrop-blur-3xl bg-[#f97316]/20 text-[#f97316] border border-[#f97316]/30 text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                            {item.district?.split(' ')[1] || 'Kalsel'}
                        </Badge>
                    </div>
                    {item.isLegendary && (
                        <div className="absolute top-4 left-4">
                            <Sparkles size={12} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)] animate-pulse" />
                        </div>
                    )}
                </div>
                <CardContent className="flex-1 flex flex-col p-6">
                    <h3 className="text-sm font-serif font-black text-white mb-2 line-clamp-1 italic tracking-tight">{item.name}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-[#f97316] font-bold">
                        <Star size={10} fill="currentColor" />
                        <span>{item.rating || 4.9}</span>
                    </div>
                    <Link to={`/culinary/${itemId}`} className="mt-6">
                        <Button variant="outline" size="sm" className="w-full text-[8px] py-2 rounded-xl border-white/5 bg-white/2 hover:bg-[#f97316] hover:text-white transition-all uppercase tracking-widest font-black">Detail</Button>
                    </Link>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="flex flex-col h-full group bg-white/2 border border-white/5 hover:border-[#f97316]/30 transition-all duration-1000 rounded-[3rem] overflow-hidden shadow-3xl">
            <div className="relative h-72 overflow-hidden">
                <Link to={`/culinary/${itemId}`} className="block h-full">
                    <img
                        src={item.image || 'https://images.unsplash.com/photo-1547928576-a4a33237ce35'}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-[1.15] grayscale group-hover:grayscale-0 transition-transform duration-[2s] ease-out brightness-75 group-hover:brightness-100"
                    />
                </Link>
                
                {/* Labels */}
                <div className="absolute top-8 left-8 flex flex-col gap-3">
                    <div className="flex gap-3">
                        {item.category === 'Kuliner' && (
                            <div className="p-3 bg-black/40 backdrop-blur-3xl rounded-full border border-white/10 text-white shadow-2xl">
                                <Utensils size={14} className="text-[#f97316]" />
                            </div>
                        )}
                        {item.isLegendary && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 backdrop-blur-3xl border border-yellow-500/50 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                                <Sparkles size={12} className="text-yellow-400 animate-pulse" />
                                <span className="text-[8px] font-bold text-yellow-400 uppercase tracking-widest italic font-serif">Legendary</span>
                            </div>
                        )}
                    </div>
                    <div className="px-4 py-2 bg-white/5 backdrop-blur-3xl border border-white/10 text-white rounded-full text-[9px] font-bold uppercase tracking-[0.3em] w-fit shadow-2xl">
                        {item.district}
                    </div>
                </div>

                <button
                    onClick={handleToggleFavorite}
                    className={`absolute top-8 right-8 p-4 backdrop-blur-3xl rounded-full shadow-3xl transition-all duration-500 z-10 ${isFavorite ? 'bg-[#f97316] text-white' : 'bg-black/40 text-white border border-white/10 hover:bg-white/20'}`}
                >
                    <Heart
                        size={20}
                        fill={isFavorite ? "currentColor" : "none"}
                        className="transition-transform active:scale-95"
                    />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
            </div>

            <CardContent className="p-10 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-6">
                    <Link to={`/culinary/${itemId}`}>
                        <h3 className="text-3xl font-serif font-black text-white group-hover:text-[#f97316] transition-colors duration-700 line-clamp-1 italic tracking-tighter">
                            {item.name}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 mt-1 rounded-2xl border border-white/5 backdrop-blur-xl shadow-inner">
                        <Star size={14} className="text-[#f97316]" fill="currentColor" />
                        <span className="text-sm font-bold text-white font-serif">{item.rating || 4.9}</span>
                    </div>
                </div>

                <p className="text-lg text-white/30 mb-10 line-clamp-2 italic font-serif leading-relaxed flex-1 border-l border-white/5 pl-6 group-hover:text-white/60 transition-colors duration-700">
                    "{item.description}"
                </p>

                <div className="flex items-center gap-4 text-[10px] text-[#f97316]/50 font-bold uppercase tracking-[0.4em] mb-10">
                    <MapPin size={16} className="text-[#f97316]" />
                    <span className="truncate border-b border-[#f97316]/20 pb-1">{item.address ||'Banjarmasin, Kalimantan Selatan'}</span>
                </div>

                <Link to={`/culinary/${itemId}`} className="block transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                    <Button variant="primary" className="w-full bg-white text-black font-black py-6 rounded-3xl tracking-[0.4em] hover:bg-[#f97316] hover:text-white transition-all uppercase text-[10px] shadow-3xl">
                        Eksplorasi Rasa
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};

export default CulinaryCard;

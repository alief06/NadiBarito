import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTourismStore } from '../store/useTourismStore';
import Card, { CardContent } from './Card';
import Button from './Button';
import Badge from './Badge';
import { toast } from 'sonner';

const PlaceCard = ({ place, isCompact = false }) => {
    const { favorites, toggleFavorite } = useTourismStore();
    
    // Support both _id (legacy) and id (new store)
    const placeId = place.id || place._id;
    const isFavorite = favorites.includes(Number(placeId)) || favorites.includes(placeId) || favorites.includes(String(placeId));

    const handleToggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(placeId);
        toast.success(isFavorite ? 'Dihapus dari favorit' : 'Ditambahkan ke favorit');
    };

    if (isCompact) {
        return (
            <Card className="flex flex-col h-full group border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors rounded-[2rem] overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={place.image || place.images?.[0] || 'https://images.unsplash.com/photo-1596402184320-417d717867cd'}
                        alt={place.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4">
                        <Badge variant="gold" size="sm" className="backdrop-blur-md bg-[#f97316]/80 text-white border-none text-[8px] font-bold">
                            {place.category}
                        </Badge>
                    </div>
                </div>
                <CardContent className="flex-1 flex flex-col p-6">
                    <h3 className="text-sm font-bold text-white mb-2 line-clamp-1 font-serif">{place.name}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-[#f97316] font-bold mb-6">
                        <Star size={12} fill="currentColor" />
                        <span>{place.rating || 4.9}</span>
                    </div>
                    <Link to={`/place/${placeId}`} className="mt-auto">
                        <Button variant="outline" size="sm" className="w-full text-[9px] py-2 rounded-xl border-white/10 hover:bg-[#f97316] hover:text-white transition-all">Detil Wisata</Button>
                    </Link>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="flex flex-col h-full group bg-white/5 border border-white/5 hover:border-[#f97316]/30 transition-all rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="relative h-64 overflow-hidden">
                <Link to={`/place/${placeId}`} className="block h-full">
                    <img
                        src={place.image || place.images?.[0] || 'https://images.unsplash.com/photo-1596402184320-417d717867cd'}
                        alt={place.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-[1.15] transition-transform duration-1000 ease-in-out"
                    />
                </Link>
                <div className="absolute top-6 left-6">
                    <Badge variant="gold" className="backdrop-blur-md bg-[#f97316]/80 text-white border-none py-1.5 px-4 text-[9px] font-bold tracking-widest uppercase">
                        {place.category}
                    </Badge>
                </div>
                <button
                    onClick={handleToggleFavorite}
                    className={`absolute top-6 right-6 p-3 backdrop-blur-md rounded-full shadow-lg transition-all z-10 ${isFavorite ? 'bg-[#f97316] text-white' : 'bg-white/10 text-white border border-white/10 hover:bg-white/20'}`}
                >
                    <Heart
                        size={18}
                        fill={isFavorite ? "currentColor" : "none"}
                        className="transition-transform active:scale-90"
                    />
                </button>
            </div>

            <CardContent className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                    <Link to={`/place/${placeId}`}>
                        <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#f97316] transition-colors line-clamp-1">
                            {place.name}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-2 bg-[#f97316]/10 px-3 py-1 rounded-full border border-[#f97316]/20">
                        <Star size={12} className="text-[#f97316]" fill="currentColor" />
                        <span className="text-xs font-bold text-[#f97316]">{place.rating || 4.9}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3 text-[10px] text-white/30 font-bold uppercase tracking-widest">
                        <MapPin size={14} className="text-[#f97316]" />
                        <span className="truncate">{place.district || place.location?.address || 'Banjarmasin'}</span>
                    </div>
                    {place.transport && (
                        <div className="text-[9px] uppercase font-bold tracking-widest text-[#f97316]/80 bg-[#f97316]/5 px-2 py-1 rounded border border-[#f97316]/10">
                            {place.transport === 'By Klotok' ? '⛴️ ' : '🚗 '}{place.transport}
                        </div>
                    )}
                </div>

                <p className="text-sm text-white/50 mb-8 line-clamp-3 font-sans leading-relaxed flex-1 group-hover:text-white/80 transition-colors">
                    {place.description}
                </p>

                <Link to={`/place/${placeId}`} className="block">
                    <Button variant="primary" className="w-full bg-white/5 border border-white/10 text-white font-bold py-4 rounded-2xl tracking-meta hover:bg-[#f97316] hover:border-[#f97316] transition-all uppercase text-[10px]">
                        Telusuri Destinasi
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};

export default PlaceCard;

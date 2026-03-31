import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Heart, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Card, { CardImage, CardContent } from './Card';
import Button from './Button';
import Badge from './Badge';

const CulinaryCard = ({ item, isCompact = false }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.favorites?.includes(item._id)) {
            setIsFavorite(true);
        }
    }, [item._id]);

    const handleToggleFavorite = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Silakan login untuk menyimpan favorit');
            return;
        }

        try {
            setLoading(true);
            await api.post('/users/favorites/toggle', {
                userId: user.id,
                placeId: item._id
            });

            setIsFavorite(!isFavorite);
            const updatedUser = { ...user };
            if (!isFavorite) {
                updatedUser.favorites = [...(updatedUser.favorites || []), item._id];
            } else {
                updatedUser.favorites = updatedUser.favorites.filter(id => id !== item._id);
            }
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (isCompact) {
        return (
            <Card className="flex flex-col h-full group">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={item.images?.[0] || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-8 right-8">
                        <Badge variant="gold" size="sm" className="backdrop-blur-md bg-heritage-gold/80 text-white">
                            {item.priceRange}
                        </Badge>
                    </div>
                </div>
                <CardContent className="flex-1 flex flex-col p-16">
                    <h3 className="text-body font-bold text-heritage-brown dark:text-heritage-gold mb-4 line-clamp-1">{item.name}</h3>
                    <div className="flex items-center gap-4 text-small text-heritage-gold font-bold mb-12">
                        <Star size={14} fill="currentColor" />
                        <span>{item.rating}</span>
                    </div>
                    <Link to={`/culinary/${item._id}`} className="mt-auto">
                        <Button variant="outline" size="sm" className="w-full">Lihat Menu</Button>
                    </Link>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="flex flex-col h-full">
            <div className="relative h-64 overflow-hidden">
                <Link to={`/culinary/${item._id}`} className="block h-full">
                    <img
                        src={item.images?.[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                </Link>
                <div className="absolute top-16 left-16 flex gap-8">
                    {item.isHalal && (
                        <Badge variant="success" className="backdrop-blur-md bg-green-600/80 text-white border-none">
                            Halal
                        </Badge>
                    )}
                    <Badge variant="gold" className="backdrop-blur-md bg-heritage-gold/80 text-white border-none uppercase">
                        {item.priceRange}
                    </Badge>
                </div>
                <button
                    onClick={handleToggleFavorite}
                    disabled={loading}
                    className="absolute top-16 right-16 p-12 bg-white/90 dark:bg-black/50 backdrop-blur-md rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all group/heart"
                >
                    <Heart
                        size={20}
                        className={`transition-colors ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400 dark:text-gray-300 group-hover/heart:text-red-400'}`}
                    />
                </button>
            </div>

            <CardContent className="p-24 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-12">
                    <Link to={`/culinary/${item._id}`}>
                        <h3 className="text-h3 font-heritage font-bold text-heritage-brown dark:text-heritage-gold hover:text-heritage-gold transition-colors line-clamp-1">
                            {item.name}
                        </h3>
                    </Link>
                    <Badge variant="gold" className="flex items-center gap-4">
                        <Star size={14} fill="currentColor" />
                        <span>{item.rating}</span>
                    </Badge>
                </div>

                <p className="text-body text-gray-600 dark:text-gray-400 mb-24 line-clamp-2 italic flex-1">
                    {item.description || "Kelezatan autentik Kalimantan Selatan yang melegenda."}
                </p>

                <div className="flex items-center gap-8 text-small text-gray-500 dark:text-gray-500 font-medium mb-24">
                    <MapPin size={16} className="text-heritage-gold" />
                    <span className="truncate">{item.location?.address || 'Kalimantan Selatan'}</span>
                </div>

                <Link to={`/culinary/${item._id}`} className="block">
                    <Button variant="primary" className="w-full">
                        Lihat Menu & Detail
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};

export default CulinaryCard;

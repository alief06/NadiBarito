import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import api from '../utils/api';
import { Loader2, Navigation, Utensils, X, Star, MapPin, ArrowRight, Layers, Info, Zap, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Badge from '../components/Badge';
import Button from '../components/Button';

// Custom Marker Icons with Premium Aesthetics
const createCustomIcon = (type, isActive) => {
    return L.divIcon({
        html: `
            <div class="relative flex items-center justify-center">
                ${isActive ? `<div class="absolute w-12 h-12 rounded-full ${type === 'place' ? 'bg-heritage-gold' : 'bg-heritage-brown'} opacity-40 animate-ping"></div>` : ''}
                <div class="relative w-10 h-10 rounded-full border-2 border-white dark:border-heritage-dark shadow-2xl flex items-center justify-center ${type === 'place' ? 'bg-heritage-gold' : 'bg-heritage-brown'} text-white transition-transform duration-300 ${isActive ? 'scale-125' : ''}">
                    ${type === 'place' ? '🏛️' : '🍜'}
                </div>
                <div class="absolute -bottom-1 w-2 h-2 bg-white dark:bg-heritage-dark rounded-full shadow-md"></div>
            </div>
        `,
        className: 'custom-leaflet-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });
};

const MapResizer = () => {
    const map = useMap();
    useEffect(() => {
        setTimeout(() => map.invalidateSize(), 400);
    }, [map]);
    return null;
};

const InteractiveMap = () => {
    const [places, setPlaces] = useState([]);
    const [culinary, setCulinary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [mapType, setMapType] = useState('light'); // light, dark, satellite

    useEffect(() => {
        const checkDarkMode = () => {
            const darkMode = document.documentElement.classList.contains('dark');
            setMapType(darkMode ? 'dark' : 'light');
        };

        checkDarkMode();

        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [placesRes, culinaryRes] = await Promise.all([
                    api.get('/places'),
                    api.get('/culinary')
                ]);
                setPlaces(placesRes.data);
                setCulinary(culinaryRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-heritage-cream dark:bg-heritage-dark text-heritage-gold">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="mr-16"
            >
                <Loader2 size={48} />
            </motion.div>
            <span className="font-heritage text-2xl italic">Menyiapkan cakrawala digital...</span>
        </div>
    );

    const tileUrls = {
        light: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    };

    return (
        <PageTransition>
            <div className="h-[calc(100vh-6rem)] w-full relative flex overflow-hidden">
                {/* Map Area */}
                <div className="flex-1 relative z-0">
                    <MapContainer
                        center={[-7.795, 110.369]}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                        scrollWheelZoom={true}
                        zoomControl={false}
                    >
                        <MapResizer />
                        <TileLayer
                            url={tileUrls[mapType]}
                            attribution='&copy; OpenStreetMap contributors'
                        />

                        {/* Tourism Markers */}
                        {places.map(place => place.location && (
                            <Marker
                                key={place._id}
                                position={[place.location.lat, place.location.lng]}
                                icon={createCustomIcon('place', selectedItem?._id === place._id)}
                                eventHandlers={{
                                    click: () => setSelectedItem({ ...place, type: 'place' })
                                }}
                            />
                        ))}

                        {/* Culinary Markers */}
                        {culinary.map(item => item.location && (
                            <Marker
                                key={item._id}
                                position={[item.location.lat, item.location.lng]}
                                icon={createCustomIcon('culinary', selectedItem?._id === item._id)}
                                eventHandlers={{
                                    click: () => setSelectedItem({ ...item, type: 'culinary' })
                                }}
                            />
                        ))}

                        <ZoomControl position="bottomright" />
                    </MapContainer>

                    {/* Left Legend & Controls */}
                    <div className="absolute top-24 left-24 z-[1000] flex flex-col gap-16">
                        <div className="premium-glass p-8 rounded-2xl flex flex-col gap-8">
                            <button
                                onClick={() => setMapType('light')}
                                className={`p-12 rounded-xl transition-all ${mapType === 'light' ? 'bg-heritage-gold text-white shadow-lg' : 'hover:bg-black/5'}`}
                                title="Terang"
                            >
                                <Layers size={20} />
                            </button>
                            <button
                                onClick={() => setMapType('dark')}
                                className={`p-12 rounded-xl transition-all ${mapType === 'dark' ? 'bg-heritage-gold text-white shadow-lg' : 'hover:bg-black/5'}`}
                                title="Gelap"
                            >
                                <Zap size={20} />
                            </button>
                            <button
                                onClick={() => setMapType('satellite')}
                                className={`p-12 rounded-xl transition-all ${mapType === 'satellite' ? 'bg-heritage-gold text-white shadow-lg' : 'hover:bg-black/5'}`}
                                title="Satelit"
                            >
                                <Globe size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Bottom Legend */}
                    <div className="absolute bottom-24 left-24 z-[1000] hidden md:flex items-center gap-16 premium-glass px-16 py-12 rounded-2xl shadow-2xl">
                        <div className="flex items-center gap-8">
                            <div className="w-12 h-12 bg-heritage-gold rounded-full shadow-lg"></div>
                            <span className="text-xs font-bold uppercase tracking-wider">Wisata</span>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="w-12 h-12 bg-heritage-brown rounded-full shadow-lg"></div>
                            <span className="text-xs font-bold uppercase tracking-wider">Kuliner</span>
                        </div>
                    </div>
                </div>

                {/* Info Panel */}
                <AnimatePresence>
                    {selectedItem && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                            className="absolute top-0 right-0 h-full w-full md:w-[480px] bg-white dark:bg-heritage-dark shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[2000] flex flex-col pt-20"
                        >
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-24 right-20 p-12 bg-heritage-cream dark:bg-heritage-dark-surface rounded-full hover:scale-110 active:scale-95 transition-all shadow-md z-10"
                            >
                                <X size={20} />
                            </button>

                            <div className="overflow-y-auto flex-1 custom-scrollbar">
                                <div className="h-80 relative overflow-hidden group">
                                    <img
                                        src={selectedItem.images?.[0] || 'https://via.placeholder.com/600x400'}
                                        alt={selectedItem.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-heritage-brown/90 via-heritage-brown/20 to-transparent"></div>
                                    <div className="absolute bottom-32 left-32 right-32 text-white">
                                        <div className="flex items-center gap-8 mb-8">
                                            <Badge variant="gold" className="px-12 py-4 text-[10px] uppercase font-bold tracking-widest bg-heritage-gold/80 backdrop-blur-md">
                                                {selectedItem.category || 'Destinasi'}
                                            </Badge>
                                        </div>
                                        <h2 className="text-h2 font-heritage font-bold leading-tight">{selectedItem.name}</h2>
                                    </div>
                                </div>

                                <div className="p-32 space-y-32">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-8">
                                            <div className="flex items-center gap-4 bg-heritage-gold/10 px-12 py-6 rounded-full text-heritage-gold font-bold">
                                                <Star size={16} fill="currentColor" />
                                                <span>{selectedItem.rating}</span>
                                            </div>
                                            <span className="text-small opacity-50 font-bold uppercase">Rating</span>
                                        </div>
                                        <Link
                                            to={selectedItem.type === 'place' ? `/place/${selectedItem._id}` : `/culinary/${selectedItem._id}`}
                                            className="text-heritage-gold font-bold text-small hover:underline"
                                        >
                                            Buka Halaman Detail
                                        </Link>
                                    </div>

                                    <div className="space-y-12">
                                        <div className="flex items-start gap-12">
                                            <div className="p-8 bg-black/5 dark:bg-white/5 rounded-lg text-heritage-gold">
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-small font-bold mb-4">Lokasi</h4>
                                                <p className="text-small opacity-70 leading-relaxed italic">{selectedItem.location?.address}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-12 pt-16">
                                            <div className="p-8 bg-black/5 dark:bg-white/5 rounded-lg text-heritage-gold">
                                                <Info size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-small font-bold mb-4">Informasi</h4>
                                                <p className="text-small opacity-80 leading-relaxed line-clamp-6">
                                                    {selectedItem.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-16">
                                        <Button
                                            variant="primary"
                                            className="w-full flex items-center justify-center gap-12 group"
                                            onClick={() => {
                                                const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedItem.location.lat},${selectedItem.location.lng}`;
                                                window.open(url, '_blank');
                                            }}
                                        >
                                            Navigasi Ke Lokasi
                                            <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageTransition>
    );
};

export default InteractiveMap;

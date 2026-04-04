import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Navigation, Star, Clock, X, ArrowRight, Info, Compass, Utensils, Landmark, Sparkles } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useTourismStore } from '../store/useTourismStore';
import SEO from '../components/SEO';

// Premium Dark Theme Tiles
const DARK_TILE_LAYER = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

const getCategoryColor = (category) => {
    switch(category) {
        case 'Budaya': return '#f97316';
        case 'Alam': return '#22c55e';
        case 'Sejarah': return '#a855f7';
        case 'Modern': return '#3b82f6';
        case 'Kuliner': return '#eab308';
        default: return '#f97316';
    }
};

const createCustomIcon = (item, isActive) => {
    const color = getCategoryColor(item.category);
    const isLegendary = item.isLegendary;
    
    // Select Icon based on category
    const IconComponent = item.category === 'Kuliner' ? Utensils : Landmark;
    const iconMarkup = renderToStaticMarkup(
        <IconComponent size={14} color="white" strokeWidth={3} />
    );

    return L.divIcon({
        html: `
            <div class="relative flex items-center justify-center transition-transform duration-500 ${isActive ? 'scale-150 z-[1000]' : ''}">
                ${isActive ? `<div class="absolute w-12 h-12 rounded-full opacity-20 animate-ping" style="background-color: ${color}"></div>` : ''}
                ${isLegendary ? `<div class="absolute w-10 h-10 rounded-full bg-yellow-500/20 blur-md animate-pulse"></div>` : ''}
                <div class="relative w-9 h-9 rounded-full border-2 ${isLegendary ? 'border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.6)]' : 'border-white/20'} shadow-[0_0_25px_rgba(0,0,0,0.8)] flex items-center justify-center bg-[#050505]">
                    <div class="flex items-center justify-center translate-y-[-0.5px]">
                        ${iconMarkup}
                    </div>
                    ${isLegendary ? `<div class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-[#050505] flex items-center justify-center">
                        <div class="w-1 h-1 bg-black rounded-full"></div>
                    </div>` : ''}
                </div>
            </div>
        `,
        className: 'custom-leaflet-icon',
        iconSize: [36, 36],
        iconAnchor: [18, 18]
    });
};

const UserLocationIcon = L.divIcon({
    html: `
        <div class="relative flex items-center justify-center z-[2000]">
            <div class="absolute w-12 h-12 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
            <div class="relative w-6 h-6 bg-white border-4 border-blue-500 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.6)]"></div>
        </div>
    `,
    className: 'user-leaflet-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

const CATEGORIES = ['Semua', 'Budaya', 'Sejarah', 'Kuliner', 'Modern'];

const MapBoundsAdjuster = ({ data, userLoc }) => {
    const map = useMap();
    useEffect(() => {
        const bounds = L.latLngBounds();
        let hasPoints = false;

        if (userLoc) {
            bounds.extend([userLoc.lat, userLoc.lng]);
            hasPoints = true;
        }
        
        data.forEach(p => {
            if (p.lat && p.lng) {
                bounds.extend([p.lat, p.lng]);
                hasPoints = true;
            }
        });

        if (hasPoints) {
            map.flyToBounds(bounds, { padding: [100, 100], maxZoom: 15, duration: 2, easeLinearity: 0.1 });
        }
    }, [data, userLoc, map]);
    return null;
};

const InteractiveMap = () => {
    const { places, culinary } = useTourismStore();
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [userLoc, setUserLoc] = useState(null);
    const [distanceMsg, setDistanceMsg] = useState('');

    const allMarkers = [...places, ...culinary];

    const filteredData = activeCategory === 'Semua' 
        ? allMarkers 
        : allMarkers.filter(item => item.category === activeCategory);

    useEffect(() => {
        if (selectedPlace && userLoc) {
            const R = 6371; 
            const dLat = (selectedPlace.lat - userLoc.lat) * Math.PI / 180;
            const dLon = (selectedPlace.lng - userLoc.lng) * Math.PI / 180;
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.cos(userLoc.lat * Math.PI / 180) * Math.cos(selectedPlace.lat * Math.PI / 180) *
                      Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            const d = R * c;
            setDistanceMsg(`Berjarak ${d.toFixed(1)} km dari titik Anda`);
        } else {
            setDistanceMsg('');
        }
    }, [selectedPlace, userLoc]);

    const requestLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                (err) => alert("Izin lokasi diperlukan untuk navigasi.")
            );
        }
    };

    return (
        <PageTransition>
            <SEO 
                title="Peta Interaktif" 
                description="Eksplorasi titik heritage dan gastronomi legendaris Banjarmasin melalui peta digital interaktif." 
                category="Maps"
            />
            <div className="h-[calc(100vh-6rem)] w-full relative flex overflow-hidden bg-[#050505] selection:bg-[#f97316]/30">
                
                {/* Map Engine */}
                <div className="flex-1 relative z-0">
                    <MapContainer
                        center={[-3.316694, 114.590111]}
                        zoom={13}
                        style={{ height: '100%', width: '100%', backgroundColor: '#050505' }}
                        scrollWheelZoom={true}
                        zoomControl={false}
                    >
                        <TileLayer
                            url={DARK_TILE_LAYER}
                            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                        />
                        
                        <MapBoundsAdjuster data={filteredData} userLoc={userLoc} />
                        <ZoomControl position="bottomright" />

                        {userLoc && (
                            <Marker position={[userLoc.lat, userLoc.lng]} icon={UserLocationIcon} zIndexOffset={9999} />
                        )}
                        
                        {filteredData.map((item) => (
                            <Marker
                                key={item.id}
                                position={[item.lat, item.lng]}
                                icon={createCustomIcon(item, selectedPlace?.id === item.id)}
                                eventHandlers={{ click: () => setSelectedPlace(item) }}
                                zIndexOffset={selectedPlace?.id === item.id ? 1000 : 0}
                            />
                        ))}
                    </MapContainer>

                    {/* Filter Navigation */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-2xl px-6 pointer-events-none">
                        <div className="bg-[#050505]/60 backdrop-blur-3xl p-2 rounded-[2.5rem] border border-white/5 flex justify-center gap-1 pointer-events-auto shadow-2xl">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => { setActiveCategory(cat); setSelectedPlace(null); }}
                                    className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all border outline-none ${
                                        activeCategory === cat 
                                        ? 'bg-[#f97316] text-white border-[#f97316] shadow-[0_10px_20px_rgba(249,115,22,0.3)]' 
                                        : 'bg-transparent text-white/40 border-transparent hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Legend */}
                    <div className="absolute top-32 right-10 z-[1000] bg-[#050505]/60 backdrop-blur-3xl p-8 rounded-[2rem] border border-white/5 pointer-events-auto hidden md:block">
                        <div className="flex flex-col gap-6">
                            {CATEGORIES.filter(c => c !== 'Semua').map(cat => (
                                <div key={cat} className="flex items-center gap-4 group cursor-pointer" onClick={() => setActiveCategory(cat)}>
                                    <div className="w-3 h-3 rounded-full border-2 border-white/20 transition-transform group-hover:scale-125 shadow-lg" style={{ backgroundColor: getCategoryColor(cat) }}></div>
                                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest group-hover:text-white transition-colors">{cat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Location Trigger */}
                    <div className="absolute bottom-10 left-10 z-[1000] pointer-events-auto">
                        <button 
                            onClick={requestLocation}
                            className="bg-white text-black p-5 rounded-[2rem] shadow-3xl hover:bg-[#f97316] hover:text-white flex items-center gap-4 group transition-all"
                        >
                            <Compass size={24} className="group-hover:rotate-180 transition-transform duration-700" />
                            <span className="font-bold text-[10px] uppercase tracking-widest pr-2">Temukan Posisi</span>
                        </button>
                    </div>
                </div>

                {/* Right Info Panel */}
                <AnimatePresence>
                    {selectedPlace && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 35, stiffness: 250 }}
                            className="absolute top-0 right-0 h-full w-full md:w-[500px] bg-[#050505] shadow-[-30px_0_60px_rgba(0,0,0,0.9)] z-[2000] flex flex-col border-l border-white/5"
                        >
                            <button
                                onClick={() => setSelectedPlace(null)}
                                className="absolute top-10 right-10 p-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all z-30"
                            >
                                <X size={24} />
                            </button>

                            <div className="overflow-y-auto flex-1 custom-scrollbar pb-20">
                                <div className="h-[450px] relative overflow-hidden group">
                                    <img
                                        src={selectedPlace.image}
                                        alt={selectedPlace.name}
                                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
                                    <div className="absolute bottom-10 left-10 right-10">
                                        <div className="flex flex-col gap-4 mb-6">
                                            {selectedPlace.isLegendary && (
                                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/20 backdrop-blur-md border border-yellow-500/50 text-yellow-400 rounded-full w-fit">
                                                    <Sparkles size={12} className="animate-pulse" />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">Heritage Legend</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-4">
                                                <div className="px-4 py-1.5 text-[8px] uppercase font-bold tracking-[0.3em] bg-[#f97316] text-white rounded-full">
                                                    {selectedPlace.category}
                                                </div>
                                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-white border border-white/10 italic font-serif">
                                                    <Star size={12} className="text-[#f97316] fill-[#f97316]" /> {selectedPlace.rating} Rating
                                                </div>
                                            </div>
                                        </div>
                                        <h2 className="text-5xl font-serif font-bold text-white leading-none tracking-tighter">{selectedPlace.name}</h2>
                                        <p className="text-[#f97316] text-[10px] font-bold uppercase tracking-[0.2em] mt-4 opacity-80 italic font-serif">{selectedPlace.district}</p>
                                    </div>
                                </div>

                                <div className="p-12 space-y-12">
                                    {distanceMsg && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                            className="bg-[#f97316]/5 border border-[#f97316]/20 text-[#f97316] p-6 rounded-[2rem] flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest italic"
                                        >
                                            <Navigation size={20} className="animate-pulse" />
                                            {distanceMsg}
                                        </motion.div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 space-y-2">
                                            <MapPin size={18} className="text-[#f97316]" />
                                            <h4 className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Koordinat</h4>
                                            <p className="text-[12px] text-white font-mono">{selectedPlace.lat}, {selectedPlace.lng}</p>
                                        </div>
                                        <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 space-y-2">
                                            <Clock size={18} className="text-[#f97316]" />
                                            <h4 className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Waktu Terbaik</h4>
                                            <p className="text-[12px] text-white font-serif italic">{selectedPlace.bestTime || 'Sepanjang Hari'}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <Info size={16} className="text-[#f97316]" />
                                            <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Narasi Destinasi</h4>
                                        </div>
                                        <p className="text-lg text-white/60 leading-relaxed font-serif italic border-l-2 border-[#f97316]/20 pl-8">
                                            {selectedPlace.description}
                                        </p>
                                    </div>

                                    <button
                                        className="w-full bg-white text-black font-bold py-6 rounded-[2rem] flex items-center justify-center gap-4 uppercase text-[10px] tracking-[0.3em] hover:bg-[#f97316] hover:text-white transition-all shadow-2xl group"
                                        onClick={() => {
                                            const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.lat},${selectedPlace.lng}`;
                                            window.open(url, '_blank');
                                        }}
                                    >
                                        Buka Rute Navigasi
                                        <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform duration-500" />
                                    </button>
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

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Navigation, Star, Clock, X, ArrowRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Button from '../components/Button';
import { useTourismStore } from '../store/useTourismStore';

// Tema Gelap Berkualitas Tinggi untuk Open-Source Map
const DARK_TILE_LAYER = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

const getCategoryColor = (category) => {
    switch(category) {
        case 'Budaya': return '#f59e0b';
        case 'Alam': return '#10b981';
        case 'Sejarah': return '#8b5cf6';
        case 'Modern': return '#3b82f6';
        default: return '#ef4444';
    }
};

const createCustomIcon = (category, isActive) => {
    const color = getCategoryColor(category);
    return L.divIcon({
        html: `
            <div class="relative flex items-center justify-center transition-transform duration-300 ${isActive ? 'scale-125 z-[1000]' : ''}">
                ${isActive ? `<div class="absolute w-12 h-12 rounded-full opacity-30 animate-ping" style="background-color: ${color}"></div>` : ''}
                <div class="relative w-8 h-8 rounded-full border-[3px] border-white shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center" style="background-color: ${color}">
                    <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
            </div>
        `,
        className: 'custom-leaflet-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });
};

const UserLocationIcon = L.divIcon({
    html: `
        <div class="relative flex items-center justify-center z-[2000]">
            <div class="absolute w-12 h-12 bg-blue-500 rounded-full opacity-40 animate-ping"></div>
            <div class="relative w-6 h-6 bg-blue-500 border-[3px] border-white rounded-full shadow-[0_0_20px_rgba(59,130,246,0.9)]"></div>
        </div>
    `,
    className: 'user-leaflet-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

const CATEGORIES = ['Semua', 'Budaya', 'Alam', 'Sejarah', 'Modern'];

// Hitung Garis Batas Otomatis agar Peta Fokus ke Tujuan
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
            map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 15, duration: 1.5 });
        }
    }, [data, userLoc, map]);
    return null;
};

const InteractiveMap = () => {
    const { places } = useTourismStore();
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [userLoc, setUserLoc] = useState(null);
    const [distanceMsg, setDistanceMsg] = useState('');

    const filteredData = activeCategory === 'Semua' 
        ? places 
        : places.filter(place => place.category === activeCategory);

    // Rumus Haversine untuk Navigasi Cerdas
    useEffect(() => {
        if (selectedPlace && userLoc) {
            const R = 6371; // Jari-jari bumi (km)
            const dLat = (selectedPlace.lat - userLoc.lat) * Math.PI / 180;
            const dLon = (selectedPlace.lng - userLoc.lng) * Math.PI / 180;
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.cos(userLoc.lat * Math.PI / 180) * Math.cos(selectedPlace.lat * Math.PI / 180) *
                      Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            const d = R * c;
            setDistanceMsg(`Berjarak sekitar ${d.toFixed(1)} km dari lokasimu`);
        } else {
            setDistanceMsg('');
        }
    }, [selectedPlace, userLoc]);

    const requestLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                (err) => alert("Gagal mendapatkan lokasi Anda. Pastikan izin lokasi diaktifkan pada browser.")
            );
        } else {
            alert("Geolocation tidak didukung di browser ini.");
        }
    };

    return (
        <PageTransition>
            <div className="h-[calc(100vh-6rem)] w-full relative flex overflow-hidden bg-[#0a0a0a]">
                
                {/* Area Peta Terbuka Kualitas Tinggi (Tanpa API Key, 100% Gratis) */}
                <div className="flex-1 relative z-0">
                    <MapContainer
                        center={[-3.316694, 114.590111]}
                        zoom={13}
                        style={{ height: '100%', width: '100%', backgroundColor: '#0a0a0a' }}
                        scrollWheelZoom={true}
                        zoomControl={false}
                    >
                        <TileLayer
                            url={DARK_TILE_LAYER}
                            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                        />
                        
                        <MapBoundsAdjuster data={filteredData} userLoc={userLoc} />
                        <ZoomControl position="bottomright" />

                        {/* Titik Lokasi Pengguna Saat Ini */}
                        {userLoc && (
                            <Marker position={[userLoc.lat, userLoc.lng]} icon={UserLocationIcon} zIndexOffset={9999} />
                        )}
                        
                        {/* Pin Destinasi */}
                        {filteredData.map((place) => (
                            <Marker
                                key={place.id}
                                position={[place.lat, place.lng]}
                                icon={createCustomIcon(place.category, selectedPlace?.id === place.id)}
                                eventHandlers={{ click: () => setSelectedPlace(place) }}
                                zIndexOffset={selectedPlace?.id === place.id ? 1000 : 0}
                            />
                        ))}
                    </MapContainer>

                    {/* Overlay Atas: Filter Kategori Wisata */}
                    <div className="absolute top-28 md:top-32 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-4xl px-4 pointer-events-none transition-all">
                        <div className="bg-[#112F36]/90 backdrop-blur-xl p-3 md:p-4 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex flex-nowrap md:flex-wrap overflow-x-auto justify-start md:justify-center gap-2 md:gap-3 pointer-events-auto custom-scrollbar">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => { setActiveCategory(cat); setSelectedPlace(null); }}
                                    className={`px-4 md:px-6 py-2 rounded-full text-xs font-bold transition-all border outline-none shrink-0 ${
                                        activeCategory === cat 
                                        ? 'bg-[#f59e0b] text-black border-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105' 
                                        : 'bg-black/50 text-white/70 border-white/10 hover:bg-white/20 hover:text-white'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Panel Keterangan Warna (Legend) */}
                    <div className="absolute top-48 md:top-56 right-4 md:right-auto md:left-8 z-[1000] bg-[#112F36]/90 backdrop-blur-xl p-4 md:p-5 rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto">
                        <h4 className="text-white text-[10px] md:text-xs font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
                            <Info size={14} className="text-[#f59e0b]" /> 
                            Keterangan Pin
                        </h4>
                        <div className="flex flex-col gap-3">
                            {CATEGORIES.filter(c => c !== 'Semua').map(cat => (
                                <div key={cat} className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-1 rounded-lg transition-colors" onClick={() => setActiveCategory(cat)}>
                                    <div className="w-4 h-4 rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:scale-125 transition-transform" style={{ backgroundColor: getCategoryColor(cat) }}></div>
                                    <span className="text-white/80 text-[11px] md:text-sm font-medium whitespace-nowrap group-hover:text-white transition-colors">{cat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Overlay Bawah-Kiri: Pintasan Radius Rute */}
                    <div className="absolute bottom-8 left-8 z-[1000] pointer-events-auto">
                        <button 
                            onClick={requestLocation}
                            className="bg-[#112F36] text-[#f59e0b] p-4 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:bg-[#1a444e] border border-[#f59e0b]/30 flex items-center gap-3 group transition-all"
                        >
                            <MapPin size={24} className="group-hover:animate-bounce" />
                            <span className="font-bold text-sm hidden group-hover:block transition-all mr-2">Cari Titik Lokasi Saya</span>
                        </button>
                    </div>
                </div>

                {/* Panel Informasi Sebelah Kanan (Bila pin ditekan) */}
                <AnimatePresence>
                    {selectedPlace && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                            className="absolute top-0 right-0 h-full w-full md:w-[450px] bg-[#112F36] shadow-[-20px_0_50px_rgba(0,0,0,0.8)] z-[2000] flex flex-col border-l border-white/10"
                        >
                            <button
                                onClick={() => setSelectedPlace(null)}
                                className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-md z-30 backdrop-blur-sm"
                            >
                                <X size={20} />
                            </button>

                            <div className="overflow-y-auto flex-1 custom-scrollbar text-white pb-16">
                                <div className="h-72 relative overflow-hidden group">
                                    <img
                                        src={selectedPlace.image}
                                        alt={selectedPlace.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#112F36] via-[#112F36]/20 to-transparent"></div>
                                    <div className="absolute bottom-6 left-8 right-8 text-white">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest bg-[#f59e0b] text-black rounded-full shadow-lg">
                                                {selectedPlace.category}
                                            </div>
                                            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full text-xs font-bold border border-white/10">
                                                <Star size={12} className="text-[#f59e0b] fill-[#f59e0b]" /> {selectedPlace.rating}
                                            </div>
                                        </div>
                                        <h2 className="text-3xl font-serif font-bold leading-tight drop-shadow-md">{selectedPlace.name}</h2>
                                    </div>
                                </div>

                                <div className="p-8 space-y-8">
                                    
                                    {/* Jarak Dinamis Rute Navigasi */}
                                    {distanceMsg && (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                            className="bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-bold shadow-inner"
                                        >
                                            <Navigation size={18} className="animate-pulse shrink-0" />
                                            {distanceMsg}
                                        </motion.div>
                                    )}

                                    <div className="space-y-5">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-white/5 rounded-lg text-[#f59e0b] shrink-0 border border-white/5">
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold mb-1 text-white/60 uppercase tracking-wider">Titik Koordinat</h4>
                                                <p className="text-[13px] font-mono opacity-90">{selectedPlace.lat}, {selectedPlace.lng}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-white/5 rounded-lg text-[#f59e0b] shrink-0 border border-white/5">
                                                <Clock size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold mb-1 text-white/60 uppercase tracking-wider">Waktu Kunjungan</h4>
                                                <p className="text-[13px] opacity-90">{selectedPlace.bestTime}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/10">
                                        <h4 className="text-sm font-bold mb-3 text-white/60 uppercase tracking-wider flex items-center gap-2"><Info size={16} /> Deskripsi Destinasi</h4>
                                        <p className="text-[15px] opacity-90 leading-relaxed text-justify">
                                            {selectedPlace.description}
                                        </p>
                                    </div>

                                    <div className="pt-6">
                                        <Button
                                            variant="primary"
                                            className="w-full flex items-center justify-center gap-3 bg-[#f59e0b] hover:bg-yellow-500 text-black font-bold uppercase tracking-wider py-4 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] group transition-all"
                                            onClick={() => {
                                                const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.lat},${selectedPlace.lng}`;
                                                window.open(url, '_blank');
                                            }}
                                        >
                                            Buka Rute Kesini
                                            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
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

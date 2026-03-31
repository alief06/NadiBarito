import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { BANJARMASIN_TOURISM_DATA } from '../data/tourismData';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Navigation } from 'lucide-react';

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#212121" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
  { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#181818" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { featureType: "poi.park", elementType: "labels.text.stroke", stylers: [{ color: "#1b1b1b" }] },
  { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#373737" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3c3c3c" }] },
  { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#4e4e4e" }] },
  { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] }
];

const CATEGORIES = ['Semua', ...new Set(BANJARMASIN_TOURISM_DATA.map(item => item.category))];

const MapSection = () => {
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [selectedPlace, setSelectedPlace] = useState(null);

    // Filter Data
    const filteredData = activeCategory === 'Semua' 
        ? BANJARMASIN_TOURISM_DATA 
        : BANJARMASIN_TOURISM_DATA.filter(place => place.category === activeCategory);

    // Ambil API Key, tidak wajib untuk dev tapi akan menampilkan pesan watermark jika kosong
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY";

    return (
        <section className="relative w-full h-[80vh] min-h-[600px] bg-[#050505] overflow-hidden">
            
            {/* Filter Chips Layer (Z-Index tinggi agar melayang di atas peta) */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[50] w-full max-w-5xl px-4 pointer-events-none">
                <div className="bg-[#112F36]/80 backdrop-blur-md p-3 rounded-full flex flex-wrap justify-center gap-2 pointer-events-auto border border-white/10 shadow-2xl">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setActiveCategory(cat); setSelectedPlace(null); }}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border outline-none ${
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

            {/* Google Maps Layer */}
            <div className="w-full h-full relative z-0">
                <APIProvider apiKey={apiKey}>
                    <Map
                        defaultZoom={13}
                        defaultCenter={{ lat: -3.316694, lng: 114.590111 }}
                        mapId="BANJARMASIN_MAP_ID" // Syarat AdvancedMarker bekerja optimal
                        disableDefaultUI={true}
                        styles={darkMapStyle}
                        gestureHandling={'greedy'}
                    >
                        {/* Markers Loop */}
                        {filteredData.map((place) => (
                            <AdvancedMarker
                                key={place.id}
                                position={{ lat: place.lat, lng: place.lng }}
                                onClick={() => setSelectedPlace(place)}
                            >
                                <Pin 
                                    background={place.color} 
                                    borderColor={'#ffffff'} 
                                    glyphColor={'#ffffff'}
                                    scale={selectedPlace?.id === place.id ? 1.3 : 1.0}
                                />
                            </AdvancedMarker>
                        ))}

                        {/* InfoWindow muncul ketika marker diklik */}
                        {selectedPlace && (
                            <InfoWindow
                                position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                                onCloseClick={() => setSelectedPlace(null)}
                                // Pixel offset agar InfoWindow tidak menutupi Pin sepenuhnya
                                pixelOffset={[0, -40]}
                            >
                                <div className="p-1 px-2 max-w-[250px] font-sans text-gray-900 rounded bg-white">
                                    <h3 className="text-sm font-bold mb-1 leading-tight">{selectedPlace.name}</h3>
                                    <span 
                                        className="inline-block px-2 py-0.5 text-[10px] uppercase font-bold text-white rounded mb-2"
                                        style={{ backgroundColor: selectedPlace.color }}
                                    >
                                        {selectedPlace.category}
                                    </span>
                                    <p className="text-[11px] text-gray-600 mb-2 leading-snug">{selectedPlace.description}</p>
                                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#f59e0b] bg-orange-50 px-2 py-1 rounded">
                                        <Clock size={12} />
                                        <span>{selectedPlace.bestTime}</span>
                                    </div>
                                    <a 
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.lat},${selectedPlace.lng}`} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="mt-3 flex items-center justify-center gap-1 w-full text-[11px] bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 rounded transition-colors"
                                    >
                                        <Navigation size={12} /> Rute
                                    </a>
                                </div>
                            </InfoWindow>
                        )}
                    </Map>
                </APIProvider>
            </div>
            
        </section>
    );
};

export default MapSection;

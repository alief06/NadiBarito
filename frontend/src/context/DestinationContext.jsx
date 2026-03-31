import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Membuat Context
const DestinationContext = createContext();

export const useDestinations = () => {
    return useContext(DestinationContext);
};

export const DestinationProvider = ({ children }) => {
    const [destinations, setDestinations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter states
    const [activeCategory, setActiveCategory] = useState('Semua');

    // 2. Fetch API Data (Backend Integration Point)
    useEffect(() => {
        const fetchDestinations = async () => {
            setIsLoading(true);
            try {
                // ==========================================
                // 🔥 TEMPAT MENEMPELKAN LOGIKA FETCH API 🔥
                // ==========================================
                // Hapus blok kode dummy di bawah ini dan uncomment kode fetch API aslinya:
                //
                // const response = await fetch('http://localhost:5001/api/places');
                // if (!response.ok) throw new Error('Gagal mengambil data dari server');
                // const data = await response.json();
                // setDestinations(data);
                // 
                // ==========================================

                /* --- DATA DUMMY BANJARMASIN (SEMENTARA SEBELUM API NYALA) --- */
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                const dummyData = [
                    { id: 1, title: 'Pasar Terapung Muara Kuin', category: 'Budaya', location: 'Banjarmasin Utara', rating: 4.9, image: 'https://images.unsplash.com/photo-1549449852-59530bedc78b?auto=format&fit=crop&w=400&q=80', isLiked: false },
                    { id: 2, title: 'Menara Pandang', category: 'Landmark', location: 'Banjarmasin Tengah', rating: 4.8, image: 'https://images.unsplash.com/photo-1596402184320-417d7178b2cd?auto=format&fit=crop&w=400&q=80', isLiked: true },
                    { id: 3, title: 'Soto Banjar Bang Amat', category: 'Kuliner', location: 'Banjarmasin Timur', rating: 4.9, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80', isLiked: false },
                    { id: 4, title: 'Masjid Sultan Suriansyah', category: 'Sejarah', location: 'Banjarmasin Utara', rating: 4.9, image: 'https://images.unsplash.com/photo-1590487930999-56d1c95bf2fb?auto=format&fit=crop&w=400&q=80', isLiked: false },
                    { id: 5, title: 'Patung Bekantan', category: 'Landmark', location: 'Banjarmasin Tengah', rating: 4.7, image: 'https://images.unsplash.com/photo-1574548484606-5a468ee6118a?auto=format&fit=crop&w=400&q=80', isLiked: true },
                    { id: 6, title: 'Kampung Sasirangan', category: 'Budaya', location: 'Banjarmasin Tengah', rating: 4.8, image: 'https://images.unsplash.com/photo-1611638363034-c90ca9fcf96f?auto=format&fit=crop&w=400&q=80', isLiked: false }
                ];
                
                setDestinations(dummyData);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching destinations:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDestinations();
    }, []);

    // 3. Methods to update State (Micro-interactions Point)
    const toggleLike = (id) => {
        // Optimistic UI Update: Ubah state lokal dulu agar terasa instan bagi user
        setDestinations(prev => prev.map(dest => 
            dest.id === id ? { ...dest, isLiked: !dest.isLiked } : dest
        ));

        // ==========================================
        // 🔥 UPDATE API LOGIC (BACKEND NANTI) 🔥
        // await fetch(`http://localhost:5001/api/places/${id}/like`, { method: 'POST' });
        // ==========================================
    };

    // Filter Logic
    const filteredDestinations = activeCategory === 'Semua' 
        ? destinations 
        : destinations.filter(d => d.category === activeCategory);

    const value = {
        destinations: filteredDestinations,
        allDestinations: destinations,
        isLoading,
        error,
        activeCategory,
        setActiveCategory,
        toggleLike
    };

    return (
        <DestinationContext.Provider value={value}>
            {children}
        </DestinationContext.Provider>
    );
};

import { create } from 'zustand';
import { destinationData } from '../data/destinationData';

export const useTourismStore = create((set) => ({
    places: destinationData,
    culinary: [
        {
            id: 'c1',
            name: 'Lontong Orari',
            category: 'Kuliner',
            district: 'Banjarmasin Tengah',
            isLegendary: true,
            description: 'Destinasi gastronomi wajib dengan menu Lontong Segitiga yang legendaris. Disajikan dengan Haruan (Ikan Gabus) Masak Habang dan telur bebek dalam porsi yang melimpah.',
            image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80',
            lat: -3.3141,
            lng: 114.5984,
            rating: 4.9,
            address: 'Jl. Simpang Sungai Mesa, Banjarmasin Tengah',
            mustTry: 'Lontong Haruan Masak Habang'
        },
        {
            id: 'c2',
            name: 'Soto Banjar Bang Amat',
            category: 'Kuliner',
            district: 'Banjarmasin Timur',
            description: 'Soto Banjar paling ikonik di tepian sungai. Kuah bening kaya rempah dengan sate ayam bumbu kacang sebagai pendamping sempurna sambil menikmati hilir mudik kelotok.',
            image: 'https://images.unsplash.com/photo-1547928576-a4a33237ce35?auto=format&fit=crop&w=800&q=80',
            lat: -3.3044,
            lng: 114.6132,
            rating: 4.8,
            address: 'Jl. Banua Anyar, Banjarmasin Timur',
            mustTry: 'Soto Banjar Spesial'
        },
        {
            id: 'c3',
            name: 'Mie Bancir Kayutangi',
            category: 'Kuliner',
            district: 'Banjarmasin Utara',
            description: 'Kreasi Mie Banjar dengan kuah kental "setengah basah". Disajikan premium dengan topping daging ayam, telur bebek, dan limau kuit yang menyegarkan.',
            image: 'https://images.unsplash.com/photo-1612600776451-35a0d3376b08?auto=format&fit=crop&w=800&q=80',
            lat: -3.2988,
            lng: 114.5888,
            rating: 4.7,
            address: 'Jl. Brigjend H. Hasan Basri, Kayutangi',
            mustTry: 'Mie Bancir Telur Bebek'
        },
        {
            id: 'c4',
            name: 'Sate Tulang & Sop Banjar',
            category: 'Kuliner',
            district: 'Banjarmasin Tengah',
            description: 'Kuliner malam paling dicari. Sate tulang dengan bumbu habang yang meresap sempurna, berpadu dengan Sop Banjar hangat yang kaya akan kaldu sumsum.',
            image: 'https://images.unsplash.com/photo-1529692236671-61f93ef46450?auto=format&fit=crop&w=800&q=80',
            lat: -3.3216,
            lng: 114.5947,
            rating: 4.8,
            address: 'Pusat Kuliner Malam Banjarmasin Tengah',
            mustTry: 'Sate Tulang Habang'
        },
        {
            id: 'c5',
            name: 'Wadai Bingka Hj. Enong',
            category: 'Kuliner',
            district: 'Banjarmasin Timur',
            description: 'Identitas manis kota Banjarmasin. Bingka bakar dengan tekstur lembut dan aroma nangka/kentang yang khas, menjadi primadona buah tangan Kalimantan Selatan.',
            image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=80',
            lat: -3.3300, city: 'Banjarmasin',
            lng: 114.6100,
            rating: 4.9,
            address: 'Gerai Pusat Hj. Enong Banjarmasin',
            mustTry: 'Bingka Kentang Bakar'
        }
    ],
    cityStats: [
        { label: 'Literasi Digital', value: 82, max: 100, color: 'bg-orange-500' },
        { label: 'Adopsi QRIS', value: 70, max: 100, color: 'bg-yellow-500' },
        { label: 'Fiber Optic', value: 95, max: 100, color: 'bg-blue-500' },
        { label: 'Kualitas Sungai', value: 7.2, max: 10, color: 'bg-emerald-500' }
    ],
    
    // Missing States
    favorites: [],
    reviews: [],
    cultureNarrative: "Di Banjarmasin, budaya tidak tersimpan di museum, ia mengalir di sungai, terdengar di madihin, dan tertenun di sasirangan.",
    cultureCategories: {
        riverine: {
            title: "Riverine Heritage",
            description: "Kehidupan yang berdenyut di atas riak Barito, di mana air adalah jalan dan jukung adalah nyawa.",
            items: [
                { id: "rh1", title: "Pasar Terapung", subtitle: "Urat Nadi Tradisi", fact: "Praktik barter masih bertahan secara natural di Pasar Terapung Kuin dan Lok Baintan." },
                { id: "rh2", title: "Rumah Lanting", subtitle: "Arsitektur Terapung", fact: "Rumah Lanting memiliki fondasi batang pohon besar yang membuatnya bisa naik-turun mengikuti pasang surut sungai." },
                { id: "rh3", title: "Jukung", subtitle: "Transportasi Purba", fact: "Jukung Banjar dibangun menggunakan teknik pembakaran lambung untuk melebarkan kayu tanpa sambungan paku." }
            ]
        },
        folkArts: {
            title: "Folk Arts",
            description: "Warisan tutur dan kriya yang merekam memori kolektif masyarakat di setiap dentuman rebana dan helai benang.",
            items: [
                { id: "fa1", title: "Madihin", subtitle: "Seni Pantun Ritmis", fact: "Dituturkan secara improvisasi berbalas pantun sambil menabuh rebana kecil bernama Tarbang.", hasListen: true },
                { id: "fa2", title: "Mamanda", subtitle: "Teater Rakyat", fact: "Teater tradisional bermuatan kritik sosial yang dikemas dengan komedi satir khas Banjar." },
                { id: "fa3", title: "Kain Sasirangan", subtitle: "Batik Pamali", fact: "Sasirangan dulunya adalah kain obat yang ditenun secara spiritual (batik pamali) untuk menyembuhkan penyakit tertentu." }
            ]
        }
    },

    // Methods
    toggleFavorite: (id) => set((state) => ({ 
        favorites: state.favorites.includes(id) 
            ? state.favorites.filter(f => f !== id) 
            : [...state.favorites, id] 
    })),
    addReview: (review) => set((state) => ({ 
        reviews: [...state.reviews, review] 
    })),
    updateNarrative: (id, text) => set((state) => ({ 
        cultureNarrative: state.cultureNarrative.map(n => n.id === id ? { ...n, text } : n) 
    })),
    updatePlace: (id, data) => set((state) => ({ 
        places: state.places.map(p => p.id === id ? { ...p, ...data } : p) 
    })),
    addPlace: (place) => set((state) => ({ 
        places: [...state.places, { ...place, id: String(Date.now()) }] 
    })),
    deletePlace: (id) => set((state) => ({ 
        places: state.places.filter(p => p.id !== id) 
    })),
    updateCulinary: (id, data) => set((state) => ({ 
        culinary: state.culinary.map(c => c.id === id ? { ...c, ...data } : c) 
    })),
    addCulinary: (item) => set((state) => ({ 
        culinary: [...state.culinary, { ...item, id: 'c' + String(Date.now()) }] 
    })),
    deleteCulinary: (id) => set((state) => ({ 
        culinary: state.culinary.filter(c => c.id !== id) 
    })),
    updateStat: (label, value) => set((state) => ({ 
        cityStats: state.cityStats.map(s => s.label === label ? { ...s, value } : s) 
    }))
}));

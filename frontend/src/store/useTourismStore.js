import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTourismStore = create(
  persist(
    (set) => ({
      // 1. 15 Titik Wisata (Initial Data)
      places: [
        { id: 1, name: 'Siring Menara Pandang', lat: -3.3191, lng: 114.5912, category: 'Budaya', bestTime: '16:00 - 21:00', description: 'Ikon wisata kota Banjarmasin di pinggir sungai Martapura.', image: 'https://images.unsplash.com/photo-1596402184320-417d717867cd' },
        { id: 2, name: 'Pasar Terapung Lok Baintan', lat: -3.3166, lng: 114.5908, category: 'Budaya', bestTime: '05:00 - 08:00', description: 'Pasar tradisional otentik di atas perahu jukung.', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62' },
        { id: 3, name: 'Masjid Raya Sabilal Muhtadin', lat: -3.3175, lng: 114.5900, category: 'Sejarah', bestTime: '08:00 - 17:00', description: 'Masjid terbesar di Kalimantan Selatan dengan arsitektur megah.', image: 'https://images.unsplash.com/photo-1590073844006-33379778ae09' },
        { id: 4, name: 'Museum Lambung Mangkurat', lat: -3.4411, lng: 114.8431, category: 'Sejarah', bestTime: '09:00 - 15:00', description: 'Pusat pelestarian sejarah dan budaya Banjar.', image: 'https://images.unsplash.com/photo-1518998053574-53f1f1172f3f' },
        { id: 5, name: 'Pulau Kaget', lat: -3.4211, lng: 114.4922, category: 'Alam', bestTime: '06:00 - 10:00', description: 'Habitat alami monyet Bekantan endemik Kalimantan.', image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9' },
        { id: 6, name: 'Taman Hutan Raya Sultan Adam', lat: -3.5122, lng: 114.9211, category: 'Alam', bestTime: '07:00 - 16:00', description: 'Kawasan konservasi dengan pemandangan perbukitan hijau.', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470' },
        { id: 7, name: 'Kampung Sasirangan', lat: -3.3211, lng: 114.5944, category: 'Budaya', bestTime: '09:00 - 18:00', description: 'Pusat edukasi dan belanja kain tradisional Sasirangan.', image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17' },
        { id: 8, name: 'Duta Mall Banjarmasin', lat: -3.3255, lng: 114.5988, category: 'Modern', bestTime: '10:00 - 22:00', description: 'Pusat perbelanjaan terbesar di Kalimantan Selatan.', image: 'https://images.unsplash.com/photo-1567449303078-47baad696431' },
        { id: 9, name: 'Danau Biru Pengaron', lat: -3.3988, lng: 115.0122, category: 'Alam', bestTime: '08:00 - 16:00', description: 'Bekas tambang yang berubah menjadi telaga biru kristal.', image: 'https://images.unsplash.com/photo-1532703108233-69111d554cb4' },
        { id: 10, name: 'Siring Piere Tendean', lat: -3.3188, lng: 114.5922, category: 'Budaya', bestTime: '17:00 - 22:00', description: 'Ruang publik favorit untuk wisata kuliner pinggir sungai.', image: 'https://images.unsplash.com/photo-1596402184320-417d717867cd' },
        { id: 11, name: 'Hutan Pinus Mentaos', lat: -3.4422, lng: 114.8322, category: 'Alam', bestTime: '09:00 - 17:00', description: 'Destinasi asri di tengah kota Banjarbaru.', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e' },
        { id: 12, name: 'Bukit Batas', lat: -3.5333, lng: 114.9888, category: 'Alam', bestTime: '04:00 - 10:00', description: 'Raja Ampatnya Kalimantan Selatan di atas Waduk Riam Kanan.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b' },
        { id: 13, name: 'Pasar Terapung Muara Kuin', lat: -3.3011, lng: 114.5722, category: 'Budaya', bestTime: '05:00 - 07:00', description: 'Legenda pasar terapung tertua di Banjarmasin.', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62' },
        { id: 14, name: 'Candi Agung Amuntai', lat: -2.4211, lng: 115.2422, category: 'Sejarah', bestTime: '08:00 - 15:00', description: 'Situs sejarah kerajaan Negara Dipa abad ke-14.', image: 'https://images.unsplash.com/photo-1590073844006-33379778ae09' },
        { id: 15, name: 'Kiram Park', lat: -3.5011, lng: 114.9522, category: 'Modern', bestTime: '08:00 - 18:00', description: 'Wisata buatan modern dengan sentuhan bambu dan panorama pegunungan.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef' },
      ],

      // 2. Narasi Puitis
      cultureNarrative: [
        { id: 'p1', text: 'Di tepian Barito, waktu tak pernah benar-benar berlalu. Ia hanya bertukar rupa; dari gemericik arus yang mencium lunas jukung, hingga kilau intan yang lahir dari gelapnya bumi.' },
        { id: 'p2', text: 'Lihatlah jemari yang merintang warna pada sehelai Sasirangan— di sana ada doa yang dipintal, ada rahasia alam yang dijaga.' },
        { id: 'p3', text: 'Budaya kita bukan sekadar peninggalan, melainkan detak nadi yang terus beradu. Seperti simbal yang memecah hening, ia memanggil kita untuk pulang, merayakan kemilau yang takkan pernah padam di tanah Seribu Sungai.' }
      ],

      // 3. Modern City Stats
      cityStats: [
        { label: 'Penetrasi Digital', value: 85, color: 'bg-heritage-gold', max: 100 },
        { label: 'Startup Lokal', value: 120, color: 'bg-heritage-brown', max: 200 },
        { label: 'Smart City Index', value: 4.2, color: 'bg-heritage-gold', max: 5 },
        { label: 'Konektivitas Publik', value: 92, color: 'bg-heritage-brown', max: 100 }
      ],

      // 4. Admin Command Actions
      updatePlace: (id, updatedPlace) => set((state) => ({
        places: state.places.map(p => p.id === id ? { ...p, ...updatedPlace } : p)
      })),
      
      addPlace: (place) => set((state) => ({
        places: [...state.places, { ...place, id: Date.now() }]
      })),

      deletePlace: (id) => set((state) => ({
        places: state.places.filter(p => p.id !== id)
      })),

      updateNarrative: (id, text) => set((state) => ({
        cultureNarrative: state.cultureNarrative.map(n => n.id === id ? { ...n, text } : n)
      })),

      updateStat: (label, value) => set((state) => ({
        cityStats: state.cityStats.map(s => s.label === label ? { ...s, value } : s)
      }))
    }),
    {
      name: 'nadibarito-tourism-storage',
    }
  )
);

require('dotenv').config();
const mongoose = require('mongoose');
const Place = require('./models/Place');
const Culinary = require('./models/Culinary');
const Event = require('./models/Event');
const Culture = require('./models/Culture');

const places = [
    {
        name: 'Pasar Terapung Muara Kuin',
        category: 'Budaya',
        transport_type: 'Sungai',
        district: 'Banjarmasin Utara',
        location: { lat: -3.2929, lng: 114.5684, address: 'Jl. Alalak Selatan, Muara Kuin' },
        description: 'Pasar terapung tertua peninggalan Kesultanan Banjar (1526). Di sini transaksi dilakukan di atas perahu klotok dan jukung, menawarkan sayur, buah, dan kuliner tradisional.',
        images: ['https://images.unsplash.com/photo-1549449852-59530bedc78b?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.9
    },
    {
        name: 'Menara Pandang',
        category: 'Landmark',
        transport_type: 'Darat',
        district: 'Banjarmasin Tengah',
        location: { lat: -3.3186, lng: 114.5938, address: 'Siring Sungai Martapura' },
        description: 'Landmark modern Kota Banjarmasin dengan tinggi 21 meter. Merupakan titik pantau terbaik untuk melihat aktivitas Sungai Martapura dan keindahan kota, terutama saat senja.',
        images: ['https://images.unsplash.com/photo-1596402184320-417d7178b2cd?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.8
    },
    {
        name: 'Patung Bekantan',
        category: 'Landmark',
        transport_type: 'Darat',
        district: 'Banjarmasin Tengah',
        location: { lat: -3.3190, lng: 114.5940, address: 'Siring Sungai Martapura' },
        description: 'Patung raksasa setinggi 6.5 meter dari maskot satwa endemik Kalimantan Selatan, Kera hidung panjang (Bekantan). Sering menyemburkan air menghadap sungai.',
        images: ['https://images.unsplash.com/photo-1574548484606-5a468ee6118a?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.7
    },
    {
        name: 'Masjid Sultan Suriansyah',
        category: 'Sejarah',
        transport_type: 'Darat',
        district: 'Banjarmasin Utara',
        location: { lat: -3.2954, lng: 114.5768, address: 'Jl. Kuin Utara' },
        description: 'Masjid tertua dan bersejarah di Kalimantan Selatan yang dibangun pada 1526 setelah Pangeran Samudera memeluk Islam dan menjadi Sultan Suriansyah.',
        images: ['https://images.unsplash.com/photo-1590487930999-56d1c95bf2fb?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.9
    },
    {
        name: 'Museum Wasaka',
        category: 'Sejarah',
        transport_type: 'Darat',
        district: 'Banjarmasin Utara',
        location: { lat: -3.3033, lng: 114.6050, address: 'Jl. Kampung Kenanga Ulu' },
        description: 'Museum Waja Sampai Kaputing (Wasaka) yang menyimpan senjata peninggalan perjuangan kemerdekaan rakyat Banjar melawan penjajah.',
        images: ['https://images.unsplash.com/photo-1579601053077-3e1140024479?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.6
    },
    {
        name: 'Kampung Sasirangan',
        category: 'Budaya',
        transport_type: 'Darat',
        district: 'Banjarmasin Tengah',
        location: { lat: -3.3150, lng: 114.5975, address: 'Jl. Seberang Mesjid' },
        description: 'Sentra industri kerajinan kain tradisional Kalsel (Sasirangan). Pengunjung dapat melihat langsung proses pembuatan dan berbelanja suvenir autentik.',
        images: ['https://images.unsplash.com/photo-1611638363034-c90ca9fcf96f?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.8
    }
];

const culinary = [
    {
        name: 'Soto Banjar Bang Amat',
        priceRange: 'Rp 30.000 - Rp 50.000',
        location: { lat: -3.3100, lng: 114.6000, address: 'Jl. Benua Anyar, Banjarmasin Timur' },
        description: 'Soto Banjar legendaris yang disajikan dengan kuah kental susu, rempah, suwiran ayam, dan ketupat, dengan pemandangan tepat ke arah sungai.',
        images: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.9
    },
    {
        name: 'Nasi Kuning Cempaka',
        priceRange: 'Rp 20.000 - Rp 35.000',
        location: { lat: -3.3220, lng: 114.5880, address: 'Banjarmasin Tengah' },
        description: 'Nasi kuning khas Banjar dengan lauk bumbu masak habang (bumbu merah pekat yang rasanya manis gurih) dipadu dengan ikan haruan.',
        images: ['https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.8
    }
];

const events = [
    {
        name: 'Festival Budaya Susur Sungai',
        date: new Date('2026-09-24'),
        location: 'Sungai Martapura, Banjarmasin',
        description: 'Perayaan ulang tahun Kota Banjarmasin dengan parade jukung hias, wisata susur sungai massal, dan pertunjukan seni di Siring Menara Pandang.',
        image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1200&q=80'
    }
];

const cultures = [
    {
        name: 'Wisata Susur Sungai',
        category: 'Tradisi',
        description: 'Pilar utama budaya Banjarmasin sebagai Kota Seribu Sungai. Klotok dan Jukung digunakan bukan hanya sebagai alat transportasi, tetapi pusat ekonomi.',
        image: 'https://images.unsplash.com/photo-1549449852-59530bedc78b?auto=format&fit=crop&w=1200&q=80'
    },
    {
        name: 'Kain Sasirangan',
        category: 'Kriya',
        description: 'Kain penyembuhan dari zaman Pangeran Samudera yang kini menjadi identitas fashion estetik dengan berbagai motif alam.',
        image: 'https://images.unsplash.com/photo-1584118337855-f2d1136ce265?auto=format&fit=crop&w=1200&q=80'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nirantajogja');
        console.log('MongoDB Connected for Banjarmasin Specific...');

        await Place.deleteMany({});
        await Culinary.deleteMany({});
        await Event.deleteMany({});
        await Culture.deleteMany({});

        await Place.insertMany(places);
        await Culinary.insertMany(culinary);
        await Event.insertMany(events);
        await Culture.insertMany(cultures);

        console.log('Banjarmasin Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDB();

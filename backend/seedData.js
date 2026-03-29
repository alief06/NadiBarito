require('dotenv').config();
const mongoose = require('mongoose');
const Place = require('./models/Place');
const Culinary = require('./models/Culinary');
const Event = require('./models/Event');
const Culture = require('./models/Culture');

const places = [
    {
        name: 'Candi Borobudur',
        category: 'Sejarah',
        location: { lat: -7.607355, lng: 110.203804, address: 'Jl. Badrawati, Borobudur, Magelang' },
        description: 'Candi Buddha terbesar di dunia dan Situs Warisan Dunia UNESCO. Dibangun pada abad ke-9, menampilkan 2.500 panel relief dan 500 patung Buddha.',
        images: ['https://images.unsplash.com/photo-1596402184320-417d7178b2cd?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.9
    },
    {
        name: 'Candi Prambanan',
        category: 'Sejarah',
        location: { lat: -7.752020, lng: 110.491467, address: 'Jl. Raya Solo - Yogyakarta No.16, Prambanan' },
        description: 'Kompleks candi Hindu terbesar di Indonesia. Dikenal dengan arsitektur menara yang tinggi dan ramping serta relief yang menceritakan kisah Ramayana.',
        images: ['https://images.unsplash.com/photo-1625736340270-a9097e030edb?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.8
    },
    {
        name: 'Keraton Yogyakarta',
        category: 'Budaya',
        location: { lat: -7.805689, lng: 110.36406, address: 'Jl. Rotowijayan No. 1, Panembahan, Kraton' },
        description: 'Istana resmi Kesultanan Ngayogyakarta Hadiningrat. Pusat kebudayaan Jawa yang masih lestari dengan arsitektur megah dan museum artefak kerajaan.',
        images: ['https://images.unsplash.com/photo-1588693006208-463870349a75?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.7
    },
    {
        name: 'Taman Sari',
        category: 'Sejarah',
        location: { lat: -7.810151, lng: 110.358946, address: 'Patehan, Kraton, Kota Yogyakarta' },
        description: 'Bekas taman kerajaan atau kebun istana Sultan Yogyakarta. Memiliki kolam pemandian yang indah dan masjid bawah tanah Sumur Gumuling.',
        images: ['https://images.unsplash.com/photo-1611638363034-c90ca9fcf96f?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.6
    },
    {
        name: 'Gunung Merapi',
        category: 'Alam',
        location: { lat: -7.5407, lng: 110.4457, address: 'Sleman, Daerah Istimewa Yogyakarta' },
        description: 'Salah satu gunung berapi paling aktif di dunia. Menawarkan wisata lava tour dengan jeep yang memacu adrenalin sambil menikmati pemandangan alam yang megah.',
        images: ['https://images.unsplash.com/photo-1570535091217-09d5843477f7?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.9
    },
    {
        name: 'Pantai Parangtritis',
        category: 'Alam',
        location: { lat: -8.0210, lng: 110.3340, address: 'Kreteg, Bantul, Yogyakarta' },
        description: 'Pantai selatan yang legendaris dengan pasir hitam vulkanik dan gumuk pasir yang tinggi. Tempat terbaik untuk menikmati matahari terbenam.',
        images: ['https://images.unsplash.com/photo-1574548484606-5a468ee6118a?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.7
    },
    {
        name: 'Museum Ullen Sentalu',
        category: 'Budaya',
        location: { lat: -7.5979, lng: 110.4231, address: 'Jl. Boyong KM 25, Kaliurang, Sleman' },
        description: 'Museum seni dan budaya Jawa yang unik di dataran tinggi Kaliurang. Menyimpan koleksi dari empat kerajaan dinasti Mataram.',
        images: ['https://images.unsplash.com/photo-1518998053574-53f021346127?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.9
    },
    {
        name: 'Benteng Vredeburg',
        category: 'Sejarah',
        location: { lat: -7.8003, lng: 110.3663, address: 'Jl. Margo Mulyo No.6, Ngupasan, Gondomanan' },
        description: 'Benteng peninggalan Belanda yang kini menjadi museum perjuangan kemerdekaan Indonesia. Terletak tepat di ujung jalan Malioboro.',
        images: ['https://images.unsplash.com/photo-1579601053077-3e1140024479?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.5
    }
];

const culinary = [
    {
        name: 'Gudeg Yu Djum',
        priceRange: 'Rp 20.000 - Rp 50.000',
        location: { lat: -7.8175, lng: 110.3667, address: 'Jl. Wijilan No.167, Panembahan, Kraton' },
        description: 'Gudeg paling legendaris di Yogyakarta. Menyajikan gudeg kering dengan rasa otentik yang telah ada sejak tahun 1977.',
        images: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.8
    },
    {
        name: 'Warung Kopi Klotok',
        priceRange: 'Rp 10.000 - Rp 30.000',
        location: { lat: -7.6740, lng: 110.4150, address: 'Jl. Kaliurang KM 16, Pakem, Sleman' },
        description: 'Menikmati kopi khas dan pisang goreng hangat di pinggir sawah dengan suasana desa yang tenang dan pemandangan Gunung Merapi.',
        images: ['https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.9
    },
    {
        name: 'Bakpia Pathok 25',
        priceRange: 'Rp 25.000 - Rp 60.000',
        location: { lat: -7.7915, lng: 110.3620, address: 'Jl. KS Tubun No. 65, Ngampilan' },
        description: 'Oleh-oleh wajib Yogyakarta. Pengunjung bisa melihat langsung proses pembuatan bakpia yang masih hangat dari oven.',
        images: ['https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.7
    },
    {
        name: 'Mie Lethek Mbah Mendes',
        priceRange: 'Rp 15.000 - Rp 25.000',
        location: { lat: -7.9500, lng: 110.3500, address: 'Sorobayan, Sanden, Bantul' },
        description: 'Mie tradisional Bantul yang dibuat tanpa bahan pengawet dan pewarna. Memiliki tekstur unik dan rasa yang sangat gurih.',
        images: ['https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.6
    }
];

const events = [
    {
        name: 'Grebeg Syawal',
        date: new Date('2026-03-20'),
        location: 'Kraton Yogyakarta',
        description: 'Upacara besar memperingati Idul Fitri dengan arak-arak gunungan sebagai simbol rasa syukur Sultan kepada rakyat.',
        image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=1200&q=80'
    },
    {
        name: 'Yogyakarta Art Festival',
        date: new Date('2026-07-15'),
        location: 'Taman Budaya Yogyakarta',
        description: 'Festival seni tahunan yang menampilkan berbagai karya seniman lokal, instalasi seni, dan pertunjukan budaya.',
        image: 'https://images.unsplash.com/photo-1460661419201-fd4ce18a802d?auto=format&fit=crop&w=1200&q=80'
    },
    {
        name: 'Sekaten',
        date: new Date('2026-10-01'),
        location: 'Alun-alun Utara Yogyakarta',
        description: 'Pasar malam rakyat dan upacara peringatan Maulid Nabi Muhammad SAW dengan bunyi gamelan sekaten yang sakral.',
        image: 'https://images.unsplash.com/photo-1517457373958-b7bdd458ad20?auto=format&fit=crop&w=1200&q=80'
    }
];

const cultures = [
    {
        name: 'Wayang Kulit',
        category: 'Seni Pertunjukan',
        description: 'Seni pertunjukan bayangan tradisional yang menggunakan boneka kulit, diiringi gamelan dan menceritakan epos Ramayana atau Mahabharata.',
        image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1200&q=80'
    },
    {
        name: 'Batik Tulis',
        category: 'Kriya',
        description: 'Warisan budaya takbenda UNESCO. Teknik pewarnaan kain menggunakan malam (lilin) yang lukis dengan tangan menggunakan canting.',
        image: 'https://images.unsplash.com/photo-1584118337855-f2d1136ce265?auto=format&fit=crop&w=1200&q=80'
    },
    {
        name: 'Gamelan',
        category: 'Seni Musik',
        description: 'Ansambel musik tradisional Jawa yang terdiri dari berbagai alat musik perkusi perunggu, menciptakan harmoni ritual yang mendalam.',
        image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1200&q=80'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');

        await Place.deleteMany({});
        await Culinary.deleteMany({});
        await Event.deleteMany({});
        await Culture.deleteMany({});

        await Place.insertMany(places);
        await Culinary.insertMany(culinary);
        await Event.insertMany(events);
        await Culture.insertMany(cultures);

        console.log('Data Seeded Successfully with Expanded Content!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDB();

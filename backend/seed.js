require('dotenv').config();
const mongoose = require('mongoose');
const Place = require('./models/Place');
const Culinary = require('./models/Culinary');

const places = [
    {
        name: "Candi Prambanan",
        category: "Budaya",
        location: { lat: -7.752, lng: 110.491 },
        description: "Kompleks candi Hindu terbesar di Indonesia yang dibangun pada abad ke-9.",
        images: ["https://images.unsplash.com/photo-1596402184320-417d7178b2cd?auto=format&fit=crop&w=800&q=80"],
        rating: 4.8
    },
    {
        name: "Pantai Parangtritis",
        category: "Alam",
        location: { lat: -8.025, lng: 110.328 },
        description: "Pantat legendaris dengan pemandangan sunset yang memukau dan gumuk pasir.",
        images: ["https://images.unsplash.com/photo-1571738229419-79fe7a202b7f?auto=format&fit=crop&w=800&q=80"],
        rating: 4.5
    },
    {
        name: "Keraton Yogyakarta",
        category: "Sejarah",
        location: { lat: -7.805, lng: 110.364 },
        description: "Istana resmi Kesultanan Ngayogyakarta Hadiningrat yang masih terjaga kelestariannya.",
        images: ["https://images.unsplash.com/photo-1611638362848-0382025164bc?auto=format&fit=crop&w=800&q=80"],
        rating: 4.7
    },
    {
        name: "Tebing Breksi",
        category: "Alam",
        location: { lat: -7.805, lng: 110.364 },
        description: "Istana resmi Kesultanan Ngayogyakarta Hadiningrat yang masih terjaga kelestariannya.",
        images: ["https://images.unsplash.com/photo-1611638362848-0382025164bc?auto=format&fit=crop&w=800&q=80"],
        rating: 4.7
    }
];

const culinaryList = [
    {
        name: "Gudeg Yu Djum",
        priceRange: "Populer",
        location: { lat: -7.782, lng: 110.367 },
        description: "Gudeg nangka muda manis gurih dengan krecek pedas yang ikonik.",
        images: ["https://images.unsplash.com/photo-1582234372722-50d7ccc30e5a?auto=format&fit=crop&w=800&q=80"],
        isHalal: true,
        rating: 4.6
    },
    {
        name: "Angkringan Lik Man",
        priceRange: "Murah",
        location: { lat: -7.789, lng: 110.363 },
        description: "Tempat nongkrong legendaris dengan Kopi Joss (kopi arang) dan sego kucing.",
        images: ["https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80"],
        isHalal: true,
        rating: 4.5
    },
    {
        name: "Bakmi Kadin",
        priceRange: "Populer",
        location: { lat: -7.801, lng: 110.375 },
        description: "Bakmi Jawa autentik yang dimasak menggunakan anglo arang tradisional.",
        images: ["https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80"],
        isHalal: true,
        rating: 4.7
    },
    {
        name: "Sate Klathak Pak Pong",
        priceRange: "Populer",
        location: { lat: -7.855, lng: 110.405 },
        description: "Sate kambing muda dengan tusuk ruji besi yang unik dan rasa rempah meresap.",
        images: ["https://images.unsplash.com/photo-1529692236671-f1f6e9481b2b?auto=format&fit=crop&w=800&q=80"],
        isHalal: true,
        rating: 4.8
    },
    {
        name: "Nasi Goreng Kambing Pak Sabar",
        priceRange: "Murah",
        location: { lat: -7.795, lng: 110.368 },
        isHalal: true,
        rating: 4.6
    },
    {
        name: "Oseng Mercon Bu Narti",
        priceRange: "Populer",
        location: { lat: -7.785, lng: 110.370 },
        description: "Masakan daging sapi super pedas yang meledak di lidah, pelopor oseng mercon.",
        images: ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"],
        isHalal: true,
        rating: 4.7
    },
    {
        name: "Soto Kadipiro",
        priceRange: "Murah",
        location: { lat: -7.790, lng: 110.380 },
        isHalal: true,
        rating: 4.6
    },
    {
        name: "Gudeg Pawon",
        priceRange: "Populer",
        location: { lat: -7.810, lng: 110.370 },
        isHalal: true,
        rating: 4.8
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");
        await Place.deleteMany({});
        await Culinary.deleteMany({});
        await Place.insertMany(places);
        await Culinary.insertMany(culinaryList);
        console.log("Database Seeded Successfully!");
        process.exit();
    } catch (err) {
        console.error("Seeding Error:", err);
        process.exit(1);
    }
};

seedDB();

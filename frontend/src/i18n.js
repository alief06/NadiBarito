import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    ID: {
        translation: {
            nav: {
                explore: 'Eksplorasi',
                history: 'Sejarah',
                culture: 'Budaya',
                modern: 'Masa Depan',
                culinary: 'Kuliner',
                map: 'Peta',
                planner: 'Planner'
            },
            hero: {
                welcome: 'Selamat Datang di Wilayah Istimewa',
                description: 'Menemukan harmoni antara tradisi luhur dan masa depan digital di jantung budaya Pulau Jawa.'
            },
            features: {
                curated: 'Destinasi Terkurasi',
                curated_desc: 'Temukan sudut-sudut tersembunyi Jogja yang autentik dan jarang diketahui.',
                planner: 'Smart Planner',
                planner_desc: 'Rencanakan perjalanan Anda dalam hitungan detik dengan AI cerdas kami.',
                guide: 'Panduan Terpercaya',
                guide_desc: 'Informasi akurat dari komunitas lokal untuk keamanan dan kenyamanan Anda.'
            },
            common: {
                search: 'Cari...',
                back: 'Kembali',
                next: 'Selanjutnya',
                details: 'Lihat Detail',
                save: 'Simpan',
                explore_now: 'Jelajahi Sekarang',
                plan_trip: 'Rencanakan Wisata'
            }
        }
    },
    EN: {
        translation: {
            nav: {
                explore: 'Explore',
                history: 'History',
                culture: 'Culture',
                modern: 'Modern',
                culinary: 'Culinary',
                map: 'Map',
                planner: 'Planner'
            },
            hero: {
                welcome: 'Welcome to Special Region',
                description: 'Finding harmony between noble tradition and digital future in the heart of Javanese culture.'
            },
            features: {
                curated: 'Curated Destinations',
                curated_desc: 'Discover authentic and hidden gems of Jogja that are rarely known.',
                planner: 'Smart Planner',
                planner_desc: 'Plan your trip in seconds with our intelligent AI system.',
                guide: 'Trusted Guide',
                guide_desc: 'Accurate information from the local community for your safety and comfort.'
            },
            common: {
                search: 'Search...',
                back: 'Back',
                next: 'Next',
                details: 'View Details',
                save: 'Save',
                explore_now: 'Explore Now',
                plan_trip: 'Plan Trip'
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'ID',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;

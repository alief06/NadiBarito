import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, MapPin, Navigation } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Button from '../components/Button';
import Hero from '../components/Hero';
import { destinations } from '../data'; // File mockup database

const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    
    // Automated Planner Logic State
    const [itinerary, setItinerary] = useState([]);
    const [isPlannerLoading, setIsPlannerLoading] = useState(false);

    // Fungsi Automated Planner (Sistem Penjadwalan Sederhana)
    const generateBanjarmasinItinerary = () => {
        setIsPlannerLoading(true);
        // Simulasi fetching/processing database
        setTimeout(() => {
            // Sort database berdasarkan priority waktu (1: Subuh, 2: Pagi, 3: Siang, dsb)
            const sortedDestinations = [...destinations].sort((a, b) => a.priority - b.priority);
            
            // Ambil 4 destinasi teratas untuk Itinerary 1 Hari yang padat & masuk akal
            setItinerary(sortedDestinations.slice(0, 4));
            setIsPlannerLoading(false);
        }, 1200);
    };

    return (
        <PageTransition>
            {/* Super Dark Base Background agar menyatu dengan Spline 3D di Hero */}
            <div className="min-h-screen bg-[#0a0a0a] text-[#EAF4F4] overflow-x-hidden transition-colors duration-[1.5s]">
                
                {/* 1. Hero Spline 3D Background & Search Bar Container */}
                <Hero />

                {/* 2. Jejak Kesultanan (History Section) */}
                <section className="py-24 md:py-32 px-8 md:px-16 lg:px-32 max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="flex flex-col md:flex-row gap-16 items-center"
                    >
                        <div className="w-full md:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#f59e0b] mb-4 drop-shadow-lg">Jejak Kesultanan</h2>
                            <h3 className="text-2xl font-sans font-bold mb-6 text-white/90">Berdirinya Banjarmasin (1526)</h3>
                            <p className="text-lg leading-relaxed text-white/70 mb-8 font-light">
                                Perang takhta membawa Pangeran Samudera meminta bantuan ke Demak. Kemenangan bersejarah itu tidak hanya mengukuhkan kekuasaannya, namun juga menjadi titik awal masuknya Islam di Banjarmasin. Bergelar <strong>Sultan Suriansyah</strong>, beliau mendirikan fondasi pemerintahan di Kuin, menciptakan peradaban tangguh di tepian sungai.
                            </p>
                            <Button variant="outline" onClick={() => navigate('/history')} className="border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b] hover:text-black transition-all">
                                Telusuri Sejarah
                            </Button>
                        </div>
                        {/* Image Layout */}
                        <div className="w-full md:w-1/2 relative h-[400px] rounded-[2rem] overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.15)] group">
                             <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Masjid_Sultan_Suriansyah_1.jpg" alt="Masjid Sultan Suriansyah" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                             <div className="absolute bottom-8 left-8 text-white">
                                <span className="text-xs tracking-widest uppercase text-[#f59e0b] font-bold">Landmark</span>
                                <h4 className="text-xl font-bold">Masjid Sultan Suriansyah</h4>
                             </div>
                        </div>
                    </motion.div>
                </section>

                {/* 3. Nadi Barito (Culture Section) */}
                <section className="py-24 md:py-32 px-8 md:px-16 lg:px-32 max-w-7xl mx-auto relative">
                    <div className="absolute inset-0 bg-white/5 rounded-[4rem] -z-10 blur-3xl"></div>
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="flex flex-col md:flex-row-reverse gap-16 items-center"
                    >
                        <div className="w-full md:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#f59e0b] mb-4 drop-shadow-lg uppercase tracking-tight">NADIBARITO</h2>
                            <h3 className="text-2xl font-sans font-bold mb-6 text-white/90">Budaya Jukung & Kerajinan Sasirangan</h3>
                            <p className="text-lg leading-relaxed text-white/70 mb-8 font-light">
                                Mengarungi kehidupan di atas <strong>Jukung</strong>, bersapa di Pasar Terapung sejak waktu Subuh yang magis. Budaya warga yang tak bisa dilepaskan dari air, diabadikan sempurna di lekuk motif kain <strong>Sasirangan</strong> yang dijahit tangan dengan teliti dan penuh kebanggaan.
                            </p>
                            <Button onClick={() => navigate('/culture')} className="bg-[#f59e0b] text-black font-bold uppercase tracking-wider hover:bg-yellow-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                                Menyelami Budaya
                            </Button>
                        </div>
                        {/* Two Image Staggered Grid */}
                        <div className="w-full md:w-1/2 flex gap-4 h-[450px]">
                            <div className="w-1/2 h-full pb-12">
                                <img src="https://images.unsplash.com/photo-1549449852-59530bedc78b?auto=format&fit=crop&w=400&q=80" alt="Pasar Terapung" className="w-full h-full object-cover rounded-[2rem] shadow-lg" />
                            </div>
                            <div className="w-1/2 h-full pt-12">
                                <img src="https://upload.wikimedia.org/wikipedia/id/3/3d/Kain_Sasirangan.jpg" alt="Sasirangan" className="w-full h-full object-cover rounded-[2rem] shadow-lg" />
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* 4. Automated Planner Feature */}
                <section className="py-24 md:py-32 px-8 md:px-16 lg:px-32 max-w-7xl mx-auto text-center border-t border-white/10 mt-16">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#f59e0b] mb-6 drop-shadow-md">Automated Planner</h2>
                        <p className="max-w-xl mx-auto mb-12 text-lg text-white/60 font-light">
                            Tidak perlu pusing mengatur jadwal liburan singkat Anda. Biarkan algoritma kami merekonstruksi alur perjalanan 1 hari terbaik secara runut.
                        </p>
                        
                        <button 
                            onClick={generateBanjarmasinItinerary} 
                            disabled={isPlannerLoading}
                            className={`flex items-center gap-4 mx-auto px-10 py-5 rounded-full font-bold uppercase tracking-widest transition-all duration-300 ${isPlannerLoading ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-[#112F36] text-[#f59e0b] hover:bg-[#1a444e] border border-[#f59e0b]/50 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]'}`}
                        >
                            <Navigation size={18} />
                            {isPlannerLoading ? 'Menghitung Jarak & Waktu...' : 'Generate Itinerary'}
                        </button>

                        {/* Itinerary Result Display */}
                        <div className="mt-16 text-left relative">
                            {/* Vertical Line for Timeline */}
                            {itinerary.length > 0 && <div className="absolute left-1/2 top-4 bottom-0 w-px bg-white/10 hidden lg:block"></div>}
                            
                            <AnimatePresence>
                                {itinerary.map((item, index) => (
                                    <motion.div 
                                        key={item.id}
                                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ delay: index * 0.2 }}
                                        className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center mb-16 ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
                                    >
                                        <div className="w-full lg:w-1/2 relative">
                                            <div className="w-full h-64 rounded-3xl overflow-hidden shadow-xl border border-white/5">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            {/* Timeline Node Dot */}
                                            <div className={`hidden lg:block absolute top-1/2 -mt-2 w-4 h-4 rounded-full bg-[#f59e0b] shadow-[0_0_15px_#f59e0b] ${index % 2 === 0 ? '-right-[2.5rem]' : '-left-[2.5rem]'}`}></div>
                                        </div>
                                        
                                        <div className="w-full lg:w-1/2 bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                                            <div className="flex items-center gap-2 text-[#f59e0b] font-bold text-sm uppercase tracking-widest mb-4">
                                                <Clock size={16} /> Waktu Ideal: {item.bestTime}
                                            </div>
                                            <h4 className="font-serif text-3xl font-bold mb-4">{item.name}</h4>
                                            <div className="inline-block px-4 py-2 rounded-full bg-white/10 text-xs font-semibold mb-4 text-white/80">{item.category}</div>
                                            <p className="text-white/70 leading-relaxed text-base">{item.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </section>

                {/* 5. Google Maps Coordinates Lock */}
                <section className="py-24 px-8 md:px-16 lg:px-32 max-w-7xl mx-auto mb-32">
                    <div className="bg-[#112F36] p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden border border-white/10">
                        {/* Decorative background glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f59e0b]/10 blur-[100px] rounded-full pointer-events-none"></div>
                        
                        <div className="mb-10 text-center relative z-10">
                            <MapPin size={32} className="mx-auto text-[#f59e0b] mb-4" />
                            <h2 className="text-3xl font-serif font-bold text-white tracking-widest">Titik Koordinat: <span className="text-[#f59e0b]">Siring Barito</span></h2>
                            <p className="text-white/60 mt-2 font-mono text-sm">-3.316694, 114.590111</p>
                        </div>
                        
                        {/* Map iframe wrapped for responsiveness */}
                        <div className="w-full h-[500px] rounded-[2rem] overflow-hidden border border-white/20 shadow-inner relative z-10">
                            <iframe 
                                src="https://maps.google.com/maps?q=-3.316694,114.590111&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Banjarmasin Siring Map"
                                className="grayscale contrast-125 opacity-90 transition-all hover:grayscale-0 hover:opacity-100 duration-500"
                            ></iframe>
                        </div>
                    </div>
                </section>

            </div>
        </PageTransition>
    );
};

export default Home;

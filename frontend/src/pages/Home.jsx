import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Clock, MapPin, Navigation, Sparkles, ArrowRight, Zap, Loader2, Compass } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Hero from '../components/Hero';
import { useTourismStore } from '../store/useTourismStore';
import SEO from '../components/SEO';

const Home = () => {
    const navigate = useNavigate();
    const { places, cityStats } = useTourismStore();
    
    // Automated Planner Logic State
    const [itinerary, setItinerary] = useState([]);
    const [isPlannerLoading, setIsPlannerLoading] = useState(false);

    const generateBanjarmasinItinerary = () => {
        setIsPlannerLoading(true);
        setTimeout(() => {
            const shuffled = [...places].sort(() => 0.5 - Math.random());
            setItinerary(shuffled.slice(0, 4));
            setIsPlannerLoading(false);
        }, 1500);
    };

    return (
        <PageTransition>
            <SEO 
                title="Beranda" 
                description="Selamat datang di NADIBARITO. Jelajahi Denyut Nadi Seribu Sungai melalui platform pariwisata masa depan Kalimantan Selatan." 
            />
            <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-[#f97316]/30">
                
                {/* 1. Hero Spline 3D Background */}
                <Hero />

                {/* 2. Decentralized Stats Node */}
                <section className="py-20 px-6 max-w-7xl mx-auto -mt-32 relative z-20">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {cityStats.map((stat, idx) => (
                            <motion.div 
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[3rem] group hover:border-[#f97316]/40 transition-all shadow-2xl"
                            >
                                <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-6 group-hover:text-[#f97316] transition-colors">{stat.label}</div>
                                <div className="text-5xl font-serif font-bold mb-6 tracking-tighter">{stat.value}{stat.max === 100 ? '%' : ''}</div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${(stat.value / stat.max) * 100}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                                        className={`h-full bg-[#f97316] shadow-[0_0_15px_rgba(249,115,22,0.4)]`}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 3. Jejak Kesultanan (History Section) */}
                <section className="py-24 md:py-48 px-6 max-w-7xl mx-auto border-b border-white/5">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col lg:flex-row gap-24 items-center"
                    >
                        <div className="w-full lg:w-1/2 space-y-12">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-px bg-[#f97316]" />
                                <span className="text-[#f97316] text-[10px] font-bold uppercase tracking-[0.5em]">Anno 1526</span>
                            </div>
                            <h2 className="text-6xl md:text-8xl font-serif font-bold leading-none tracking-tighter">Jejak <br/><span className="text-[#f97316]">Kesultanan</span></h2>
                            <p className="text-xl leading-relaxed text-white/40 font-serif italic border-l-2 border-[#f97316]/30 pl-10 max-w-lg">
                                "Perang takhta membawa Pangeran Samudera meminta bantuan ke Demak. Kemenangan bersejarah itu tidak hanya mengukuhkan kekuasaannya, namun juga menjadi titik awal peradaban baru."
                            </p>
                            <button 
                                onClick={() => navigate('/history')} 
                                className="group flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-[#f97316] transition-all border border-white/5 bg-white/5 px-8 py-4 rounded-full w-fit shadow-xl"
                            >
                                Telusuri Garis Waktu <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform duration-500" />
                            </button>
                        </div>
                        <div className="w-full lg:w-1/2 relative group">
                             <div className="relative h-[700px] rounded-[4rem] overflow-hidden border border-white/10 shadow-3xl">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Masjid_Sultan_Suriansyah_1.jpg" alt="Masjid Sultan Suriansyah" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2s]" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                <div className="absolute bottom-16 left-16">
                                    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 px-8 py-6 rounded-[2.5rem]">
                                        <span className="text-[10px] font-bold text-[#f97316] uppercase tracking-[0.4em] mb-2 block">Pusaka Kuno</span>
                                        <h4 className="text-4xl font-serif font-bold italic tracking-tight">Masjid Sultan Suriansyah</h4>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </motion.div>
                </section>

                {/* 4. Automated Planner Section (AI Itinerary Reconstruction) */}
                <section className="py-48 px-6 max-w-7xl mx-auto">
                    <div className="text-center mb-24 space-y-8">
                        <div className="inline-flex items-center gap-3 bg-[#f97316]/10 px-8 py-3 rounded-full border border-[#f97316]/20">
                            <Zap size={16} className="text-[#f97316] animate-pulse" />
                            <span className="text-[#f97316] text-[10px] font-bold uppercase tracking-[0.5em]">Karsa Digital Intelligence</span>
                        </div>
                        <h2 className="text-6xl md:text-9xl font-serif font-bold italic tracking-tighter leading-none">Automated <span className="text-[#f97316]">Planner</span></h2>
                        <p className="max-w-xl mx-auto text-white/40 text-lg leading-relaxed font-serif italic border-l-2 border-white/5 pl-8">
                            Biarkan algoritma cerdas Nadi Barito merajut untaian narasi perjalanan Anda di kota Seribu Sungai.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-16">
                        <button 
                            onClick={generateBanjarmasinItinerary} 
                            disabled={isPlannerLoading}
                            className="relative group overflow-hidden px-20 py-8 rounded-[2.5rem] bg-white text-black font-extrabold uppercase tracking-[0.4em] text-[12px] hover:bg-[#f97316] hover:text-white transition-all duration-700 disabled:opacity-50 shadow-3xl active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-4">
                                {isPlannerLoading ? <Loader2 className="animate-spin" size={20} /> : <Compass size={20} />}
                                {isPlannerLoading ? 'Menyusun Dimensi...' : 'Konstruksi Perjalanan'}
                            </span>
                        </button>

                        <div className="w-full relative py-20">
                            <div className="space-y-40">
                                <AnimatePresence mode="popLayout">
                                    {itinerary.map((item, index) => (
                                        <motion.div 
                                            key={item.id}
                                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                                            className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-32 ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
                                        >
                                            <div className="w-full lg:w-1/2 relative group">
                                                <div className="h-[500px] rounded-[4rem] overflow-hidden border border-white/5 shadow-3xl transition-all group-hover:border-[#f97316]/50">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2s]" />
                                                </div>
                                                <div className={`absolute top-1/2 -mt-6 w-12 h-12 rounded-full border-8 border-[#050505] bg-white shadow-[0_0_40px_rgba(255,255,255,0.3)] group-hover:bg-[#f97316] group-hover:shadow-[0_0_40px_rgba(249,115,22,0.8)] transition-all z-20 hidden lg:block ${index % 2 === 0 ? '-right-6' : '-left-6'}`} />
                                            </div>
                                            
                                            <div className="w-full lg:w-1/2 space-y-10 text-left">
                                                <div className="flex items-center gap-4 text-[#f97316] font-bold text-[10px] uppercase tracking-[0.5em] italic">
                                                    <Clock size={16} /> Relevansi: {item.bestTime}
                                                </div>
                                                <h4 className="font-serif text-5xl md:text-6xl font-bold tracking-tight italic text-white group-hover:text-[#f97316] transition-colors">{item.name}</h4>
                                                <p className="text-white/40 leading-relaxed text-xl font-serif italic border-l-2 border-white/5 pl-10 max-w-lg">
                                                    {item.description}
                                                </p>
                                                <Link to={`/place/${item.id}`} className="group/link inline-flex items-center gap-4 text-[#f97316] text-[11px] font-bold uppercase tracking-[0.3em] pb-2 border-b border-[#f97316]/20 hover:border-[#f97316] transition-all">
                                                    Detail Koordinat <ArrowRight size={16} className="group-hover/link:translate-x-3 transition-transform duration-500" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. G-Maps Visual Anchor (Pusat Karsa) */}
                <section className="py-48 px-6 max-w-7xl mx-auto border-t border-white/5">
                    <div className="relative rounded-[5rem] overflow-hidden border border-white/10 shadow-3xl bg-white/2 p-6">
                        <div className="aspect-video w-full rounded-[4rem] overflow-hidden">
                            <iframe 
                                src="https://maps.google.com/maps?q=-3.316694,114.590111&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                title="Banjarmasin Siring Map"
                                className="grayscale contrast-125 brightness-50 opacity-100 hover:grayscale-0 hover:brightness-100 transition-all duration-[1.5s] scale-110 group-hover:scale-100"
                            ></iframe>
                        </div>
                        <div className="absolute bottom-16 right-16 text-right hidden lg:block">
                            <div className="bg-[#050505]/60 backdrop-blur-3xl border border-white/10 p-12 rounded-[4rem] shadow-3xl text-left max-w-md">
                                <div className="p-5 bg-[#f97316]/10 rounded-[2.5rem] w-fit mb-8 text-[#f97316] border border-[#f97316]/20">
                                    <Navigation size={32} />
                                </div>
                                <h2 className="text-5xl font-serif font-bold text-white mb-3 italic tracking-tight">Pusat Karsa</h2>
                                <p className="text-[#f97316] font-mono text-[11px] font-bold tracking-[0.2em] uppercase mb-8">Siring Barito • -3.3166, 114.5901</p>
                                <button 
                                    onClick={() => navigate('/map')}
                                    className="w-full bg-white text-black font-bold py-6 rounded-[2rem] flex items-center justify-center gap-4 uppercase text-[10px] tracking-widest hover:bg-[#f97316] hover:text-white transition-all shadow-2xl active:scale-95"
                                >
                                    Eksplorasi Peta Digital
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="py-20 text-center opacity-10">
                    <div className="text-[10px] font-bold uppercase tracking-[1em]">
                        Nadi Barito v2.1.0-RC
                    </div>
                </div>

            </div>
        </PageTransition>
    );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section, Container, Grid } from '../components/Layout';
import PageTransition from '../components/PageTransition';
import Card, { CardContent } from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { Cpu, Rocket, BarChart3, Globe, Zap, Users, ShieldCheck, Wifi, LayoutDashboard, Share2, ArrowRight, ExternalLink } from 'lucide-react';
import { useTourismStore } from '../store/useTourismStore';
import SEO from '../components/SEO';

const startups = [
    { 
        name: 'SAPA Banjarmasin', 
        desc: 'Super-app resmi Pemko untuk integrasi layanan publik dan respons cepat pengaduan warga secara satu pintu.', 
        sector: 'Gov-Tech' 
    },
    { 
        name: 'Banjarmasin Techno Park', 
        desc: 'Pusat inkubasi startup dan komunitas kreatif yang berlokasi di Jl. RE Martadinata sebagai katalis ekonomi digital.', 
        sector: 'Innovation Hub' 
    },
    { 
        name: 'PLUT-KUMKM Digital', 
        desc: 'Hub digitalisasi produk Sasirangan dan UMKM lokal menuju pasar ekspor melalui optimasi e-commerce global.', 
        sector: 'Creative Economy' 
    }
];

const Modern = () => {
    const { cityStats } = useTourismStore();
    
    return (
        <PageTransition>
            <SEO 
                title="Modern Kalsel" 
                description="Menjelajahi transformasi digital Banjarmasin 2026: The Gateway of Nusantara (IKN)." 
                category="Smart City"
            />
            <div className="bg-[#050505] min-h-screen pb-32">
                <Section>
                    <Container>
                        {/* Hero Section: The Gateway of Nusantara */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-32 pt-20"
                        >
                            <span className="text-[#f97316] text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">
                                Visi Masa Depan 2026
                            </span>
                            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight tracking-tight">
                                Transformasi <br/><span className="text-[#f97316]">Karsa Digital</span>
                            </h1>
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <p className="max-w-xl text-lg text-white/40 leading-relaxed font-serif italic border-l-2 border-[#f97316]/30 pl-8">
                                    Banjarmasin: The Gateway of Nusantara (IKN). Membangun kedaulatan digital Kalimantan Selatan melalui ekosistem yang presisi dan inklusif.
                                </p>
                            </div>
                        </motion.div>

                        {/* Modern Infrastructure Grid (Factual Projects) */}
                        <div className="mb-40">
                            <div className="flex items-center gap-6 mb-16">
                                <div className="p-4 bg-[#f97316]/10 rounded-2xl text-[#f97316] border border-[#f97316]/20">
                                    <Cpu size={24} />
                                </div>
                                <h2 className="text-3xl font-serif font-bold text-white">Smart City Initiatives</h2>
                            </div>
                            <Grid cols={3} gap={10}>
                                <Card className="bg-white/5 border-white/5 shadow-2xl rounded-[2.5rem] group hover:border-[#f97316]/30 transition-all">
                                    <CardContent className="p-10 space-y-8">
                                        <div className="p-4 bg-white/5 rounded-2xl w-fit text-white group-hover:bg-[#f97316] group-hover:text-white transition-all duration-500">
                                            <ShieldCheck size={28} />
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold text-white">IoT Infrastructure</h3>
                                        <p className="text-sm text-white/40 leading-relaxed font-serif italic">
                                            Implementasi Early Warning System (EWS) Banjir Rob berbasis sensor ultrasonic di bantaran Sungai Martapura untuk mitigasi bencana yang presisi.
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-white/5 border-white/5 shadow-2xl rounded-[2.5rem] group hover:border-[#f97316]/30 transition-all">
                                    <CardContent className="p-10 space-y-8">
                                        <div className="p-4 bg-white/5 rounded-2xl w-fit text-white group-hover:bg-[#f97316] group-hover:text-white transition-all duration-500">
                                            <Wifi size={28} />
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold text-white">Public Connectivity</h3>
                                        <p className="text-sm text-white/40 leading-relaxed font-serif italic">
                                            Jaringan Fiber Optic merata di kawasan Siring Pierre Tendean dan Jembatan Pasar Lama sebagai fasilitas pendukung ekonomi kreatif 24/7.
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-white/5 border-white/5 shadow-2xl rounded-[2.5rem] group hover:border-[#f97316]/30 transition-all">
                                    <CardContent className="p-10 space-y-8">
                                        <div className="p-4 bg-white/5 rounded-2xl w-fit text-white group-hover:bg-[#f97316] group-hover:text-white transition-all duration-500">
                                            <LayoutDashboard size={28} />
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold text-white">Digital Governance</h3>
                                        <p className="text-sm text-white/40 leading-relaxed font-serif italic">
                                            Transformasi birokrasi melalui Command Center Balai Kota yang memantau data kota secara real-time untuk pengambilan kebijakan yang cepat.
                                        </p>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </div>

                        {/* Real-time Factual Stats */}
                        <div className="grid lg:grid-cols-2 gap-20 mb-40 items-center border-t border-white/5 pt-32">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-12"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center gap-6">
                                        <div className="p-4 bg-[#f97316]/10 rounded-2xl text-[#f97316] border border-[#f97316]/20">
                                            <BarChart3 size={24} />
                                        </div>
                                        <h2 className="text-3xl font-serif font-bold text-white tracking-tight">Kalsel Digital Index 2026</h2>
                                    </div>
                                    <p className="text-white/40 text-lg leading-relaxed font-serif italic border-l-2 border-white/10 pl-8">
                                        Aksesibilitas teknologi yang inklusif di Kalimantan Selatan telah menciptakan lompatan besar dalam literasi dan kemandirian ekonomi digital.
                                    </p>
                                </div>
                                <div className="space-y-8 bg-white/5 p-10 rounded-[3rem] border border-white/5">
                                    {cityStats.map((s, idx) => (
                                        <div key={idx} className="space-y-4">
                                            <div className="flex justify-between items-end">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{s.label}</span>
                                                <span className="text-xl font-serif font-bold text-[#f97316]">{s.value}{s.max === 10 ? '' : '%'}</span>
                                            </div>
                                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${(s.value / (s.max || 100)) * 100}%` }}
                                                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                                                    className={`h-full ${s.color} shadow-[0_0_20px_rgba(249,115,22,0.4)]`}
                                                ></motion.div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <button 
                                        onClick={() => window.open('https://smartcity.banjarmasinkota.go.id', '_blank')}
                                        className="w-full mt-8 bg-white text-black font-bold py-6 rounded-2xl flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest hover:bg-[#f97316] hover:text-white transition-all shadow-2xl group"
                                    >
                                        <BarChart3 size={16} /> 
                                        Lihat Data Real-time 
                                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative h-[600px] rounded-[4rem] overflow-hidden border border-white/10 shadow-3xl group"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1000&q=80"
                                    alt="Banjarmasin Smart City Center"
                                    className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                <div className="absolute bottom-12 left-12 right-12">
                                    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem]">
                                        <p className="text-white text-3xl font-serif font-bold italic leading-tight">"Harmonisasi Pusaka Banjar dengan Teknologi Masa Depan."</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Startup Ecosystem (Factual Entities) */}
                        <div className="mb-20">
                            <div className="flex items-center gap-6 mb-16">
                                <div className="p-4 bg-[#f97316]/10 rounded-2xl text-[#f97316] border border-[#f97316]/20">
                                    <Rocket size={24} />
                                </div>
                                <h2 className="text-3xl font-serif font-bold text-white">Startup Lokal Kebanggaan</h2>
                            </div>
                            <Grid cols={3} gap={10}>
                                {startups.map((st, i) => (
                                    <Link 
                                        key={i} 
                                        to="/map"
                                        className="group relative overflow-hidden bg-white/5 border-white/5 rounded-[3rem] transition-all hover:bg-white/10"
                                    >
                                        <div className="absolute top-0 left-0 h-1 bg-[#f97316] w-0 group-hover:w-full transition-all duration-700 shadow-[0_0_15px_#f97316]"></div>
                                        <CardContent className="p-10 space-y-6">
                                            <div className="flex justify-between items-start">
                                                <Badge variant="outline" className="text-[8px] border-white/10 text-white/30 uppercase tracking-[0.3em] font-bold py-1 px-4 rounded-full">{st.sector}</Badge>
                                                <Share2 size={16} className="text-white/10 group-hover:text-[#f97316] transition-colors" />
                                            </div>
                                            <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#f97316] transition-colors">{st.name}</h3>
                                            <p className="text-sm text-white/40 leading-relaxed font-serif italic border-l-2 border-white/5 pl-6 py-2">
                                                {st.desc}
                                            </p>
                                            <div className="pt-4 flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                Selusuri Ekosistem <ArrowRight size={14} />
                                            </div>
                                        </CardContent>
                                    </Link>
                                ))}
                            </Grid>
                        </div>
                    </Container>
                </Section>
            </div>
        </PageTransition>
    );
};

export default Modern;

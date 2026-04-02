import React from 'react';
import { motion } from 'framer-motion';
import { Section, Container, Grid } from '../components/Layout';
import PageTransition from '../components/PageTransition';
import Card, { CardContent } from '../components/Card';
import Badge from '../components/Badge';
import { Cpu, Rocket, BarChart3, Globe, Zap, Users } from 'lucide-react';
import { useTourismStore } from '../store/useTourismStore';

const startups = [
    { name: 'KalselTech', desc: 'Solusi waste management berbasis AI.', sector: 'Eco-tech' },
    { name: 'HeritageArt', desc: 'Platform digitalisasi aset budaya.', sector: 'Creativity' },
    { name: 'SmartTransit', desc: 'Optimasi transportasi publik lokal.', sector: 'Mobility' }
];

const ModernKalsel = () => {
    const { cityStats } = useTourismStore();
    return (
        <PageTransition>
            <div className="bg-heritage-cream dark:bg-heritage-dark min-h-screen">
                <Section>
                    <Container>
                        {/* Hero Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-64"
                        >
                            <h1 className="text-h1 font-heritage mb-16">Masa Depan <span className="text-heritage-gold">Istimewa</span></h1>
                            <p className="max-w-2xl text-body opacity-80">
                                Transformasi Kalimantan Selatan menuju peradaban modern yang tetap berpijak pada nilai-nilai tradisi melalui inovasi teknologi dan ekosistem startup berkelanjutan.
                            </p>
                        </motion.div>

                        {/* Smart City Grid */}
                        <div className="mb-96">
                            <div className="flex items-center gap-12 mb-32">
                                <Badge variant="gold" className="p-8"><Cpu size={24} /></Badge>
                                <h2 className="text-h2 font-heritage">Smart City Initiatives</h2>
                            </div>
                            <Grid cols={3}>
                                <Card glass={true}>
                                    <CardContent className="space-y-16">
                                        <div className="p-12 bg-heritage-gold/20 rounded-xl w-fit text-heritage-gold">
                                            <Zap size={24} />
                                        </div>
                                        <h3 className="text-h3 font-bold">IoT Infrastructure</h3>
                                        <p className="text-small opacity-70">Penerapan sensor pintar di seluruh penjuru kota untuk manajemen energi dan pemantauan lingkungan real-time.</p>
                                    </CardContent>
                                </Card>
                                <Card glass={true}>
                                    <CardContent className="space-y-16">
                                        <div className="p-12 bg-heritage-gold/20 rounded-xl w-fit text-heritage-gold">
                                            <Globe size={24} />
                                        </div>
                                        <h3 className="text-h3 font-bold">Public Wi-Fi</h3>
                                        <p className="text-small opacity-70">Jaringan akses internet gratis di ruang-ruang publik untuk mendukung inklusivitas digital masyarakat.</p>
                                    </CardContent>
                                </Card>
                                <Card glass={true}>
                                    <CardContent className="space-y-16">
                                        <div className="p-12 bg-heritage-gold/20 rounded-xl w-fit text-heritage-gold">
                                            <Users size={24} />
                                        </div>
                                        <h3 className="text-h3 font-bold">Digital Governance</h3>
                                        <p className="text-small opacity-70">Sistem pelayanan publik terpadu berbasis aplikasi untuk efisiensi birokrasi dan transparansi data.</p>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </div>

                        {/* Stats & Charts */}
                        <div className="grid lg:grid-cols-2 gap-64 mb-96 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-12 mb-24">
                                    <Badge variant="brown" className="p-8"><BarChart3 size={24} /></Badge>
                                    <h2 className="text-h2 font-heritage">Digital Growth Statistics</h2>
                                </div>
                                <p className="text-body opacity-80 mb-32">
                                    Tingkat adopsi teknologi yang tinggi di Kalimantan Selatan menjadikannya hub digital potensial di Indonesia, menarik minat talenta global dan investor.
                                </p>
                                <div className="space-y-24">
                                    {cityStats.map((s, idx) => (
                                        <div key={idx} className="space-y-8">
                                            <div className="flex justify-between text-small font-bold">
                                                <span>{s.label}</span>
                                                <span>{s.value}{s.max ? `/${s.max}` : '%'}</span>
                                            </div>
                                            <div className="h-12 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${(s.value / (s.max || 100)) * 100}%` }}
                                                    transition={{ duration: 1.5, ease: 'easeOut' }}
                                                    className={`h-full ${s.color}`}
                                                ></motion.div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
                                    alt="Modern Tech"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-heritage-brown/80 to-transparent flex items-end p-48">
                                    <p className="text-white text-h3 font-heritage italic">"Harmonizing heritage with high-tech."</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Local Startups */}
                        <div className="mb-64">
                            <div className="flex items-center gap-12 mb-32">
                                <Badge variant="gold" className="p-8"><Rocket size={24} /></Badge>
                                <h2 className="text-h2 font-heritage">Startup Lokal Kebanggaan</h2>
                            </div>
                            <Grid cols={3}>
                                {startups.map((st, i) => (
                                    <Card key={i} className="group overflow-hidden">
                                        <div className="h-4 bg-heritage-gold w-0 group-hover:w-full transition-all duration-700"></div>
                                        <CardContent className="p-32">
                                            <Badge variant="outline" className="mb-16 uppercase tracking-widest">{st.sector}</Badge>
                                            <h3 className="text-h3 font-bold mb-8 group-hover:text-heritage-gold transition-colors">{st.name}</h3>
                                            <p className="text-small opacity-70 leading-relaxed">{st.desc}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Grid>
                        </div>
                    </Container>
                </Section>
            </div>
        </PageTransition>
    );
};

export default ModernKalsel;

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, ArrowRight, Star, MapPin, Compass, Calendar, ShieldCheck } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Button from '../components/Button';
import tuguVector from '../assets/tugu_vector.png';

const Home = () => {
    const { t } = useTranslation();
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

    const features = [
        {
            icon: <Compass className="text-heritage-gold" size={32} />,
            title: t('features.curated'),
            desc: t('features.curated_desc')
        },
        {
            icon: <Calendar className="text-heritage-gold" size={32} />,
            title: t('features.planner'),
            desc: t('features.planner_desc')
        },
        {
            icon: <ShieldCheck className="text-heritage-gold" size={32} />,
            title: t('features.guide'),
            desc: t('features.guide_desc')
        }
    ];

    return (
        <PageTransition>
            <div className="min-h-screen bg-heritage-cream dark:bg-heritage-dark overflow-x-hidden transition-colors duration-500">
                {/* Hero Section with Parallax */}
                <section className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
                    <motion.div style={{ y: y1, opacity: opacityHero }} className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-heritage-cream dark:to-heritage-dark z-10 opacity-90 transition-colors duration-500"></div>
                        <img
                            src="https://images.unsplash.com/photo-1596402184320-417d7178b2cd?auto=format&fit=crop&w=1920&q=80"
                            alt="Jogja"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    <div className="relative z-20 max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="mb-8 p-1 rounded-full bg-gradient-to-r from-heritage-gold/50 to-transparent w-fit mx-auto"
                        >
                            <span className="bg-heritage-dark/40 backdrop-blur-xl border border-white/10 text-heritage-gold px-24 py-8 rounded-full text-[10px] font-bold uppercase tracking-[0.4em]">
                                {t('hero.welcome')}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="text-6xl md:text-8xl lg:text-[10rem] font-heritage font-bold text-white mb-24 drop-shadow-2xl leading-none"
                        >
                            {"NIRANTA"} <span className="text-heritage-gold italic drop-shadow-none">{"JOGJA"}</span>
                        </motion.h1>

                        {/* Watermark removed for debugging */}

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="text-xl md:text-2xl text-white/80 mb-48 max-w-3xl mx-auto leading-relaxed font-light"
                        >
                            {t('hero.description')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-16 justify-center items-center"
                        >
                            <Button variant="secondary" size="lg" className="px-48 shadow-2xl shadow-heritage-gold/20" onClick={() => window.location.href = '/explore'}>
                                {t('common.explore_now')} <ChevronRight size={20} className="ml-8" />
                            </Button>

                            <Button variant="outline" size="lg" className="px-48 border-white text-white hover:bg-white hover:text-heritage-brown shadow-xl" onClick={() => window.location.href = '/planner'}>
                                {t('common.plan_trip')} <ArrowRight size={20} className="ml-8" />
                            </Button>
                        </motion.div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5, duration: 1.5 }}
                        className="absolute bottom-32 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-12 group"
                    >
                        <span className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">Gulir</span>
                        <div className="w-px h-32 bg-gradient-to-b from-heritage-gold via-heritage-gold/30 to-transparent group-hover:h-48 transition-all duration-700"></div>
                    </motion.div>
                </section>

                {/* Features */}
                <section className="py-64 px-24 max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-32">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="premium-card p-32 group"
                            >
                                <div className="p-16 bg-heritage-gold/10 rounded-2xl w-fit mb-24 group-hover:scale-110 transition-transform duration-500 text-heritage-gold">
                                    {f.icon}
                                </div>
                                <h3 className="text-h3 font-heritage font-bold mb-12">{f.title}</h3>
                                <p className="text-body opacity-60 leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Home;

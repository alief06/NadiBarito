import React from 'react';
import { motion } from 'framer-motion';
import { Section, Container } from '../components/Layout';
import PageTransition from '../components/PageTransition';

const timelineData = [
    {
        year: '1526',
        title: 'Berdirinya Kesultanan Banjar',
        description: 'Tepat pada 24 September 1526, Pangeran Samudera memeluk Islam dan bergelar Sultan Suriansyah. Beliau memindahkan pusat pemerintahan ke Kuin, menjadikan ini sebagai tonggak awal berdirinya kota Banjarmasin.',
        image: 'https://images.unsplash.com/photo-1590487930999-56d1c95bf2fb?auto=format&fit=crop&w=800&q=80'
    },
    {
        year: '1600s',
        title: 'Era Perdagangan Apung',
        description: 'Banjarmasin berkembang pesat sebagai pusat perdagangan rempah-rempah. Pasar Terapung Muara Kuin mulai terbentuk ketika para pedagang lokal dan mancanegara bertransaksi di atas jukung menyusuri urat nadi Sungai Barito.',
        image: 'https://images.unsplash.com/photo-1549449852-59530bedc78b?auto=format&fit=crop&w=800&q=80'
    },
    {
        year: '1859',
        title: 'Perang Banjar',
        description: 'Perang bersejarah melawan kolonial Belanda yang dipimpin oleh Pangeran Antasari dengan semboyan legendaris "Waja Sampai Kaputing" (Berjuang sampai akhir yang gemilang).',
        image: 'https://images.unsplash.com/photo-1579601053077-3e1140024479?auto=format&fit=crop&w=800&q=80'
    },
    {
        year: '2024+',
        title: 'Kota Seribu Sungai Modern',
        description: 'Transformasi Banjarmasin menjadi Smart City pariwisata berbasis sungai terdepan di Indonesia. Menjaga keabadian tradisi Sasirangan dan pasar apung di tengah modernisasi.',
        image: 'https://images.unsplash.com/photo-1596402184320-417d7178b2cd?auto=format&fit=crop&w=800&q=80'
    }
];

const History = () => {
    return (
        <PageTransition>
            <div className="relative min-h-screen bg-heritage-cream dark:bg-heritage-dark overflow-hidden">
                {/* Animasi Riak Air (Water Ripple) Background */}
                <motion.div 
                    className="absolute inset-0 pointer-events-none z-0"
                    animate={{ 
                        scale: [1, 1.05, 1], 
                        opacity: [0.3, 0.5, 0.3] 
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="absolute top-0 left-0 w-[80%] h-[120%] bg-[radial-gradient(circle,rgba(43,103,119,0.1)_0%,rgba(10,28,32,0)_70%)] blur-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-[100%] h-[100%] bg-[radial-gradient(circle,rgba(255,140,0,0.05)_0%,rgba(10,28,32,0)_60%)] blur-2xl"></div>
                </motion.div>
                
                <Section className="relative z-10">
                    <Container>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-64"
                        >
                            <h1 className="text-h1 font-heritage">Jejak Waktu <span className="text-heritage-gold">Bandarmasih</span></h1>
                            <p className="max-w-2xl mx-auto text-body opacity-80 mt-16 text-pretty leading-relaxed">
                                Menyelami narasi heroik dan evolusi Kota Seribu Sungai. Dari pelabuhan rempah Kesultanan Banjar di abad ke-16, hingga keanggunan kota air modern.
                            </p>
                        </motion.div>

                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2 bg-heritage-gold/20 dark:bg-heritage-gold/10 hidden md:block"></div>

                            <div className="space-y-48 relative">
                                {timelineData.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                        className={`flex flex-col md:flex-row items-center gap-32 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                    >
                                        {/* Content */}
                                        <div className="flex-1 w-full md:w-1/2">
                                            <div className={`p-32 premium-card ${index % 2 === 0 ? 'md:mr-16 text-right' : 'md:ml-16'}`}>
                                                <span className="text-h2 font-bold text-heritage-gold font-heritage mb-16 block italic">{item.year}</span>
                                                <h3 className="text-h3 mb-16">{item.title}</h3>
                                                <p className="text-body opacity-70 leading-relaxed text-pretty">{item.description}</p>
                                            </div>
                                        </div>

                                        {/* Timeline Node */}
                                        <div className="z-10 w-24 h-24 rounded-full bg-heritage-gold border-8 border-heritage-cream dark:border-heritage-dark shadow-xl hidden md:block"></div>

                                        {/* Image */}
                                        <div className="flex-1 w-full md:w-1/2">
                                            <div className="relative overflow-hidden rounded-3xl aspect-video shadow-2xl">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-heritage-brown/20 mix-blend-overlay"></div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </Container>
                </Section>
            </div>
        </PageTransition>
    );
};

export default History;

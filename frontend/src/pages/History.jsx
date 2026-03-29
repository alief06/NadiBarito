import React from 'react';
import { motion } from 'framer-motion';
import { Section, Container } from '../components/Layout';
import PageTransition from '../components/PageTransition';

const timelineData = [
    {
        year: '1588',
        title: 'Era Kesultanan Mataram',
        description: 'Awal mula berdirinya Kerajaan Mataram Islam di Kotagede oleh Panembahan Senopati. Menjadi fondasi budaya dan pemerintahan di wilayah Yogyakarta.',
        image: 'https://images.unsplash.com/photo-1611638362848-0382025164bc?auto=format&fit=crop&w=800&q=80'
    },
    {
        year: '1755',
        title: 'Perjanjian Giyanti',
        description: 'Pemisahan Mataram menjadi Yogyakarta dan Surakarta. Pangeran Mangkubumi menjadi Sultan Hamengkubuwono I dan mendirikan Keraton Yogyakarta.',
        image: 'https://images.unsplash.com/photo-1596402184320-417d717867cd?auto=format&fit=crop&w=800&q=80'
    },
    {
        year: '1945',
        title: 'Ibukota Perjuangan',
        description: 'Yogyakarta menjadi Ibukota Republik Indonesia sementara selama agresi militer Belanda. Peran vital Sri Sultan HB IX dalam mendukung kemerdekaan.',
        image: 'https://images.unsplash.com/photo-1590059060328-9102450503f8?auto=format&fit=crop&w=800&q=80'
    },
    {
        year: '1950',
        title: 'Daerah Istimewa',
        description: 'Pengakuan resmi Yogyakarta sebagai Daerah Istimewa melalui UU No. 3 Tahun 1950, sebagai bentuk penghargaan atas jasa dalam perjuangan kemerdekaan.',
        image: 'https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?auto=format&fit=crop&w=800&q=80'
    },
    {
        year: '2024+',
        title: 'Menuju Smart City',
        description: 'Transformasi Jogja menjadi pusat teknologi dan budaya modern, menggabungkan kearifan lokal dengan inovasi digital masa depan.',
        image: 'https://images.unsplash.com/photo-1571441864197-0ad08ea5c898?auto=format&fit=crop&w=800&q=80'
    }
];

const History = () => {
    return (
        <PageTransition>
            <div className="bg-heritage-cream dark:bg-heritage-dark min-h-screen">
                <Section>
                    <Container>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-64"
                        >
                            <h1 className="text-h1 font-heritage">Jejak Waktu <span className="text-heritage-gold">Niranta</span></h1>
                            <p className="max-w-2xl mx-auto text-body opacity-80">
                                Menelusuri sejarah panjang Yogyakarta dari era kerajaan hingga transformasi menjadi kota cerdas modern.
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

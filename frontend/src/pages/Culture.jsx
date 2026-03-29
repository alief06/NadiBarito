import React from 'react';
import { motion } from 'framer-motion';
import { Section, Container } from '../components/Layout';
import PageTransition from '../components/PageTransition';
import Badge from '../components/Badge';

const cultureData = [
    {
        id: 'wayang',
        title: 'Wayang Kulit',
        tag: 'Seni Pertunjukan',
        description: 'Seni bercerita kuno yang menggunakan bayangan boneka kulit, menceritakan kisah epik Ramayana dan Mahabharata. Diakui UNESCO sebagai Warisan Mahakarya Dunia.',
        image: 'https://images.unsplash.com/photo-1681284852528-662867808287?auto=format&fit=crop&w=800&q=80',
        details: ['Dalang sebagai penutur tunggal', 'Iringan Gamelan Jawa', 'Penuh pesan moral filosofis']
    },
    {
        id: 'batik',
        title: 'Batik Tulis',
        tag: 'Seni Kriya',
        description: 'Mahakarya tekstil yang dibuat dengan tangan menggunakan malam (lilin) dan canting. Setiap motif memiliki makna sakral dan mewakili identitas budaya Yogyakarta.',
        image: 'https://images.unsplash.com/photo-1698246473489-4be662b2acbe?auto=format&fit=crop&w=800&q=80',
        details: ['Proses manual berbulan-bulan', 'Motif Parang, Kawung, Sekar Jagad', 'Pewarnaan alami yang khas']
    },
    {
        id: 'gamelan',
        title: 'Gamelan Jawa',
        tag: 'Seni Musik',
        description: 'Ensembel musik tradisional yang terdiri dari gong, kenong, gambang, dan instrumen lainnya. Menciptakan harmoni suara yang mistis dan menenangkan jiwa.',
        image: 'https://images.unsplash.com/photo-1582234384157-ba5d49603348?auto=format&fit=crop&w=800&q=80',
        details: ['Tangga nada Pelog dan Slendro', 'Simbol harmoni dan toleransi', 'Digunakan dalam upacara sakral']
    }
];

const Culture = () => {
    return (
        <PageTransition>
            <div className="bg-heritage-cream dark:bg-heritage-dark min-h-screen">
                <Section>
                    <Container>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center mb-64"
                        >
                            <h1 className="text-h1 font-heritage">Adiluhung <span className="text-heritage-gold">Budaya</span></h1>
                            <p className="max-w-2xl mx-auto text-body opacity-80">
                                Menjelajahi kedalaman filosofi dan keindahan artistik yang membentuk jiwa dan karakter masyarakat Yogyakarta.
                            </p>
                        </motion.div>

                        <div className="space-y-96">
                            {cultureData.map((item, index) => (
                                <div key={item.id} className={`flex flex-col lg:flex-row items-center gap-48 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                                    {/* Image Part */}
                                    <motion.div
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="flex-1 w-full"
                                    >
                                        <div className="relative group rounded-[40px] overflow-hidden shadow-2xl">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-heritage-brown/60 to-transparent"></div>
                                            <div className="absolute bottom-24 left-24">
                                                <Badge variant="gold" className="px-16 py-8 text-sm">{item.tag}</Badge>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Text Part */}
                                    <motion.div
                                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="flex-1 space-y-24"
                                    >
                                        <h2 className="text-h2 font-heritage text-heritage-brown dark:text-heritage-gold">{item.title}</h2>
                                        <p className="text-body text-gray-700 dark:text-gray-300 leading-relaxed font-light italic">
                                            "{item.description}"
                                        </p>
                                        <ul className="space-y-12">
                                            {item.details.map((detail, idx) => (
                                                <li key={idx} className="flex items-center gap-12 text-small font-semibold opacity-80">
                                                    <div className="w-8 h-8 rounded-full bg-heritage-gold"></div>
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                        <motion.button
                                            whileHover={{ x: 10 }}
                                            className="text-heritage-gold font-bold flex items-center gap-8 group"
                                        >
                                            Pelajari Lebih Dalam
                                            <div className="w-24 h-2 bg-heritage-gold group-hover:w-48 transition-all"></div>
                                        </motion.button>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </Container>
                </Section>
            </div>
        </PageTransition>
    );
};

export default Culture;

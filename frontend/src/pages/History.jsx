import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Section, Container } from '../components/Layout';

const timelineData = [
    {
        year: '1526',
        title: 'Fajar Kesultanan',
        subtitle: 'Kuin Utara',
        description: 'Banjarmasin berdiri sebagai bandar perdagangan rempah yang strategis. Sultan Suriansyah mendirikan pusat pemerintahan di Kuin Utara, menyatukan kearifan sungai dengan arsitektur Bubungan Tinggi yang perkasa.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Masjid_Sultan_Suriansyah_1.jpg'
    },
    {
        year: '1859',
        title: 'Waja Sampai Kaputing',
        subtitle: 'Benteng Pengaron',
        description: 'Perlawanan heroik rakyat Banjar mencapai puncaknya. Dipimpin oleh Pangeran Antasari, semangat perlawanan dari pedalaman hingga pesisir membuktikan bahwa identitas Banjar tak dapat dipatahkan oleh kolonial.',
        image: 'https://images.unsplash.com/photo-1590487930999-56d1c95bf2fb?auto=format&fit=crop&w=800&q=80'
    },
    {
        year: '1898',
        title: 'Mosaik Akulturasi',
        subtitle: 'Pecinan Veteran',
        description: 'Berdirinya Klenteng Soetji Nurani menandakan Banjarmasin sebagai kawah candradimuka akulturasi. Kota ini tumbuh menjadi rumah bagi berbagai etnis, menciptakan mosaik budaya yang damai di sepanjang jalur air.',
        image: 'https://images.unsplash.com/photo-1596402184320-417d717867cd?auto=format&fit=crop&w=800&q=80'
    },
    {
        year: '2026',
        title: 'Gerbang Nusantara',
        subtitle: 'Smart City Hub',
        description: 'Transformasi total menuju Smart City masa depan. Memposisikan diri sebagai gerbang penyangga IKN, Banjarmasin mengintegrasikan 5G dan IoT ke dalam urat nadi sungai tanpa meninggalkan filosofi banyumudra.',
        image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1000&q=80'
    },
    {
        year: 'Legacy',
        title: 'Selamanya Barito',
        subtitle: 'Titik Henti Karsa',
        description: 'Sejarah bukanlah sekadar memori yang tertinggal, melainkan mata air yang terus mengalir dan menghidupi masa depan Nusantara di sepanjang tepian sungai kita.',
        image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1000&q=80'
    }
];

const TimelineCard = ({ item, index, scrollYProgress }) => {
    // 5 cards spread across 0.8 progress map (0.1 to 0.9)
    // 0.8 / 4 shifts = 0.2 interval per card
    const interval = 0.2;
    const cardCenter = 0.1 + (index * interval);

    // V-H-V Engine Focus Map
    const scale = useTransform(scrollYProgress, [cardCenter - 0.15, cardCenter, cardCenter + 0.15], [0.85, 1, 0.85]);
    const opacity = useTransform(scrollYProgress, [cardCenter - 0.15, cardCenter, cardCenter + 0.15], [0.2, 1, 0.2]);

    const yParallax = useTransform(scrollYProgress, [cardCenter - 0.15, cardCenter + 0.15], ["-20%", "20%"]);

    return (
        <div className="w-screen h-screen flex items-center justify-center flex-shrink-0 relative pl-[10vw]">
            {/* If Legacy card, format exclusively */}
            {item.year === 'Legacy' ? (
                <motion.div 
                    style={{ scale, opacity }}
                    className="group relative h-[70vh] w-[85vw] md:w-[65vw] flex items-center justify-center p-8 md:p-24 rounded-[3rem] md:rounded-[4rem] border border-white/10 bg-gradient-to-br from-[#111] to-[#010101] shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[#f97316]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    <div className="text-center relative z-10 w-full flex flex-col items-center">
                        <h2 className="text-5xl md:text-7xl lg:text-[9rem] font-serif font-black mb-8 italic text-white tracking-tighter leading-none group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] whitespace-normal">
                            Selamanya <br/>
                            <span className="text-[#f97316] drop-shadow-[0_0_40px_rgba(249,115,22,0.6)]">Barito</span>
                        </h2>
                        <div className="inline-flex px-8 py-3 bg-black/60 border border-white/10 backdrop-blur-md rounded-full shadow-xl mb-8">
                            <p className="font-mono text-[10px] md:text-sm uppercase tracking-[0.5em] md:tracking-[0.8em] text-[#f97316] animate-pulse">
                                {item.subtitle}
                            </p>
                        </div>
                        <p className="text-sm md:text-lg lg:text-xl text-white/80 leading-relaxed font-sans font-medium whitespace-normal max-w-2xl px-4">
                            {item.description}
                        </p>
                    </div>
                </motion.div>
            ) : (
                <motion.div 
                    style={{ scale, opacity }}
                    className="group relative h-[70vh] w-[85vw] md:w-[65vw] flex-col justify-end flex p-8 md:p-12 lg:p-16 overflow-hidden rounded-[3rem] md:rounded-[4rem] bg-[#050505] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-all duration-700 hover:border-[#f97316]/40"
                >
                    <div className="absolute inset-0 z-0 bg-black overflow-hidden relative">
                        <motion.img 
                            style={{ y: yParallax }}
                            src={item.image} 
                            alt={item.title} 
                            className="absolute inset-0 w-full h-[140%] object-cover brightness-[0.4] group-hover:brightness-50 transition-all duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent"></div>
                    </div>

                    <div className="relative z-10 w-full mb-4">
                        <span className="text-[5rem] md:text-[8rem] lg:text-[10rem] font-serif font-black text-[#f97316]/10 leading-none absolute -top-16 left-0 drop-shadow-2xl">
                            {item.year}
                        </span>
                        
                        <h3 className="text-4xl md:text-5xl lg:text-7xl font-serif font-black italic text-white mb-2 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] leading-none transition-colors group-hover:text-[#f97316] whitespace-normal">
                            {item.title}
                        </h3>
                        
                        <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#f97316] mb-8 font-bold">
                            — {item.subtitle}
                        </p>
                        
                        <div className="bg-black/90 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border-l-4 border-[#f97316] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.9)] max-w-4xl transition-all">
                            <p className="text-sm md:text-lg lg:text-xl text-white/95 leading-relaxed font-sans font-medium whitespace-normal">
                                {item.description}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

const History = () => {
    const targetRef = useRef(null);
    const lastVibrateLog = useRef(-1);
    
    // Strict Engine Offset to capture vertical entrance and exit accurately
    const { scrollYProgress } = useScroll({ 
        target: targetRef,
        offset: ["start start", "end end"] 
    });
    
    const smoothProgress = useSpring(scrollYProgress, { 
        stiffness: 80, 
        damping: 30, 
        mass: 1 
    });

    // The Magic -400% Mapping Strategy
    // Applied to a w-screen container, it ensures visually perfect 4-card movement translating exactly 4 screens over 800vh fuel.
    const x = useTransform(smoothProgress, [0.1, 0.9], ["0%", "-400%"]);

    useEffect(() => {
        const unsubscribe = smoothProgress.on("change", (latest) => {
            const thresholds = [0.1, 0.3, 0.5, 0.7, 0.9];
            const currentIndex = thresholds.findIndex(t => Math.abs(latest - t) < 0.02);

            if (currentIndex !== -1 && currentIndex !== lastVibrateLog.current) {
                lastVibrateLog.current = currentIndex;
                if (window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate(15);
                }
            } else if (currentIndex === -1) {
                const isFar = thresholds.every(t => Math.abs(latest - t) > 0.03);
                if (isFar) lastVibrateLog.current = -1;
            }
        });
        return () => unsubscribe();
    }, [smoothProgress]);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#020202] text-white selection:bg-[#f97316]/30"
        >
                
                {/* Visual Progress Bar (Kronik Karsa Tracker) */}
                <div className="fixed bottom-10 left-12 right-12 md:left-32 md:right-32 h-1 bg-white/10 rounded-full z-[100] pointer-events-none">
                    <motion.div 
                        style={{ scaleX: useTransform(smoothProgress, [0.1, 0.9], [0, 1]) }}
                        className="w-full h-full bg-[#f97316] origin-left shadow-[0_0_15px_#f97316]"
                    />
                </div>

                {/* 1. Intro Vertical Section (Normal Flow) */}
                <Section className="min-h-screen flex items-center justify-center relative pt-32 pb-16 z-10 bg-[#020202]">
                    <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#f97316]/5 to-transparent pointer-events-none"></div>
                    <Container>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <h1 className="text-[5rem] md:text-[8rem] lg:text-[140px] font-serif font-black mb-6 tracking-tighter italic leading-none drop-shadow-2xl">
                                Narasi <br className="hidden md:block" /> <span className="text-[#f97316]">Pusaka</span>
                            </h1>
                            <p className="max-w-3xl mx-auto text-lg md:text-2xl lg:text-3xl opacity-60 leading-relaxed font-serif italic border-l-4 border-[#f97316] pl-6 py-2 bg-gradient-to-r from-black/40 to-transparent backdrop-blur-sm rounded-r-[2rem]">
                                Telusuri 500 tahun karsa dan detak nadi sungai yang tak pernah berhenti.
                            </p>
                            <motion.div 
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                className="mt-20 md:mt-32 text-[#f97316] text-[10px] md:text-xs font-bold uppercase tracking-[0.8em] flex flex-col items-center gap-6"
                            >
                                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-[#f97316]"></div>
                                Gulir Ke Bawah
                            </motion.div>
                        </motion.div>
                    </Container>
                </Section>

                {/* 2. Scroll-Lock Engine (The Horizontal Intersection) */}
                {/* 800vh fuel gives ample scroll distance down while sticky holds us to the side */}
                <div ref={targetRef} className="relative min-h-[800vh] w-full">
                    {/* The Sticky Lock Barrier. Needs z-20 to sit firmly between vertical sections */}
                    <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden z-20 bg-black">
                        
                        {/* 
                          The -400% Magic Box: 
                          By making THIS element EXACTLY 100vw wide (`w-screen`), translating by `-400%` directly translates by `-400vw`.
                          The children are flexed horizontally with `flex-nowrap`, so they leak to the right creating the visual track!
                        */}
                        <motion.div 
                            style={{ x }} 
                            className="w-screen h-screen flex flex-nowrap shrink-0 items-center" 
                        >
                            {timelineData.map((item, index) => (
                                <TimelineCard 
                                    key={index} 
                                    item={item} 
                                    index={index} 
                                    scrollYProgress={smoothProgress} 
                                />
                            ))}
                        </motion.div>

                    </div>
                </div>

                {/* 3. Outro Section (Vertical Flow Restored) */}
                <Section className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-black to-[#050505] z-10">
                    <Container>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="text-center p-10 md:p-20 lg:p-32 rounded-[3.5rem] bg-[#020202] border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-w-6xl mx-auto relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#f97316]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                            
                            <h2 className="text-4xl md:text-6xl lg:text-[90px] font-serif font-black mb-8 tracking-tighter italic leading-none text-white relative z-10 drop-shadow-2xl whitespace-normal">
                                Jadilah <span className="text-[#f97316]">Bagian</span> dari <br/> Karsa.
                            </h2>
                            <p className="text-base md:text-xl lg:text-3xl opacity-50 mb-12 md:mb-16 font-sans max-w-4xl mx-auto leading-relaxed text-white relative z-10 font-medium whitespace-normal">
                                Bagian terakhir dari sejarah sedang menunggu pena Anda. Mari melukis masa depan digital di tepian Barito mulai dari titik ini.
                            </p>
                            <Link 
                                to="/planner"
                                className="relative z-10 px-12 md:px-20 py-6 md:py-8 bg-white text-black font-black rounded-full hover:bg-[#f97316] hover:text-white transition-all duration-500 shadow-[0_20px_50px_rgba(255,255,255,0.05)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.3)] uppercase text-xs md:text-sm tracking-[0.3em] inline-flex items-center justify-center hover:scale-105"
                            >
                                Mulai Ekspansi Budaya
                            </Link>
                        </motion.div>
                    </Container>
                </Section>
                
        </motion.div>
    );
};

export default History;

import React, { useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Diamond, Droplets, Home as HomeIcon, Sparkles } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const CultureCard = ({ title, icon: Icon, description, delay, alignment }) => (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className={`relative z-10 w-full md:w-[60%] lg:w-[45%] flex flex-col p-6 md:p-10 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl group hover:bg-white/10 transition-all ${alignment === 'left' ? 'mr-auto' : 'ml-auto'} space-y-6`}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-[#f97316]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"></div>
        <div className="w-14 h-14 md:w-16 md:h-16 bg-[#112F36] border border-[#f97316]/30 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)] group-hover:scale-110 transition-transform">
            <Icon size={28} className="text-[#f97316]" />
        </div>
        <h3 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-wide">{title}</h3>
        <p className="text-white/70 leading-relaxed text-sm md:text-base text-justify">
            {description}
        </p>
    </motion.div>
);

const Culture = () => {
    const containerRef = useRef(null);
    const [splineLoaded, setSplineLoaded] = useState(false);
    
    // Scroll progress from the overall container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Spline Animations: Turun, Membesar, lalu Mengecil, dan Berputar
    const splineY = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 400, 800]);
    const splineRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const splineScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.4, 0.9]);
    const splineOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

    return (
        <PageTransition>
            <div ref={containerRef} className="relative min-h-fit bg-[#050505] overflow-hidden">
                
                {/* Latar Belakang Gradient Statis */}
                <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#112F36] via-[#050505] to-[#050505] opacity-50"></div>

                {/* --- 3D SPLINE LAYER (Sticky Target) --- */}
                <div className="fixed inset-0 z-0 flex items-center justify-center md:justify-end md:pr-[10%] pointer-events-none">
                    {/* Efek Spotlight Oranye di belakang Spline */}
                    <motion.div 
                        className="absolute w-[400px] h-[400px] bg-[#f97316]/30 rounded-full blur-[120px] mix-blend-screen"
                        style={{ y: splineY, scale: splineScale }}
                    />
                    
                    <motion.div 
                        className="w-[120vw] md:w-[60vw] h-[60vh] md:h-[80vh] relative flex items-center justify-center -mr-20 md:mr-0"
                        style={{ 
                            y: splineY, 
                            rotate: splineRotate, 
                            scale: splineScale,
                            opacity: splineOpacity
                        }}
                    >
                        {/* Spline Object: Crystal / Intan / Gemstone */}
                        <Spline 
                            scene="https://prod.spline.design/gdassBpjRwlgsn31/scene.splinecode" 
                            onLoad={() => setSplineLoaded(true)}
                            className={`w-full h-full transition-opacity duration-1000 ${splineLoaded ? 'opacity-100' : 'opacity-0'}`}
                        />
                    </motion.div>
                </div>

                {/* --- FOREGROUND CONTENT (Scrollable) --- */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 md:py-20 flex flex-col gap-12 md:gap-20">
                    
                    {/* Header Title Section */}
                    <div className="text-center md:text-left pt-10">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#f97316]/30 bg-[#f97316]/10 text-[#f97316] font-bold text-xs uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                        >
                            <Sparkles size={14} /> Kemilau Warisan Banjar
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 uppercase leading-none drop-shadow-2xl"
                        >
                             <span className="text-[#f97316] italic pr-4">NADIBARITO</span>
                        </motion.h1>
                    </div>

                    {/* Section 1: Kain Sasirangan */}
                    <CultureCard 
                        title="Kain Sasirangan"
                        icon={Droplets}
                        delay={0.2}
                        alignment="left"
                        description={
                            <>
                                Karya wastra agung peninggalan abad ke-12 yang lahir dari tangan terampil Urang Banjar. Dibuat melalui teknik magis bernama <strong>Rintang Ambi</strong> — proses di mana motif disirang (dijelujur) sebelum direndam dalam warna. Pewarnaan alaminya memanfaatkan daun, akar, hingga kulit kayu Hutan Kalimantan, menciptakan identitas visual yang tiada duanya di dunia Nusantara.
                            </>
                        }
                    />

                    {/* Visual Separator */}
                    <div className="w-full flex justify-center">
                        <div className="w-[80%] h-px bg-gradient-to-r from-transparent via-[#f97316]/20 to-transparent my-2" />
                    </div>

                    {/* Section 2: Intan Martapura (Scroll Point for Spline Focus) */}
                    <CultureCard 
                        title="Intan Berlian Martapura"
                        icon={Diamond}
                        delay={0.2}
                        alignment="left" // Keep left on desktop so Spline floats on the right
                        description={
                            <>
                                Jantung perekonomian Kalimantan Selatan sejak masa kolonial. Banjarmasin berfungsi sebagai poros utama perdagangan batu mulia dunia yang diambil langsung dari lubang pendulangan tradisional Martapura. Bongkahan kasar tersebut digosok oleh pengrajin lokal menjadi permata mahakarya dengan kilau kristal yang mampu membius mata kolektor Eropa hingga Timur Tengah.
                            </>
                        }
                    />

                    {/* Visual Separator */}
                    <div className="w-full flex justify-center">
                        <div className="w-[80%] h-px bg-gradient-to-r from-transparent via-[#f97316]/20 to-transparent my-2" />
                    </div>

                    {/* Section 3: Arsitektur Rumah Banjar */}
                    <CultureCard 
                        title="Rumah Bubungan Tinggi"
                        icon={HomeIcon}
                        delay={0.2}
                        alignment="left"
                        description={
                            <>
                                Simbol kasta dan kebesaran yang dirancang merespons tantangan alam rawa. Menggunakan pondasi <strong>Kayu Ulin</strong> — besi alami Kalimantan yang semakin kuat saat terendam air. Atapnya yang menjulang vertikal hingga 45 derajat (Bubungan Tinggi) tidak hanya berfungsi memecah panas matahari ekuator, tetapi juga merepresentasikan keagungan sang pemilik yang berhubungan langsung dengan langit.
                            </>
                        }
                    />

                </div>
            </div>
        </PageTransition>
    );
};

export default Culture;

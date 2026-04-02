import React, { useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Diamond, Droplets, Home as HomeIcon, Sparkles, MessageCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useTourismStore } from '../store/useTourismStore';

class SplineErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
      console.error("Spline rendering error:", error, errorInfo);
    }
    render() {
      if (this.state.hasError) {
        return (
          <div className="absolute inset-0 bg-[#050505] z-0 flex flex-col items-center justify-center text-[#f97316] font-bold text-xs p-8 text-center space-y-4">
            <Sparkles size={48} className="opacity-20 animate-pulse" />
            <div className="max-w-xs uppercase tracking-[0.2em]">The Spirit is Loading...</div>
          </div>
        );
      }
      return this.props.children;
    }
}

const CultureCard = ({ title, icon: Icon, description, delay, alignment, image }) => (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className={`relative z-10 w-full lg:w-[85%] flex flex-col md:flex-row overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl group hover:bg-white/10 transition-all ${alignment === 'left' ? 'mr-auto' : 'ml-auto md:flex-row-reverse'} mb-4`}
    >
        {/* Image Section */}
        <div className="w-full md:w-2/5 h-64 md:h-auto relative overflow-hidden">
            <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent md:hidden"></div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-3/5 flex flex-col p-8 md:p-12 space-y-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f97316]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="w-14 h-14 md:w-16 md:h-16 bg-[#112F36] border border-[#f97316]/30 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)] group-hover:scale-110 transition-transform relative z-10">
                <Icon size={28} className="text-[#f97316]" />
            </div>
            
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-wide relative z-10">{title}</h3>
            
            <p className="text-white/70 leading-relaxed text-base md:text-lg text-justify relative z-10">
                {description}
            </p>
        </div>
    </motion.div>
);

const Culture = () => {
    const containerRef = useRef(null);
    const [splineLoaded, setSplineLoaded] = useState(false);
    const { cultureNarrative } = useTourismStore();
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const splineY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const splineOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
    const textFloatY = useTransform(scrollYProgress, [0, 1], [0, -40]);

    return (
        <PageTransition>
            <div ref={containerRef} className="relative bg-[#050505] overflow-hidden">
                
                <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#112F36] via-[#050505] to-[#050505] opacity-40"></div>

                <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center md:items-center md:justify-start">
                    <motion.div 
                        className="w-[100vw] md:w-[40vw] h-[40vh] md:h-[60vh] relative"
                        style={{ y: splineY, opacity: splineOpacity }}
                    >
                        <SplineErrorBoundary>
                            <Spline 
                                scene="https://prod.spline.design/gdassBpjRwlgsn31/scene.splinecode" 
                                onLoad={() => setSplineLoaded(true)}
                                className={`w-full h-full transition-opacity duration-1000 ${splineLoaded ? 'opacity-100' : 'opacity-0'}`}
                            />
                        </SplineErrorBoundary>
                    </motion.div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-12 md:pt-20">
                    
                    <div className="grid lg:grid-cols-[1fr_1.8fr] gap-8 items-start">
                        
                        <div className="hidden lg:block h-32"></div>

                        <motion.div 
                            style={{ y: textFloatY }}
                            className="flex flex-col space-y-10"
                        >
                            <motion.div 
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="flex flex-col space-y-4 pl-12 md:pl-20"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-white/10 bg-white/5 text-white/40 font-mono text-[10px] uppercase tracking-meta w-fit">
                                    <Sparkles size={10} /> 03° 19' 0" S, 114° 35' 0" E
                                </div>
                                <h1 className="text-h1 font-serif text-white leading-none">
                                    The Soul of <span className="text-[#f97316] italic">Banua</span>
                                </h1>
                            </motion.div>

                            <motion.div 
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    visible: { transition: { staggerChildren: 0.15 } }
                                }}
                                className="flex flex-col space-y-6 max-w-3xl pl-12 md:pl-20 text-left"
                            >
                                <motion.p
                                    variants={{
                                        hidden: { opacity: 0, y: 10 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    className="text-body-large md:text-3xl font-serif leading-relaxed text-white drop-cap mb-4"
                                >
                                    {cultureNarrative[0]?.text.split('Barito')[0]}
                                    <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-orange-100 to-orange-400">Barito</span>
                                    {cultureNarrative[0]?.text.split('Barito')[1]?.split('jukung')[0]}
                                    <span className="italic font-bold">jukung</span>
                                    {cultureNarrative[0]?.text.split('jukung')[1]}
                                </motion.p>

                                <motion.p
                                    variants={{
                                        hidden: { opacity: 0, y: 10 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    className="text-body md:text-2xl font-serif leading-relaxed text-gray-400"
                                >
                                    {cultureNarrative[1]?.text.split('Sasirangan')[0]}
                                    <span className="text-white italic">Sasirangan</span>
                                    {cultureNarrative[1]?.text.split('Sasirangan')[1]}
                                </motion.p>

                                <motion.p
                                    variants={{
                                        hidden: { opacity: 0, y: 10 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    className="text-body md:text-2xl font-serif leading-relaxed text-gray-400"
                                >
                                    {cultureNarrative[2]?.text.split('detak nadi')[0]}
                                    <span className="text-white italic">detak nadi</span>
                                    {cultureNarrative[2]?.text.split('detak nadi')[1]?.split('Seribu Sungai')[0]}
                                    <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-100 to-orange-400">Seribu Sungai</span>
                                    {cultureNarrative[2]?.text.split('Seribu Sungai')[1]}
                                </motion.p>
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 2 }}
                                className="flex items-center gap-4 text-[#f97316] font-bold uppercase tracking-meta text-[10px] hover:gap-6 transition-all group pl-12 md:pl-20"
                            >
                                <span className="w-12 h-px bg-[#f97316]/50 group-hover:w-20 transition-all"></span>
                                Explore Our Heritage
                            </motion.button>
                        </motion.div>
                    </div>

                    <div className="flex flex-col gap-12 py-20">
                        
                        {/* Kain Sasirangan */}
                        <CultureCard 
                            title="Kain Sasirangan"
                            icon={Droplets}
                            delay={0.1}
                            alignment="left"
                            image="https://aliefalikhsan.github.io/nadibarito-assets/culture/sasirangan.jpg"
                            description={
                                <span className="text-gray-400 font-sans">
                                    Karya wastra agung peninggalan abad ke-12 yang lahir dari tangan terampil <span className="text-white italic">Urang Banjar</span>. Dibuat melalui teknik magis bernama <span className="text-white font-bold">Rintang Ambi</span> — proses di mana motif disirang sebelum direndam dalam warna alami dari akar Hutan Kalimantan.
                                </span>
                            }
                        />

                        {/* Intan Berlian Martapura */}
                        <CultureCard 
                            title="Intan Berlian Martapura"
                            icon={Diamond}
                            delay={0.1}
                            alignment="right"
                            image="https://aliefalikhsan.github.io/nadibarito-assets/culture/intan.jpg"
                            description={
                                <span className="text-gray-400 font-sans">
                                    Jantung perekonomian Kalimantan Selatan sejak masa kolonial. Banjarmasin berfungsi sebagai poros utama perdagangan <span className="text-white italic">batu mulia</span> dunia yang diambil langsung dari lubang pendulangan tradisional Martapura.
                                </span>
                            }
                        />

                        {/* Rumah Bubungan Tinggi */}
                        <CultureCard 
                            title="Rumah Bubungan Tinggi"
                            icon={HomeIcon}
                            delay={0.1}
                            alignment="left"
                            image="https://aliefalikhsan.github.io/nadibarito-assets/culture/bubungan.jpg"
                            description={
                                <span className="text-gray-400 font-sans">
                                    Simbol kasta dan kebesaran yang dirancang merespons tantangan alam rawa menggunakan pondasi <span className="text-white italic">Kayu Ulin</span>. Atapnya yang menjulang vertikal merepresentasikan keagungan sang pemilik.
                                </span>
                            }
                        />
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="py-12 text-center"
                    >
                        <h2 className="text-h2 font-serif text-white/20 mb-8 italic">Ingin belajar lebih dalam tentang Banua?</h2>
                        <button className="px-12 py-4 rounded-full border border-white/5 hover:border-[#f97316] text-[#f97316] font-sans font-bold text-[10px] tracking-meta uppercase transition-all flex items-center gap-3 mx-auto">
                            <MessageCircle size={14} /> Hubungi Kurator Budaya
                        </button>
                    </motion.div>

                </div>
            </div>
        </PageTransition>
    );
};

export default Culture;

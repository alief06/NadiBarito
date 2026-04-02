import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

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
        return <div className="absolute inset-0 bg-[#0a0a0a] z-0 flex items-center justify-center text-red-500 font-bold text-xs p-8 text-center">SPLINE ERROR: {this.state.error?.toString()}</div>;
      }
      return this.props.children;
    }
}

const Hero = () => {
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const scaleHero = useTransform(scrollY, [0, 800], [1, 1.15]);
    const yHero = useTransform(scrollY, [0, 800], [0, 100]); // Parallax turun ke bawah saat scroll
    
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if(searchQuery.trim()) {
            navigate(`/explore?search=${searchQuery}`);
        }
    };

    return (
        <section className="relative h-[100svh] w-full flex flex-col items-center justify-center text-center px-16 overflow-hidden pt-32 md:pt-0 bg-[#0a0a0a]">
            
            {/* Spline 3D Background with Scroll Parallax */}
            <motion.div 
                style={{ scale: scaleHero, y: yHero }} 
                className="absolute inset-0 z-0 origin-center"
            >
                {/* Reponsive Wrapper: Pada Mobile/HP (h-[120%] dan translate-y-16), jukung diturunkan agar logo teks tidak tertutupi */}
                <div className="absolute inset-0 w-full h-full translate-y-16 md:translate-y-0">
                    <SplineErrorBoundary>
                        <Spline scene="https://prod.spline.design/yrBYdaXitHuKToev/scene.splinecode" />
                    </SplineErrorBoundary>
                </div>
                
                {/* Dark Gradient Overlay for optimal text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-transparent pointer-events-none"></div>
            </motion.div>

            {/* Main UI Content Over Spline */}
            <div className="relative z-10 max-w-5xl mx-auto w-full pt-16 md:pt-24 pointer-events-auto">
                <motion.h1
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                    className="text-7xl md:text-9xl font-serif text-white mb-12 drop-shadow-2xl leading-[0.8] flex flex-col items-center tracking-[-0.04em]"
                >
                    <div className="flex overflow-hidden">
                        {"NADI".split("").map((char, index) => (
                            <motion.span 
                                key={`ex-${index}`}
                                variants={{
                                    hidden: { y: 100, opacity: 0 },
                                    visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 12, stiffness: 80 } }
                                }}
                                className="inline-block"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                    
                    <div className="text-[#f59e0b] italic drop-shadow-xl flex overflow-hidden -mt-4 md:-mt-8">
                        {"BARITO".split("").map((char, index) => (
                            <motion.span 
                                key={`bjm-${index}`}
                                variants={{
                                    hidden: { y: 100, opacity: 0 },
                                    visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 12, stiffness: 80 } }
                                }}
                                className="inline-block"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                </motion.h1>

                {/* Glassmorphism Floating Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                    className="w-full max-w-3xl mx-auto mt-8 md:mt-12"
                >
                    <form onSubmit={handleSearch} className="relative flex items-center w-full bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-full shadow-2xl group focus-within:bg-white/20 transition-colors duration-500">
                        <div className="pl-12 pr-6 text-white/60 group-focus-within:text-white transition-colors">
                            <Search size={20} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Cari Susur Sungai, Soto Banjar, atau Sasirangan..." 
                            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/50 text-sm md:text-base font-sans px-6 py-4 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit" 
                            className="bg-[#f59e0b] hover:bg-yellow-500 text-white px-12 md:px-16 py-8 rounded-full font-bold uppercase tracking-meta text-[10px] shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all ml-4 font-sans"
                        >
                            Eksplor
                        </motion.button>
                    </form>
                    
                    {/* Suggestions */}
                    <div className="flex flex-wrap justify-center gap-6 mt-12 md:mt-16">
                        {['Kuliner Banjar', 'Susur Sungai', 'Kampung Sasirangan', 'Siring Piere Tendean'].map((tag, i) => (
                            <button 
                                key={i} 
                                type="button"
                                onClick={() => {
                                    setSearchQuery(tag);
                                    navigate(`/explore?search=${tag}`);
                                }}
                                className="px-10 py-4 rounded-full bg-black/40 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white/50 hover:text-white text-mono-label font-mono transition-colors"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-8 pointer-events-none"
            >
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-50">Gulir</span>
                <motion.div 
                    animate={{ height: ['30px', '60px', '30px'], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[2px] bg-gradient-to-b from-[#f59e0b] to-transparent rounded-full"
                ></motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;

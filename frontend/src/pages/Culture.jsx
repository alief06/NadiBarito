import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Waves, Volume2, Ship, Feather, Theater } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useTourismStore } from '../store/useTourismStore';
import Spline from '@splinetool/react-spline';

const BentoCard = ({ item, isLarge, icon: Icon, delay }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={`group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#111] hover:bg-[#151515] hover:border-[#f97316]/30 transition-all duration-700 shadow-2xl flex flex-col justify-between p-8 md:p-10 ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
        >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f97316]/0 to-[#f97316]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            {/* Icon Header */}
            <div className="flex justify-between items-start mb-8 relative z-10 w-full">
                <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-[0_5px_20px_rgba(0,0,0,0.5)] group-hover:border-[#f97316]/50 group-hover:scale-110 transition-transform duration-500">
                    <Icon size={24} className="text-[#f97316]" />
                </div>

                {item.hasListen && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-black border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-[#f97316] hover:text-black hover:border-[#f97316] transition-all duration-300 shadow-xl cursor-pointer">
                        <Volume2 size={12} className="animate-pulse" /> Listen
                    </button>
                )}
            </div>

            {/* Main Text Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-end">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#f97316] mb-3 font-semibold group-hover:tracking-[0.4em] transition-all duration-500">
                    {item.subtitle}
                </p>
                <h3 className={`font-serif font-black text-white italic tracking-tighter leading-none mb-4 ${isLarge ? 'text-5xl md:text-6xl lg:text-7xl' : 'text-3xl md:text-4xl'}`}>
                    {item.title}
                </h3>
            </div>

            {/* Fakta Unik (Hover Reveal Wrapper) */}
            <div className="relative z-10 overflow-hidden h-0 group-hover:h-auto group-hover:mt-6 transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100">
                <div className="bg-[#050505] border-l-2 border-[#f97316] p-4 rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-[#f97316] tracking-[0.2em] mb-2 flex items-center gap-2">
                        <Sparkles size={10} /> Fakta Unik
                    </p>
                    <p className="text-white/70 font-sans text-sm leading-relaxed">
                        {item.fact}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const Culture = () => {
    const { cultureCategories, cultureNarrative } = useTourismStore();
    const [splineLoaded, setSplineLoaded] = useState(false);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Sub-components mapped from Categories
    const river = cultureCategories.riverine.items;
    const folk = cultureCategories.folkArts.items;

    return (
        <PageTransition>
            <div ref={containerRef} className="relative bg-[#050505] min-h-screen text-white overflow-hidden pb-32">
                
                {/* 1. Introductory Hero, Narrative & Bekantan Spline */}
                <div className="relative pt-40 pb-20 px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto z-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="max-w-3xl relative z-10"
                    >
                        <h1 className="text-6xl md:text-8xl lg:text-[110px] font-serif font-black italic tracking-tighter leading-none mb-10 drop-shadow-2xl">
                            Warisan <span className="text-[#f97316]">Nadi</span>
                        </h1>
                        <p className="text-xl md:text-3xl font-serif text-white/80 leading-relaxed border-l-4 border-white/20 pl-6 md:pl-8 py-2 italic font-medium">
                            "{cultureNarrative}"
                        </p>
                    </motion.div>

                    {/* Absolute Fixed Floating 3D Bekantan Spline on the Side (Smaller) */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="absolute right-0 top-10 md:top-20 w-[300px] md:w-[400px] lg:w-[450px] h-[300px] md:h-[450px] overflow-hidden pointer-events-auto z-0 opacity-90 mix-blend-lighten"
                    >
                        {/* scale and translate push the Spline watermark entirely out of the overflow bounding box */}
                        <Spline 
                            scene="https://prod.spline.design/gdassBpjRwlgsn31/scene.splinecode" 
                            onLoad={() => setSplineLoaded(true)}
                            className={`w-full h-full object-contain scale-[1.15] translate-y-6 transition-opacity duration-1000 ${splineLoaded ? 'opacity-100' : 'opacity-0'}`}
                        />
                    </motion.div>
                </div>

                {/* 2. Interactive Bento Grid System */}
                <div className="px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto z-20 relative">
                    
                    {/* Segment A: Riverine Heritage Bento */}
                    <div className="mb-24">
                        <div className="mb-10 flex items-center gap-4">
                            <div className="w-12 h-px bg-[#f97316]"></div>
                            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-[#f97316]">{cultureCategories.riverine.title}</h2>
                        </div>
                        <p className="text-white/50 max-w-2xl text-lg mb-12 font-sans">{cultureCategories.riverine.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]">
                            {/* Card 1: Main Feature (Large) */}
                            <BentoCard icon={Waves} item={river[0]} isLarge={true} delay={0.1} />
                            
                            {/* Cards 2 & 3: Normal Size */}
                            <BentoCard icon={Ship} item={river[2]} isLarge={false} delay={0.3} />
                            <BentoCard icon={Sparkles} item={river[1]} isLarge={false} delay={0.5} />
                        </div>
                    </div>

                    {/* Segment B: Folk Arts Bento */}
                    <div>
                        <div className="mb-10 flex items-end justify-end gap-4 text-right">
                            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-[#f97316]">{cultureCategories.folkArts.title}</h2>
                            <div className="w-12 h-px bg-[#f97316] mb-2"></div>
                        </div>
                        <p className="text-white/50 max-w-2xl text-lg mb-12 font-sans text-right ml-auto">{cultureCategories.folkArts.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]">
                            {/* Cards 1 & 2: Normal Size */}
                            <BentoCard icon={Theater} item={folk[1]} isLarge={false} delay={0.1} />
                            
                            {/* Card 3: Main Feature Sasirangan (Large) */}
                            <BentoCard icon={Feather} item={folk[2]} isLarge={true} delay={0.3} />

                            {/* Card 4: Audio Feature Normal */}
                            <BentoCard icon={Volume2} item={folk[0]} isLarge={false} delay={0.5} />
                        </div>
                    </div>

                </div>
            </div>
        </PageTransition>
    );
};

export default Culture;

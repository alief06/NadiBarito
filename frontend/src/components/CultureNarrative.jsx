import React from 'react';
import { motion } from 'framer-motion';
import { Droplets } from 'lucide-react';

const CultureNarrative = () => {
    return (
        <section className="relative w-full py-48 md:py-64 overflow-hidden bg-[#0A1A14]">
            {/* Animasi Riak Air (Efektif CPU via Opacity & Scale gradient glow) */}
            <motion.div 
                className="absolute inset-0 pointer-events-none"
                animate={{ 
                    scale: [1, 1.05, 1], 
                    opacity: [0.6, 0.9, 0.6] 
                }}
                transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[200%] bg-[radial-gradient(circle,rgba(15,94,61,0.3)_0%,rgba(6,35,22,0)_60%)] blur-2xl rounded-full"></div>
                <div className="absolute top-1/4 right-0 w-[80%] h-[150%] bg-[radial-gradient(circle,rgba(43,103,119,0.25)_0%,rgba(6,35,22,0)_70%)] blur-2xl rounded-full mix-blend-screen"></div>
            </motion.div>

            <div className="relative z-10 max-w-4xl mx-auto px-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <div className="flex justify-center mb-16">
                        <motion.div 
                            animate={{ y: [0, -10, 0] }} 
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Droplets className="text-heritage-gold" size={36} />
                        </motion.div>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-playfair font-bold text-heritage-cream mb-16 leading-tight drop-shadow-xl">
                        Jejak Kesultanan di <br className="hidden md:block"/>
                        <span className="text-heritage-gold italic font-semibold">Kota Seribu Sungai</span>
                    </h2>
                    
                    <p className="font-sans text-base md:text-xl text-heritage-cream/80 leading-relaxed font-light max-w-3xl mx-auto drop-shadow-md">
                        Budaya Banjarmasin lahir dari pelukan Sungai Barito dan Martapura. Sejak Pangeran Samudera memeluk Islam 
                        menjadi Sultan Suriansyah pada 24 September 1526, jejak sejarahnya terus berdenyut. Dari hiruk-pikuk klotok 
                        di Pasar Terapung Muara Kuin, hingga cantiknya kerajinan di Kampung Sasirangan, kami mengundang Anda 
                        menyelami visi Banjarmasin: Kota perdagangan berbasis sungai terdepan yang modern dan berkelanjutan.
                    </p>
                </motion.div>
            </div>
            
            {/* Soft fade borders */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-heritage-dark to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-heritage-dark to-transparent"></div>
        </section>
    );
};

export default CultureNarrative;

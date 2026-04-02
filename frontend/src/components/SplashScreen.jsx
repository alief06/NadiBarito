import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const SplashScreen = ({ finishLoading }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            finishLoading();
        }, 4000); // 4 seconds total duration

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 30); // Increment progress over ~3 seconds

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [finishLoading]);

    const characters = "NADIBARITO".split("");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.5 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
                opacity: 0, 
                y: -100,
                transition: { duration: 0.8, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Ambient Background Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute w-80 h-80 bg-[#f97316]/10 blur-[100px] rounded-full pointer-events-none"
            />

            {/* Logo Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                    duration: 1.2, 
                    ease: [0.6, 0.05, -0.01, 0.9] 
                }}
                className="relative z-10 w-28 h-28 text-[#f97316] mb-10"
            >
                {/* Logo with pulsing shadow effect */}
                <Logo className="drop-shadow-[0_0_20px_rgba(249,115,22,0.6)]" />
                
                {/* Secondary Pulse Ring */}
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 border-2 border-[#f97316]/30 rounded-full blur-sm"
                />
            </motion.div>

            {/* Staggered Text Animation */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="flex overflow-hidden text-4xl md:text-5xl font-bold tracking-[0.25em] text-white font-sans uppercase mb-4 z-10"
            >
                {characters.map((char, index) => (
                    <motion.span key={index} variants={child} className="inline-block">
                        {char}
                    </motion.span>
                ))}
            </motion.div>

            {/* Premium Tagline */}
            <motion.p
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                animate={{ opacity: 1, letterSpacing: "0.45em" }}
                transition={{ delay: 1.8, duration: 1.5 }}
                className="text-[9px] md:text-[11px] uppercase text-white/30 font-medium mb-16 tracking-[0.45em] z-10"
            >
                The Digital Pulse of Thousand Rivers
            </motion.p>

            {/* Loading Indicator Bar */}
            <div className="w-56 h-[1px] bg-white/5 relative overflow-hidden z-10">
                <motion.div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-transparent via-[#f97316] to-transparent"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                />
            </div>
            
            {/* Visual Decorative Lines */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-10">
                <div className="w-20 h-[1px] bg-white"></div>
                <div className="w-2 h-2 rotate-45 border border-white"></div>
                <div className="w-20 h-[1px] bg-white"></div>
            </div>
        </motion.div>
    );
};

export default SplashScreen;

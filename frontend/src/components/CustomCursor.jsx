import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleHover = () => setIsHovered(true);
        const handleUnhover = () => setIsHovered(false);

        window.addEventListener('mousemove', moveCursor);
        
        const attachHoverListeners = () => {
            const elements = document.querySelectorAll('a, button, [role="button"], input, select, textarea, .card-hover');
            elements.forEach(el => {
                el.addEventListener('mouseenter', handleHover);
                el.addEventListener('mouseleave', handleUnhover);
            });
        };

        const observer = new MutationObserver(attachHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });
        
        attachHoverListeners();

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            observer.disconnect();
        };
    }, [cursorX, cursorY, isVisible]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: springX,
                y: springY,
                translateX: '-50%',
                translateY: '-50%',
            }}
            animate={{
                scale: isHovered ? 4 : 1,
                backgroundColor: isHovered ? '#fff' : '#f97316',
                border: isHovered ? 'none' : '2px solid #f97316',
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
        >
            <div className={`absolute inset-0 rounded-full bg-white/20 blur-sm ${isHovered ? 'hidden' : 'block'}`}></div>
        </motion.div>
    );
};

export default CustomCursor;

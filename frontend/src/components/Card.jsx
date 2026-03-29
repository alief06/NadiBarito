import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
    children,
    className = '',
    glass = false,
    hover = true,
    onClick,
    ...props
}) => {
    const baseStyles = glass
        ? 'premium-glass rounded-2xl overflow-hidden'
        : 'premium-card';

    const hoverStyles = hover
        ? 'cursor-pointer'
        : '';

    return (
        <motion.div
            whileHover={hover ? { scale: 1.03, translateY: -8 } : {}}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={onClick}
            className={`${baseStyles} ${hoverStyles} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export const CardImage = ({ src, alt, className = '' }) => (
    <div className={`relative overflow-hidden aspect-video ${className}`}>
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
        />
    </div>
);

export const CardContent = ({ children, className = '' }) => (
    <div className={`p-24 ${className}`}>
        {children}
    </div>
);

export default Card;

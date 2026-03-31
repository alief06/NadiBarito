import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Heart } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

export const DestinationCard = ({ id, image, title, category, location, rating, delay = 0, onClick, isLiked, onLike }) => {
    return (
        <motion.div
            layout // Enable smooth layout transitions
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, layout: { type: "spring", stiffness: 300, damping: 30 } }}
            className="h-full"
        >
            <Tilt 
                tiltMaxAngleX={8} 
                tiltMaxAngleY={8} 
                scale={1.02} 
                transitionSpeed={2500} 
                className="group relative bg-white dark:bg-heritage-dark-surface rounded-3xl overflow-hidden cursor-pointer premium-card h-full flex flex-col shadow-xl"
            >
                {/* Image Container with Hover Effect */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-3xl h-full flex-grow">
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500 z-10" onClick={onClick} />
                    <motion.img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.15]"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-16 left-16 z-20 pointer-events-none">
                        <span className="px-12 py-6 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                            {category}
                        </span>
                    </div>

                    {/* Like / Save Button with Micro-interaction */}
                    <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={(e) => { e.stopPropagation(); onLike && onLike(id); }}
                        className="absolute top-16 right-16 z-30 p-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/20 transition-all shadow-lg"
                    >
                        <motion.div
                            animate={isLiked ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Heart 
                                size={18} 
                                className={`transition-colors duration-300 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                            />
                        </motion.div>
                    </motion.button>
                </div>

                {/* Content Area */}
                <div 
                    className="absolute bottom-0 left-0 right-0 p-24 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-20 translate-y-8 group-hover:translate-y-0 transition-transform duration-500"
                    onClick={onClick}
                >
                    <div className="flex justify-between items-end mb-8 relative">
                        <h3 className="text-h3 font-heritage font-bold text-white pr-12 line-clamp-1 group-hover:text-heritage-gold transition-colors duration-300">{title}</h3>
                        <div className="flex items-center gap-4 px-8 py-4 bg-heritage-gold/20 backdrop-blur-md border border-heritage-gold/30 rounded-lg text-white text-xs font-semibold shadow-inner shrink-0 mb-4">
                            <Star size={12} className="text-heritage-gold fill-heritage-gold" />
                            <span>{rating}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-white/80 text-small opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                        <MapPin size={14} className="text-heritage-gold min-w-[14px]" />
                        <span className="truncate">{location}</span>
                    </div>
                </div>
                
                {/* Glow border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-heritage-gold/40 rounded-3xl transition-colors duration-500 z-30 pointer-events-none" />
            </Tilt>
        </motion.div>
    );
};

export const SkeletonDestinationCard = () => {
    return (
        <div className="relative bg-black/5 dark:bg-white/5 rounded-3xl overflow-hidden animate-pulse shadow-md h-full min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-black/5 dark:from-white/10 dark:to-white/5" />
            <div className="absolute top-16 left-16 w-24 h-8 bg-black/10 dark:bg-white/10 rounded-full" />
            <div className="absolute top-16 right-16 w-12 h-12 bg-black/10 dark:bg-white/10 rounded-full" />
            
            <div className="absolute bottom-0 left-0 right-0 p-24 bg-gradient-to-t from-black/20 to-transparent">
                <div className="h-28 bg-black/20 dark:bg-white/20 rounded-lg w-3/4 mb-16" />
                <div className="h-16 bg-black/15 dark:bg-white/15 rounded-md w-1/2" />
            </div>
        </div>
    );
};

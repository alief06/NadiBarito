import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Heart, Sparkles } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

export const DestinationCard = ({ id, image, title, category, location, district, rating, isLegendary, delay = 0, onClick, isLiked, onLike }) => {
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
                className="group relative bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden cursor-pointer premium-card h-full flex flex-col shadow-2xl border border-white/5"
            >
                {/* Image Container with Hover Effect */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-[2.5rem] h-full flex-grow">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10" onClick={onClick} />
                    <motion.img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.15] grayscale group-hover:grayscale-0"
                    />
                    
                    {/* Legendary Glow Overlay */}
                    {isLegendary && (
                        <div className="absolute inset-0 z-15 border-2 border-yellow-500/20 group-hover:border-yellow-500/40 transition-all pointer-events-none rounded-t-[2.5rem]">
                            <div className="absolute top-10 left-10 z-20">
                                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 backdrop-blur-3xl border border-yellow-500/50 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                                    <Sparkles size={12} className="text-yellow-400 animate-pulse" />
                                    <span className="text-[8px] font-bold text-yellow-400 uppercase tracking-widest italic font-serif">Legend</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-10 right-10 z-20 pointer-events-none">
                        <span className="px-10 py-5 bg-white/5 backdrop-blur-3xl border border-white/10 text-white rounded-full text-[9px] font-bold uppercase tracking-[0.2em] shadow-2xl">
                            {category}
                        </span>
                    </div>

                    {/* Like / Save Button with Micro-interaction */}
                    <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={(e) => { e.stopPropagation(); onLike && onLike(id); }}
                        className="absolute bottom-10 right-10 z-30 p-10 rounded-full bg-black/50 hover:bg-[#f97316] backdrop-blur-md border border-white/10 transition-all shadow-2xl group/like"
                    >
                        <motion.div
                            animate={isLiked ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Heart 
                                size={20} 
                                className={`transition-colors duration-300 ${isLiked ? 'text-white fill-white' : 'text-white/40 group-hover/like:text-white'}`} 
                            />
                        </motion.div>
                    </motion.button>
                </div>

                {/* Content Area */}
                <div 
                    className="p-10 bg-gradient-to-t from-[#0a0a0a] to-[#0a0a0a]/90 z-20"
                    onClick={onClick}
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex-1 pr-6">
                            <h3 className="text-xl md:text-2xl font-serif font-black text-white group-hover:text-[#f97316] transition-colors duration-500 line-clamp-1 italic tracking-tighter">{title}</h3>
                            <div className="flex items-center gap-3 text-white/30 text-[9px] font-bold uppercase tracking-[0.3em] mt-2 group-hover:text-[#f97316]/50 transition-colors">
                                <MapPin size={12} className="text-[#f97316] min-w-[12px]" />
                                <span className="truncate">{district || location || 'Banjarmasin Tengah'}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white text-[12px] font-serif shadow-inner shrink-0 italic">
                            <Star size={14} className="text-[#f97316] fill-[#f97316]" />
                            <span className="font-bold">{rating || '4.9'}</span>
                        </div>
                    </div>
                </div>
                
                {/* Glow border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#f97316]/20 rounded-[2.5rem] transition-colors duration-700 z-30 pointer-events-none" />
            </Tilt>
        </motion.div>
    );
};

export const SkeletonDestinationCard = () => {
    return (
        <div className="relative bg-black/40 rounded-[2.5rem] overflow-hidden animate-pulse shadow-md h-full min-h-[400px] border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/2 via-transparent to-white/5" />
            <div className="absolute top-10 left-10 w-24 h-8 bg-white/5 rounded-full" />
            <div className="absolute top-10 right-10 w-12 h-12 bg-white/5 rounded-full" />
            
            <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/80 to-transparent">
                <div className="h-10 bg-white/10 rounded-lg w-3/4 mb-10" />
                <div className="h-6 bg-white/5 rounded-md w-1/2" />
            </div>
        </div>
    );
};

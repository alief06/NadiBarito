import React from 'react';

const Logo = ({ className = '' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 100" 
        className={`w-auto h-full ${className}`}
    >
        {/* The Jukung Shield Outline */}
        <path 
            d="M 50 15 C 20 15, 15 35, 15 35 L 15 65 C 15 85, 50 95, 50 95 C 50 95, 85 85, 85 65 L 85 35 C 85 35, 80 15, 50 15 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="8" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
        />
        {/* River Waves / Shield Highlight */}
        <path 
            d="M 25 45 Q 50 60 75 45" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="6" 
            strokeLinecap="round" 
        />
        {/* Traditional Jukung Boat Shape */}
        <path 
            d="M 30 70 Q 50 85 70 70 Q 50 80 30 70 Z" 
            fill="currentColor" 
        />
        <path 
            d="M 50 45 L 50 70" 
            stroke="currentColor" 
            strokeWidth="6" 
            strokeLinecap="round" 
        />
    </svg>
);

export default Logo;

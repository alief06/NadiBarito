import React from 'react';

const Badge = ({
    children,
    variant = 'brown',
    size = 'sm',
    className = ''
}) => {
    const variants = {
        brown: 'bg-heritage-brown/10 text-heritage-brown dark:bg-heritage-brown/20 dark:text-heritage-gold',
        gold: 'bg-heritage-gold/10 text-heritage-gold dark:bg-heritage-gold/20 dark:text-heritage-gold',
        outline: 'border border-heritage-brown text-heritage-brown dark:border-heritage-gold dark:text-heritage-gold',
        success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
    };

    const sizes = {
        sm: 'px-8 py-2 text-xs',
        md: 'px-12 py-4 text-sm'
    };

    return (
        <span className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;

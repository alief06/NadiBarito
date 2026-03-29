import React from 'react';

export const Container = ({ children, className = '' }) => (
    <div className={`container-custom ${className}`}>
        {children}
    </div>
);

export const Section = ({ children, className = '', id, bg = 'transparent' }) => {
    const bgStyles = {
        transparent: '',
        cream: 'bg-heritage-cream dark:bg-heritage-dark',
        brown: 'bg-heritage-brown text-white dark:bg-heritage-dark-surface',
        gold: 'bg-heritage-gold text-white',
        white: 'bg-white dark:bg-heritage-dark-surface'
    };

    return (
        <section id={id} className={`section-padding ${bgStyles[bg]} ${className}`}>
            {children}
        </section>
    );
};

export const Grid = ({ children, cols = 3, gap = 32, className = '' }) => {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    };

    return (
        <div className={`grid ${gridCols[cols]} gap-${gap} ${className}`}>
            {children}
        </div>
    );
};

import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    isLoading = false,
    disabled = false,
    type = 'button',
    onClick,
    ...props
}) => {
    const baseStyles = 'premium-button inline-flex items-center justify-center gap-8 font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-heritage-brown text-white hover:bg-opacity-90 shadow-md hover:shadow-lg dark:bg-heritage-gold dark:text-black',
        secondary: 'bg-heritage-gold text-white hover:bg-opacity-90 shadow-md hover:shadow-lg',
        outline: 'border-2 border-heritage-brown text-heritage-brown hover:bg-heritage-brown hover:text-white dark:border-heritage-gold dark:text-heritage-gold dark:hover:bg-heritage-gold dark:hover:text-black',
        ghost: 'bg-transparent text-heritage-brown hover:bg-heritage-brown/10 dark:text-heritage-gold dark:hover:bg-heritage-gold/10'
    };

    const sizes = {
        sm: 'px-16 py-8 text-small',
        md: 'px-24 py-12 text-body',
        lg: 'px-32 py-16 text-h3'
    };

    return (
        <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type={type}
            disabled={disabled || isLoading}
            onClick={onClick}
            aria-label={props['aria-label'] || (typeof children === 'string' ? children : undefined)}
            aria-busy={isLoading}
            aria-disabled={disabled || isLoading}
            className={`${baseStyles} focus:outline-none focus:ring-2 focus:ring-heritage-gold focus:ring-offset-2 dark:focus:ring-offset-black ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {isLoading ? (
                <div role="status" className="w-20 h-20 border-2 border-current border-t-transparent rounded-full animate-spin">
                    <span className="sr-only">Memuat...</span>
                </div>
            ) : null}
            {children}
        </motion.button>
    );
};

export default Button;

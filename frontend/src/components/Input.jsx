import React from 'react';

export const Input = ({
    label,
    error,
    className = '',
    type = 'text',
    ...props
}) => {
    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            {label && (
                <label className="text-small font-semibold text-heritage-brown dark:text-heritage-dark-text">
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`w-full px-16 py-12 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-heritage-dark-surface focus:outline-none focus:ring-2 focus:ring-heritage-gold/50 transition-all duration-300 ${error ? 'border-red-500' : ''}`}
                {...props}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
};

export const Select = ({
    label,
    options = [],
    className = '',
    ...props
}) => {
    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            {label && (
                <label className="text-small font-semibold text-heritage-brown dark:text-heritage-dark-text">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    className="w-full appearance-none px-16 py-12 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-heritage-dark-surface focus:outline-none focus:ring-2 focus:ring-heritage-gold/50 transition-all duration-300 cursor-pointer"
                    {...props}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-16 h-16 text-black/40 dark:text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

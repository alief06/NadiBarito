/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    orange: '#f97316',
                    dark: '#050505',
                },
                heritage: {
                    brown: '#5C3A21',
                    gold: '#D4AF37',
                    cream: '#F5F5DC',
                    dark: '#1A120B',
                    'dark-surface': '#2D1E12',
                    'dark-text': '#F5F5DC'
                },
            },
            fontSize: {
                'h1': ['clamp(2.5rem, 8vw, 5rem)', { lineHeight: '1.1', fontWeight: '800', letterSpacing: '-0.02em' }],
                'h2': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
                'h3': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.3', fontWeight: '600' }],
                'body-large': ['1.125rem', { lineHeight: '1.7' }],
                'body': ['1rem', { lineHeight: '1.6' }],
                'small': ['0.875rem', { lineHeight: '1.6' }],
                'mono-label': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.1em' }],
            },
            spacing: {
                'container': '1280px',
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            letterSpacing: {
                'editorial': '-0.02em',
                'meta': '0.15em',
            },
            animation: {
                'slow-zoom': 'slow-zoom 20s linear infinite',
            },
            keyframes: {
                'slow-zoom': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                }
            }
        },
    },
    plugins: [],
}

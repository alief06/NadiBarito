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
                heritage: {
                    brown: '#5C3A21', // Primary: Coklat heritage
                    gold: '#D4AF37',  // Secondary: Gold
                    cream: '#F5F5DC', // Background: Cream
                    dark: '#1A120B',  // Support dark mode
                    'dark-surface': '#2D1E12',
                    'dark-text': '#F5F5DC'
                },
            },
            fontSize: {
                'h1': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
                'h2': ['32px', { lineHeight: '1.3', fontWeight: '600' }],
                'h3': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
                'body': ['16px', { lineHeight: '1.6' }],
                'small': ['14px', { lineHeight: '1.6' }],
            },
            spacing: {
                '4': '4px',
                '8': '8px',
                '12': '12px',
                '16': '16px',
                '24': '24px',
                '32': '32px',
                '48': '48px',
                '64': '64px',
                '80': '80px',
                '96': '96px',
            },
            maxWidth: {
                'container': '1280px',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                cormorant: ['Cormorant Garamond', 'serif'],
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

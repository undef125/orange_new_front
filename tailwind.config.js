/** @type {import('tailwindcss').Config} */
module.exports = {
 
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        dmsans: ['var(--font-dmsans)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'translateY(-100%)', opacity: "0"},
          '100%': { transform: 'translateY(0%)',opacity: "1" },
        },
        slidein: {
          '0%': { transform: 'translateX(100%)', opacity: "0"},
          '100%': { transform: 'translateX(0%)',opacity: "1" },
        },
        slideinfromleft: {
          '0%': { width: '0vw', opacity: "0"},
          '100%': { width: '15vw',opacity: "1" },
        },
      },
      animation: {
        wiggle: 'wiggle .8s ease-in-out',
        slidein: 'slidein 1s ease-in-out',
        slideinfromleft: 'slideinfromleft 2s ease-in-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
  ],
}

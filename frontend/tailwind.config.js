/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F1EDE4',
        paper: '#FDFBF7',
        ink: '#111111',
        espresso: '#6E473B',
        rust: '#8C5A4A',
        tan: '#D4A373',
        line: '#E3DCCC',
        background: '#F1EDE4',
        foreground: '#111111',
        border: '#E3DCCC',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono2: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        lg: '0px',
        md: '0px',
        sm: '0px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

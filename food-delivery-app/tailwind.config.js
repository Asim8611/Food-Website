/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        blink: 'blink 1s step-start infinite', // Existing blink animation
        customBlink: 'customBlink 1s infinite', // Custom blinking animation
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        customBlink: {
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};

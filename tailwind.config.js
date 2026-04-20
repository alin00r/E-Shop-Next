/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        noon: {
          yellow: '#feee00',
          black: '#222831',
          slate: '#404553',
          ink: '#2d2f39',
          mist: '#f7f8fa',
        },
      },
      boxShadow: {
        card: '0 10px 24px -12px rgba(34, 40, 49, 0.25)',
      },
    },
  },
  plugins: [],
};

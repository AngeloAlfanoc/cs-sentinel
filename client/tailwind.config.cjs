/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/*.{js,ts,jsx,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        color: 'var(--color)',
        'accent-primary': 'var(--accent-primary)',
        'accent-primary-state': 'var(--accent-primary-state)'
      }
    }
  },
  plugins: [require('flowbite/plugin')]
};

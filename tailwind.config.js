/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "*.html",
    "src/**/*.js",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        fadeOut: 'fadeOut 1s',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}


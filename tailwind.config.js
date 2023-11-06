/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    prefix: 'd-',
    themes: [
      'winter',
      'dark',
    ],
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],
}

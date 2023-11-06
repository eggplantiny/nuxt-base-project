// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.scss',
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    'nuxt-icon',
    'dayjs-nuxt',
    'nuxt-snackbar',
  ],
  snackbar: {
    bottom: true,
    right: true,
    duration: 5000,
  },
})

export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theming
  ui: {
    container: {
      constrained: 'max-w-xl',
    },
    button: {
      base: 'd-btn',
      color: {
        white: {
          solid: '',
          ghost: 'd-btn-ghost',
        },
      },
    },
  },
})

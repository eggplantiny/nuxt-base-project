export default defineNuxtRouteMiddleware(async (to, from) => {
  // if (to.path === '/auth/login')
  //   return
  //
  // const authStore = useAuthStore()
  //
  // const isAuthenticated = toValue(authStore.isAuthenticated)
  //
  // if (isAuthenticated === false) {
  //   try {
  //     const success = await authStore.autoLogin()
  //
  //     if (!success)
  //       return navigateTo(`/auth/login?redirect=${to.path}` as any)
  //   }
  //   catch {
  //     return navigateTo(`/auth/login?redirect=${to.path}` as any)
  //   }
  // }
  //
  // await nextTick()
  //
  // return true
})

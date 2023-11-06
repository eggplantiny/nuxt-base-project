import { themeChange } from 'theme-change'
import type { ComputedRef } from 'vue'
import { tryOnMounted, useLocalStorage } from '@vueuse/core'

type Theme = 'winter' | 'dark'

export function useTheme() {
  const theme = useLocalStorage('theme', 'winter')
  const isDarkMode: ComputedRef<boolean> = computed(() => theme.value === 'dark')

  function changeTheme(_theme?: Theme) {
    if (_theme)
      theme.value = _theme

    document.documentElement.setAttribute('data-theme', theme.value)
    const root = document.getElementsByTagName('html')[0]!

    if (theme.value === 'dark')
      root.setAttribute('class', 'dark')

    else
      root.removeAttribute('class')

    themeChange(false)
  }

  watch(theme, () => changeTheme())
  tryOnMounted(() => changeTheme())

  return {
    isDarkMode,
    changeTheme,
    theme,
  }
}

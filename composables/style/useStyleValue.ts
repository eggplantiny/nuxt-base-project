import type { MaybeRef } from 'vue'

type StyleSuffix = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%'

interface Params {
  suffix?: StyleSuffix
}

const DEFAULT_PARAMS: Params = {
  suffix: 'px',
}

type TargetSource = MaybeRef<string | number> | (() => string | number)

export function useStyleValue(value: TargetSource, params: Partial<Params> = {}) {
  const { suffix } = { ...DEFAULT_PARAMS, ...params }

  return computed(() => {
    const unwrappedValue = unref(value)
    let v = unwrappedValue
    if (typeof unwrappedValue === 'function')
      v = unwrappedValue()

    if (typeof v === 'number')
      return `${v}${suffix}`
    else if (typeof v === 'function')
      return `${v}${suffix}`
    return v
  })
}

import type { MaybeRef } from 'vue'
import { computed, unref } from 'vue'

type TargetCSSStyleDeclaration = 'width' | 'height' | 'minWidth' | 'minHeight' | 'maxWidth' | 'maxHeight' | 'gap' | 'padding' | 'paddingTop' | 'paddingBottom' | 'paddingLeft' | 'paddingRight' | 'margin' | 'marginTop' | 'marginBottom' | 'marginLeft' | 'marginRight' | 'border' | 'borderTop' | 'borderBottom' | 'borderLeft' | 'borderRight' | 'borderRadius' | 'fontSize' | 'lineHeight' | 'letterSpacing' | 'top' | 'bottom' | 'left' | 'right'

type Target = { [key in TargetCSSStyleDeclaration]?: MaybeRef<string | number> }

export function useComputedStyles(target: Target) {
  return computed(() => {
    const result: any = {}

    for (const key in target) {
      const value = target[key as TargetCSSStyleDeclaration]
      const unrefValue = unref(value)

      if (typeof unrefValue === 'number')
        result[key] = `${unrefValue}px`
      else
        result[key] = unrefValue
    }

    return result
  })
}

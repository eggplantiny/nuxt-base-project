<script setup lang="ts">
import { useStyleValue } from '~/composables/style/useStyleValue'
import { useComputedStyles } from '~/composables/style/useComputedStyles'

const props = withDefaults(defineProps<{
  gap?: string | number
}>(), {
  gap: 16,
})

const { gap } = toRefs(props)

const style = useComputedStyles({
  gap: useStyleValue(gap),
})
</script>

<template>
  <div class="k-stack" :style="style">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.k-stack {
  @apply flex flex-col;
}
</style>

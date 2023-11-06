<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'
import type { ColorType } from '~/types/style.type'

const props = withDefaults(defineProps<{
  hover?: ColorType | null
}>(), {
  hover: null,
})

const { hover } = toRefs(props)

const target = ref<HTMLDivElement | null>(null)

const { x, y, isOutside } = useMouseInElement(target)

const calculatedStyle = computed(() => {
  if (!hover.value)
    return {}

  if (isOutside.value)
    return {}

  const center = {
    x: x.value - target.value!.getBoundingClientRect().x,
    y: y.value - target.value!.getBoundingClientRect().y,
  }

  const distance = Math.sqrt(center.x ** 2 + center.y ** 2)

  const SCALE = 0.95

  return {
    transform: `
      scale3d(${SCALE}, ${SCALE}, ${SCALE})
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance) * 2}deg
      )
    `,
  }
})

const calculatedGlowStyle = computed(() => {
  if (isOutside.value)
    return {}

  const center = {
    x: x.value - target.value!.getBoundingClientRect().x,
    y: y.value - target.value!.getBoundingClientRect().y,
  }

  const bounds = target.value!.getBoundingClientRect()

  return {
    backgroundImage: `
      radial-gradient(
        circle at
        ${center.x * 2 + bounds.width / 2}px
        ${center.y * 2 + bounds.height / 2}px,
        #ffffff55,
        #0000000f
      )
    `,
  }
})

const computedClasses = computed(() => {
  const result = [] as string[]

  if (hover.value)
    result.push(hover.value)

  return result
})
</script>

<template>
  <div
    ref="target"
    class="k-board k-dark"
    :style="calculatedStyle"
    :class="computedClasses"
  >
    <div class="glow z-1" :style="calculatedGlowStyle" />
    <slot class="z-10" />
  </div>
</template>

<style scoped lang="scss">
.k-board {
  @apply border border-base-200 rounded-box;

  transition-duration: 300ms;
  transition-property: transform, box-shadow, background-color;
  transition-timing-function: ease-out;
  transform: rotate3d(0, 0, 0, 0deg);
}

.k-board:hover {
  &.primary {
    @apply bg-primary/80 text-primary-content;
  }

  &.secondary {
    @apply bg-secondary/80 text-secondary-content;
  }

  &.accent {
    @apply bg-accent/80 text-accent-content;
  }

  &.neutral {
    @apply bg-neutral/80 text-neutral-content;
  }

  &.info {
    @apply bg-info/80 text-info-content;
  }

  &.success {
    @apply bg-success/80 text-success-content;
  }

  &.warning {
    @apply bg-warning/80 text-warning-content;
  }

  &.error {
    @apply bg-error/80 text-error-content;
  }

  @apply transition-colors;

  .glow {
    @apply absolute inset-0 w-full h-full;
  }
}
</style>

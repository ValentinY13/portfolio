<script setup lang="ts">
import type { RouteLocationRaw } from "#vue-router";

const {theme = 'glowing', to, size, icon, disabled} = defineProps<{
  theme?: 'glowing' | 'ghost' | 'terminal'
  to?: RouteLocationRaw
  size?: 'small'
  icon?: string
  disabled?: boolean
}>()

const { gsap, createCtx } = useGsap()
const buttonRef = ref<HTMLElement | null>(null)
const spotlightRef = ref<HTMLElement | null>(null)

// Logique de rendu dynamique
const componentType = computed(() => to ? resolveComponent('NuxtLink') : 'button')
const vBindProps = computed(() => to ? { to: to } : { disabled: disabled })

const classes = computed(() => [
  'btn',
  `btn--${theme}`,
  size && `btn--size-${size}`,
])

// Animation Spotlight GSAP
onMounted(() => {
  createCtx(buttonRef, () => {
    if (!buttonRef.value) return

    const btn = buttonRef.value!

    if (theme === 'glowing' && spotlightRef.value) {
      const spot = spotlightRef.value!
      const onMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        gsap.to(spot, {
          left: x,
          top: y,
          duration: 0.2,
          ease: 'power2.out'
        })
      }
      btn.addEventListener('mousemove', onMouseMove)
    }

    if (theme === 'ghost') {
      gsap.fromTo(btn,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      )
    }
  })
})
</script>

<template>
  <component
      :is="componentType"
      ref="buttonRef"
      :class="classes"
      v-bind="vBindProps"
      class="group"
  >
    <template v-if="theme === 'glowing'">
      <div class="btn-border-container">
        <div class="conic-glow"></div>
      </div>
      <div class="absolute inset-px bg-black-100 rounded-[7px] z-0"></div>

      <div
          ref="spotlightRef"
          class="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      ></div>
    </template>

    <template v-if="theme === 'terminal'">
      <span class="bracket" aria-hidden="true">[</span>
    </template>

    <!-- Contenu du bouton -->
    <span class="relative z-20 flex items-center gap-2">
      <slot />
      <i v-if="icon" :class="`icon-${icon}`" class="relative z-20" />
    </span>

    <template v-if="theme === 'terminal'">
      <span class="bracket" aria-hidden="true">]</span>
      <span class="terminal-cursor" aria-hidden="true">▌</span>
    </template>
  </component>
</template>

<style scoped>

</style>
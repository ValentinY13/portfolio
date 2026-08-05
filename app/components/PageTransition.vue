<script setup lang="ts">
const { gsap } = useGsap()
const container = ref<HTMLElement | null>(null)

// Grille de cellules carrées : 20 colonnes fixes, autant de lignes que
const columns = 20
const rows = ref(0)
const cells = ref(0)

const updateGrid = () => {
  rows.value = Math.ceil(window.innerHeight / (window.innerWidth / columns))
  cells.value = columns * rows.value
}

onMounted(updateGrid)
// useEventListener nettoie le listener automatiquement.
useEventListener(window, 'resize', useDebounceFn(updateGrid, 150))

const getCells = () => container.value?.querySelectorAll('.transition-cell')

// Accessibilité
const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

const isMobile = useMediaQuery('(max-width: 767px)')

/**
 * Transition d'entrée : l'écran est masqué par les cellules, on les fait
 * disparaître depuis le centre puis la page entrante fade in en parallèle.
 */
const onEnter = (el: HTMLElement, done: () => void) => {
  if (reducedMotion.value) return done()

  const tl = gsap.timeline({ onComplete: () => { gsap.set(el, { clearProps: "all" }); done(); } })

  // grid: [rows, columns]
  tl.to(getCells()!, {
    scale: 0,
    opacity: 0,
    duration: 0.4,
    stagger: { grid: [rows.value, columns], from: 'center', amount: 0.3 },
    ease: 'power2.inOut'
  })

  tl.from(el, { opacity: 0, duration: 0.3 }, '-=0.3')
}

/**
 * Transition de sortie : on réaffiche les cellules dans un ordre aléatoire
 * pour masquer l'écran, tout en faisant disparaître la page sortante.
 */
const onLeave = (el: HTMLElement, done: () => void) => {
  if (reducedMotion.value) return done()

  // Reset défensif
  gsap.set(getCells()!, { scale: 0, opacity: 0 })

  const tl = gsap.timeline({ onComplete: done })

  tl.to(getCells()!, {
    scale: 1,
    opacity: 1,
    duration: 0.3,
    stagger: { grid: [rows.value, columns], from: 'random', amount: 0.3 },
    ease: 'expo.out'
  })

  tl.to(el, { opacity: 0, scale: 0.98, duration: 0.2 }, 0)
}

defineExpose({ onEnter, onLeave })
</script>

<template>
  <div
      v-if="!isMobile"
      ref="container"
      class="fixed inset-0 pointer-events-none z-9999 grid"
      :style="{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }"
  >
    <div
        v-for="i in cells"
        :key="i"
        class="transition-cell bg-black-100 border-[0.5px] border-white/5 relative opacity-0"
    >
    </div>
  </div>
</template>

<style scoped>
.transition-cell {
  aspect-ratio: 1 / 1;
}
</style>
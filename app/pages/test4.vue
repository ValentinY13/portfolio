<script setup lang="ts">
const { createCtx, gsap } = useGsap()
const containerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  createCtx(containerRef, () => {
    // Nettoyage automatique des animations GSAP si on en ajoutait
  })
})
</script>

<template>
  <div ref="containerRef" class="min-h-screen bg-black-100 flex flex-col items-center justify-center gap-16 p-8 font-inter">
    <!-- Terminal Style Button (Optimized) -->
    <button
      class="terminal-bracket-btn group relative px-6 py-3 font-jetbrains-mono text-sm text-grey-100 transition-colors duration-300 hover:text-accent outline-none focus-visible:text-accent"
      aria-label="Me contacter via terminal"
    >
      <span class="bracket bracket-left" aria-hidden="true">[</span>
      <span class="relative z-10 mx-2">me_contacter</span>
      <span class="bracket bracket-right" aria-hidden="true">]</span>
      <span class="terminal-cursor" aria-hidden="true">▌</span>
    </button>
  </div>
</template>

<style scoped>
.terminal-bracket-btn {
  background: transparent;
}

.bracket {
  display: inline-block;
  color: theme('colors.accent', #26BD6C);
  opacity: 0;
  transform: translateX(0);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.bracket-left { transform: translateX(8px); }
.bracket-right { transform: translateX(-8px); }

.group:hover .bracket,
.group:focus-visible .bracket {
  opacity: 1;
  transform: translateX(0);
}

.terminal-cursor {
  display: inline-block;
  margin-left: 4px;
  opacity: 0;
  animation: blink 1s steps(1) infinite;
}

.group:hover .terminal-cursor,
.group:focus-visible .terminal-cursor {
  opacity: 1;
}

@keyframes blink {
  50% { opacity: 0; }
}
</style>
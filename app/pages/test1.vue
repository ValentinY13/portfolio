<script setup lang="ts">
const { gsap } = useGsap()
const buttonRef = ref<HTMLElement | null>(null)
const spotlightRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!buttonRef.value || !spotlightRef.value) return

  const btn = buttonRef.value
  const spot = spotlightRef.value

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
})
</script>

<template>
  <div class="min-h-screen bg-black-100 flex flex-col items-center justify-center gap-16 p-8 font-inter">
    <!-- Raycast Style Button -->
    <button
      ref="buttonRef"
      class="raycast-btn group relative px-8 py-3 rounded-lg overflow-hidden bg-black-100 text-white-100 font-medium transition-all duration-300"
    >
      <!-- Bordure animée (Rotating Border) -->
      <div class="absolute inset-0 p-[1px] rounded-lg overflow-hidden">
        <div class="conic-glow absolute inset-[-100%] bg-[conic-gradient(from_var(--angle),transparent_0deg,var(--color-accent)_60deg,transparent_120deg)]"></div>
      </div>

      <!-- Fond interne pour masquer le centre du conic-gradient -->
      <div class="absolute inset-[1px] bg-black-100 rounded-[7px] z-0"></div>

      <!-- Spotlight Effect -->
      <div
        ref="spotlightRef"
        class="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#ff4d4d]/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      ></div>

      <!-- Content -->
      <span class="relative z-20 flex items-center gap-2">
        Démarrer le projet
      </span>
    </button>
  </div>
</template>

<style scoped>
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.raycast-btn {
  border: none;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.conic-glow {
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  from { --angle: 0deg; }
  to { --angle: 360deg; }
}

.raycast-btn:hover {
  box-shadow: 0 0 30px rgba(255, 77, 77, 0.15);
  transform: translateY(-1px);
}
</style>
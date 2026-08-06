<script setup lang="ts">
const { createCtx, gsap } = useGsap()

const containerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  createCtx(containerRef, () => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      // Apparition des blocs
      tl.from('.node', {
        opacity: 0,
        scale: 0.9,
        y: 10,
        duration: 0.8,
        stagger: 0.15
      })

      // Animation des lignes
      tl.from('.flow-line', {
        opacity: 0,
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1,
        stagger: 0.2
      }, '-=0.4')

      const pulses = containerRef.value?.querySelectorAll('.pulse-circle')

      pulses?.forEach((pulse, index) => {
        const lineId = pulse.getAttribute('data-line')
        const path = containerRef.value?.querySelector(`#${lineId}`)

        if (path) {
          gsap.set(pulse, {
            opacity: 0,
            x: 0,
            y: 0
          })

          const pulseTl = gsap.timeline({ repeat: -1, delay: index * 0.8 })

          pulseTl.to(pulse, {
            opacity: 1,
            duration: 0.5,
            ease: 'power1.in'
          })

          pulseTl.to(pulse, {
            motionPath: {
              path: path as any,
              alignOrigin: [0.5, 0.5]
            },
            duration: 3,
            ease: 'none'
          }, 0)

          pulseTl.to(pulse, {
            opacity: 0,
            duration: 0.5,
            ease: 'power1.out'
          }, '-=0.5')
        }
      })
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.node, .flow-line', { opacity: 1, scale: 1, y: 0 })
      gsap.set('.pulse-circle', { opacity: 0 })
    })
  })
})
</script>

<template>
  <div ref="containerRef" class="code-preview-box bg-white/3 border border-white/10 rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm">
    <!-- Header -->
    <div class="flex items-center justify-between h-10 px-4 border-b border-white/10">
      <div class="flex gap-2 items-center">
        <div class="flex gap-1.5">
          <div class="size-2.5 rounded-full bg-white/10"></div>
          <div class="size-2.5 rounded-full bg-white/10"></div>
          <div class="size-2.5 rounded-full bg-white/10"></div>
        </div>
        <span class="ml-2 text-[10px] font-jetbrains-mono text-grey-100 uppercase tracking-widest">system_architecture.svg</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="size-1.5 rounded-full bg-accent animate-pulse"></span>
        <span class="text-[10px] font-jetbrains-mono text-accent">LIVE</span>
      </div>
    </div>

    <!-- SVG Content -->
    <div class="p-4 sm:p-8 flex items-center justify-center min-h-64 sm:h-80 overflow-hidden">
      <svg aria-hidden="true" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full max-w-lg lg:scale-110 transition-transform duration-500">
        <!-- Lines -->
        <path id="line1" class="flow-line" d="M120 120H160" stroke="var(--color-accent)" stroke-width="2" stroke-opacity="0.2" />
        <path id="line2" class="flow-line" d="M240 120C260 120 260 60 280 60" stroke="var(--color-accent)" stroke-width="2" stroke-opacity="0.1" />
        <path id="line3" class="flow-line" d="M240 120H280" stroke="var(--color-accent)" stroke-width="2" stroke-opacity="0.1" />
        <path id="line4" class="flow-line" d="M240 120C260 120 260 180 280 180" stroke="var(--color-accent)" stroke-width="2" stroke-opacity="0.1" />

        <!-- Pulses (circles following paths) -->
        <circle class="pulse-circle" cx="0" cy="0" r="2" fill="var(--color-accent)" data-line="line1" />
        <circle class="pulse-circle" cx="0" cy="0" r="2" fill="var(--color-accent)" data-line="line2" />
        <circle class="pulse-circle" cx="0" cy="0" r="2" fill="var(--color-accent)" data-line="line3" />
        <circle class="pulse-circle" cx="0" cy="0" r="2" fill="var(--color-accent)" data-line="line4" />

        <!-- Nodes -->
        <!-- Nuxt Node -->
        <g class="node">
          <rect x="40" y="90" width="80" height="60" rx="8" fill="white" fill-opacity="0.03" stroke="white" stroke-opacity="0.1" />
          <text x="80" y="120" text-anchor="middle" dominant-baseline="central" fill="white" font-family="JetBrains Mono" font-size="12" font-weight="bold">Nuxt</text>
          <text x="80" y="135" text-anchor="middle" dominant-baseline="central" fill="var(--color-accent)" font-family="JetBrains Mono" font-size="8" opacity="0.7">Client</text>
        </g>

        <!-- Directus Node -->
        <g class="node">
          <rect x="160" y="80" width="80" height="80" rx="8" fill="white" fill-opacity="0.05" stroke="var(--color-accent)" stroke-opacity="0.3" />
          <text x="200" y="115" text-anchor="middle" dominant-baseline="central" fill="white" font-family="JetBrains Mono" font-size="12" font-weight="bold">Directus</text>
          <text x="200" y="130" text-anchor="middle" dominant-baseline="central" fill="var(--color-accent)" font-family="JetBrains Mono" font-size="8" opacity="0.7">Core API</text>
        </g>

        <!-- Third Party Nodes -->
        <g class="node">
          <rect x="280" y="40" width="80" height="40" rx="6" fill="white" fill-opacity="0.02" stroke="white" stroke-opacity="0.1" />
          <text x="320" y="60" text-anchor="middle" dominant-baseline="central" fill="white" font-family="JetBrains Mono" font-size="10">Mux / Video</text>
        </g>

        <g class="node">
          <rect x="280" y="100" width="80" height="40" rx="6" fill="white" fill-opacity="0.02" stroke="white" stroke-opacity="0.1" />
          <text x="320" y="120" text-anchor="middle" dominant-baseline="central" fill="white" font-family="JetBrains Mono" font-size="10">External API</text>
        </g>

        <g class="node">
          <rect x="280" y="160" width="80" height="40" rx="6" fill="white" fill-opacity="0.02" stroke="white" stroke-opacity="0.1" />
          <text x="320" y="180" text-anchor="middle" dominant-baseline="central" fill="white" font-family="JetBrains Mono" font-size="10">AI / LLM</text>
        </g>
      </svg>
    </div>

    <!-- Footer Stats -->
    <div class="px-6 py-4 border-t border-white/5 bg-white/2 flex justify-between items-center font-jetbrains-mono text-[10px] text-grey-100/50 uppercase tracking-tighter">
      <div class="flex gap-4">
        <span>uptime: 99.9%</span>
        <span>latency: 24ms</span>
      </div>
      <div class="text-accent/60">status: operational</div>
    </div>
  </div>
</template>

<style scoped>
.code-preview-box {
  will-change: transform, opacity;
}

.flow-line {
  stroke-linecap: round;
}
</style>
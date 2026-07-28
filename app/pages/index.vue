<script setup lang="ts">
const { createCtx, typeText, gsap } = useGsap()

const keywords = ['erp', 'api-integration', 'ia', 'video', 'multi-site']
const commands = [
  "$ docker-compose up -d",
  "$ git commit -m \"feat: setup architecture\"",
  "$ npm info valentin-yerna"
]

const containerRef = ref<HTMLElement | null>(null)
const cursorRef = ref<HTMLElement | null>(null)

onMounted(() => {
  createCtx(containerRef, (self) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set('.animate-item', { opacity: 1, y: 0 })
      gsap.set('.split-word', { opacity: 1, y: 0 })
      const el = document.querySelector('.typing-text')
      if (el) el.textContent = commands[0]
      return
    }

    const contentTl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.3 })

    contentTl.to('.split-word', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.03,
    })

    contentTl.fromTo('.stagger-block',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        "-=0.3"
    )

    const terminalTl = gsap.timeline({ repeat: -1 })

    commands.forEach((cmd, index) => {
      typeText(terminalTl, '.typing-text', cmd, { delay: index === 0 ? 0 : 0.4 })
      terminalTl.to('.typing-text', { text: { value: "" }, duration: 0.1, delay: 0.8 })
    })

    // Curseur clignotant en continu
    if (cursorRef.value) {
      gsap.to(cursorRef.value, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })
    }
  })
})
</script>

<template>
  <section ref="containerRef" aria-labelledby="hero" class="responsive-padding-x responsive-padding-y min-h-screen flex flex-col justify-center">
    <div class="responsive-layout grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 md:gap-8">
      <div>
        <!-- Ligne prompt -->
        <p class="animate-item font-jetbrains-mono text-sm text-white-100 mb-1">
          <span class="typing-text mr-1"></span>
          <span ref="cursorRef" class="inline-block">▌</span>
        </p>

        <!-- Ligne package -->
        <p v-split-text class="animate-item font-jetbrains-mono text-grey-100 mb-6">
          valentin-y@2026.1&nbsp;&nbsp;MIT
        </p>

        <!-- Titre principal -->
        <h1 v-split-text class="animate-item font-space-grotesk font-semibold text-h1 text-white-100 mb-6">
          Développeur full-stack — Nuxt / Directus
        </h1>

        <!-- Description -->
        <p v-split-text class="animate-item text-lg text-grey-100 max-w-150 mb-10">
          Je conçois des applications web complètes, de l'architecture backend à l'interface finale. Nuxt et Directus sont mes outils de prédilection, mais je m'adapte facilement à d'autres stacks selon les besoins du projet.
        </p>

        <!-- Bloc keywords -->
        <div class="stagger-block mb-10">
          <span class="font-jetbrains-mono text-sm text-grey-100 block mb-3">keywords:</span>
          <div class="flex flex-wrap gap-2">
        <span
            v-for="kw in keywords"
            :key="kw"
            class="font-jetbrains-mono text-sm text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded transition-all duration-300 hover:scale-110 hover:bg-accent/20 cursor-default">
          {{ kw }}
        </span>
          </div>
        </div>

        <!-- CTA -->
        <div class="stagger-block flex flex-col sm:flex-row gap-4 mb-16">
          <AppButton icon="arrow-right">Voir mes projets</AppButton>
          <AppButton theme="ghost">Me contacter</AppButton>
        </div>
      </div>

      <!-- Colonne droite : Code Preview -->
      <div class="stagger-block w-full max-w-150">
        <CodePreview />
      </div>
   </div>
  </section>

  <section>
    <h2 v-for="i in 100">Hello</h2>
  </section>
</template>

<style scoped>

</style>
<script setup lang="ts">
const { createCtx, gsap } = useGsap()

const containerRef = ref<HTMLElement | null>(null)

const experiences = [
  {
    period: '2023 - Présent',
    role: 'Développeur Full-stack',
    company: 'Agence Web',
    description: 'Conception et développement d\'applications complexes sous Nuxt 3/4 et Directus. Lead technique sur plusieurs projets critiques.'
  },
  {
    period: '2022 - 2023',
    role: 'Développeur Frontend (Alternance)',
    company: 'Startup Tech',
    description: 'Optimisation de la performance frontend et intégration de designs haute fidélité.'
  }
]

onMounted(() => {
  createCtx(containerRef, () => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.page-header > *', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.08
      })

      tl.from('.reveal-item', {
        scrollTrigger: {
          trigger: '.reveal-item',
          start: 'top 90%'
        },
        opacity: 0,
        y: 32,
        duration: 0.8,
        stagger: 0.1
      })
    })
  })
})
</script>

<template>
  <main
      ref="containerRef"
      class="bg-black-100 text-grey-100 font-jetbrains-mono overflow-x-hidden relative"
  >
    <div class="responsive-padding-x responsive-padding-y relative z-10">
      <div class="responsive-layout">
        
        <!-- Header -->
        <header class="page-header mb-20 space-y-6">
          <nav aria-label="Fil d'Ariane">
            <ol class="flex items-center gap-2 text-sm text-grey-100">
              <li>
                <nuxt-link to="/" class="hover:text-accent transition-colors">~</nuxt-link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">a-propos</li>
              <li aria-hidden="true" class="text-accent animate-pulse">_</li>
            </ol>
          </nav>

          <h1 class="text-h1 text-white-100 font-semibold">
            Compiler le <span class="text-accent italic">profil</span>.
          </h1>

          <p class="text-grey-100 max-w-2xl font-inter text-lg">
            Passionné par l'architecture logicielle et l'expérience utilisateur, je transforme des idées complexes en produits web robustes.
          </p>
        </header>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          <!-- Bio -->
          <div class="lg:col-span-7 space-y-8 font-inter text-lg leading-relaxed text-grey-100">
            <p class="reveal-item">
              Mon parcours est guidé par une curiosité insatiable pour les technologies web modernes. En tant qu'Ingénieur Solutions, je ne me contente pas de "coder", je cherche à comprendre les enjeux métiers pour proposer l'architecture la plus adaptée.
            </p>
            <p class="reveal-item">
              Spécialisé dans l'écosystème <strong>Nuxt</strong> et <strong>Directus</strong>, j'apprécie particulièrement la flexibilité qu'offre le Headless CMS combinée à la puissance du SSR.
            </p>
            
            <div class="reveal-item pt-8">
              <h2 class="text-h3 text-white-100 font-space-grotesk mb-6">Mon approche</h2>
              <ul class="space-y-4 text-base">
                <li class="flex items-start gap-3">
                  <span class="text-accent mt-1">▹</span>
                  <span><strong>Performance :</strong> Core Web Vitals au vert, images optimisées et lazy-loading.</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-accent mt-1">▹</span>
                  <span><strong>Maintenabilité :</strong> Code typé (TypeScript), composants réutilisables et documentation claire.</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-accent mt-1">▹</span>
                  <span><strong>UX/UI :</strong> Intégration pixel-perfect et animations fluides avec GSAP.</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Experience / Sidebar -->
          <div class="lg:col-span-5 space-y-12">
            <div class="reveal-item p-8 rounded-xl border border-white/5 bg-white/2">
              <h2 class="text-xs uppercase tracking-widest text-white-100 font-jetbrains-mono mb-8">Expérience</h2>
              <div class="space-y-8">
                <div v-for="exp in experiences" :key="exp.company" class="relative pl-6 border-l border-white/10">
                  <div class="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-accent" />
                  <span class="block text-[10px] text-accent mb-1 uppercase tracking-wider font-jetbrains-mono">{{ exp.period }}</span>
                  <h3 class="text-white-100 font-medium mb-1">{{ exp.role }}</h3>
                  <p class="text-xs text-grey-300 mb-2">{{ exp.company }}</p>
                  <p class="text-sm text-grey-100 leading-relaxed font-inter">{{ exp.description }}</p>
                </div>
              </div>
            </div>

            <div class="reveal-item p-8 rounded-xl border border-accent/20 bg-accent/5">
              <h2 class="text-sm text-white-100 font-medium mb-4">Prêt pour le prochain défi ?</h2>
              <p class="text-sm text-grey-100 mb-6 font-inter">Je suis actuellement à la recherche de nouvelles opportunités en tant que développeur full-stack.</p>
              <AppButton to="/contact" size="small" class="w-full justify-center">Discuter ensemble</AppButton>
            </div>
          </div>

        </div>

      </div>
    </div>
  </main>
</template>

<style scoped>
.reveal-item {
  will-change: transform, opacity;
}
</style>

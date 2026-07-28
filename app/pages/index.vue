<script setup lang="ts">
const { createCtx, typeText, gsap } = useGsap()

const commands = [
  "$ docker-compose up -d",
  "$ git commit -m \"feat: setup architecture\"",
  "$ npm info valentin-yerna"
]

const techs = [
  { name: 'Nuxt', icon: 'nuxt' },
  { name: 'Vue', icon: 'vue' },
  { name: 'Directus', icon: 'directus' },
  { name: 'Gsap', icon: 'gsap' },
  { name: 'Docker', icon: 'docker' },
  { name: 'Git', icon: 'git' },
  { name: 'Mysql', icon: 'mysql' },
  { name: 'Figma', icon: 'figma' }
]

const transversalSkills = [
  {
    id: '01',
    title: 'Analyse et conception',
    description: 'Transformer un besoin métier en une solution technique robuste et évolutive.',
    keywords: ['besoin métier', 'solution technique']
  },
  {
    id: '02',
    title: 'Architecture backend',
    description: 'Modélisation de données complexe, gestion des relations et des permissions.',
    keywords: ['collections', 'relations', 'permissions']
  },
  {
    id: '03',
    title: 'Frontend sur mesure',
    description: 'Interfaces haute fidélité avec une gestion d’état performante.',
    keywords: ['intégration fidèle', 'gestion d\'état']
  },
  {
    id: '04',
    title: 'Intégration de services',
    description: 'Connexion fluide avec des outils tiers : ERP, flux vidéo, solutions IA.',
    keywords: ['ERP', 'vidéo', 'IA']
  },
  {
    id: '05',
    title: 'Fiabilité et maintenance',
    description: 'Suivi rigoureux des dépendances et montée en version maîtrisée.',
    keywords: ['dépendances', 'montée de version']
  }
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

    // Hero Animation
    const contentTl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.3 })

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

    if (cursorRef.value) {
      gsap.to(cursorRef.value, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })
    }

    // Scroll Animations
    const sections = gsap.utils.toArray<HTMLElement>('.reveal-section')
    sections.forEach((section) => {
      gsap.from(section.querySelectorAll('.reveal-item'), {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        scale: 0.98,
        duration: 1,
        stagger: {
          amount: 0.4,
          from: "start"
        },
        ease: 'expo.out'
      })
    })
  })
})

const technos = [
  {src: "/svg/technos/nuxt.svg", alt: "nuxt"},
  {src: "/svg/technos/directus.svg", alt: "directus"},
  {src: "/svg/technos/tailwind.svg", alt: "tailwind"},
  {src: "/svg/technos/gsap.svg", alt: "gsap"},
  {src: "/svg/technos/docker.svg", alt: "docker"},
  {src: "/svg/technos/github.svg", alt: "github"},
  {src: "/svg/technos/figma.svg", alt: "figma"},
]
</script>

<template>
  <div ref="containerRef">
    <!-- HERO SECTION -->
    <section aria-labelledby="hero" class="responsive-padding-x responsive-padding-t--large responsive-padding-b">
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

    <!-- TECH SECTION -->
    <LayoutTechnos class="reveal-section responsive-padding-y" :items="technos" />

    <!-- SKILLS SECTION (Transversales) -->
    <section class="reveal-section responsive-padding-x responsive-padding-y">
      <div class="responsive-layout">
        <h2 class="reveal-item text-h2 text-white-100 mb-16">Expertise transversale</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="skill in transversalSkills" :key="skill.id" class="reveal-item p-8 rounded-xl border border-white/5 bg-white/[0.02] hover:border-accent/30 transition-colors group">
            <span class="block font-jetbrains-mono text-accent text-sm mb-4">{{ skill.id }}</span>
            <h3 class="text-h3 text-white-100 mb-4 group-hover:text-accent transition-colors">{{ skill.title }}</h3>
            <p class="text-grey-100 mb-6 leading-relaxed">{{ skill.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="kw in skill.keywords" :key="kw" class="text-[10px] font-jetbrains-mono uppercase tracking-wider text-grey-300 px-2 py-1 border border-white/10 rounded">
                {{ kw }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PROJECTS PREVIEW -->
    <section class="reveal-section responsive-padding-x responsive-padding-y bg-white/[0.01]">
      <div class="responsive-layout">
        <div class="reveal-item flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <h2 class="text-h2 text-white-100 mb-4">Réalisations</h2>
            <p class="text-grey-100 max-w-120">Une sélection de projets mettant en œuvre des architectures complexes et des interfaces soignées.</p>
          </div>
          <AppButton theme="ghost" icon="arrow-right" size="small">Tous les projets</AppButton>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="i in 2" :key="i" class="reveal-item aspect-video rounded-xl border border-white/10 bg-black-100 overflow-hidden group relative">
            <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
            <div class="absolute bottom-0 left-0 p-8 w-full">
              <div class="flex gap-2 mb-3">
                <span class="text-[10px] font-jetbrains-mono bg-accent/20 text-accent px-2 py-0.5 rounded">Nuxt</span>
                <span class="text-[10px] font-jetbrains-mono bg-white/10 text-white-100 px-2 py-0.5 rounded">Directus</span>
              </div>
              <h3 class="text-h3 text-white-100 mb-2">Projet en cours #{{ i }}</h3>
              <p class="text-sm text-grey-100 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                Aperçu détaillé de l'architecture et des fonctionnalités clés.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="reveal-section responsive-padding-x responsive-padding-y--large">
      <div class="responsive-layout border border-accent/20 bg-accent/5 rounded-3xl p-12 md:p-24 text-center overflow-hidden relative">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-accent)_0%,transparent_70%)] opacity-5 pointer-events-none"></div>
        
        <h2 class="reveal-item big-title text-white-100 mb-8">On travaille ensemble ?</h2>
        <p class="reveal-item text-lg text-grey-100 max-w-160 mx-auto mb-12">
          Vous avez un projet complexe ou besoin d'une expertise technique pour passer de l'idée à la production ? Parlons-en.
        </p>
        <div class="reveal-item flex justify-center gap-4">
          <AppButton theme="glowing" size="small" icon="arrow-right">Démarrer une conversation</AppButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.reveal-item {
  will-change: transform, opacity;
}

.tech-marquee-container {
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}
</style>
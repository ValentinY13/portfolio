<script setup lang="ts">
const { createCtx, typeText, gsap } = useGsap()

const commands = [
  "$ docker-compose up -d",
  "$ git commit -m \"feat: setup architecture\"",
  "$ npm info valentin-yerna"
]

const technos = [
  {src: "/svg/technos/nuxt.svg", alt: "nuxt"},
  {src: "/svg/technos/directus.svg", alt: "directus"},
  {src: "/svg/technos/tailwind.svg", alt: "tailwind"},
  {src: "/svg/technos/gsap.svg", alt: "gsap"},
  {src: "/svg/technos/docker.svg", alt: "docker"},
  {src: "/svg/technos/github.svg", alt: "github"},
  {src: "/svg/technos/figma.svg", alt: "figma"},
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

const { data: featuredProjects } = await useAsyncData('projects-home', () =>
    queryCollection('projects')
        .where('slug', 'IN', ['maison-rorive', 'mux-extension'])
        .select('title', 'tldr', 'stack', 'slug', 'preview_image')
        .all()
)

const projects = computed(() => {
  return featuredProjects.value?.map((project, index) => ({
    id: String(index + 1).padStart(2, '0'),
    title: project.title,
    description: project.tldr,
    tags: project.stack.slice(0, 3),
    image: project.preview_image,
    to: { name: 'projets-slug', params: { slug: project.slug } }
  })) || []
})

const containerRef = ref<HTMLElement | null>(null)
const cursorRef = ref<HTMLElement | null>(null)

onMounted(() => {
  createCtx(containerRef, () => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
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
          '-=0.3'
      )

      // Terminal : boucle de frappe infinie
      const terminalTl = gsap.timeline({ repeat: -1 })

      commands.forEach((cmd, index) => {
        typeText(terminalTl, '.typing-text', cmd, { delay: index === 0 ? 0 : 0.4 })
        terminalTl.to('.typing-text', { text: { value: '' }, duration: 0.1, delay: 0.8 })
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
            from: 'start'
          },
          ease: 'expo.out'
        })
      })
    })

    // Reduced motion : tout visible immédiatement, terminal statique
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.split-word', { opacity: 1, y: 0 })
      gsap.set('.stagger-block', { opacity: 1, y: 0 })
      const el = document.querySelector('.typing-text')
      if (el) el.textContent = commands[0]
    })
  })
})
</script>

<template>
  <main ref="containerRef" class="relative z-10">
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
          <h1 v-split-text id="hero" class="animate-item font-space-grotesk font-semibold text-h1 text-white-100 mb-6">
            Développeur full-stack — Nuxt / Directus
          </h1>

          <!-- Description -->
          <p v-split-text class="animate-item text-lg text-grey-100 max-w-150 mb-10">
            Je conçois des applications web complètes, de l'architecture backend à l'interface finale. Nuxt et Directus sont mes outils de prédilection, mais je m'adapte facilement à d'autres stacks selon les besoins du projet.
          </p>

          <!-- CTA -->
          <div class="stagger-block flex flex-col sm:flex-row gap-4 mb-16">
            <AppButton to="/projets" icon="arrow-right">Voir mes projets</AppButton>
            <AppButton to="/contact" theme="ghost">Me contacter</AppButton>
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

    <!-- SKILLS SECTION -->
    <section aria-labelledby="transversal-skills" class="reveal-section responsive-padding-x responsive-padding-y">
      <div class="responsive-layout">
        <h2 id="transversal-skills" class="reveal-item text-h2 text-white-100 mb-16">Compétences transversales</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="item in transversalSkills" :key="item.id" class="reveal-item p-8 rounded-xl border border-white/5 bg-white/2 hover:border-accent/30 transition-colors group">

            <span class="block font-jetbrains-mono text-accent text-sm mb-4">{{ item.id }}</span>
            <h3 class="text-h3 text-white-100 mb-4 group-hover:text-accent transition-colors">{{ item.title }}</h3>
            <p class="text-grey-100 mb-6 leading-relaxed">{{ item.description }}</p>
            <div class="flex flex-wrap gap-2">
              <Chip
                  v-for="kw in item.keywords"
                  :key="kw"
                  class="tracking-wider"
                  uppercase
                  hoverable
                  with-border>
                {{kw}}
              </Chip>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PROJECTS PREVIEW -->
    <section aria-labelledby="projects-preview" class="reveal-section responsive-padding-x responsive-padding-y bg-white/1">
      <div class="responsive-layout">
        <div class="reveal-item flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <h2 id="projects-preview" class="text-h2 text-white-100 mb-4">Réalisations</h2>
            <p class="text-grey-100 max-w-120">Une sélection de projets mettant en œuvre des architectures complexes et des interfaces soignées.</p>
          </div>
          <AppButton to="/projets" title="Tous les projets" theme="ghost" icon="arrow-right" size="small">Tous les projets</AppButton>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <article
              v-for="project in projects"
              :key="project.id"
              class="reveal-item aspect-video rounded-xl border border-white/10 bg-black-100 overflow-hidden group relative hover:border-accent/30 transition-colors duration-300"
          >
            <nuxt-picture
                :src="project.image"
                :alt="project.title"
                :img-attrs="{ class: 'size-full object-cover aspect-video group-hover:scale-105 transition-transform duration-700' }"
            />

            <div class="absolute inset-0 z-10 bg-linear-to-t from-black via-black/60 to-transparent opacity-100 group-hover:opacity-80 transition-opacity duration-300" aria-hidden="true" />

            <!-- Index -->
            <span class="absolute top-6 left-8 z-20 font-jetbrains-mono text-sm text-grey-300 group-hover:text-accent transition-colors duration-300 tabular-nums" aria-hidden="true">
              {{ project.id }}
            </span>

            <div class="absolute bottom-0 left-0 p-8 w-full z-20">
              <div class="flex flex-wrap gap-2 mb-3">
                <Chip
                    v-for="tag in project.tags"
                    :key="tag.name"
                    :theme="tag.theme"
                    variant="tonal"
                    with-border
                >
                  {{ tag.name }}
                </Chip>
              </div>
              <h3 class="text-h3 text-white-100 mb-2 group-hover:text-accent transition-colors duration-300">
                {{ project.title }}
              </h3>
              <p class="text-sm text-grey-100 transition-all duration-500 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
                {{ project.description }}
              </p>
            </div>

            <nuxt-link :to="project.to" class="absolute inset-0 z-30" :aria-label="`Voir le projet ${project.title}`" />
          </article>
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="reveal-section responsive-padding-x responsive-padding-y--large">
      <div class="responsive-layout border border-accent/20 bg-accent/5 rounded-3xl p-12 md:p-24 text-center overflow-hidden relative">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-accent)_0%,transparent_70%)] opacity-5 pointer-events-none"></div>

        <h2 class="reveal-item big-title text-white-100 mb-8">On travaille ensemble ?</h2>
        <p class="reveal-item text-lg text-grey-100 max-w-160 mx-auto mb-12">
          Je recherche un poste de développeur full-stack, en équipe, sur des
          projets ambitieux.
        </p>
        <div class="reveal-item text-center">
          <AppButton to="/contact" theme="glowing" size="small" icon="arrow-right">Me contacter</AppButton>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.reveal-item {
  will-change: transform, opacity;
}
</style>
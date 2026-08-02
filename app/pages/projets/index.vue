<script setup lang="ts">
const { createCtx, gsap } = useGsap()

interface Project {
  slug: string
  name: string
  type: string
  description: string
  stack: string[]
  status: 'Production' | 'Internal' | 'In Progress' | 'MVP'
  date: string
  preview?: string // chemin vers un visuel : /images/projects/xxx.png
}

const projects: Project[] = [
  {
    slug: 'maison-rorive',
    name: 'Maison Rorive',
    type: 'E-commerce B2B',
    description: 'Une plateforme e-commerce robuste connectée à un ERP complexe pour la gestion de commandes en gros.',
    stack: ['Nuxt', 'Directus', 'Mercator'],
    status: 'Production',
    date: '2024',
    preview: '/images/projects/maison-rorive.png'
  },
  {
    slug: 'mux-directus',
    name: 'Extension Mux Directus',
    type: 'Backend Extension',
    description: 'Intégration native de la gestion vidéo Mux au sein du CMS Directus, simplifiant le workflow de streaming.',
    stack: ['Directus', 'Mux API', 'Node.js'],
    status: 'Internal',
    date: '2024',
    preview: '/images/projects/mux-directus.png'
  },
  {
    slug: 'gintlemen',
    name: 'Gintlemen Site',
    type: 'Corporate / Showcase',
    description: 'Site vitrine haut de gamme avec des animations fluides et une expérience utilisateur immersive.',
    stack: ['Nuxt', 'Directus', 'GSAP'],
    status: 'Production',
    date: '2023',
    preview: '/images/projects/gintlemen.png'
  },
  {
    slug: 'custom-crm',
    name: 'Custom CRM Solution',
    type: 'Internal Tool',
    description: 'Outil de gestion de relation client sur mesure, optimisé pour les processus spécifiques de l\'entreprise.',
    stack: ['Vue 3', 'FastAPI', 'PostgreSQL'],
    status: 'In Progress',
    date: '2025',
    preview: '/images/projects/custom-crm.png'
  },
  {
    slug: 'iot-dashboard',
    name: 'IoT Monitoring',
    type: 'Dashboard',
    description: 'Visualisation en temps réel de données issues de capteurs industriels via le protocole MQTT.',
    stack: ['Nuxt', 'MQTT', 'InfluxDB'],
    status: 'MVP',
    date: '2024',
    preview: '/images/projects/iot-dashboard.png'
  }
]

const containerRef = ref<HTMLElement | null>(null)
const previewRef = ref<HTMLElement | null>(null)
const previewImgRef = ref<HTMLImageElement | null>(null)
const listRef = ref<HTMLElement | null>(null)

const activeProject = ref<Project | null>(null)
const previewVisible = ref(false)

// quickTo pour un suivi de curseur performant (créé une seule fois)
let xTo: ReturnType<typeof gsap.quickTo> | null = null
let yTo: ReturnType<typeof gsap.quickTo> | null = null

onMounted(() => {
  createCtx(containerRef, () => {
    const mm = gsap.matchMedia()

    // Animations complètes uniquement si l'utilisateur n'a pas
    // demandé la réduction des animations
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.page-header > *', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.08
      })

      tl.from('.project-row', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.08
      }, '-=0.3')

      // Suivi de curseur fluide (lerp) pour la preview flottante
      if (previewRef.value) {
        gsap.set(previewRef.value, { xPercent: -50, yPercent: -110, scale: 0.95 })
        xTo = gsap.quickTo(previewRef.value, 'x', { duration: 0.45, ease: 'power3.out' })
        yTo = gsap.quickTo(previewRef.value, 'y', { duration: 0.45, ease: 'power3.out' })
      }
    })
  })
})

const onRowEnter = (project: Project) => {
  activeProject.value = project
  previewVisible.value = true

  if (previewRef.value) {
    gsap.to(previewRef.value, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.35,
      ease: 'power3.out'
    })
  }
}

const onRowLeave = () => {
  previewVisible.value = false

  if (previewRef.value) {
    gsap.to(previewRef.value, {
      autoAlpha: 0,
      scale: 0.95,
      duration: 0.25,
      ease: 'power2.in'
    })
  }
}

const onListMouseMove = (e: MouseEvent) => {
  if (!xTo || !yTo) return
  xTo(e.clientX)
  yTo(e.clientY)
}
</script>

<template>
  <main
      ref="containerRef"
      class="bg-black-100 min-h-screen text-grey-100 font-jetbrains-mono selection:bg-accent selection:text-black overflow-x-hidden"
  >
    <div class="responsive-layout responsive-padding-x pt-32 pb-24">

      <!-- Header style doc : breadcrumb + titre -->
      <header class="page-header mb-16 space-y-6">
        <nav class="flex items-center gap-2 text-sm text-grey-500" aria-label="Breadcrumb">
          <NuxtLink to="/" class="hover:text-accent transition-colors">~</NuxtLink>
          <span aria-hidden="true">/</span>
          <span class="text-grey-300">projets</span>
          <span class="text-accent animate-pulse" aria-hidden="true">_</span>
        </nav>

        <h1 class="text-h1 text-white-100 font-space-grotesk font-bold leading-tight">
          Explorer mes <span class="text-accent italic">solutions</span>.
        </h1>

        <p class="text-grey-300 max-w-2xl font-inter text-lg leading-relaxed">
          Une sélection de projets où l'architecture logicielle rencontre l'excellence visuelle.
          Chaque ligne est un défi technique relevé.
        </p>
      </header>

      <!-- Liste type table des matières enrichie -->
      <div
          ref="listRef"
          class="border-t border-white/10"
          @mousemove="onListMouseMove"
      >
        <NuxtLink
            v-for="(project, index) in projects"
            :key="project.slug"
            :to="`/projets/${project.slug}`"
            class="project-row group relative grid grid-cols-[auto_1fr_auto] md:grid-cols-[3rem_1fr_auto_6rem] items-center gap-x-6 gap-y-3 py-8 px-4 -mx-4 border-b border-white/10 transition-colors duration-300 hover:bg-white/[0.03]"
            @mouseenter="onRowEnter(project)"
            @mouseleave="onRowLeave"
        >
          <!-- Index -->
          <span class="text-sm text-grey-500 font-medium tabular-nums transition-colors duration-300 group-hover:text-accent">
            {{ String(index + 1).padStart(2, '0') }}
          </span>

          <!-- Contenu principal -->
          <div class="min-w-0">
            <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
              <h2 class="text-xl md:text-2xl font-space-grotesk font-bold text-white-100 transition-colors duration-300 group-hover:text-accent">
                {{ project.name }}
              </h2>
              <span class="text-xs text-grey-500 italic font-inter">
                {{ project.type }}
              </span>
            </div>

            <p class="text-grey-300 text-sm leading-relaxed font-inter line-clamp-1 mb-3 max-w-2xl">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-2">
              <Chip
                  v-for="tech in project.stack"
                  :key="tech"
                  variant="tonal"
                  size="small"
                  class="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              >
                {{ tech }}
              </Chip>
            </div>
          </div>

          <!-- Flèche (desktop) -->
          <div class="hidden md:flex items-center justify-end">
            <i class="icon icon-arrow-right w-5 h-5 text-accent opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" aria-hidden="true" />
          </div>

          <!-- Date -->
          <span class="hidden md:block text-xs uppercase tracking-widest text-grey-500 text-right tabular-nums">
            {{ project.date }}
          </span>
        </NuxtLink>
      </div>

      <!-- Preview flottante (suit le curseur) -->
      <div
          ref="previewRef"
          class="pointer-events-none fixed top-0 left-0 z-50 w-72 md:w-80 aspect-[16/10] rounded-lg overflow-hidden border border-white/10 bg-black-100 shadow-2xl shadow-black/50 opacity-0 invisible"
          aria-hidden="true"
      >
        <Transition name="preview-fade" mode="out-in">
          <img
              v-if="activeProject?.preview"
              ref="previewImgRef"
              :key="activeProject.slug"
              :src="activeProject.preview"
              :alt="`Aperçu du projet ${activeProject.name}`"
              class="w-full h-full object-cover"
          >
        </Transition>
      </div>

      <!-- Footer -->
      <footer class="mt-16 pt-8 flex justify-between items-center text-[10px] text-grey-500 uppercase tracking-widest">
        <div>{{ projects.length }} projets sélectionnés</div>
        <div>valentin-yerna-os v4.0.0</div>
      </footer>

    </div>
  </main>
</template>

<style scoped>
/* Transition d'apparition de la preview entre deux projets */
.preview-fade-enter-active,
.preview-fade-leave-active {
  transition: opacity 0.25s ease;
}

.preview-fade-enter-from,
.preview-fade-leave-to {
  opacity: 0;
}

/* Respect de prefers-reduced-motion : on neutralise les transitions CSS aussi */
@media (prefers-reduced-motion: reduce) {
  .project-row,
  .project-row * {
    transition: none !important;
  }

  .preview-fade-enter-active,
  .preview-fade-leave-active {
    transition: none;
  }
}
</style>
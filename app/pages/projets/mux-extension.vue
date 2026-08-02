<script setup lang="ts">
const { createCtx, gsap } = useGsap()
const route = useRoute()

// ─────────────────────────────────────────────
// Données de l'étude de cas
// ─────────────────────────────────────────────
interface ProjectSection {
  title: string
  items: string[]
}

interface ProjectImage {
  src: string
  alt: string
  caption: string
}

interface CaseStudy {
  slug: string
  title: string
  tldr: string
  type: string
  stack: { name: string; theme: string }[]
  context: string
  mission: string
  sections: ProjectSection[]
  results: { challenge: string; outcome: string }
  images: ProjectImage[]
}

const project: CaseStudy = {
  slug: 'mux-directus',
  title: "Intégration de Mux dans Directus",
  tldr: "Une extension custom qui apporte le streaming vidéo optimisé dans Directus, sans une ligne de stockage serveur.",
  type: "Extension backend custom",
  stack: [
    { name: "Directus", theme: "accent" } as const,
    { name: "Mux", theme: "accent" } as const,
    { name: "Node.js", theme: "white" } as const,
    { name: "Vue.js", theme: "white" } as const,
  ],
  context: "Directus ne proposait aucune solution native pour intégrer des vidéos sans les stocker directement sur le serveur, ce qui limitait notre capacité à proposer cette fonctionnalité aux clients. L'objectif était de permettre l'intégration de vidéos optimisées sur un site, sans surcharger l'infrastructure serveur.",
  mission: "J'ai géré la totalité du projet en autonomie complète, sans supervision. Je me suis formé sur la documentation Mux, rédigé un cahier des charges définissant un MVP, puis fait évoluer l'extension par itérations successives.",
  sections: [
    {
      title: "Frontend",
      items: [
        "Module custom ajouté au menu Directus, avec deux vues type dashboard : formulaire d'upload (drag & drop) et bibliothèque vidéo.",
        "Recherche par nom, prévisualisation en lecture directe, et gestion intelligente de la suppression (bloquée si liée à un bloc actif).",
        "Interface de lecture vidéo custom basée sur les métadonnées Mux (asset ID, playback ID).",
        "Paramétrage contextuel par vidéo : couleurs, loop, autoplay, résolution."
      ]
    },
    {
      title: "Backend / Directus",
      items: [
        "Endpoint d'upload : transmission à l'API Mux et réception des métadonnées via webhooks custom.",
        "Endpoint de suppression : synchronisation entre Directus et Mux avec vérification d'intégrité.",
        "Défi : Conception de l'intégration sans documentation existante, gestion de l'asynchronisme et structuration de la logique métier."
      ]
    }
  ],
  results: {
    challenge: "Concevoir l'intégration Mux dans Directus sans documentation ni exemple existant, en structurant seul les données et la logique métier, tout en gérant l'asynchronisme.",
    outcome: "N'importe qui dans l'équipe peut désormais uploader et paramétrer une vidéo sans intervention technique. Zéro stockage sur serveur, zéro surcharge d'infrastructure."
  },
  images: [
    { src: "/img/projects/mux/ux-extension.jpg", alt: "Formulaire d'upload drag & drop", caption: "Point d'entrée UX, facile à comprendre visuellement" },
    { src: "/img/projects/mux/library.jpg", alt: "Bibliothèque vidéo Directus", caption: "Cohérence parfaite avec l'interface native de Directus" },
    { src: "/img/projects/mux/settings.jpg", alt: "Paramétrage vidéo", caption: "Personnalisation contextuelle (loop, autoplay, résolution)" },
    { src: "/img/projects/mux/result.jpg", alt: "Rendu final sur le site Gintlemen", caption: "Résultat final intégré via le système de blocs" }
  ]
}

// ─────────────────────────────────────────────
// Navigation "projet suivant" (circulaire)
// ─────────────────────────────────────────────
const projectIndex = [
  { slug: 'maison-rorive', name: 'Maison Rorive', type: 'E-commerce B2B & ERP' },
  { slug: 'mux-directus', name: 'Extension Mux Directus', type: 'Backend Extension' },
  { slug: 'gintlemen', name: 'Gintlemen Site', type: 'Corporate / Showcase' },
  { slug: 'custom-crm', name: 'Custom CRM Solution', type: 'Internal Tool' },
  { slug: 'iot-dashboard', name: 'IoT Monitoring', type: 'Dashboard' }
]

const nextProject = computed(() => {
  const currentSlug = (route.params.slug as string) || project.slug
  const currentIdx = projectIndex.findIndex(p => p.slug === currentSlug)
  return projectIndex[(currentIdx + 1) % projectIndex.length]
})

// ─────────────────────────────────────────────
// Animations
// ─────────────────────────────────────────────
const container = ref<HTMLElement | null>(null)

onMounted(() => {
  createCtx(container, () => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Entrée du header
      gsap.from('.project-header > *', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out'
      })

      // Sections au scroll (une seule fois, pas de replay au scroll retour)
      gsap.utils.toArray<HTMLElement>('.reveal-on-scroll').forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 32,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        })
      })

      // Items de liste : stagger interne à chaque section
      gsap.utils.toArray<HTMLElement>('.feature-list').forEach((list) => {
        gsap.from(list.children, {
          scrollTrigger: {
            trigger: list,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 16,
          opacity: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out'
        })
      })

      // Images de la galerie
      gsap.utils.toArray<HTMLElement>('.project-image').forEach((img) => {
        gsap.from(img, {
          scrollTrigger: {
            trigger: img,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          scale: 0.97,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.out'
        })
      })
    })
  })
})
</script>

<template>
  <main ref="container">
    <!-- Header Documentation Style -->
    <header class="responsive-padding-x responsive-padding-t--large responsive-padding-b border-b border-white/5">
      <div class="project-header responsive-layout">
        <nav class="flex items-center gap-2 text-sm font-jetbrains-mono text-grey-100 mb-6" aria-label="Breadcrumb">
          <nuxt-link to="/" class="hover:text-accent transition-colors">~</nuxt-link>
          <span aria-hidden="true">/</span>
          <nuxt-link to="/projets" class="hover:text-accent transition-colors">projets</nuxt-link>
          <span aria-hidden="true">/</span>
          <span class="text-accent truncate max-w-[16rem] md:max-w-none">{{ project.slug }}</span>
        </nav>

        <h1 class="text-h1 font-semibold mb-4 text-white-100">
          {{ project.title }}
        </h1>

        <p class="text-grey-100 font-inter text-lg leading-relaxed max-w-2xl mb-10">
          {{ project.tldr }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 class="text-xs uppercase tracking-widest text-white-100 mb-2">Type</h2>
            <p class="text-white-100 font-inter">{{ project.type }}</p>
          </div>
          <div class="md:col-span-2">
            <h2 class="text-xs uppercase tracking-widest text-white-100 mb-2">Stack Technique</h2>
            <div class="flex flex-wrap gap-2">
              <Chip
                  v-for="item in project.stack"
                  :key="item.name"
                  variant="tonal"
                  :theme="item.theme"
                  with-border>
                {{ item.name }}
              </Chip>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Content Sections -->
    <div class="responsive-padding-x responsive-padding-y">
      <div class="responsive-layout grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16 md:gap-24">

        <!-- Main Column -->
        <article class="space-y-20">
          <!-- Contexte & Mission -->
          <section class="reveal-on-scroll">
            <h2 class="text-h2 mb-6 text-white-100">Contexte & Enjeux</h2>
            <div class="text-grey-100 space-y-6 text-lg">
              <p>{{ project.context }}</p>
              <p>{{ project.mission }}</p>
            </div>
          </section>

          <!-- Core Features Sections -->
          <section v-for="section in project.sections" :key="section.title" class="reveal-on-scroll">
            <h2 class="text-h3 mb-6 text-accent flex items-center gap-3">
              <span class="w-8 h-px bg-accent/30" aria-hidden="true" />
              {{ section.title }}
            </h2>
            <ul class="feature-list space-y-6">
              <li v-for="(item, idx) in section.items" :key="idx" class="flex gap-4 group">
                <span class="text-accent font-jetbrains-mono text-sm mt-1 opacity-50 group-hover:opacity-100 transition-opacity tabular-nums">
                  {{ String(idx + 1).padStart(2, '0') }}.
                </span>
                <p class="text-grey-100 leading-relaxed font-inter">{{ item }}</p>
              </li>
            </ul>
          </section>

          <!-- Gallery -->
          <section class="reveal-on-scroll">
            <h2 class="text-h2 text-white-100 mb-8">Captures du projet</h2>
            <div class="grid grid-cols-1 gap-12">
              <BlockExpendableImage v-for="(img, idx) in project.images" :key="idx" class="w-full">
                <template #default>
                  <figure class="project-image group">
                    <div class="mb-4">
                      <nuxt-picture
                          :src="img.src"
                          :alt="img.alt"
                          class="block rounded-xl overflow-hidden border border-white/10 bg-white/5"
                          :img-attrs="{ class: 'size-full object-cover group-hover:scale-105 transition-transform duration-700' }" />
                    </div>
                    <figcaption class="flex items-center gap-3 px-2">
                      <span class="text-accent font-jetbrains-mono text-sm tabular-nums">fig.{{ String(idx + 1).padStart(2, '0') }}</span>
                      <p class="text-sm text-grey-100 italic font-inter">{{ img.caption }}</p>
                    </figcaption>
                  </figure>
                </template>
                <template #expanded>
                  <nuxt-picture
                      :src="img.src"
                      :alt="img.alt"
                      loading="lazy"
                      class="w-full"
                      :img-attrs="{ class: 'aspect-(--ratio) object-cover size-full' }" />
                </template>
              </BlockExpendableImage>
            </div>
          </section>

          <!-- Challenge & Outcome -->
          <section class="reveal-on-scroll p-8 md:p-12 rounded-2xl bg-white/3 border border-white/5 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-3xl -mr-32 -mt-32 rounded-full pointer-events-none" aria-hidden="true" />
            <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 class="text-h3 mb-4 text-white-100">Le défi</h2>
                <p class="text-grey-100 leading-relaxed font-inter">{{ project.results.challenge }}</p>
              </div>
              <div>
                <h2 class="text-h3 mb-4 text-white-100">Résultat</h2>
                <p class="text-accent leading-relaxed font-inter">{{ project.results.outcome }}</p>
              </div>
            </div>
          </section>
        </article>

        <!-- Sidebar / Meta -->
        <aside class="space-y-12 h-fit lg:sticky lg:top-32">
          <div class="p-8 rounded-xl border border-white/5 bg-white/2 space-y-8">
            <div>
              <h2 class="text-xs uppercase tracking-widest text-white-100 mb-4">Architecture</h2>
              <p class="text-sm text-grey-100 leading-relaxed font-inter">Intégration API Mux via Webhooks Directus. Synchronisation d'état temps réel.</p>
            </div>

            <div class="pt-8 border-t border-white/5">
              <AppButton theme="glowing" class="w-full" icon="arrow-right">Discuter du projet</AppButton>
            </div>
          </div>

          <div class="px-8 space-y-4">
            <h2 class="text-xs uppercase tracking-widest text-grey-100">Projet suivant</h2>
            <nuxt-link :to="`/projets/${nextProject.slug}`" class="group block">
              <p class="text-white-100 group-hover:text-accent transition-colors font-space-grotesk text-lg">
                {{ nextProject.name }}
              </p>
              <p class="text-sm text-grey-300">{{ nextProject.type }}</p>
            </nuxt-link>
          </div>
        </aside>

      </div>
    </div>
  </main>
</template>

<style scoped>
.project-image {
  will-change: transform, opacity;
}

@media (prefers-reduced-motion: reduce) {
  .project-image,
  .project-image * {
    transition: none !important;
  }
}
</style>
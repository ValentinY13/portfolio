<script setup lang="ts">
import type { ProjectsCollectionItem } from '@nuxt/content'

const { createCtx, gsap } = useGsap()

const { data: allProjects } = await useAsyncData('all-projects', () =>
    queryCollection('projects')
        .select('title', 'type', 'slug', 'tldr', 'preview_image')
        .all()
)

const projects = computed(() => {
  return allProjects.value?.map((project, index) => ({
    ...project,
    id: String(index + 1).padStart(2, '0'),
    description: project.tldr,
    to: { name: 'projets-slug', params: { slug: project.slug } }
  })) || []
})

const containerRef = ref<HTMLElement | null>(null)
const previewRef = ref<HTMLElement | null>(null)
const previewImgRef = ref<HTMLImageElement | null>(null)
const listRef = ref<HTMLElement | null>(null)

const activeProject = ref<ProjectsCollectionItem | null>(null)
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

const onRowEnter = (project: ProjectsCollectionItem) => {
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

// ─────────────────────────────────────────────
// SEO
// ─────────────────────────────────────────────
useSeoMeta({
  title: 'Projets web Nuxt & Directus — Valentin Yerna',
  description: "5 projets web livrés en un an d'agence : backoffice Directus, frontend Nuxt, intégrations ERP et vidéo. Pour chacun : problème client, stack choisie, solution livrée.",
})
</script>

<template>
  <main
      ref="containerRef"
      class="text-grey-100 font-jetbrains-mono overflow-x-hidden"
  >
    <div class="responsive-padding-x responsive-padding-y">

      <div class="responsive-layout">
        <!-- Header breadcrumb + titre -->
        <header class="page-header mb-16 space-y-6">
          <Breadcrumb :items="[{ label: 'projets' }]" />

          <h1 class="text-h1 text-white-100 font-space-grotesk font-bold leading-tight">
            Explorer mes <span class="text-accent italic">solutions</span>.
          </h1>

          <p class="text-grey-100 max-w-2xl font-inter text-lg leading-relaxed">
            Cinq projets réels, livrés en un an d'agence. Pour chacun : le problème
            client, la stack choisie, et ce que j'ai construit. Du backoffice
            Directus au frontend Nuxt.
          </p>
        </header>

        <!-- Liste -->
        <ul
            ref="listRef"
            class="border-t border-white/10 -mx-4"
            @mousemove="onListMouseMove"
        >
          <li v-for="(project, index) in projects"
              :key="project.slug">
            <nuxt-link
                :to="project.to"
                class="project-row group relative grid grid-cols-[auto_1fr_auto] md:grid-cols-[3rem_1fr_auto_6rem] items-center gap-x-6 gap-y-3 py-8 px-4 border-b border-white/10 transition-colors duration-300 hover:bg-white/3"
                @mouseenter="onRowEnter(project)"
                @mouseleave="onRowLeave"
                @focus="onRowEnter(project)"
                @blur="onRowLeave"
            >
              <!-- Index -->
              <span class="text-sm text-accent opacity-50 font-medium tabular-nums transition-opacity duration-300 group-hover:opacity-100">
            {{ project.id }}
          </span>

              <!-- Contenu principal -->
              <div>
                <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                  <h2 class="text-h3 font-semibold text-white-100 transition-colors duration-300 group-hover:text-accent">
                    {{ project.title }}
                  </h2>
                  <span class="text-xs text-grey-100/50 italic font-inter">
                {{ project.type }}
              </span>
                </div>

                <p class="text-grey-100 text-sm leading-relaxed font-inter line-clamp-1 mb-3 max-w-2xl">
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
                <i class="icon icon-arrow-right text-xl text-accent opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" aria-hidden="true" />
              </div>
            </nuxt-link>
          </li>
        </ul>

        <!-- Preview flottante -->
        <div
            ref="previewRef"
            class="pointer-events-none fixed top-0 left-0 z-50 w-72 aspect-video md:w-80 rounded-lg overflow-hidden border border-white/10 shadow-2xl shadow-black/50 opacity-0 invisible"
            aria-hidden="true"
        >
          <Transition name="preview-fade" mode="out-in">
            <nuxt-picture
                v-if="activeProject?.preview_image"
                ref="previewImgRef"
                :key="activeProject.slug"
                :src="activeProject.preview_image"
                :alt="`Aperçu du projet ${activeProject.title}`"
                :img-attrs="{ class: 'size-full aspect-video object-cover' }"
            />
          </Transition>
        </div>

        <!-- Footer -->
        <footer class="mt-16 pt-8 flex justify-between items-center text-[10px] text-grey-300 uppercase tracking-widest">
          <div>{{ projects.length }} projets sélectionnés</div>
          <div>valentin-yerna-os v4.0.0</div>
        </footer>
      </div>

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
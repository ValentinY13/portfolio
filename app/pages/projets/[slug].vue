<script setup lang="ts">
const { createCtx, gsap } = useGsap()
const route = useRoute()

const { data: project } = await useAsyncData(`project-${route.params.slug}`, () =>
    queryCollection('projects')
        .path(`/projects/${route.params.slug}`)
        .first()
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Projet introuvable', fatal: true })
}

useSeoMeta({
  title: `${project.value.title} — Valentin Yerna`,
  description: project.value.tldr
})

// ─────────────────────────────────────────────
// Navigation "projet suivant"
// ─────────────────────────────────────────────
const { data: nextProjectData } = await useAsyncData(`next-project-${route.params.slug}`, async () => {
  if (!project.value?.next_project) return null

  return await queryCollection('projects')
      .where('slug', '=', project.value.next_project)
      .select('title', 'type', 'slug')
      .first()
})

const nextProject = computed(() => {
  if (!nextProjectData.value) return null

  return {
    slug: nextProjectData.value.slug,
    name: nextProjectData.value.title,
    type: nextProjectData.value.type
  }
})

// ─────────────────────────────────────────────
// Animations
// ─────────────────────────────────────────────
const container = ref<HTMLElement | null>(null)

onMounted(() => {
  createCtx(container, () => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.project-header > *', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out'
      })

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
  <main v-if="project" ref="container" class="relative z-10">
    <!-- Header Documentation Style -->
    <header class="responsive-padding-x responsive-padding-t--large responsive-padding-b border-b border-white/5">
      <div class="project-header responsive-layout">
        <Breadcrumb
            :items="[
              { label: 'projets', to: '/projets' },
              { label: route.params.slug as string }
            ]"
        />

        <h1 class="text-h1 font-semibold mb-4 text-white-100">
          {{ project.title }}
        </h1>

        <p class="text-grey-100 font-inter text-lg leading-relaxed max-w-2xl mb-10">
          {{ project.tldr }}
        </p>

        <dl class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <dt class="text-xs uppercase tracking-widest text-white-100 mb-2">Type</dt>
            <dd class="text-white-100 font-inter">{{ project.type }}</dd>
          </div>
          <div class="md:col-span-2">
            <dt class="text-xs uppercase tracking-widest text-white-100 mb-2">Stack Technique</dt>
            <dd class="flex flex-wrap gap-2">
              <Chip
                  v-for="item in project.stack"
                  :key="item.name"
                  variant="tonal"
                  :theme="item.theme"
                  with-border>
                {{ item.name }}
              </Chip>
            </dd>
          </div>
        </dl>
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
            <ol class="feature-list space-y-6">
              <li v-for="(item, idx) in section.items" :key="idx" class="flex gap-4 group">
                <span class="text-accent font-jetbrains-mono text-sm mt-1 opacity-50 group-hover:opacity-100 transition-opacity tabular-nums">
                  {{ String(idx + 1).padStart(2, '0') }}.
                </span>
                <p class="text-grey-100 leading-relaxed font-inter">{{ item }}</p>
              </li>
            </ol>
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
                          loading="lazy"
                          class="block rounded-xl overflow-hidden border border-white/10"
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
            <dl class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <dt class="text-h3 mb-4 text-white-100">Le défi</dt>
                <dd class="text-grey-100 leading-relaxed font-inter">{{ project.results.challenge }}</dd>
              </div>
              <div>
                <dt class="text-h3 mb-4 text-white-100">Résultat</dt>
                <dd class="text-accent leading-relaxed font-inter">{{ project.results.outcome }}</dd>
              </div>
            </dl>
          </section>
        </article>

        <!-- Sidebar / Meta -->
        <aside class="space-y-12 h-fit lg:sticky lg:top-32">
          <div class="p-8 rounded-xl border border-white/5 bg-white/2 space-y-8">
            <div>
              <h2 class="text-xs uppercase tracking-widest text-white-100 mb-4">Architecture</h2>
              <p class="text-sm text-grey-100 leading-relaxed font-inter">{{ project.architecture }}</p>
            </div>

            <div class="pt-8 border-t border-white/5 space-y-4">
              <AppButton
                  v-if="project.url"
                  :to="project.url"
                  target="_blank"
                  external
                  theme="glowing"
                  class="w-full"
                  icon="external-link"
              >
                Visiter le site
              </AppButton>

              <AppButton
                  to="/contact"
                  title="Discuter du projet"
                  theme="ghost"
                  class="w-full"
                  icon="arrow-right">
                Discuter du projet
              </AppButton>
            </div>
          </div>

          <div v-if="nextProject" class="px-8 space-y-4">
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
.project-image img {
  background-color: var(--color-black-100);
}

.project-image {
  will-change: transform, opacity;
  transform: translateZ(0);
}

@media (prefers-reduced-motion: reduce) {
  .project-image,
  .project-image * {
    transition: none !important;
  }
}
</style>
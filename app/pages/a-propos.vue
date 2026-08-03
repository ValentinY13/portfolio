<script setup lang="ts">
const { createCtx, gsap } = useGsap()

const containerRef = ref<HTMLElement | null>(null)

const experiences = [
  {
    period: 'Fév. 2025 - Sept. 2026',
    role: 'Développeur Full-Stack',
    company: 'Gintlemen Agency — Namur',
    description: 'Premier employé de l\'agence, au sein d\'une équipe de trois. Analyse des besoins clients, puis conception et développement d\'applications Nuxt & Directus de bout en bout.'
  },
  {
    period: 'Fév. 2025 - Fév. 2026',
    role: 'Stage, PFI puis CDD/CDI',
    company: 'Gintlemen Agency — Évolution interne',
    description: 'Entré en stage de fin d\'études, embauché en CDI un an plus tard. Montée en autonomie progressive jusqu\'à la prise en charge complète de projets clients.'
  }
]

const education = [
  {
    period: '2023 - 2025',
    degree: 'BES Webdeveloper',
    school: 'EAFC Namur-Cadets',
    detail: 'Épreuve intégrée réussie avec 100%'
  },
  {
    period: '2022 - 2023',
    degree: 'Bachelier informatique, développement d\'applications',
    school: 'HELMO, Liège'
  },
  {
    period: '2021 - 2022',
    degree: 'Bachelier informatique et systèmes',
    school: 'HEL, Liège'
  }
]

const stack = [
  { category: 'Frontend', skills: ['Nuxt 3/4', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'GSAP'] },
  { category: 'Backend', skills: ['Directus', 'Node.js', 'MySQL', 'REST & GraphQL'] },
  { category: 'Workflow', skills: ['Docker', 'Git / GitHub', 'Figma', 'Agile'] }
]

onMounted(() => {
  createCtx(containerRef, () => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.page-header > *', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08
      })

      const reveals = gsap.utils.toArray<HTMLElement>('.reveal-item')
      reveals.forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: 'power2.out'
        })
      })
    })
  })
})

// ─────────────────────────────────────────────
// SEO
// ─────────────────────────────────────────────
useSeoMeta({
  title: 'À propos — Valentin Yerna, Développeur Full-Stack',
  description: "Développeur full-stack basé en Belgique, spécialisé Nuxt et Directus. Découvrez mon parcours, ma stack technique et ma méthode de travail. Disponible immédiatement.",
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
          <Breadcrumb :items="[{ label: 'a-propos' }]" />

          <h1 class="text-h1 text-white-100 font-semibold">
            Compiler le <span class="text-accent italic">profil</span>.
          </h1>

          <p class="text-grey-100 max-w-2xl font-inter text-lg">
            Développeur Full-Stack passionné par l'architecture logicielle et l'expérience utilisateur, je transforme des idées complexes en produits web robustes.
          </p>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">

          <!-- Bio & Skills -->
          <div class="lg:col-span-7 space-y-16">
            <article class="space-y-8 font-inter text-lg leading-relaxed text-grey-100">

              <!-- Photo mobile uniquement -->
              <div class="reveal-item lg:hidden flex items-center gap-4">
                <div class="size-20 shrink-0 rounded-full overflow-hidden border border-white/10">
                  <nuxt-picture
                      src="/img/valentin-yerna.jpg"
                      alt="Portrait de Valentin Yerna, développeur full-stack"
                      :img-attrs="{ class: 'w-full h-full object-cover' }"
                  />
                </div>
                <p class="text-sm text-grey-100 font-inter">
                  Valentin Yerna — Développeur Full-Stack basé en Belgique.
                </p>
              </div>

              <p class="reveal-item">
                Développeur Full-Stack, je pars des enjeux métier pour concevoir l'architecture la plus adaptée — pas l'inverse. Chez Gintlemen, premier employé de l'agence, j'ai travaillé à la croisée du développement et de la définition des besoins : audits de plateforme, cahiers des charges, puis réalisation technique complète.
              </p>
              <p class="reveal-item">
                Spécialisé dans l'écosystème <strong>Nuxt</strong> et <strong>Directus</strong>, j'apprécie particulièrement la flexibilité du Headless CMS combinée à la puissance du SSR. Je privilégie la compréhension approfondie des systèmes à la simple exécution technique.
              </p>

              <section class="reveal-item pt-8">
                <h2 class="text-xs uppercase tracking-[0.2em] text-accent font-jetbrains-mono mb-8 flex items-center gap-4">
                  <span class="w-8 h-px bg-accent/30"></span>
                  Comment je travaille
                </h2>
                <div class="grid grid-cols-1 gap-6">
                  <div class="p-6 rounded-lg border border-white/5 bg-white/2 hover:border-accent/20 transition-colors group">
                    <h3 class="text-white-100 font-medium mb-2 flex items-center gap-3">
                      <span class="text-accent font-jetbrains-mono text-sm opacity-50">01.</span>
                      De l'intention à la structure
                    </h3>
                    <p class="text-sm text-grey-100 font-inter">
                      Un simple document d'objectifs ou des notes de réunion suffisent : je rédige le cahier des charges, définis le périmètre du MVP et conçois l'architecture avant d'écrire la première ligne de code.
                    </p>
                  </div>
                  <div class="p-6 rounded-lg border border-white/5 bg-white/2 hover:border-accent/20 transition-colors group">
                    <h3 class="text-white-100 font-medium mb-2 flex items-center gap-3">
                      <span class="text-accent font-jetbrains-mono text-sm opacity-50">02.</span>
                      Des outils qui rendent autonomes
                    </h3>
                    <p class="text-sm text-grey-100 font-inter">
                      Un projet réussi est un projet dont le client ou l'équipe n'a plus besoin d'un développeur. Backoffices pensés pour des non-techniciens, live preview, versioning : l'autonomie de ceux qui utilisent l'outil guide mes choix d'architecture.
                    </p>
                  </div>
                  <div class="p-6 rounded-lg border border-white/5 bg-white/2 hover:border-accent/20 transition-colors group">
                    <h3 class="text-white-100 font-medium mb-2 flex items-center gap-3">
                      <span class="text-accent font-jetbrains-mono text-sm opacity-50">03.</span>
                      Apprendre pour résoudre
                    </h3>
                    <p class="text-sm text-grey-100 font-inter">
                      Intégrer Mux dans Directus sans documentation existante, orchestrer de la génération IA, connecter une API ERP en temps réel : je me forme seul quand le problème l'exige, et je livre une solution en production.
                    </p>
                  </div>
                </div>
              </section>
            </article>

            <!-- Tech Stack -->
            <section class="reveal-item space-y-8">
              <h2 class="text-xs uppercase tracking-[0.2em] text-accent font-jetbrains-mono flex items-center gap-4">
                <span class="w-8 h-px bg-accent/30"></span>
                Stack Technique
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div v-for="group in stack" :key="group.category" class="space-y-4">
                  <h3 class="text-white-100 text-sm font-semibold font-jetbrains-mono flex items-center gap-2">
                    <i class="icon icon-small-arrow-right text-accent text-[10px]" />
                    {{ group.category }}
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <Chip v-for="skill in group.skills" :key="skill" with-border size="small" hoverable>
                      {{ skill }}
                    </Chip>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Experience / Sidebar -->
          <aside class="lg:col-span-5 space-y-12">

            <!-- Photo de profil (desktop uniquement) -->
            <div class="reveal-item relative group max-w-xs hidden lg:block">
              <div class="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 aspect-square pointer-events-none">
                <nuxt-picture
                    src="/img/valentin-yerna.jpg"
                    alt="Portrait de Valentin Yerna, développeur full-stack"
                    :img-attrs="{ class: 'size-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700' }"
                />
                <div class="absolute inset-0 bg-linear-to-t from-black-100/60 to-transparent opacity-60 pointer-events-none" />
              </div>

              <!-- Badge disponibilité -->
              <div class="absolute -bottom-4 -right-4 p-4 bg-black-100 border border-white/10 rounded-xl shadow-2xl">
                <div class="flex items-center gap-2">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  <span class="text-[10px] font-jetbrains-mono uppercase tracking-wider text-grey-100">Disponible · Namur</span>
                </div>
              </div>
            </div>

            <!-- Expérience -->
            <div class="reveal-item p-8 rounded-xl border border-white/5 bg-white/2 relative overflow-hidden group">
              <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <i class="icon icon-terminal text-6xl" />
              </div>
              <h2 class="text-xs uppercase tracking-widest text-white-100 font-jetbrains-mono mb-8 flex items-center justify-between">
                <span>Expérience</span>
                <span class="text-[10px] text-grey-300">History.log</span>
              </h2>
              <div class="space-y-8">
                <div v-for="exp in experiences" :key="exp.role" class="relative pl-6 border-l border-white/10">
                  <div aria-hidden="true" class="absolute -left-1.25 top-0 w-2.5 h-2.5 rounded-full border-2 border-black-100 bg-accent" />
                  <span class="block text-[10px] text-accent mb-1 uppercase tracking-wider font-jetbrains-mono">{{ exp.period }}</span>
                  <h3 class="text-white-100 font-medium mb-1">{{ exp.role }}</h3>
                  <p class="text-xs text-grey-300 mb-2">{{ exp.company }}</p>
                  <p class="text-sm text-grey-100 leading-relaxed font-inter">{{ exp.description }}</p>
                </div>
              </div>
            </div>

            <!-- Formation -->
            <div class="reveal-item p-8 rounded-xl border border-white/5 bg-white/2 relative overflow-hidden group">
              <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <i class="icon icon-education text-6xl" />
              </div>
              <h2 class="text-xs uppercase tracking-widest text-white-100 font-jetbrains-mono mb-8 flex items-center justify-between">
                <span>Formation</span>
                <span class="text-[10px] text-grey-300">Academic.json</span>
              </h2>
              <div class="space-y-6">
                <div v-for="edu in education" :key="edu.degree" class="relative pl-6 border-l border-white/10">
                  <div class="absolute -left-[5.5px] top-0 w-2.5 h-2.5 rounded-full border-2 border-black-100 bg-grey-500" />
                  <time class="block text-[10px] text-accent mb-1 uppercase tracking-wider font-jetbrains-mono">{{ edu.period }}</time>
                  <h3 class="text-white-100 font-medium mb-1 text-sm">{{ edu.degree }}</h3>
                  <p class="text-xs text-grey-300 mb-1">{{ edu.school }}</p>
                  <p v-if="edu.detail" class="text-xs text-grey-100 font-inter">{{ edu.detail }}</p>
                </div>
              </div>
            </div>

            <!-- CTA -->
            <div class="reveal-item p-8 rounded-xl border border-accent/20 bg-accent/5">
              <p class="text-sm text-white-100 font-medium mb-4">Prêt pour le prochain défi ?</p>
              <p class="text-sm text-grey-100 mb-2 font-inter">
                Je suis à la recherche d'un poste de développeur full-stack, disponible immédiatement.
              </p>
              <p class="text-xs text-grey-100 mb-6 font-jetbrains-mono">
                <span lang="fr">FR natif</span> · <span lang="en">EN technique</span>
              </p>
              <AppButton to="/contact" icon="arrow-right" size="small">Discuter ensemble</AppButton>
            </div>
          </aside>

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
<script setup lang="ts">
const { createCtx, gsap } = useGsap()

const containerRef = ref<HTMLElement | null>(null)
const profilePhotoRef = ref<HTMLElement | null>(null)
const availabilityBadgeRef = ref<HTMLElement | null>(null)

const processSteps = [
  {
    id: "01",
    title: "De l'intention à la structure",
    description: "Un simple document d'objectifs ou des notes de réunion suffisent : je rédige le cahier des charges, définis le périmètre du MVP et conçois l'architecture avant d'écrire la première ligne de code."
  },
  {
    id: "02",
    title: "Des outils qui rendent autonomes",
    description: "Un projet réussi est un projet dont le client ou l'équipe n'a plus besoin d'un développeur. Backoffices pensés pour des non-techniciens, live preview, versioning : l'autonomie de ceux qui utilisent l'outil guide mes choix d'architecture."
  },
  {
    id: "03",
    title: "Apprendre pour résoudre",
    description: "Intégrer Mux dans Directus sans documentation existante, orchestrer de la génération IA, connecter une API ERP en temps réel : je me forme seul quand le problème l'exige, et je livre une solution en production."
  }
]

const experiences = [
  {
    period: 'Fév. 2025 - Sept. 2026',
    title: 'Développeur Full-Stack',
    subtitle: 'Gintlemen Agency — Namur',
    description: 'Premier employé de l\'agence, au sein d\'une équipe de trois personnes. Analyse des besoins clients, puis conception et développement d\'applications Nuxt & Directus de bout en bout.'
  },
  {
    period: 'Fév. 2025 - Fév. 2026',
    title: 'Stage, PFI puis CDD/CDI',
    subtitle: 'Gintlemen Agency — Évolution interne',
    description: 'Débuté comme stagiaire (stage de fin d’études), engagé sous PFI puis sous en CDD et ensuite embauché sous CDI. Montée en autonomie progressive jusqu\'à la prise en charge complète de projets clients.'
  }
]

const education = [
  {
    period: '2023 - 2025',
    title: 'BES Webdeveloper',
    subtitle: 'EAFC Namur-Cadets',
    description: 'Épreuve intégrée réussie avec 100%'
  },
  {
    period: '2022 - 2023',
    title: 'Bachelier informatique, développement d\'applications',
    subtitle: 'HELMO, Liège'
  },
  {
    period: '2021 - 2022',
    title: 'Bachelier informatique et systèmes',
    subtitle: 'HEL, Liège'
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

      if (profilePhotoRef.value && availabilityBadgeRef.value) {
        const badgeTl = gsap.timeline({ paused: true })

        badgeTl.to(availabilityBadgeRef.value, {
          y: -8,
          scale: 1.05,
          duration: 0.4,
          ease: "back.out(1.7)"
        })

        profilePhotoRef.value.addEventListener("mouseenter", () => badgeTl.play())
        profilePhotoRef.value.addEventListener("mouseleave", () => badgeTl.reverse())
      }
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
      role="main"
  >
    <div class="responsive-padding-x responsive-padding-y relative z-10">
      <div class="responsive-layout">

        <!-- Header -->
        <header class="page-header mb-20 space-y-6">
          <Breadcrumb :items="[{ label: 'a-propos' }]" />

          <h1 id="page-title" class="text-h1 text-white-100 font-semibold">
            Compiler le <span class="text-accent italic">profil</span>.
          </h1>

          <p class="text-grey-100 max-w-2xl font-inter text-lg">
            Développeur Full-Stack passionné par l'architecture logicielle et l'expérience utilisateur, je transforme des idées complexes en produits web robustes.
          </p>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">

          <!-- Bio & Skills -->
          <div class="lg:col-span-7 space-y-16">
            <section aria-labelledby="bio-title" class="space-y-8">
              <h2 id="bio-title" class="sr-only">Biographie</h2>
              <article class="space-y-8 font-inter text-lg leading-relaxed text-grey-100">

                <!-- Photo mobile uniquement -->
                <div class="reveal-item lg:hidden flex items-center gap-4" aria-hidden="true">
                  <div class="size-25 shrink-0 rounded-full overflow-hidden border border-white/10">
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

                <section class="reveal-item pt-8" aria-labelledby="process-title">
                  <h2 id="process-title" class="text-xs uppercase tracking-[0.2em] text-accent font-jetbrains-mono mb-8 flex items-center gap-4">
                    <span class="w-8 h-px bg-accent/30" aria-hidden="true"></span>
                    Comment je travaille
                  </h2>
                  <div class="grid grid-cols-1 gap-6">
                    <CardProcess
                        v-for="step in processSteps"
                        :key="step.id"
                        :id="step.id"
                        :title="step.title"
                        :description="step.description"
                    />
                  </div>
                </section>
              </article>
            </section>

            <!-- Tech Stack -->
            <section class="reveal-item space-y-8" aria-labelledby="stack-title">
              <h2 id="stack-title" class="text-xs uppercase tracking-[0.2em] text-accent font-jetbrains-mono flex items-center gap-4">
                <span class="w-8 h-px bg-accent/30" aria-hidden="true"></span>
                Stack Technique
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div v-for="group in stack" :key="group.category" class="space-y-4">
                  <h3 class="text-white-100 text-sm font-semibold font-jetbrains-mono flex items-center gap-2">
                    <i class="icon icon-small-arrow-right text-accent text-[10px]" aria-hidden="true" />
                    {{ group.category }}
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <Chip
                        v-for="skill in group.skills"
                        :key="skill"
                        theme="accent"
                        variant="tonal"
                        with-border
                        size="small"
                        hoverable>
                      {{ skill }}
                    </Chip>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Experience / Sidebar -->
          <aside class="lg:col-span-5 space-y-12" aria-label="Informations complémentaires et parcours">
            <section ref="profilePhotoRef" class="reveal-item relative group max-w-xs hidden lg:block" aria-labelledby="sidebar-portrait-title">
              <h2 id="sidebar-portrait-title" class="sr-only">Portrait de Valentin Yerna</h2>
              <div class="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 aspect-square">
                <nuxt-picture
                    src="/img/valentin-yerna.jpg"
                    alt="Portrait de Valentin Yerna"
                    :img-attrs="{ class: 'size-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700' }"
                />
                <div class="absolute inset-0 bg-linear-to-t from-black-100/60 to-transparent opacity-60 pointer-events-none" aria-hidden="true" />
              </div>

              <!-- Badge disponibilité -->
              <div ref="availabilityBadgeRef" class="absolute -bottom-4 -right-4 p-4 bg-black-100 border border-white/10 rounded-xl shadow-2xl transition-colors group-hover:border-accent/30">
                <div class="flex items-center gap-2">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" aria-hidden="true"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  <span class="text-[10px] font-jetbrains-mono uppercase tracking-wider text-grey-100">Disponible · Namur</span>
                </div>
              </div>
            </section>

            <section aria-labelledby="exp-title">
              <CardHistory
                  id="exp-title"
                  title="Expérience"
                  icon="terminal"
                  file-extension="History.log"
                  :items="experiences"
              />
            </section>

            <section aria-labelledby="edu-title">
              <CardHistory
                  id="edu-title"
                  title="Formation"
                  icon="education"
                  file-extension="Academic.json"
                  :items="education"
              />
            </section>

            <!-- CTA -->
            <section class="reveal-item p-8 rounded-xl border border-accent/20 bg-accent/5" aria-labelledby="cta-title">
              <h2 id="cta-title" class="text-sm text-white-100 font-medium mb-4">Prêt pour le prochain défi ?</h2>
              <p class="text-sm text-grey-100 mb-2 font-inter">
                Je suis à la recherche d'un poste de développeur full-stack, disponible immédiatement.
              </p>
              <p class="text-xs text-grey-100 mb-6 font-jetbrains-mono">
                <span lang="fr" aria-label="Langue française native">FR natif</span> · 
                <span lang="en" aria-label="Langue anglaise technique">EN technique</span>
              </p>
              <div class="flex flex-wrap gap-4">
                <AppButton to="/contact" icon="arrow-right" size="small" aria-label="Me contacter pour discuter ensemble">
                  Discuter ensemble
                </AppButton>

                <AppButton to="/CV_Valentin_Yerna.pdf" size="small" target="_blank" theme="ghost">Télécharger mon CV</AppButton>
              </div>
            </section>
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
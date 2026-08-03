<script setup lang="ts">
const { createCtx, gsap } = useGsap()

const containerRef = ref<HTMLElement | null>(null)
const contactLinks = [
  {
    name: 'LinkedIn',
    value: 'Valentin Yerna',
    url: 'https://www.linkedin.com/in/valentinyerna/',
    icon: 'linkedin',
    target: '_blank',
    label: 'Me rejoindre sur LinkedIn'
  },
  {
    name: 'Email',
    value: 'yernavalentin@gmail.com',
    url: 'mailto:contact@valentinyerna.com',
    icon: 'mail',
    target: 'self',
    label: 'M\'envoyer un message'
  },
  {
    name: 'GitHub',
    value: '@valentiny13',
    url: 'https://github.com/ValentinY13',
    icon: 'github',
    target: '_blank',
    label: 'Voir mes repositories'
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

      tl.from('.contact-card', {
        opacity: 0,
        y: 32,
        duration: 0.8,
        stagger: 0.1,
        clearProps: 'all'
      }, '-=0.4')

      tl.from('.decorative-element', {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'expo.out'
      }, '-=0.6')
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
          <Breadcrumb :items="[{ label: 'contact' }]" />

          <h1 class="text-h1 text-white-100 font-semibold">
            Initialiser la <span class="text-accent italic">connexion</span>.
          </h1>

          <p class="text-grey-100 max-w-2xl font-inter text-lg">
            Je recherche un poste de développeur full-stack. Le plus simple pour me joindre&nbsp;: un mail ou un message LinkedIn.
          </p>
        </header>

        <!-- Contact Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          <a
              v-for="link in contactLinks"
              :key="link.name"
              :href="link.url"
              :target="link.target"
              :rel="link.target === '_blank' ? 'noopener noreferrer' : undefined"
              rel="noopener noreferrer"
              class="contact-card group p-8 rounded-xl border border-white/5 bg-white/2 hover:border-accent/30 transition-all duration-300 relative overflow-hidden"
          >
            <!-- Hover Gradient -->
            <div aria-hidden="true" class="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div class="relative z-10">
              <div class="flex items-start justify-between mb-8">
                <div class="size-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent/50 transition-colors duration-300">
                  <i aria-hidden="true" :class="`icon icon-${link.icon} text-2xl text-accent`" />
                </div>
                <span aria-hidden="true" class="text-[10px] text-grey-300 uppercase tracking-widest font-jetbrains-mono">
                  connect.sh --{{ link.name.toLowerCase() }}
                </span>
              </div>

              <h2 class="text-xs uppercase tracking-widest text-grey-100 mb-2">{{ link.name }}</h2>
              <p class="text-xl text-white-100 group-hover:text-accent transition-colors duration-300 truncate">
                {{ link.value }}
              </p>

              <div class="mt-8 flex items-center gap-2 text-sm text-accent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <span>{{ link.label }}</span>
                <i aria-hidden="true" class="icon icon-arrow-right text-xs" />
              </div>
            </div>
          </a>
        </div>

        <!-- Secondary Section / Decorative -->
        <section class="decorative-element grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-center">
          <div class="p-8 md:p-12 rounded-3xl border border-white/5 bg-white/1 relative overflow-hidden">
             <div class="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-3xl -mr-32 -mt-32 rounded-full pointer-events-none" aria-hidden="true" />

             <div class="relative z-10">
               <h2 class="text-h3 text-white-100 mb-6">Informations supplémentaires</h2>
               <ul class="space-y-6">
                 <li class="flex gap-4">
                   <span aria-hidden="true" class="text-accent font-jetbrains-mono text-sm mt-1 opacity-50">01.</span>
                   <div>
                     <p class="text-white-100 font-medium mb-1">Localisation</p>
                     <p class="text-grey-100 text-sm">Namur, Belgique — Ouvert au remote.</p>
                   </div>
                 </li>
                 <li class="flex gap-4">
                   <span aria-hidden="true" class="text-accent font-jetbrains-mono text-sm mt-1 opacity-50">02.</span>
                   <div>
                     <p class="text-white-100 font-medium mb-1">Statut</p>
                     <p class="text-grey-100 text-sm">En recherche d'un poste full-stack. Prêt à démarrer rapidement.</p>
                   </div>
                 </li>
                 <li class="flex gap-4">
                   <span aria-hidden="true" class="text-accent font-jetbrains-mono text-sm mt-1 opacity-50">03.</span>
                   <div>
                     <p class="text-white-100 font-medium mb-1">CV</p>
                     <p class="text-grey-100 text-sm">Version PDF complète disponible ici.</p>
                   </div>
                 </li>
               </ul>
             </div>
          </div>

          <div aria-hidden="true" class="border border-white/5 rounded-xl p-6 bg-black-100 font-jetbrains-mono text-[13px] leading-relaxed shadow-2xl">
            <div class="border-b border-white/5 pb-2">
              <span class="text-grey-100 text-[10px]">contact.json</span>
            </div>
            <pre class="text-grey-100">
{
 <span class="text-accent">"status"</span>: <span class="text-emerald-400">"available"</span>,
 <span class="text-accent">"role"</span>: <span class="text-emerald-400">"Full-stack Engineer"</span>,
 <span class="text-accent">"preferred_stack"</span>: [
   <span class="text-emerald-400">"Nuxt 4"</span>,
   <span class="text-emerald-400">"Directus"</span>,
   <span class="text-emerald-400">"Tailwind"</span>
 ],
 <span class="text-accent">"location"</span>: <span class="text-emerald-400">"Namur, BE"</span>,
 <span class="text-accent">"availability"</span>: <span class="text-emerald-400">"ASAP"</span>
}
            </pre>
          </div>
        </section>

        <!-- Footer -->
        <footer aria-hidden="" class="mt-24 pt-8 border-t border-white/10 flex justify-between items-center text-[10px] text-grey-300 uppercase tracking-widest">
          <div>Valentin Yerna — 2026</div>
          <div class="flex items-center gap-4">
            <span>v4.0.0-stable</span>
            <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          </div>
        </footer>
      </div>
    </div>
  </main>
</template>

<style scoped>
.contact-card {
  will-change: transform, opacity;
}
</style>
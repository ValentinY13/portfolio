<script setup lang="ts">
const { createCtx, gsap } = useGsap()

const footerRef = ref<HTMLElement | null>(null)

const navLinks = [
  { name: 'Accueil', to: '/' },
  { name: 'Projets', to: '/projets' },
  { name: 'À propos', to: '/a-propos' },
  { name: 'Contact', to: '/contact' }
]

const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/valentinyerna/', icon: 'linkedin' },
  { name: 'GitHub', url: 'https://github.com/ValentinY13', icon: 'github' }
]

onMounted(() => {
  createCtx(footerRef, () => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.footer-reveal', {
        scrollTrigger: {
          trigger: footerRef.value,
          start: 'top 95%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      })
    })
  })
})
</script>

<template>
  <footer ref="footerRef" class="relative z-10 border-t border-white/5 bg-black-100 overflow-hidden">

    <div class="responsive-padding-x responsive-padding-y">
      <div class="responsive-layout">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          
          <!-- Brand / Info -->
          <div class="footer-reveal lg:col-span-2">
            <nuxt-link to="/" class="inline-block group mb-6">
              <span class="text-h3 font-semibold text-white-100 group-hover:text-accent transition-colors">
                Valentin<span class="text-accent italic">.Yerna</span>
              </span>
            </nuxt-link>
            <p class="text-grey-100 font-inter text-sm leading-relaxed max-w-xs mb-8">
              Développeur Full-Stack basé en Belgique.
              Spécialisé dans l'écosystème Nuxt & Directus, je conçois
              des architectures robustes et des interfaces performantes.
            </p>
            <div class="flex items-center gap-4">
              <nuxt-link
                v-for="social in socialLinks" 
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="size-10 rounded-lg border border-white/5 bg-white/2 flex items-center justify-center text-grey-100 hover:border-accent/50 hover:text-accent transition-all duration-300 group"
                :title="social.name"
              >
                <i :class="`icon icon-${social.icon} text-lg`" aria-hidden="true" />
                <span class="sr-only">{{ social.name }}</span>
              </nuxt-link>
            </div>
          </div>

          <!-- Navigation -->
          <div aria-label="Pied de page" class="footer-reveal">
            <h2 class="text-xs uppercase tracking-widest text-white-100 font-jetbrains-mono mb-6">Index</h2>
            <ul class="space-y-4">
              <li v-for="link in navLinks" :key="link.name">
                <nuxt-link
                  :to="link.to"
                  :title="link.name"
                  class="text-sm w-fit text-grey-100 hover:text-accent transition-colors font-inter flex items-center group"
                >
                  <span class="w-0 group-hover:w-4 overflow-hidden transition-all duration-300 text-accent font-jetbrains-mono text-xs">/</span>
                  {{ link.name }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <!-- Availability / Status -->
          <div class="footer-reveal">
            <h2 class="text-xs uppercase tracking-widest text-white-100 font-jetbrains-mono mb-6">Status</h2>
            <div class="min-w-60 p-6 rounded-xl border border-white/5 bg-white/1 space-y-4">
              <div class="flex items-center gap-3">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span class="text-xs text-white-100 uppercase font-jetbrains-mono">À l'écoute d'opportunités</span>
              </div>
              <p class="text-xs text-grey-100 font-inter leading-relaxed">
                Basé à Namur, Belgique. <br>
                Ouvert au remote complet ou hybride.
              </p>
              <AppButton to="/contact" theme="ghost" size="small" icon="arrow-right" class="w-full justify-center">
                Discuter d'un poste
              </AppButton>
            </div>
          </div>

        </div>

        <!-- Bottom bar (Above Status Bar) -->
        <div class="mt-16 md:mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-grey-100 uppercase tracking-widest font-jetbrains-mono">
          <div class="footer-reveal">
            © 2026 Valentin Yerna — Tous droits réservés
          </div>
          <div class="footer-reveal flex items-center gap-6">
            <span>Conçu avec Nuxt 4 & Tailwind 4</span>
            <span class="hidden sm:inline opacity-30">|</span>
            <span>v4.0.0</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-reveal {
  will-change: transform, opacity;
}
</style>
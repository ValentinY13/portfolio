<script setup lang="ts">
import type { NuxtError } from "#app";
import { gsap } from "gsap";

const {error} = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => {
  clearError({ redirect: '/' });
}

useHead({
  title: error?.status === 404 ? 'Page introuvable' : 'Une erreur est survenue',
  link: [
    { rel: 'preload', as: 'style', href: '/css/font.css' },
    { rel: 'stylesheet', href: '/css/font.css' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ]
})

const errorContainer = ref(null)

onMounted(() => {
  const ctx = gsap.context(() => {
    gsap.from(".animate-in", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    })
  }, errorContainer.value)
})
</script>

<template>
  <div id="Error" ref="errorContainer" class="bg-black-100 min-h-screen w-full flex items-center justify-center p-6 font-jetbrains-mono overflow-hidden relative">

    <div class="relative z-10 container max-w-2xl border border-white/10 bg-black-100/50 backdrop-blur-sm p-8 md:p-12 shadow-2xl overflow-hidden group">
      <!-- IDE Decorator -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-accent/50 to-transparent"></div>
      <div class="absolute top-4 right-4 text-[10px] text-white/20 uppercase tracking-widest pointer-events-none">
        System.Error_{{ error?.status || '500' }}
      </div>

      <div class="wrapper text-left space-y-8">
        <div class="animate-in">
          <span class="text-accent text-sm mb-2 block">// {{ error?.status === 404 ? '404_NOT_FOUND' : 'INTERNAL_SERVER_ERROR' }}</span>
          <h1 class="text-4xl md:text-6xl font-bold text-white tracking-tighter">
            {{ error?.status === 404 ? 'Page' : 'Oups' }}
            <span class="text-accent">.</span>{{ error?.status === 404 ? 'introuvable' : 'erreur' }}
          </h1>
        </div>

        <div class="animate-in">
          <p class="text-grey-100/80 leading-relaxed max-w-prose border-l-2 border-accent/30 pl-4 py-1">
            <template v-if="error?.status === 404">
              La ressource demandée n'existe pas ou a été déplacée. Vérifiez l'URL ou revenez à la racine du projet.
            </template>
            <template v-else-if="error?.status === 410">
              {{ error.message || 'Ce lien a expiré et n\'est plus disponible.' }}
            </template>
            <template v-else-if="error?.status === 503">
              Le service est temporairement indisponible pour maintenance. Nous revenons rapidement.
            </template>
            <template v-else>
              Une erreur inattendue est survenue dans le système.
            </template>
          </p>
        </div>

        <div class="animate-in pt-4">
          <AppButton 
            @click="handleError" 
            theme="glowing"
            icon="arrow-right" 
            with-border
          >
            Accueil
          </AppButton>
        </div>
      </div>

      <div class="absolute -bottom-10 -right-10 w-40 h-40 border border-white/5 rotate-12 pointer-events-none"></div>
    </div>
  </div>
</template>

<style scoped>
@reference "assets/css/tailwind.css";

#Error {
  background-image: radial-gradient(circle at 50% 50%, var(--spotlight-color) 0%, transparent 70%);
  background-color: var(--color-black-100);
}

.font-jetbrains-mono {
  font-family: 'JetBrains Mono', 'Space Grotesk', monospace;
}
</style>
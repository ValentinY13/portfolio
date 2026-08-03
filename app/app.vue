<script setup lang="ts">
useHead({
  link: [
    { rel: 'preload', as: 'style', href: '/css/font.css' },
    { rel: 'stylesheet', href: '/css/font.css' },
    { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/SpaceGrotesk-SemiBold.woff2', crossorigin: 'anonymous' },
    { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/SpaceGrotesk-Regular.woff2', crossorigin: 'anonymous' },
    { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/Inter-Regular.woff2', crossorigin: 'anonymous' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ]
})

const { initSpotlight } = useSpotlight()
initSpotlight()
</script>

<template>
  <div class="relative min-h-screen overflow-x-clip bg-black-100">
    <NuxtLayout>
      <TheMenu />
      <NuxtPage />
      <TheFooter />

      <!-- Status Bar Style Footer -->
      <div class="fixed bottom-0 left-0 right-0 h-6 bg-accent/10 border-t border-white/5 flex items-center justify-between px-4 font-jetbrains-mono text-[10px] text-grey-100/60 z-50">
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span> main*</span>
          <span>0 ↓ 1 ↑</span>
        </div>
        <div class="flex items-center gap-4">
          <span>UTF-8</span>
          <span class="text-accent">Vue.js / Nuxt 4</span>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all .6s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
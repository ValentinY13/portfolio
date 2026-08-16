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

useSeoMeta({
  formatDetection: 'telephone=no',
  themeColor: "#26bd6c",

  ogTitle: 'Valentin Yerna — Développeur Full-Stack',
  ogDescription: 'Développeur spécialisé Nuxt & Directus à Namur.',

  ogImage: '/social-media.jpg',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageType: 'image/jpeg',
})

const { initSpotlight } = useSpotlight()
initSpotlight()

const transitionRef = ref()

const handleLeave = (el: any, done: any) => {
  if (transitionRef.value) {
    transitionRef.value.onLeave(el, done)
  } else {
    done()
  }
}

const handleEnter = (el: any, done: any) => {
  if (transitionRef.value) {
    transitionRef.value.onEnter(el, done)
  } else {
    done()
  }
}
</script>

<template>
  <div class="relative min-h-screen overflow-x-clip bg-black-100">
    <NuxtLayout>
      <TheMenu />
      <NuxtPage
          :transition="{
          name: 'page',
          mode: 'out-in',
          onEnter: handleEnter,
          onLeave: handleLeave,
          css: false,
          appear: true
        }"
      />
      <TheFooter />

      <PageTransition ref="transitionRef" />

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
</style>
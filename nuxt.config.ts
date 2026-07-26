import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {enabled: true},

  modules: [
    '@nuxt/image',
    '@vueuse/nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/seo',
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  css: [
    '~/assets/css/tailwind.css',
  ],

  app: {
    layoutTransition: {name: 'page', mode: 'out-in'},
    // pageTransition: {name: 'page', mode: 'out-in'}
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag.startsWith('swiper') || tag.startsWith('mux-'),        },
  },
})

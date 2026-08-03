import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {enabled: true},

  modules: [
    '@nuxt/image',
    '@vueuse/nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/seo',
    '@nuxt/content',
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  css: [
    '~/assets/css/tailwind.css',
  ],

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
      css: false
    }
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag.startsWith('swiper') || tag.startsWith('mux-'),        },
  },

  ogImage: {
    enabled: false
  },
})

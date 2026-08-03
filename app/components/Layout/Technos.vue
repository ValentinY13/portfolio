<script setup lang="ts">
import type {SwiperOptions} from "swiper/types";

const {items} = defineProps<{
  items: {
    src: string
    alt: string
  }[]
}>()

const displayItems = computed(() => {
  if (!items) return []
  return [...items, ...items, ...items]
})

const swiperOptions: SwiperOptions = {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 64,
  speed: 4000,
  grabCursor: false,
  allowTouchMove: false,
  autoplay: {
    delay: 1,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  },
  injectStyles: [
    `
      .swiper-wrapper {
     transition-timing-function: linear !important;

      }
      `
  ],
  breakpoints: {
    1280: {
      spaceBetween: 100,
    }
  }
}

const swiperElement = useTemplateRef('swiperElement')
const isLoaded = ref(false)

onMounted(() => {
  if (!swiperElement.value) return

  Object.assign(swiperElement.value!, swiperOptions)
  swiperElement.value!.initialize()

  isLoaded.value = true

  const startAutoplay = () => {
    const swiper = swiperElement.value?.swiper
    if (!swiper) return

    swiper.autoplay?.start()
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setTimeout(startAutoplay, 100)
    })
  })
})
</script>

<template>
  <section>
    <div :class="{hidden: !isLoaded}">
      <swiper-container ref="swiperElement" class="" init="false">
        <swiper-slide
            v-for="(logo, i) in displayItems"
            :key="`${logo.alt}-${i}`"
            class="w-50 py-6"
        >
          <div class="group flex items-center justify-center rounded-xl px-4 py-3 transition-all duration-500 hover:scale-105 hover:bg-white">
            <nuxt-img
                :src="logo.src"
                :alt="logo.alt"
                class="h-8 w-full grayscale group-hover:grayscale-0"
            />
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
  </section>
</template>

<style scoped>

</style>
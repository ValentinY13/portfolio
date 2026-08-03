<script setup lang="ts">
import type {
  RouteMapI18n,
  RouteLocationAsRelativeI18n,
  RouteLocationAsStringI18n,
  RouteLocationAsPathI18n
} from "#vue-router";

const {
  tag = 'div',
  forceNuxtLink = false,
  to,
  title,
  src,
  alt,
  provider
} = defineProps<{
  tag?: string,
  to: keyof RouteMapI18n | RouteLocationAsRelativeI18n | RouteLocationAsStringI18n | RouteLocationAsPathI18n
  title: string
  src?: string
  alt?: string
  provider?: string
  forceNuxtLink?: boolean
}>()

const componentType = computed(() => {
  if (!useI18n || forceNuxtLink) return resolveComponent('NuxtLink');

  return resolveComponent('NuxtLinkLocale');
})
</script>

<template>
  <component :is="tag" class="group relative h-full text-sm font-semibold">
    <component :is="componentType" class="flex flex-col group/link" :to="to" :title="title">
      <div class="shrink-0 grow-0 w-full" v-if="src">
        <nuxt-picture sizes="300px" :provider class="block grayscale hover:grayscale-0 transition duration-500 aspect-video" loading="lazy" :src="src"
                      :alt="alt || ''"
                      :img-attrs="{class: 'object-cover size-full'}" />
      </div>
      <p class="font-semibold py-2 inline-block border-b-2 border-b-transparent transition-all duration-300 group-hover/link:border-b-2 group-hover/link:border-b-yellow-100">
        {{ title }}
      </p>
    </component>
  </component>
</template>
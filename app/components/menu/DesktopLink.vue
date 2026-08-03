<script setup lang="ts">
import type {
  RouteMap,
  RouteLocationAsRelative,
  RouteLocationAsString,
  RouteLocationAsPath
} from "#vue-router";

defineProps<{
  to: keyof RouteMap | RouteLocationAsRelative | RouteLocationAsString | RouteLocationAsPath
  title: string
}>()
</script>

<template>
  <li class="group h-full flex flex-col justify-center relative">
    <nuxt-link 
      class="text-white font-jetbrains-mono text-sm py-1 px-3 transition-colors hover:text-accent flex items-center gap-2" 
      :to="to" 
      :title="title"
      active-class="text-accent"
    >
      <span class="text-accent/40 font-bold opacity-0 group-hover:opacity-100 transition-opacity">&lt;</span>
      {{ title }}
      <span class="text-accent/40 font-bold opacity-0 group-hover:opacity-100 transition-opacity">/&gt;</span>
    </nuxt-link>
  </li>
</template>

<style scoped>

</style>
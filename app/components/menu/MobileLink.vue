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

const menuToolkit = inject<{
  closeMenu: () => void;
}>('menu-toolkit')

const closeNestedList = inject<(() => void) | null>('close-nested-list', null)

function close() {
  menuToolkit?.closeMenu()
  closeNestedList && closeNestedList();
}
</script>

<template>
  <li class="group overflow-hidden">
    <nuxt-link 
      @click="close" 
      class="mobile-link block font-jetbrains-mono text-h1 py-4 transition-colors hover:text-accent relative"
      :to="to" 
      :title="title"
      active-class="text-accent"
    >
      <span class="inline-block">{{ title }}</span>
    </nuxt-link>
  </li>
</template>

<style scoped>

</style>
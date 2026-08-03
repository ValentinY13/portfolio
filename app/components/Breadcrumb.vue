<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <nav aria-label="Fil d'Ariane" class="font-jetbrains-mono">
    <ol class="flex items-center gap-2 text-sm text-grey-100">
      <li>
        <nuxt-link to="/" class="hover:text-accent transition-colors">~</nuxt-link>
      </li>

      <template v-for="(item, index) in items" :key="index">
        <li aria-hidden="true" class="opacity-50">/</li>
        <li>
          <nuxt-link
              v-if="item.to"
              :to="item.to"
              class="hover:text-accent transition-colors"
          >
            {{ item.label }}
          </nuxt-link>
          <span
              v-else
              aria-current="page"
              class="text-accent truncate max-w-[16rem] md:max-w-none"
          >
            {{ item.label }}
          </span>
        </li>
      </template>

      <li aria-hidden="true" class="text-accent animate-pulse">_</li>
    </ol>
  </nav>
</template>

<style scoped>

</style>
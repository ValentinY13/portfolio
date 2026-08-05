<script setup lang="ts">
interface HistoryItem {
  period: string
  title: string
  subtitle: string
  description?: string
}

defineProps<{
  title: string
  icon: string
  fileExtension: string
  items: HistoryItem[]
}>()
</script>

<template>
  <div class="reveal-item p-8 rounded-xl border border-white/5 bg-white/2 relative overflow-hidden group">
    <!-- Icône décorative en arrière-plan -->
    <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <i :class="[`icon icon-${icon}`, 'text-6xl']" />
    </div>

    <!-- En-tête du bloc style IDE -->
    <h2 class="text-xs uppercase tracking-widest text-white-100 font-jetbrains-mono mb-8 flex items-center justify-between">
      <span>{{ title }}</span>
      <span class="text-[10px] text-grey-300">{{ fileExtension }}</span>
    </h2>

    <!-- Liste des items (Timeline) -->
    <div class="space-y-8">
      <div v-for="(item, index) in items" :key="index" class="relative pl-6 border-l border-white/10">
        <!-- Point d'accentuation sur la ligne -->
        <div
            aria-hidden="true"
            class="absolute -left-1.25 top-0 w-2.5 h-2.5 rounded-full border-2 border-black-100 bg-accent"
        />

        <time class="block text-[10px] text-accent mb-1 uppercase tracking-wider font-jetbrains-mono">
          {{ item.period }}
        </time>

        <h3 class="text-white-100 font-medium mb-1" :class="title === 'Formation' ? 'text-sm' : ''">
          {{ item.title }}
        </h3>

        <p class="text-xs text-grey-100 mb-2">
          {{ item.subtitle }}
        </p>

        <p v-if="item.description" class="text-sm text-grey-100 leading-relaxed font-inter">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
defineProps<{
  id: string
  title: string
  description: string
}>()
</script>

<template>
  <div class="p-6 rounded-lg border border-white/5 bg-white/2 hover:border-accent/20 transition-colors group">
    <h3 class="text-white-100 font-medium mb-2 flex items-center gap-3">
      <span class="text-accent font-jetbrains-mono text-sm opacity-50">{{ id }}.</span>
      {{ title }}
    </h3>
    <p class="text-sm text-grey-100 font-inter leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>

<style scoped>

</style>
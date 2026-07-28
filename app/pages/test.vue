<script setup lang="ts">
const container = ref<HTMLElement | null>(null)

// const glassBtn = ref<HTMLElement | null>(null)
// const spotlightPos = ref({ x: 50, y: 50 })
//
// const handleMouseMoveGlass = (e: MouseEvent) => {
//   if (!glassBtn.value) return
//   const rect = glassBtn.value.getBoundingClientRect()
//   const x = ((e.clientX - rect.left) / rect.width) * 100
//   const y = ((e.clientY - rect.top) / rect.height) * 100
//   spotlightPos.value = { x, y }
// }
</script>

<template>
  <div ref="container" class="min-h-screen bg-black-100 flex flex-col items-center justify-center gap-16 p-8 font-inter">
    
<!--    &lt;!&ndash; BOUTON 3 : GLASS SPOTLIGHT &ndash;&gt;-->
<!--    <div class="flex flex-col items-center gap-4">-->
<!--      <span class="text-grey-100 text-xs font-jetbrains-mono uppercase tracking-widest">03. Style Glass Spotlight</span>-->
<!--      <button-->
<!--          ref="glassBtn"-->
<!--          class="group relative px-6 py-3 rounded-full border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(38,189,108,0.2)]"-->
<!--          :style="{-->
<!--            background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(38,189,108,0.15) 0%, transparent 80%)`-->
<!--          }"-->
<!--          @mousemove="handleMouseMoveGlass"-->
<!--      >-->
<!--        <span class="relative z-10 font-medium text-white-100 group-hover:text-accent transition-colors duration-300">-->
<!--          Me contacter-->
<!--        </span>-->
<!--        &lt;!&ndash; Reflet interne &ndash;&gt;-->
<!--        <div class="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50"></div>-->
<!--      </button>-->
<!--    </div>-->

<!--    <NuxtLink to="/" class="mt-8 text-grey-100 hover:text-white-100 text-sm underline underline-offset-4">-->
<!--      Retour à l'accueil-->
<!--    </NuxtLink>-->
  </div>
</template>

<style scoped>

</style>
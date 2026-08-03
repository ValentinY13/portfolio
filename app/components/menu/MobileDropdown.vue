<script setup lang="ts">
const {modelValue, name, toggleable = false} = defineProps<{
  modelValue?: string | null
  name?: string
  toggleable?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string | null): void
}>()

const model = computed({
  get: () => modelValue ?? null,
  set: (v) => emit('update:modelValue', v)
})

provide('MobileDropdown', {
  model,
  name,
  toggleable,
})

</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
import type {NestedListItem} from "~/types/app";

defineProps<{
  item: NestedListItem
  useDropdown?: boolean
}>();

const rootEl = useTemplateRef('rootEl')

function closeItems() {
  setTimeout(() => {
    rootEl.value?.closeItems();
  }, 100)
}

provide('close-nested-list', closeItems)
</script>

<template>
  <MenuMobileNestedListItem ref="rootEl" v-bind="$props"></MenuMobileNestedListItem>
</template>

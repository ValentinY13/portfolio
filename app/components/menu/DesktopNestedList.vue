<script setup lang="ts">
import type {NestedListItem} from "~/types/app";

const {item, level = 0, offsetY = '0'} = defineProps<{
  level?: number
  offsetY?: string
  item: NestedListItem
}>();

const componentBind = computed(() => {
  if(!item.to) {
    return {
      class: 'cursor-default'
    }
  }

  return {
    to: item.to,
    title: item.title
  }
})

const componentType = computed(() => {
  if(!item.to) {
    return 'span'
  }

  return resolveComponent('NuxtLink')
})

const nextLevel = computed(() => level + 1)
const isItems = computed(() => !!item.items?.length)

const rootElClasses = computed(() => {
  if(level < 1) {
    return ''
  } else {
    return 'relative'
  }
})

const sublistClasses = computed(() => {
  if(level < 1) {
    return 'left-0 w-full px-6 bg-grey-100 text-black'
  } else {
    return 'w-max right-0 bg-green-100 text-white px-6'
  }
})

const sublistUlClasses = computed(() => {
  if(level < 1) {
    return 'flex items-center justify-end gap-4 w-full'
  } else {
    return 'flex flex-col gap-4'
  }

})
</script>

<template>
  <li data-item="list" :class="rootElClasses">
    <component
        :is="componentType"
        v-bind="componentBind"
        class="inline-block font-semibold">
      <span class="inline-block py-1 text-sm transition-colors duration-200 ease-in-out after:left-0 after:w-full after:h-0.5 after:bg-gold-100 after:absolute after:hidden hover:after:block" :class="level > 1 ? 'after:-bottom-2' : 'after:-bottom-4 text-green-100'">
        {{ item.title }}
      </span>
      <i v-if="item.items?.length" class="ml-2 transition-transform group-hover:rotate-180 icon icon-arrow-bottom align-middle text-[8px]"></i>
    </component>

    <div
        v-if="isItems"
        :class="sublistClasses"
        class="transition-all duration-400 opacity-0 invisible absolute translate-y-(--offset-y) space-y-1 pt-4 pb-5 before:absolute before:h-5 before:w-full before:block before:left-0 before:-translate-y-full before:top-0">

      <ul :class="sublistUlClasses">
        <MenuDesktopNestedList offset-y="calc(var(--spacing)*3)" :level="nextLevel" v-for="el in item.items" :item="el" />
      </ul>
    </div>
  </li>
</template>

<style scoped>
@reference "assets/css/tailwind.css";

li[data-item="list"] {
  --offset-y: v-bind(offsetY);

  @variant hover {
      > div {
        @apply visible opacity-100
      }
  }
}
</style>
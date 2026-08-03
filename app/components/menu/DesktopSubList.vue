<script setup lang="ts">
import type { ProductsOrganized } from '~/composables/useProducts';

const {items} = defineProps<{
  title: string;
  items: ProductsOrganized;
}>();

const activeCategoryId = ref<string | number | null>(null);

const categories = computed(() => Object.values(items));

const activeCategory = computed(() => {
  if (activeCategoryId.value && items[activeCategoryId.value as number]) {
    return items[activeCategoryId.value as number];
  }
  return categories.value[0] || null;
});

watch(categories, (newCats) => {
  if (newCats.length > 0 && !activeCategoryId.value) {
    activeCategoryId.value = newCats[0].id;
  }
}, { immediate: true });

const setCategory = (id: string | number) => {
  activeCategoryId.value = id;
};
</script>

<template>
  <li class="group/menu" data-item="list">
    <!-- Trigger du menu -->
    <div aria-haspopup="true" class="inline-block cursor-pointer font-semibold">
      <span class="inline-block py-1 text-sm transition-colors duration-200 ease-in-out">
        {{ title }}
      </span>
    </div>

    <!-- Dropdown Panel -->
    <div class="dropdown-panel absolute left-0 w-full invisible opacity-0 transition-all duration-300 group-hover/menu:visible group-hover/menu:opacity-100">
      <div class="responsive-layout bg-grey-50 text-sm flex h-[378px] overflow-hidden">

        <!-- Colonne Gauche : Catégories -->
        <aside class="p-6 overflow-y-auto border-r border-white">
          <ul class="flex flex-col">
            <li
                v-for="cat in categories"
                :key="cat.id"
                @mouseenter="setCategory(cat.id)"
                class="px-4 py-1 cursor-pointer rounded-lg transition-colors duration-200 flex items-center justify-between"
                :class="activeCategoryId === cat.id ? 'bg-grey-100/20' : 'hover:bg-grey-100/20'"
            >
              <nuxt-link
                  :to="{name: 'catalogue-category', params: {category: cat.slug}}"
                  :title="cat.name"
                  class="font-bold w-full">
                {{ cat.name }}
              </nuxt-link>
            </li>
          </ul>
        </aside>

        <!-- Colonne Droite -->
        <div class="flex-1 py-8 px-10 overflow-y-auto">
          <div v-if="activeCategory" class="columns-[180px] gap-x-12 gap-y-8">
            <div
                v-for="subCat in Object.values(activeCategory.sub_categories)"
                :key="subCat.id"
                class="space-y-4 break-inside-avoid mb-8"
            >
              <nuxt-link
                  :to="{name: 'catalogue-category-subCategory', params: {category: activeCategory.slug, subCategory: subCat.slug}}"
                  :title="subCat.name"
                  class="block mb-1 border-2 border-transparent w-fit hover:border-2 hover:border-b-gold-100">
                {{ subCat.name }}
              </nuxt-link>

              <ul class="space-y-2">
                <li v-for="product in subCat.products" :key="product.id">
                  <nuxt-link
                      :to="`/produits/${product.slug}`"
                      :title="product.title"
                      class="px-4 py-1 cursor-pointer rounded-lg transition-colors duration-200 flex items-center justify-between font-bold hover:bg-grey-100/20"
                  >
                    {{ product.title }}
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>

          <div v-else class="flex items-center justify-center h-full text-grey-400">
            Sélectionnez une catégorie pour voir les produits
          </div>
        </div>

      </div>
    </div>
  </li>
</template>

<style scoped>
@reference "assets/css/tailwind.css";

.dropdown-panel {
  top: 100%;
  z-index: 10;
  &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    height: 20px;
    display: block;
  }
}

/* Scrollbar custom */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  @apply bg-grey-100 rounded;
}
</style>
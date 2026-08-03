<script setup lang="ts">
import type {NestedListItem} from "~/types/app";

defineProps<{
  item: NestedListItem
  useDropdown?: boolean
}>();

const showItems = ref(false);

function closeItems(): void {
  showItems.value = false;
}

defineExpose({
  closeItems
})

const id = useId()

const {locale} = useI18n();

const opened = ref<Links | null>(null);

const menuToolkit = inject<{
  closeMenu: () => void;
}>('menu-toolkit')

const closeNestedList = inject<() => void>('close-nested-list')

function close() {
  menuToolkit?.closeMenu()
  closeNestedList && closeNestedList();
}
</script>

<template>
  <li>
    <button
        :aria-expanded="showItems"
        :aria-controls="id"
        class="group text-h2 py-1 hover:text-gold-100 cursor-pointer flex gap-2 text-left items-center"
        @click="showItems = true;"
        :title="item.title">
      {{ item.title }}
      <i class="icon icon-arrow-right align-middle text-gold-100 group-hover:text-white grow-0 shrink-0 text-base"></i>
    </button>

    <div
        :id="id"
        class="fixed z-10 left-0 top-[96px] size-full bg-linear-225 from-green-100 from-20% to-green-200 px-6 py-14 scrollbar overflow-y-auto flex flex-col gap-8"
        v-show="showItems">

      <div>
        <button title="Back to menu" @click="showItems = false"
                class="font-medium hover:text-gold-100 cursor-pointer flex gap-2 text-left items-center">
          <i class="icon icon-arrow-right rotate-180 align-middle text-gold-100 group-hover:text-white grow-0 shrink-0 text-base"></i>
          {{ item.title }}
        </button>
      </div>

      <ul class="space-y-8 wrap-break-word hyphens-auto text-gold-100" :lang="locale">
        <template v-if="useDropdown">
          <!-- Mode Dropdown -->
          <MenuMobileDropdown v-model="opened" class="space-y-6" toggleable>
            <MenuMobileDropdownItem
                v-for="(category, i) in item.items"
                :key="i"
                :title="category.title"
            >
              <nuxt-link
                  :to="category.to"
                  :title="category.title"
                  @click="close()"
                  class="border-b border-b-gold-100">
                Voir tout
              </nuxt-link>
              <div v-for="(subCategory, j) in category.items" :key="j" class="font-bold text-white mb-6">
                <!-- Titre de la sous-catégorie -->
                <nuxt-link
                    :to="subCategory.to"
                    :title="subCategory.title"
                    @click="close()"
                    class="flex justify-between items-center mt-6 mb-4 text-sm">
                  {{ subCategory.title }}

                  <i class="icon icon-arrow-right text-gold-100 grow-0 shrink-0 text-base mr-4"/>

                </nuxt-link>
                <!-- Liste des produits -->
                <ul class="space-y-3">
                  <li v-for="(product, k) in subCategory.items" :key="k">
                    <nuxt-link
                        :to="product.to"
                        :title="product.title"
                        @click="close()"
                        class="px-4 py-1.5 rounded-sm flex justify-between items-center bg-white/10 transition-colors hover:text-white"
                    >
                      {{ product.title }}

                      <i class="icon icon-arrow-right text-gold-100 grow-0 shrink-0 text-base"/>
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </MenuMobileDropdownItem>
          </MenuMobileDropdown>
        </template>

        <template v-else>
          <!-- Mode classique -->
          <template v-for="(child, i) in item.items" :key="i">
            <MenuMobileNestedListItem v-if="!!child.items?.length" :item="child"></MenuMobileNestedListItem>
            <MenuMobileLink v-else-if="child.to" :to="child.to" :title="child.title"></MenuMobileLink>
          </template>
        </template>
      </ul>
    </div>
  </li>
</template>

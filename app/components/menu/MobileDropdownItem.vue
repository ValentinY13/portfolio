<script setup lang="ts">
import { dropdownTransition } from '~/utils/dropdown'

const injected = inject<{
  model?: Ref<string | null>
  name?: string
  toggleable?: boolean
}>('MobileDropdown', {})

const {name: _name, value: _value, toggleable : _toggleable} = defineProps<{
  title: string
  name?: string
  value?: string
  toggleable?: boolean
}>()

const uid = useId();

const toggleable = computed(() => {
  return injected.toggleable ?? _toggleable ?? false;
})

const name = computed(() => {
  return _name ?? injected.name ?? uid;
})

const inputValue = computed(() => {
  return _value ?? uid;
})

const localModel = defineModel<string | null>({ default: null })
const model = computed({
  get: () => injected.model?.value ?? localModel.value,
  set: (v) => {
    if (injected.model) injected.model.value = v
    else localModel.value = v
  }
})

const checked = computed(() => {
  return model.value === inputValue.value;
})

function onToggle() {
  if (toggleable.value && checked.value) {
    model.value = null
  } else {
    model.value = inputValue.value
  }
}
</script>

<template>
  <div>
    <details :aria-labelledby="uid" class="group border-b" open>
      <summary class="select-none block">
        <label class="w-full mb-2 cursor-pointer flex justify-between items-center gap-4" @click.prevent="onToggle">
          <input @change.stop class="hidden" type="radio" aria-hidden="true" :name :value="inputValue" />

          <span class="text-h3 font-semibold">{{title}}</span>
          <i class="grow-0 shrink-0 icon icon-arrow-bottom transition duration-400" :class="checked ? 'rotate-180' : ''"></i>
        </label>
      </summary>

      <Transition
          @before-enter="dropdownTransition.onEnter"
          @enter="dropdownTransition.onEnter"
          @after-enter="dropdownTransition.onAfterEnter"
          @leave="dropdownTransition.onLeave"
          @after-leave="dropdownTransition.onAfterLeave">

        <div v-show="checked" class="text-sm overflow-hidden">
          <div class="pb-7">
            <slot />
          </div>
        </div>
      </Transition>
    </details>
  </div>
</template>

<style scoped>

</style>
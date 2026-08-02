<template>
  <div class="expandable-image" @click="expand" :aria-expanded="expanded">
    <div class="expandable-image__container">
      <slot></slot>
    </div>


    <Teleport to="#teleports">
      <transition name="fade">
        <div @click.stop="unexpand" class="expandable-image__overlay fixed z-[60] left-0 top-0 w-full h-full backdrop-blur-xs bg-(--theme-bg-color)/60 flex justify-center items-center p-10" v-if="expanded">
          <div class="h-full w-full">
            <slot v-if="$slots.expanded" name="expanded"></slot>
            <slot v-else></slot>
          </div>

          <button class="expandable-image__close" @click.stop="unexpand">
            <span></span>
            <span></span>
          </button>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
const expanded = ref(false);

function keyUpListeners(event:KeyboardEvent) {
  event.preventDefault();

  // @ts-ignore
  if(event.target && (event.target.matches("input") || event.target.matches("textarea")))
    return;

  if(event.isComposing || event.key === '229') {
    return;
  }

  if(event.code === 'Escape') {
    expanded.value = false;
  }
}

function expand() {
  expanded.value = true;
  document.addEventListener("keyup", keyUpListeners);
}

function unexpand() {
  expanded.value = false;
}


onBeforeUnmount(() => {
  if(expanded.value) {
    document.body.style.removeProperty('overflow');
    document.removeEventListener("keyup", keyUpListeners);
  }

  expanded.value = false;
});

watch(expanded, (value: boolean) => {
  if(value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.removeProperty('overflow');
    document.removeEventListener("keyup", keyUpListeners);
  }
});


</script>

<style scoped>
@reference "assets/css/tailwind.css";

.expandable-image__container ::v-deep(img) {
  @apply cursor-zoom-in;
}

.expandable-image__close {
  @apply cursor-pointer z-30 absolute right-4 top-4;
  height: 30px;
  width: 30px;
}

.expandable-image__close span {
  @apply absolute origin-center rotate-0 transition-all opacity-100 left-0 w-full rounded-full bg-(--color-accent);
  height: 2px;
}

.expandable-image__close span:nth-of-type(1) {
  top: 15%;
}

.expandable-image__close span:nth-of-type(2) {
  bottom: 15%;
}

.expandable-image__close span:nth-of-type(1) {
  @apply rotate-45 translate-y-[470%];
}

.expandable-image__close span:nth-of-type(2) {
  @apply w-full -rotate-45 translate-y-[-470%];
}

.expandable-image__overlay ::v-deep(img) {
  @apply max-h-full w-full h-full object-contain;
}
</style>
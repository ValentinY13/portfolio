<script setup lang="ts">
import type {RouteLocationRaw} from "#vue-router";

const {
  theme = 'green',
  variant = 'default',
  size = 'normal',
  tag = 'div',
  hoverable = false,
  active = false,
  clickable = false,
  withBorder = false,
  withBorderDashed = false,
  uppercase = false,
  to
} = defineProps<{
  theme?: 'accent' | 'transparent' | 'white',
  variant?: 'default' | 'tonal'
  size?: 'normal' | 'small'
  tag?: string
  hoverable?: boolean
  active?: boolean
  clickable?: boolean
  withBorder?: boolean
  withBorderDashed?: boolean
  uppercase?: boolean
  to?: RouteLocationRaw
}>()

const classes = computed(() => {
  const items: string[] = [];

  if(theme) {
    items.push(`chip-theme--${theme}`)
  }

  if (!variant || variant !== 'default') {
    items.push(`chip-variant--${variant}`);
  }

  if (!size || size !== 'normal') {
    items.push(`chip-size--${size}`);
  }

  if(withBorder) {
    items.push('chip--border');
  }

  if(withBorderDashed) {
    items.push('chip--border-dashed');
  }

  if (hoverable) {
    items.push('chip--hoverable');
  }

  if (active) {
    items.push('chip--active');
  }

  if(clickable) {
    items.push('cursor-pointer');
  }

  if(uppercase) {
    items.push('uppercase');
  }

  return items;
})

const componentType = computed(() => {
  if(to) {
    return resolveComponent('NuxtLink')
  }

  return 'div'
})

const vBindChip = computed(() => {
  if(to) {
    return {to}
  }

  return {}
})
</script>

<template>
  <component :is="componentType"
             class="chip"
             v-bind="vBindChip"
             :class="classes">
    <slot></slot>
  </component>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.chip {
  --_background-color: var(--chip-background-color, transparent);
  --_color: var(--chip-color, var(--color-grey-300));
  --_transition-duration: var(--chip-transition-duration, 200ms);

  @apply text-(--_color) bg-(--_background-color) font-bold rounded inline-flex items-center gap-2 font-jetbrains-mono;
  @apply transition-colors duration-(--_transition-duration) ease-in-out;
}

.chip--hoverable {
  --_hover-background-color: var(--chip-hover-background-color, var(--color-accent));
  --_hover-color: var(--chip-hover-color, var(--color-accent));

  &:hover {
    --chip-background-color: --alpha(var(--_hover-background-color) / 10%);
    --chip-color: var(--_hover-color);

    --_transition-duration: 400ms;
  }
}

.chip-variant--tonal {
  @apply bg-(--_background-color)/10 text-(--_background-color);

  &.chip--hoverable {
    @apply hover:bg-(--_background-color) hover:text-(--_color);
  }

  &.chip--active {
    @apply bg-(--_background-color) text-(--_color);
  }
}

.chip:not([class*=chip-size]) {
  @apply px-2 py-1 text-[10px];
}

.chip-size--small {
  @apply px-2 py-0.5 text-[10px];
}

.chip--border {
  @apply border border-white/10;
}

.chip--border-dashed {
  @apply border border-dashed;
}

.chip-theme--accent {
  --chip-background-color: var(--color-accent);
  --chip-color: var(--color-black);

  &.chip--border, &.chip--border-dashed {
    --border-color: var(--color-black);
  }

  &.chip--hoverable {
    --chip-hover-background-color: transparent;
    --chip-hover-color: var(--color-grey-300);
  }
}

.chip-theme--white {
  --chip-background-color: var(--color-white);
  --chip-color: var(--color-black);

  &.chip--border, &.chip--border-dashed {
    --border-color: var(--color-black);
  }

  &.chip--hoverable {
    --chip-hover-background-color: transparent;
    --chip-hover-color: var(--color-grey-300);
  }
}

.chip-theme--light {
  --chip-background-color: var(--color-white);
  --chip-color: var(--theme-fluid-color);
}
</style>
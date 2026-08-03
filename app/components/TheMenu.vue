<script lang="ts" setup>
import gsap from 'gsap';

const isActive = ref(false);

function handleClick() {
  isActive.value = !isActive.value;
}

function closeMenu() {
  isActive.value = false;
}

provide('menu-toolkit', {
  closeMenu
});

const { y } = useWindowScroll();

const showTopMenu = ref(true);
const scrolled = ref(false);

// watch for scroll direction and hide menu if scrolling down; show if scrolling up or at top
watch(y, (value, oldValue) => {
  showTopMenu.value = !(value > 100 && value > oldValue);
  scrolled.value = y.value > 100;
});

// Fermer le menu automatiquement lors d'un changement de route
const route = useRoute();
watch(() => route.fullPath, () => {
  closeMenu();
});

// GSAP Animations
const menuMobile = ref<HTMLElement | null>(null);
const ctx = ref<gsap.Context | null>(null);

onMounted(() => {
  ctx.value = gsap.context(() => {
    gsap.set(menuMobile.value, { autoAlpha: 0 });
  });
});

onUnmounted(() => {
  if (ctx.value) {
    ctx.value.revert();
  }
  // Sécurité : réactiver le scroll si le composant est détruit avec le menu ouvert
  document.body.style.overflow = '';
});

watch(isActive, (val) => {
  // Verrouiller / déverrouiller le scroll de la page
  document.body.style.overflow = val ? 'hidden' : '';

  if (ctx.value) {
    ctx.value.add(() => {
      if (val) {
        // Ouverture
        gsap.to(menuMobile.value, {
          autoAlpha: 1,
          duration: 0.5,
          ease: 'power4.out',
          overwrite: true
        });

        gsap.fromTo('.mobile-link',
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power4.out',
              delay: 0.2,
              immediateRender: false
            }
        );
      } else {
        // Fermeture
        gsap.to(menuMobile.value, {
          autoAlpha: 0,
          duration: 0.4,
          ease: 'power4.in',
          overwrite: true
        });
      }
    });
  }
});
</script>

<template>
  <header
      class="fixed top-0 left-0 w-full z-100 transition-all duration-300 border-b border-white/5"
      :class="[
      isActive ? 'bg-black/95 backdrop-blur-md' : (scrolled ? 'bg-black-100/80 backdrop-blur-sm' : 'bg-transparent'),
      { '-translate-y-full': !showTopMenu && !isActive }
    ]"
  >
    <div class="mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Logo / Name -->
      <nuxt-link to="/" class="text-white text-h4 font-semibold group" @click="closeMenu">
        Valentin<span class="text-accent italic">.Yerna</span> <span class="animate-pulse">_</span>
      </nuxt-link>

      <!-- Desktop Nav -->
      <nav class="hidden md:block">
        <ul class="flex items-center">
          <MenuDesktopLink title="Accueil" to="/" />
          <MenuDesktopLink title="Projets" to="/projets" />
          <MenuDesktopLink title="À propos" to="/a-propos" />

          <li class="ml-4 pl-4 border-l border-white/10">
            <AppButton to="/contact" title="Contactez-moi" with-border>Contact</AppButton>
          </li>
        </ul>
      </nav>

      <!-- Hamburger -->
      <button
          type="button"
          class="menu-hamburger md:hidden"
          :class="{ 'menu-hamburger--active': isActive }"
          aria-controls="menu-mobile"
          :aria-expanded="isActive"
          @click="handleClick"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>

  <Teleport to="body">
    <div
        ref="menuMobile"
        id="menu-mobile"
        class="fixed inset-0 top-16 bg-black-100 flex flex-col p-8 overflow-hidden z-50"
        style="visibility: hidden; opacity: 0;"
    >
      <nav class="relative z-10 mt-12">
        <ul class="space-y-2">
          <MenuMobileLink title="Accueil" to="/" />
          <MenuMobileLink title="Projets" to="/projets" />
          <MenuMobileLink title="À propos" to="/a-propos" />
          <MenuMobileLink title="Contact" to="/contact" />
        </ul>
      </nav>

      <div class="mt-auto relative z-10 border-t border-white/5 py-8">
        <p class="font-jetbrains-mono text-[10px] text-grey-300 mb-4 uppercase tracking-widest">// Socials</p>
        <ul class="flex gap-6">
          <li>
            <nuxt-link to="/" class="text-white hover:text-accent transition-colors font-jetbrains-mono text-sm">GitHub</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="text-white hover:text-accent transition-colors font-jetbrains-mono text-sm">LinkedIn</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.menu-hamburger {
  --menu-size: 24px;
  --bar-height: 1px;
  width: var(--menu-size);
  height: var(--menu-size);
  @apply relative cursor-pointer;

  span {
    height: var(--bar-height);
    @apply block w-full bg-accent absolute transition ease-in-out duration-300;
  }

  span:first-child { top: 6px; }
  span:nth-child(2) { top: 12px; }
  span:last-child { top: 18px; }
}

.menu-hamburger.menu-hamburger--active {
  span:first-child { @apply rotate-45 translate-y-1.5; }
  span:nth-child(2) { opacity: 0; }
  span:last-child { @apply -rotate-45 -translate-y-1.5; }
}
</style>
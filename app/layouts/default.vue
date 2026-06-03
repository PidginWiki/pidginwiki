<script setup lang="ts">
const t = useT()
const nav = [
  { key: 'nav.dictionary', to: '/dictionary' },
  { key: 'nav.translator', to: '/translator' },
  { key: 'nav.contribute', to: '/contribute' },
  { key: 'nav.volunteer', to: '/volunteer' },
]
const open = ref(false)
const year = 2026

const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })

const scrolled = ref(false)
function onScroll() {
  scrolled.value = window.scrollY > 4
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-surface">
    <a
      href="#main"
      class="sr-only z-50 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary focus:shadow-[var(--shadow-e2)]"
    >
      Skip to main content
    </a>
    <header
      :class="[
        'sticky top-0 z-30 transition-all duration-200',
        scrolled
          ? 'border-b border-outline bg-surface/85 shadow-[var(--shadow-e1)] backdrop-blur-md'
          : 'bg-transparent',
      ]"
    >
      <div class="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4">
        <NuxtLink to="/" class="flex items-center" aria-label="Pidgin Wiki home">
          <BrandLogo />
        </NuxtLink>

        <nav class="ml-auto hidden items-center gap-1 md:flex">
          <NuxtLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="rounded-full px-3.5 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-2 hover:text-on-surface"
            active-class="text-primary"
          >
            {{ t(item.key) }}
          </NuxtLink>
          <a href="https://docs.pidgin.wiki" class="btn-text">{{ t('nav.docs') }}</a>
          <span class="mx-1 h-6 w-px bg-outline" />
          <LangSwitcher />
        </nav>

        <div class="ml-auto flex items-center gap-1 md:hidden">
          <LangSwitcher />
          <button
            class="inline-flex h-11 w-11 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-2"
            :aria-label="open ? 'Close menu' : 'Open menu'"
            :aria-expanded="open"
            aria-controls="mobile-nav"
            @click="open = !open"
          >
            <span class="material-symbols-outlined">{{ open ? 'close' : 'menu' }}</span>
          </button>
        </div>
      </div>

      <nav v-if="open" id="mobile-nav" class="border-t border-outline bg-surface px-2 py-2 md:hidden">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="block rounded-lg px-4 py-3 text-sm font-medium text-on-surface hover:bg-surface-2"
          @click="open = false"
        >
          {{ t(item.key) }}
        </NuxtLink>
        <a href="https://docs.pidgin.wiki" class="block rounded-lg px-4 py-3 text-sm font-medium text-primary">
          {{ t('nav.docs') }}
        </a>
      </nav>
    </header>

    <main id="main" class="flex-1">
      <slot />
    </main>

    <footer class="mt-24 bg-inverse-surface text-on-inverse-surface">
      <div class="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div class="sm:col-span-2">
          <BrandLogo dark />
          <p class="mt-4 max-w-sm text-sm text-on-inverse-surface/70">
            {{ t('footer.tagline') }}
          </p>
        </div>
        <div>
          <h2 class="text-sm font-medium">{{ t('footer.explore') }}</h2>
          <ul class="mt-4 space-y-3 text-sm text-on-inverse-surface/70">
            <li><NuxtLink to="/dictionary" class="hover:text-on-inverse-surface">{{ t('nav.dictionary') }}</NuxtLink></li>
            <li><NuxtLink to="/translator" class="hover:text-on-inverse-surface">{{ t('nav.translator') }}</NuxtLink></li>
            <li><NuxtLink to="/volunteer" class="hover:text-on-inverse-surface">{{ t('nav.volunteer') }}</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h2 class="text-sm font-medium">{{ t('footer.project') }}</h2>
          <ul class="mt-4 space-y-3 text-sm text-on-inverse-surface/70">
            <li><a href="https://docs.pidgin.wiki" class="hover:text-on-inverse-surface">Documentation</a></li>
            <li><a href="https://github.com/PidginWiki" class="hover:text-on-inverse-surface">GitHub</a></li>
            <li><a href="mailto:contact@pidgin.wiki" class="hover:text-on-inverse-surface">Contact</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white/10">
        <div class="mx-auto max-w-6xl px-4 py-5 text-xs text-on-inverse-surface/60">
          &copy; {{ year }} Pidgin Wiki.
        </div>
      </div>
    </footer>
  </div>
</template>

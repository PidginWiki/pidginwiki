<script setup lang="ts">
import { words } from '~/data/words'

useHead({ title: 'Dictionary - Pidgin.wiki' })

const query = ref('')
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  const list = q
    ? words.filter(
        (w) =>
          w.headword.toLowerCase().includes(q) ||
          w.senses.some((s) => s.definition.toLowerCase().includes(q)),
      )
    : words
  return [...list].sort((a, b) => a.headword.localeCompare(b.headword))
})
</script>

<template>
  <div>
  <AppPageHeader
    title="Dictionary"
    subtitle="A growing reference of Pidgin words. These are community seed entries; the full dictionary is built from the corpus collected through Bandolo."
    motif="open-book"
  />
  <section class="mx-auto max-w-3xl px-4 py-10">
    <div class="flex items-center gap-3 rounded-full border border-outline-strong bg-surface px-5 py-3 focus-within:border-primary">
      <span class="material-symbols-outlined text-on-surface-variant">search</span>
      <input
        v-model="query"
        type="search"
        placeholder="Filter words"
        class="w-full bg-transparent outline-none placeholder:text-on-surface-variant"
      >
    </div>

    <p class="mt-5 text-sm text-on-surface-variant">{{ filtered.length }} entries</p>

    <EmptyState
      v-if="!filtered.length"
      class="mt-2"
      title="No words found"
      :description="`Nothing matches “${query}” yet. Try another spelling, or add it yourself.`"
      action-label="Add a word"
      action-to="/contribute"
    />

    <ul v-else class="mt-2 divide-y divide-outline overflow-hidden rounded-2xl border border-outline">
      <li v-for="w in filtered" :key="w.slug">
        <NuxtLink :to="`/dictionary/${w.slug}`" class="flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-surface-2">
          <span
            :class="['flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold', regionTone(w.region).bg, regionTone(w.region).fg]"
          >
            {{ w.headword.charAt(0).toUpperCase() }}
          </span>
          <div class="min-w-0 flex-1">
            <div class="flex items-baseline gap-2">
              <span class="wiki-title truncate text-lg text-on-surface">{{ w.headword }}</span>
              <span class="text-sm text-on-surface-variant">{{ w.pos }}</span>
            </div>
            <p class="truncate text-on-surface-variant">{{ w.senses[0].definition }}</p>
          </div>
          <span :class="['chip hidden shrink-0 border-transparent sm:inline-flex', regionTone(w.region).bg, regionTone(w.region).fg]">
            {{ w.region }}
          </span>
          <span class="material-symbols-outlined shrink-0 text-on-surface-variant" style="font-size:20px">chevron_right</span>
        </NuxtLink>
      </li>
    </ul>
  </section>
  </div>
</template>

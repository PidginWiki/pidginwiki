<script setup lang="ts">
import { findWord } from '~/data/words'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const word = computed(() => findWord(slug.value))

if (!word.value) {
  throw createError({ statusCode: 404, statusMessage: 'Word not found' })
}

useHead(() => ({
  title: `${word.value?.headword} - Pidgin.wiki`,
  meta: [
    {
      name: 'description',
      content: `${word.value?.headword} (${word.value?.pos}): ${word.value?.senses[0].definition}`,
    },
  ],
}))
</script>

<template>
  <div v-if="word" class="mx-auto max-w-4xl px-4 py-8">
    <nav class="text-sm text-on-surface-variant">
      <NuxtLink to="/dictionary" class="wikilink">Dictionary</NuxtLink>
      <span class="mx-1.5">›</span>
      <span class="text-on-surface">{{ word.headword }}</span>
    </nav>

    <article class="mt-4">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div class="min-w-0 flex-1">
          <header class="border-b border-outline pb-4">
            <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h1 class="wiki-title text-4xl text-on-surface sm:text-5xl">{{ word.headword }}</h1>
              <span class="text-on-surface-variant">/ {{ word.respelling }} /</span>
              <ListenButton :text="word.headword" label />
            </div>
            <p class="mt-1 text-sm italic text-on-surface-variant">
              From Pidgin Wiki, the free dictionary wey everybody fit edit.
            </p>
          </header>

          <h2 class="wiki-h mt-6 text-lg text-on-surface">
            Meaning
            <NuxtLink to="/contribute" class="edit-link">[ edit ]</NuxtLink>
          </h2>
          <ol class="mt-3 space-y-4">
            <li v-for="(sense, i) in word.senses" :key="i" class="flex gap-3">
              <span class="text-on-surface-variant">{{ i + 1 }}.</span>
              <div>
                <p class="text-lg text-on-surface">
                  <span class="italic text-on-surface-variant">{{ word.pos }}</span>
                  &nbsp;{{ sense.definition }}
                </p>
                <p v-if="sense.example" class="mt-1.5 border-l-2 border-outline pl-3 text-on-surface-variant">
                  &ldquo;{{ sense.example }}&rdquo;
                  <span v-if="sense.exampleEn" class="italic">({{ sense.exampleEn }})</span>
                </p>
              </div>
            </li>
          </ol>
        </div>

        <!-- Infobox -->
        <aside class="w-full shrink-0 overflow-hidden rounded-lg border border-outline bg-surface-1 sm:w-64">
          <div class="kente-bar h-1.5" aria-hidden="true" />
          <div class="border-b border-outline bg-surface-2 px-4 py-2 text-center wiki-title font-semibold text-on-surface">
            {{ word.headword }}
          </div>
          <dl class="divide-y divide-outline text-sm">
            <div class="flex items-center justify-between gap-3 px-4 py-2">
              <dt class="text-on-surface-variant">Pronunciation</dt>
              <dd class="flex items-center gap-1 text-on-surface">/ {{ word.respelling }} / <ListenButton :text="word.headword" :size="16" /></dd>
            </div>
            <div class="flex justify-between gap-3 px-4 py-2">
              <dt class="text-on-surface-variant">Part of speech</dt>
              <dd class="text-on-surface">{{ word.pos }}</dd>
            </div>
            <div class="flex justify-between gap-3 px-4 py-2">
              <dt class="text-on-surface-variant">Region</dt>
              <dd>
                <span :class="['chip border-transparent', regionTone(word.region).bg, regionTone(word.region).fg]">{{ word.region }}</span>
              </dd>
            </div>
            <div v-if="word.synonyms?.length" class="px-4 py-2">
              <dt class="text-on-surface-variant">Synonyms</dt>
              <dd class="mt-1.5 flex flex-wrap gap-1.5">
                <span v-for="s in word.synonyms" :key="s" class="chip">{{ s }}</span>
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      <!-- Across dialects -->
      <section class="mt-8">
        <h2 class="wiki-h mb-3 text-lg text-on-surface">
          <span class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-size:20px">public</span>
            Across dialects
          </span>
        </h2>
        <DialectSlider :word="word" />
        <p v-if="!word.variants?.length" class="mt-3 text-sm text-on-surface-variant">
          We never record how <span class="font-medium text-on-surface">{{ word.headword }}</span> changes across regions.
          <NuxtLink to="/contribute" class="wikilink">Add a regional variant</NuxtLink> and help map the dialects.
        </p>
      </section>

      <div class="mt-8 flex items-start gap-3 rounded-lg border border-outline accent-rule bg-surface-1 p-5" style="--accent: var(--color-kente-gold)">
        <span class="material-symbols-outlined text-on-surface-variant">lightbulb</span>
        <p class="text-sm text-on-surface">
          Know a better meaning, a regional difference, or another example?
          <NuxtLink to="/contribute" class="wikilink">Contribute it</NuxtLink>
          and help the corpus grow.
        </p>
      </div>
    </article>
  </div>
</template>

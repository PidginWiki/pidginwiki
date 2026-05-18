<script setup lang="ts">
useHead({ title: 'Symbol concepts - Pidgin.wiki' })

const accents = [
  { name: 'Indigo', hex: '#3f51b5' },
  { name: 'Terracotta', hex: '#b5532e' },
  { name: 'Teal', hex: '#15756b' },
  { name: 'Deep green', hex: '#2f6b3f' },
  { name: 'Ink', hex: '#202124' },
]
const accent = ref('#3f51b5')

const concepts = [
  { id: 'M', name: 'Talking drum', note: 'communication, oral tradition' },
  { id: 'N', name: 'Cowrie shell', note: 'West African heritage, value' },
  { id: 'O', name: 'Many voices', note: 'overlapping bubbles = many dialects' },
  { id: 'P', name: 'Kente weave', note: 'woven from many threads (colourful)' },
]
</script>

<template>
  <section class="mx-auto max-w-4xl px-4 py-12">
    <h1 class="wiki-title text-3xl text-on-surface sm:text-4xl">Symbol marks</h1>
    <p class="mt-2 text-on-surface-variant">
      A symbol paired with the wordmark. Pick a letter and an accent; I'll refine the
      chosen one and apply it across the site, favicon, and app icon.
    </p>

    <div class="mt-6 flex flex-wrap items-center gap-2">
      <span class="text-sm text-on-surface-variant">Accent:</span>
      <button
        v-for="a in accents"
        :key="a.hex"
        class="flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm"
        :class="accent === a.hex ? 'border-on-surface' : 'border-outline'"
        @click="accent = a.hex"
      >
        <span class="h-4 w-4 rounded-full" :style="{ background: a.hex }" />
        {{ a.name }}
      </button>
    </div>

    <div class="mt-8 space-y-6">
      <article v-for="c in concepts" :key="c.id" class="overflow-hidden rounded-2xl border border-outline">
        <div class="flex items-center justify-between bg-surface-1 px-5 py-2">
          <span class="font-medium text-on-surface">{{ c.id }} · {{ c.name }}</span>
          <span class="text-sm text-on-surface-variant">{{ c.note }}</span>
        </div>
        <div class="grid sm:grid-cols-2">
          <!-- light -->
          <div class="flex items-center justify-center gap-3 bg-white px-6 py-12">
            <span :style="{ color: accent }">
              <BrandIcon :variant="c.id" />
            </span>
            <span class="wiki-title text-2xl lowercase text-[#202124]">
              pidgin<span :style="{ color: accent }">.</span>wiki
            </span>
          </div>
          <!-- dark -->
          <div class="flex items-center justify-center gap-3 bg-[#202124] px-6 py-12">
            <span :style="{ color: accent }">
              <BrandIcon :variant="c.id" />
            </span>
            <span class="wiki-title text-2xl lowercase text-white">
              pidgin<span :style="{ color: accent }">.</span>wiki
            </span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

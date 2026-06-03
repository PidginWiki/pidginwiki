<script setup lang="ts">
import { words } from '~/data/words'

useHead({ title: 'Translator - Pidgin.wiki' })

type Dir = 'pcm-en' | 'en-pcm'
const direction = ref<Dir>('pcm-en')
const input = ref('')
const output = ref('')
const translated = ref(false)

const pcmToEn = new Map<string, string>()
const enToPcm = new Map<string, string>()
for (const w of words) {
  const en = w.senses[0].definition.replace(/[.;].*$/, '').split(',')[0]!.trim().toLowerCase()
  pcmToEn.set(w.headword.toLowerCase(), en)
  enToPcm.set(en, w.headword)
}

function glossDemo(text: string, dir: Dir): string {
  const map = dir === 'pcm-en' ? pcmToEn : enToPcm
  return text
    .split(/(\s+)/)
    .map((tok) => {
      const key = tok.trim().toLowerCase().replace(/[.,!?]/g, '')
      if (!key) return tok
      return map.get(key) ?? tok
    })
    .join('')
}

function translate() {
  output.value = glossDemo(input.value, direction.value)
  translated.value = true
}

function swap() {
  direction.value = direction.value === 'pcm-en' ? 'en-pcm' : 'pcm-en'
  ;[input.value, output.value] = [output.value, input.value]
}

const fromLabel = computed(() => (direction.value === 'pcm-en' ? 'Pidgin' : 'English'))
const toLabel = computed(() => (direction.value === 'pcm-en' ? 'English' : 'Pidgin'))
</script>

<template>
  <div>
  <AppPageHeader
    title="Translator"
    subtitle="Translate between Pidgin and English. Your corrections help train the open model."
    icon="translate"
    max="max-w-4xl"
  />
  <section class="mx-auto max-w-4xl px-4 py-10">
    <div class="flex items-start gap-3 rounded-2xl border border-outline bg-surface-1 p-4 text-sm text-on-surface-variant">
      <span class="material-symbols-outlined text-on-surface-variant">info</span>
      <p>
        <span class="font-medium text-on-surface">Preview.</span>
        This is a transparent word-level demo built on the seed dictionary. The neural
        translation model (Langwa) is in development. Corrections you submit help train it.
      </p>
    </div>

    <div class="mt-6 flex items-center justify-center gap-4">
      <span class="font-medium text-on-surface">{{ fromLabel }}</span>
      <button
        class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline-strong text-primary hover:bg-primary-container/40"
        aria-label="Swap direction"
        @click="swap"
      >
        <MotifIcon motif="exchange" :size="22" />
      </button>
      <span class="font-medium text-on-surface">{{ toLabel }}</span>
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <div>
        <label class="text-sm font-medium text-on-surface-variant">{{ fromLabel }}</label>
        <textarea
          v-model="input"
          rows="6"
          :placeholder="direction === 'pcm-en' ? 'Type Pidgin, e.g. how far, you don chop?' : 'Type English'"
          class="field mt-1 resize-none"
        ></textarea>
      </div>
      <div>
        <label class="text-sm font-medium text-on-surface-variant">{{ toLabel }}</label>
        <div
          class="mt-1 min-h-[10rem] w-full rounded-lg border border-outline border-l-4 border-l-primary bg-surface-2 px-4 py-3 text-on-surface"
          aria-live="polite"
        >
          <span v-if="output">{{ output }}</span>
          <span v-else class="text-on-surface-variant">Enter text and press Translate.</span>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <button class="btn-filled disabled:pointer-events-none" :disabled="!input.trim()" @click="translate">
        <span class="material-symbols-outlined" style="font-size: 20px">translate</span>
        Translate
      </button>
    </div>

    <div v-if="translated" class="mt-8 rounded-2xl bg-primary-container p-5 text-on-primary-container">
      <h2 class="wiki-title text-lg">Improve this translation</h2>
      <p class="mt-1 text-sm text-on-primary-container/90">
        If this is wrong, tell us the correct version. Submissions feed the open corpus.
      </p>
      <NuxtLink to="/contribute" class="btn-outlined mt-3 border-on-primary-container/30 text-on-primary-container">
        Submit a correction
      </NuxtLink>
    </div>
  </section>
  </div>
</template>

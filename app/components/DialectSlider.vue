<script setup lang="ts">
import type { Word } from '~/data/words'

const props = withDefaults(
  defineProps<{ word: Word; auto?: boolean }>(),
  { auto: false },
)

interface Lens {
  region: string
  language: string
  flag: string
  accent: string
  form: string
  detail: string
  example?: string
  exampleEn?: string
  isEnglish?: boolean
}

const meta: Record<string, { language: string; flag: string; accent: string }> = {
  English: { language: 'English', flag: '🇬🇧', accent: 'var(--color-primary)' },
  General: { language: 'Naijá & beyond', flag: '🌍', accent: 'var(--color-kente-blue)' },
  Nigeria: { language: 'Naijá', flag: '🇳🇬', accent: 'var(--color-kente-green)' },
  Cameroon: { language: 'Cameroon Pidgin', flag: '🇨🇲', accent: 'var(--color-kente-red)' },
  Ghana: { language: 'Ghanaian Pidgin', flag: '🇬🇭', accent: 'var(--color-kente-gold)' },
  'Sierra Leone': { language: 'Krio', flag: '🇸🇱', accent: 'var(--color-kente-ink)' },
}
function m(region: string) {
  return meta[region] || { language: region, flag: '🗣️', accent: 'var(--color-primary)' }
}

// Short English gloss = first clause of the definition.
const gloss = computed(() => props.word.senses[0]!.definition.replace(/[.;].*$/, '').trim())

const lenses = computed<Lens[]>(() => {
  const w = props.word
  const out: Lens[] = [
    {
      region: 'English',
      ...m('English'),
      form: gloss.value,
      detail: w.senses[0]!.definition,
      example: w.senses[0]!.exampleEn,
      isEnglish: true,
    },
  ]
  if (w.variants?.length) {
    for (const v of w.variants) {
      out.push({
        region: v.region,
        ...m(v.region),
        form: v.form,
        detail: v.note || `“${w.headword}” as used in ${v.region}.`,
        example: v.region === w.region ? w.senses[0]!.example : undefined,
      })
    }
  } else {
    out.push({
      region: w.region,
      ...m(w.region),
      form: w.headword,
      detail: w.senses[0]!.definition,
      example: w.senses[0]!.example,
    })
  }
  return out
})

const idx = ref(0)
watch(lenses, () => { idx.value = 0 })
const active = computed(() => lenses.value[idx.value]!)
function go(i: number) {
  const n = lenses.value.length
  idx.value = ((i % n) + n) % n
}

let timer: ReturnType<typeof setInterval> | undefined
function stop() { clearInterval(timer); timer = undefined }
onMounted(() => {
  if (!props.auto) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => { idx.value = (idx.value + 1) % lenses.value.length }, 5000)
})
onBeforeUnmount(stop)
function pick(i: number) { stop(); go(i) }
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-outline bg-surface">
    <div class="kente-bar h-1.5" aria-hidden="true" />

    <!-- dialect tabs -->
    <div class="flex flex-wrap gap-1.5 border-b border-outline bg-surface-1 px-3 py-2.5">
      <button
        v-for="(l, i) in lenses"
        :key="l.region"
        type="button"
        class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition-colors"
        :style="i === idx ? { background: l.accent, color: '#fff' } : {}"
        :class="i === idx ? '' : 'text-on-surface-variant hover:bg-surface-2'"
        :aria-current="i === idx"
        @click="pick(i)"
      >
        <span aria-hidden="true">{{ l.flag }}</span>{{ l.language }}
      </button>
    </div>

    <!-- sliding track -->
    <div class="relative overflow-hidden">
      <div
        class="flex transition-transform duration-300 ease-[var(--ease-standard)]"
        :style="{ transform: `translateX(-${idx * 100}%)` }"
      >
        <div v-for="l in lenses" :key="l.region" class="w-full shrink-0 accent-rule px-5 py-5" :style="{ '--accent': l.accent }">
          <div class="flex items-center justify-between gap-3">
            <span class="text-xs font-semibold uppercase tracking-wide" :style="{ color: l.accent }">
              {{ l.flag }} {{ l.region === 'English' ? 'In English' : l.region }}
            </span>
            <ListenButton v-if="!l.isEnglish" :text="l.form" />
          </div>
          <p class="wiki-title mt-1 text-3xl text-on-surface">{{ l.form }}</p>
          <p class="mt-1.5 text-sm text-on-surface-variant">{{ l.detail }}</p>
          <p v-if="l.example" class="mt-2 border-l-2 border-outline pl-3 text-sm italic text-on-surface-variant">
            “{{ l.example }}”
          </p>
        </div>
      </div>
    </div>

    <!-- controls -->
    <div class="flex items-center justify-between border-t border-outline px-3 py-2">
      <button
        type="button"
        class="inline-flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-2"
        aria-label="Previous dialect"
        @click="pick(idx - 1)"
      >
        <span class="material-symbols-outlined" style="font-size:20px">chevron_left</span>
      </button>
      <div class="flex items-center">
        <button
          v-for="(l, i) in lenses"
          :key="l.region"
          type="button"
          class="group px-1.5 py-3"
          :aria-label="`Show ${l.region}`"
          :aria-current="i === idx"
          @click="pick(i)"
        >
          <span
            class="block h-1.5 rounded-full transition-all"
            :class="i === idx ? 'w-5' : 'w-1.5 bg-outline-strong group-hover:bg-on-surface-variant'"
            :style="i === idx ? { background: active.accent } : {}"
          />
        </button>
      </div>
      <button
        type="button"
        class="inline-flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-2"
        aria-label="Next dialect"
        @click="pick(idx + 1)"
      >
        <span class="material-symbols-outlined" style="font-size:20px">chevron_right</span>
      </button>
    </div>
  </div>
</template>

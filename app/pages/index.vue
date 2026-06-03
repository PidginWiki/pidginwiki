<script setup lang="ts">
import type { Word } from '~/data/words'

const router = useRouter()
const { data: words } = await useFetch<Word[]>('/api/words', { default: () => [] })

const find = (slug: string) => (words.value || []).find((w) => w.slug === slug) || null
const featured = computed(() => find('wahala'))
const wotd = computed(() => find('japa'))
const dyk = computed(() => find('chop'))

const indexSlugs = ['abeg', 'chop', 'comot', 'how-far', 'japa', 'oga', 'pikin', 'sabi', 'wahala', 'wetin']
const indexWords = computed(() => indexSlugs.map(find).filter(Boolean) as Word[])

const stats = [
  { n: '1,200+', label: 'entries' },
  { n: '3', label: 'dialects' },
  { n: 'CC-BY', label: 'open license' },
]

// The headline swipes through dialects, the way the site itself spans them.
const taglines = [
  { lang: 'English', flag: '🇬🇧', text: 'Pidgin is a cool language. We are making it structured and accessible.' },
  { lang: 'Naijá', flag: '🇳🇬', text: 'Pidgin sweet die. We dey organize-am make everybody sabi-am.' },
  { lang: 'Cameroon', flag: '🇨🇲', text: 'Pidgin fine soteh. So we dey arrange-am make people fit learn-am.' },
]
const introIdx = ref(0)
const tagline = computed(() => taglines[introIdx.value]!)
const tagParts = computed(() => {
  const txt = tagline.value.text
  const i = txt.indexOf('. ')
  return i >= 0 ? { a: txt.slice(0, i + 1), b: txt.slice(i + 2) } : { a: txt, b: '' }
})
let introTimer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  introTimer = setInterval(() => { introIdx.value = (introIdx.value + 1) % taglines.length }, 4600)
})
onBeforeUnmount(() => clearInterval(introTimer))

// Search is a tool on the page, like a real reference site, not the hero.
const query = ref('')
const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return []
  return (words.value || [])
    .filter(
      (w) =>
        w.headword.toLowerCase().includes(q) ||
        w.senses.some((s) => s.definition.toLowerCase().includes(q)),
    )
    .slice(0, 6)
})
function onSearch() {
  const first = results.value[0]
  router.push(first ? `/dictionary/${first.slug}` : '/dictionary')
}
</script>

<template>
  <div>
    <!-- Masthead: welcome line, stats, and a quiet search -->
    <section class="border-b border-outline bg-surface-1">
      <div class="kente-bar h-2" aria-hidden="true" />
      <div class="mx-auto max-w-6xl px-4 py-10 text-center">
        <div class="min-h-[10rem] sm:min-h-[9rem]">
          <Transition name="swipe" mode="out-in">
            <div :key="introIdx">
              <span class="inline-flex items-center gap-1.5 rounded-full border border-outline bg-surface px-3 py-1 text-xs font-semibold text-on-surface-variant shadow-sm">
                <span class="leading-none">{{ tagline.flag }}</span>{{ tagline.lang }}
              </span>
              <h1 class="wiki-title mx-auto mt-3 max-w-2xl text-3xl leading-tight text-on-surface sm:text-4xl">
                {{ tagParts.a }} <span class="text-primary">{{ tagParts.b }}</span>
              </h1>
            </div>
          </Transition>
        </div>
        <p class="mx-auto mt-2 max-w-2xl text-on-surface-variant">
          The free dictionary and encyclopedia of West African Pidgin, wey everybody fit edit.
        </p>

        <dl class="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm text-on-surface-variant">
          <div v-for="s in stats" :key="s.label" class="flex items-baseline gap-1.5">
            <dt class="font-bold text-on-surface">{{ s.n }}</dt>
            <dd>{{ s.label }}</dd>
          </div>
        </dl>

        <form class="relative mx-auto mt-6 max-w-lg" @submit.prevent="onSearch">
          <div class="flex items-center gap-2.5 rounded-lg border border-outline-strong bg-surface px-4 py-2.5 focus-within:border-primary">
            <span class="material-symbols-outlined text-on-surface-variant" style="font-size:20px">search</span>
            <input
              v-model="query"
              type="search"
              placeholder="Search 1,200+ Pidgin words"
              class="w-full bg-transparent text-sm text-on-surface outline-none placeholder:text-on-surface-variant"
              aria-label="Search the dictionary"
            >
          </div>
          <div v-if="results.length" class="absolute left-0 top-full z-40 mt-2 w-full overflow-hidden rounded-xl border border-outline bg-surface text-left shadow-[var(--shadow-e2)]" role="listbox">
            <NuxtLink v-for="w in results" :key="w.slug" :to="`/dictionary/${w.slug}`" role="option" class="flex items-baseline gap-3 px-4 py-2.5 hover:bg-surface-2">
              <span class="font-medium text-on-surface">{{ w.headword }}</span>
              <span class="truncate text-sm text-on-surface-variant">{{ w.senses[0].definition }}</span>
            </NuxtLink>
          </div>
        </form>
      </div>
    </section>

    <!-- Main page: featured article + side rail -->
    <div class="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-3">
      <main class="lg:col-span-2">
        <h2 class="wiki-h text-xl text-on-surface">
          <span class="flex items-center gap-2">
            <span class="kente-bar h-4 w-1.5 rounded-full" aria-hidden="true" />
            Featured word
          </span>
          <NuxtLink to="/contribute" class="edit-link">[ edit ]</NuxtLink>
        </h2>

        <article v-if="featured" class="mt-5">
          <div class="flex flex-col-reverse gap-6 sm:flex-row sm:items-start">
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 class="wiki-title text-4xl text-on-surface">{{ featured.headword }}</h3>
                <span class="text-on-surface-variant">/ {{ featured.respelling }} /</span>
                <ListenButton :text="featured.headword" label />
              </div>
              <p class="mt-1 text-sm italic text-on-surface-variant">
                From Pidgin Wiki, the free dictionary.
              </p>

              <ol class="mt-4 space-y-3">
                <li v-for="(sense, i) in featured.senses" :key="i" class="flex gap-2.5">
                  <span class="text-on-surface-variant">{{ i + 1 }}.</span>
                  <div>
                    <p class="text-on-surface">
                      <span class="italic text-on-surface-variant">{{ featured.pos }}</span>
                      &nbsp;{{ sense.definition }}
                    </p>
                    <p v-if="sense.example" class="mt-1 border-l-2 border-outline pl-3 text-on-surface-variant">
                      &ldquo;{{ sense.example }}&rdquo;
                      <span v-if="sense.exampleEn" class="italic">— {{ sense.exampleEn }}</span>
                    </p>
                  </div>
                </li>
              </ol>

              <p v-if="featured.synonyms?.length" class="mt-4 text-sm text-on-surface-variant">
                <span class="font-medium text-on-surface">See also:</span>
                <template v-for="(s, i) in featured.synonyms" :key="s">
                  <NuxtLink to="/dictionary" class="wikilink">{{ s }}</NuxtLink><span v-if="i < featured.synonyms.length - 1">, </span>
                </template>
              </p>

              <NuxtLink :to="`/dictionary/${featured.slug}`" class="mt-4 inline-block wikilink">
                Read the full entry →
              </NuxtLink>
            </div>

            <!-- Infobox -->
            <aside class="w-full shrink-0 overflow-hidden rounded-lg border border-outline bg-surface-1 sm:w-60">
              <div class="kente-bar h-1.5" aria-hidden="true" />
              <div class="border-b border-outline bg-surface-2 px-4 py-2 text-center wiki-title font-semibold text-on-surface">
                {{ featured.headword }}
              </div>
              <dl class="divide-y divide-outline text-sm">
                <div class="flex justify-between gap-3 px-4 py-2">
                  <dt class="text-on-surface-variant">Pronunciation</dt>
                  <dd class="text-on-surface">/ {{ featured.respelling }} /</dd>
                </div>
                <div class="flex justify-between gap-3 px-4 py-2">
                  <dt class="text-on-surface-variant">Part of speech</dt>
                  <dd class="text-on-surface">{{ featured.pos }}</dd>
                </div>
                <div class="flex justify-between gap-3 px-4 py-2">
                  <dt class="text-on-surface-variant">Region</dt>
                  <dd>
                    <span :class="['chip border-transparent', regionTone(featured.region).bg, regionTone(featured.region).fg]">{{ featured.region }}</span>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>

          <!-- Dialect slider: one word, many tongues -->
          <div class="mt-8">
            <h3 class="wiki-h mb-3 text-lg text-on-surface">
              <span class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary" style="font-size:20px">public</span>
                One word, many tongues
              </span>
            </h3>
            <DialectSlider :word="featured" auto />
          </div>
        </article>
      </main>

      <!-- Side rail -->
      <aside class="space-y-6">
        <section v-if="wotd" class="overflow-hidden rounded-lg border border-outline bg-surface">
          <h2 class="wiki-box-h text-on-surface" style="--accent: var(--color-kente-gold)">Word of the day</h2>
          <div class="px-4 py-3">
            <div class="flex items-baseline gap-2">
              <NuxtLink :to="`/dictionary/${wotd.slug}`" class="wiki-title text-xl wikilink">{{ wotd.headword }}</NuxtLink>
              <span class="text-sm text-on-surface-variant">{{ wotd.pos }}</span>
              <ListenButton :text="wotd.headword" :size="18" class="ml-auto" />
            </div>
            <p class="mt-1 text-sm text-on-surface">{{ wotd.senses[0].definition }}</p>
            <p v-if="wotd.senses[0].example" class="mt-1 text-sm italic text-on-surface-variant">&ldquo;{{ wotd.senses[0].example }}&rdquo;</p>
          </div>
        </section>

        <section v-if="dyk?.variants?.length" class="overflow-hidden rounded-lg border border-outline bg-surface">
          <h2 class="wiki-box-h text-on-surface" style="--accent: var(--color-kente-green)">Did you know…</h2>
          <div class="px-4 py-3 text-sm text-on-surface">
            … that <NuxtLink :to="`/dictionary/${dyk.slug}`" class="wiki-title wikilink">{{ dyk.headword }}</NuxtLink>
            shifts meaning across dialects?
            <ul class="mt-2 space-y-1 text-on-surface-variant">
              <li v-for="v in dyk.variants.slice(0, 3)" :key="v.region">
                <span class="font-medium text-on-surface">{{ v.region }}:</span> {{ v.note }}
              </li>
            </ul>
          </div>
        </section>

        <section class="overflow-hidden rounded-lg border border-outline bg-primary-container text-on-primary-container">
          <h2 class="wiki-box-h" style="--accent: var(--color-primary)">Contribute</h2>
          <div class="px-4 py-3 text-sm">
            <p>Pidgin no get one owner. If you sabi word or how e dey change for your area, add am.</p>
            <NuxtLink to="/contribute" class="btn-filled mt-3 w-full">Add a word</NuxtLink>
          </div>
        </section>
      </aside>
    </div>

    <!-- Compact index, the way a wiki lists pages -->
    <section class="border-t border-outline bg-surface-1">
      <div class="mx-auto max-w-6xl px-4 py-8">
        <h2 class="wiki-h text-lg text-on-surface">
          Browse the dictionary
          <NuxtLink to="/dictionary" class="edit-link">view all →</NuxtLink>
        </h2>
        <div class="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          <NuxtLink v-for="w in indexWords" :key="w.slug" :to="`/dictionary/${w.slug}`" class="wiki-title text-lg wikilink">
            {{ w.headword }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

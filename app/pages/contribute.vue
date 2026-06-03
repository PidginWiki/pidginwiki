<script setup lang="ts">
useHead({ title: 'Contribute - Pidgin.wiki' })

const word = ref('')
const meaning = ref('')
const example = ref('')
const region = ref('General')
const consent = ref(false)
const sent = ref(false)
const attempted = ref(false)
const regions = ['General', 'Nigeria', 'Cameroon', 'Ghana', 'Sierra Leone']

function submit() {
  attempted.value = true
  if (!word.value || !meaning.value || !consent.value) return
  sent.value = true
  attempted.value = false
  word.value = ''
  meaning.value = ''
  example.value = ''
  consent.value = false
}
</script>

<template>
  <div>
    <AppPageHeader
      title="Contribute"
      subtitle="The most valuable thing you can give is the language itself. Every contribution enters the open corpus under CC-BY-4.0 and credits the community it came from."
      motif="pen"
      max="max-w-5xl"
    />

    <section class="mx-auto max-w-5xl px-4 py-10">
      <!-- Volunteer CTA (full program lives on its own page) -->
      <NuxtLink
        to="/volunteer"
        class="group flex items-center gap-4 overflow-hidden rounded-3xl border border-outline bg-gradient-to-br from-[#eef1ff] via-surface to-[#fcf6ec] p-6 transition-shadow hover:shadow-[var(--shadow-e1)]"
      >
        <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-on-primary">
          <span class="material-symbols-outlined">volunteer_activism</span>
        </span>
        <div class="flex-1">
          <h2 class="wiki-title text-lg text-on-surface">Commit to contribute</h2>
          <p class="text-sm text-on-surface-variant">
            Get a sentence to translate by email or WhatsApp, on your schedule. Two minutes builds the corpus.
          </p>
        </div>
        <span class="material-symbols-outlined text-primary transition-transform group-hover:translate-x-1">arrow_forward</span>
      </NuxtLink>

      <div class="mt-6 grid gap-4 md:grid-cols-3">
        <div class="m3-card p-5 md:col-span-1">
          <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-container text-primary">
            <MotifIcon motif="bandolo-bot" :size="24" />
          </span>
          <h2 class="wiki-title mt-3 text-lg text-on-surface">Chat with Bandolo</h2>
          <p class="mt-1 text-sm text-on-surface-variant">
            Our bot asks simple questions and turns your answers into corpus data. Chat
            channels open during the data drive.
          </p>
          <a href="https://docs.pidgin.wiki/architecture/bandolo/" class="btn-text -ml-4 mt-2">How Bandolo works</a>
        </div>

        <div class="m3-card p-6 md:col-span-2">
          <h2 class="wiki-title text-lg text-on-surface">Add a word now</h2>
          <p class="mt-1 text-sm text-on-surface-variant">Got a word the dictionary is missing? Drop it here.</p>

          <form v-if="!sent" class="mt-4 space-y-4" @submit.prevent="submit">
            <div>
              <label for="cw" class="text-sm font-medium text-on-surface">Word or phrase</label>
              <input id="cw" v-model="word" required class="field mt-1" placeholder="e.g. wahala" :aria-invalid="attempted && !word ? 'true' : undefined" aria-describedby="cw-error" >
              <p v-if="attempted && !word" id="cw-error" class="error-text">Please enter a word.</p>
            </div>
            <div>
              <label for="cm" class="text-sm font-medium text-on-surface">What does it mean?</label>
              <input id="cm" v-model="meaning" required class="field mt-1" placeholder="e.g. trouble; problem" :aria-invalid="attempted && !meaning ? 'true' : undefined" aria-describedby="cm-error" >
              <p v-if="attempted && !meaning" id="cm-error" class="error-text">Please add a meaning.</p>
            </div>
            <div>
              <label for="ce" class="text-sm font-medium text-on-surface">Example sentence <span class="text-on-surface-variant">(optional)</span></label>
              <input id="ce" v-model="example" class="field mt-1" placeholder="e.g. No wahala, I dey come" >
            </div>
            <div>
              <label for="cr" class="text-sm font-medium text-on-surface">Region</label>
              <select id="cr" v-model="region" class="field mt-1">
                <option v-for="r in regions" :key="r">{{ r }}</option>
              </select>
            </div>
            <label class="flex items-start gap-3 text-sm text-on-surface-variant">
              <input v-model="consent" type="checkbox" class="mt-1 h-4 w-4 accent-[var(--color-primary)]" >
              I agree that my contribution may be published in the open Pidgin Wiki corpus under CC-BY-4.0.
            </label>
            <p v-if="attempted && !consent" class="error-text -mt-2">Please accept this to continue.</p>
            <button type="submit" class="btn-filled">
              Submit contribution
            </button>
          </form>

          <div v-else class="mt-4 flex items-start gap-3 rounded-2xl bg-primary-container p-4 text-on-primary-container">
            <span class="material-symbols-outlined">check_circle</span>
            <div>
              <p class="wiki-title text-lg">Thank you. Na you sabi am pass.</p>
              <p class="mt-1 text-sm text-on-primary-container/90">
                Your contribution was recorded for review. Add another whenever you like.
              </p>
              <button class="btn-text -ml-4 mt-1 text-on-primary-container" @click="sent = false">Add another word</button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 rounded-lg border border-outline accent-rule bg-surface-1 p-5 text-sm text-on-surface-variant" style="--accent: var(--color-kente-blue)">
        Want to contribute code or linguistic expertise? See the
        <a href="https://docs.pidgin.wiki/contribute/" class="wikilink">contribution guide</a>
        or the project on
        <a href="https://github.com/PidginWiki" class="wikilink">GitHub</a>.
      </div>
    </section>
  </div>
</template>

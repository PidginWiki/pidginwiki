<script setup lang="ts">
useHead({ title: 'Volunteer - Pidgin.wiki' })

const channel = ref<'email' | 'whatsapp'>('email')
const contact = ref('')
const variant = ref('Naijá (Nigeria)')
const frequency = ref('daily')
const committed = ref(false)
const error = ref('')

const variants = ['Naijá (Nigeria)', 'Cameroon Pidgin', 'Ghanaian Pidgin', 'Krio (Sierra Leone)']
const frequencies = [
  { id: 'daily', label: 'Every day', hint: '~2 min' },
  { id: 'few', label: 'Few times a week', hint: 'relaxed' },
  { id: 'weekly', label: 'Once a week', hint: 'light' },
]

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
}
function isPhone(v: string) {
  return /^\+?[0-9\s-]{7,}$/.test(v.trim())
}
function commit() {
  error.value = ''
  if (channel.value === 'email' && !isEmail(contact.value)) {
    error.value = 'Abeg enter a correct email address.'
    return
  }
  if (channel.value === 'whatsapp' && !isPhone(contact.value)) {
    error.value = 'Abeg enter a correct phone number.'
    return
  }
  // Backend (auth + scheduled email / WhatsApp prompts) wires in here later.
  committed.value = true
}
function setChannel(c: 'email' | 'whatsapp') {
  channel.value = c
  contact.value = ''
  error.value = ''
}
</script>

<template>
  <div>
    <AppPageHeader
      title="Volunteer"
      subtitle="Commit to contribute: get one Pidgin sentence to translate, on your schedule. A couple of minutes builds the open corpus that trains the model."
      motif="community"
      max="max-w-5xl"
    />

    <section class="mx-auto max-w-5xl px-4 py-10">
      <div class="grid gap-10 md:grid-cols-2 md:items-center">
        <!-- Illustration + steps -->
        <div>
          <svg viewBox="0 0 360 260" class="w-full max-w-sm" role="img" aria-label="A daily sentence to translate">
            <rect x="20" y="40" width="220" height="150" rx="18" fill="#eef1ff" />
            <rect x="20" y="40" width="220" height="38" rx="18" fill="#e0e3f8" />
            <circle cx="40" cy="59" r="6" fill="#ef3b30" />
            <circle cx="58" cy="59" r="6" fill="#f7b500" />
            <circle cx="76" cy="59" r="6" fill="#1aa64b" />
            <rect x="40" y="98" width="150" height="12" rx="6" fill="#c7cdf2" />
            <rect x="40" y="120" width="180" height="12" rx="6" fill="#c7cdf2" />
            <rect x="40" y="142" width="110" height="12" rx="6" fill="#c7cdf2" />
            <!-- reply bubble -->
            <g transform="translate(150 150)">
              <rect x="0" y="0" width="180" height="78" rx="20" fill="#1aa64b" />
              <path d="M24 78 L24 96 L48 78 Z" fill="#1aa64b" />
              <rect x="22" y="22" width="120" height="11" rx="5.5" fill="#ffffff" opacity="0.95" />
              <rect x="22" y="42" width="90" height="11" rx="5.5" fill="#ffffff" opacity="0.7" />
            </g>
            <!-- kente accent -->
            <g transform="translate(284 20)">
              <rect width="56" height="56" rx="14" fill="#fbf7ee" />
              <rect y="12" width="56" height="7" fill="#0aa84f" />
              <rect y="25" width="56" height="7" fill="#f01b2f" />
              <rect y="38" width="56" height="7" fill="#ffbc11" />
              <rect x="14" width="6" height="56" fill="#1c1610" />
              <rect x="36" width="6" height="56" fill="#1473e6" />
            </g>
          </svg>

          <ol class="mt-6 space-y-3 text-sm">
            <li class="flex items-center gap-3">
              <span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary-container">1</span>
              <span class="text-on-surface">Choose email or WhatsApp, and how often.</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary-container">2</span>
              <span class="text-on-surface">We send you a sentence to translate into your Pidgin.</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary-container">3</span>
              <span class="text-on-surface">Your reply joins the open, CC-BY corpus.</span>
            </li>
          </ol>
        </div>

        <!-- Sign-up form -->
        <div class="rounded-3xl border border-outline bg-surface p-6 shadow-[var(--shadow-e1)] sm:p-8">
          <form v-if="!committed" class="space-y-5" novalidate @submit.prevent="commit">
            <div>
              <span class="text-sm font-medium text-on-surface">How should we reach you?</span>
              <div class="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  :class="['flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors', channel === 'email' ? 'border-primary bg-primary-container text-on-primary-container' : 'border-outline text-on-surface-variant hover:bg-surface-2']"
                  @click="setChannel('email')"
                >
                  <span class="material-symbols-outlined" style="font-size:20px">mail</span> Email
                </button>
                <button
                  type="button"
                  :class="['flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors', channel === 'whatsapp' ? 'border-primary bg-primary-container text-on-primary-container' : 'border-outline text-on-surface-variant hover:bg-surface-2']"
                  @click="setChannel('whatsapp')"
                >
                  <span class="material-symbols-outlined" style="font-size:20px">chat</span> WhatsApp
                </button>
              </div>
            </div>

            <div>
              <label for="contact" class="text-sm font-medium text-on-surface">{{ channel === 'email' ? 'Email' : 'WhatsApp number' }}</label>
              <input
                id="contact"
                v-model="contact"
                :type="channel === 'email' ? 'email' : 'tel'"
                :placeholder="channel === 'email' ? 'you@example.com' : '+234 800 000 0000'"
                class="field mt-1"
                :aria-invalid="error ? 'true' : undefined"
                aria-describedby="contact-error"
                @input="error = ''"
              />
              <p v-if="error" id="contact-error" class="error-text">{{ error }}</p>
            </div>

            <div>
              <label for="vv" class="text-sm font-medium text-on-surface">Your Pidgin</label>
              <select id="vv" v-model="variant" class="field mt-1">
                <option v-for="v in variants" :key="v">{{ v }}</option>
              </select>
            </div>

            <div>
              <span class="text-sm font-medium text-on-surface">How often?</span>
              <div class="mt-2 grid grid-cols-3 gap-2">
                <button
                  v-for="f in frequencies"
                  :key="f.id"
                  type="button"
                  :class="['rounded-xl border px-2 py-2.5 text-center transition-colors', frequency === f.id ? 'border-primary bg-primary-container text-on-primary-container' : 'border-outline text-on-surface-variant hover:bg-surface-2']"
                  :aria-pressed="frequency === f.id"
                  @click="frequency = f.id"
                >
                  <span class="block text-sm font-medium">{{ f.label }}</span>
                  <span class="block text-xs opacity-70">{{ f.hint }}</span>
                </button>
              </div>
            </div>

            <button type="submit" :disabled="!contact" class="btn-filled w-full">
              Start getting sentences
            </button>
            <p class="text-center text-xs text-on-surface-variant">Free. Stop anytime.</p>
          </form>

          <div v-else class="flex flex-col items-center py-6 text-center">
            <span class="flex h-14 w-14 items-center justify-center rounded-full bg-primary-container text-primary">
              <span class="material-symbols-outlined" style="font-size:30px">{{ channel === 'email' ? 'mark_email_read' : 'chat' }}</span>
            </span>
            <p class="wiki-title mt-4 text-xl text-on-surface">You don commit. Thank you!</p>
            <p class="mt-1 text-sm text-on-surface-variant">
              We go send your first sentence to <span class="font-medium text-on-surface">{{ contact }}</span> soon.
            </p>
            <button class="btn-text mt-2" @click="committed = false">Change my details</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

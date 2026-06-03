<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
useHead({ title: `${props.error.statusCode} - Pidgin.wiki` })

const is404 = computed(() => props.error.statusCode === 404)
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-surface px-4 text-center">
    <BrandLogo />
    <p class="mt-10 text-6xl font-bold text-primary">{{ error.statusCode }}</p>
    <h1 class="mt-3 text-2xl font-bold text-on-surface">
      {{ is404 ? 'Dis page no dey' : 'Wahala dey' }}
    </h1>
    <p class="mt-2 max-w-md text-on-surface-variant">
      {{ is404
        ? 'We no fit find the page wey you dey look for. E fit don comot or the link bend.'
        : 'Something spoil for our side. Abeg try again small time.' }}
    </p>
    <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
      <button class="btn-filled" @click="clearError({ redirect: '/' })">Go home</button>
      <NuxtLink to="/dictionary" class="btn-tonal" @click="clearError()">Open dictionary</NuxtLink>
    </div>
  </div>
</template>

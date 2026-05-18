<script setup lang="ts">
withDefaults(
  defineProps<{ text: string; label?: boolean; size?: number }>(),
  { label: false, size: 20 },
)
const { speak, speaking, supported } = useSpeak()
</script>

<template>
  <button
    v-if="supported"
    type="button"
    class="inline-flex items-center gap-1 rounded-full text-sm wikilink"
    :class="speaking ? 'opacity-60' : ''"
    :title="`Hear “${text}” (synthesized voice)`"
    :aria-label="`Hear ${text}`"
    @click="speak(text)"
  >
    <span class="material-symbols-outlined" :style="{ fontSize: `${size}px` }">
      {{ speaking ? 'graphic_eq' : 'volume_up' }}
    </span>
    <span v-if="label">listen</span>
  </button>
</template>

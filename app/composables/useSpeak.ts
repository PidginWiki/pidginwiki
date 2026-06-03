// Pronounces text aloud using the browser's built-in speech synthesis.
// This is a synthesized stand-in until community voice recordings are gathered;
// real recordings will replace it per entry.
export function useSpeak() {
  const speaking = ref(false)
  const supported = ref(false)

  onMounted(() => {
    supported.value = typeof window !== 'undefined' && 'speechSynthesis' in window
  })

  function speak(text: string) {
    if (!text || !supported.value) return
    const synth = window.speechSynthesis
    synth.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = 0.92
    utter.pitch = 1
    // Prefer a West-African or British English voice when one is installed;
    // these are closer to Pidgin's vowels than a US default.
    const voices = synth.getVoices()
    const preferred = voices.find((v) => /en-(NG|GH|ZA|GB)/i.test(v.lang))
    if (preferred) utter.voice = preferred
    utter.onstart = () => { speaking.value = true }
    utter.onend = () => { speaking.value = false }
    utter.onerror = () => { speaking.value = false }
    synth.speak(utter)
  }

  onBeforeUnmount(() => {
    if (supported.value) window.speechSynthesis.cancel()
  })

  return { speak, speaking, supported }
}

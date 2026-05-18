// Maps a region label to a Material tonal colour pair, so region chips and letter
// avatars stay colourful but consistent across the site.
export interface Tone {
  bg: string
  fg: string
}

const map: Record<string, Tone> = {
  General: { bg: 'bg-blue-c', fg: 'text-on-blue-c' },
  Nigeria: { bg: 'bg-green-c', fg: 'text-on-green-c' },
  Cameroon: { bg: 'bg-red-c', fg: 'text-on-red-c' },
  Ghana: { bg: 'bg-yellow-c', fg: 'text-on-yellow-c' },
  'Sierra Leone': { bg: 'bg-primary-container', fg: 'text-on-primary-container' },
}

export function regionTone(region: string): Tone {
  return map[region] ?? { bg: 'bg-surface-2', fg: 'text-on-surface-variant' }
}

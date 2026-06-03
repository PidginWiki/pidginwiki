import { words } from '../../app/data/words'

// Mock words API. Swap this for the real Bandolo-backed service later;
// the frontend already consumes it through this endpoint.
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const slug = typeof query.slug === 'string' ? query.slug : undefined
  if (slug) return words.find((w) => w.slug === slug) ?? null
  return words
})

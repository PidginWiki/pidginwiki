import { describe, it, expect } from 'vitest'
import { regionTone } from '../app/utils/regionTone'

describe('regionTone', () => {
  it('maps a known region to its tonal classes', () => {
    expect(regionTone('Nigeria')).toEqual({ bg: 'bg-green-c', fg: 'text-on-green-c' })
  })

  it('falls back to neutral surface for an unknown region', () => {
    expect(regionTone('Atlantis')).toEqual({ bg: 'bg-surface-2', fg: 'text-on-surface-variant' })
  })
})

import { defineConfig } from 'vitest/config'

// Unit tests run in a DOM-like environment so component and browser-facing
// logic can be tested. Add @nuxt/test-utils for full Nuxt runtime tests later.
export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['tests/**/*.test.ts'],
  },
})

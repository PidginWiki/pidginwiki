# Pidgin Wiki

The free, open dictionary, translator, and encyclopedia of West African Pidgin,
wey everybody fit edit.

[pidgin.wiki](https://pidgin.wiki)

## Why

Pidgin is spoken by over 100 million people across Nigeria, Cameroon, Ghana,
Sierra Leone and beyond, yet it has never had a proper, openly licensed
reference of its own. Pidgin Wiki is building that: a living record of the
language that treats it as the rich, structured tongue it is, and that captures
how words shift from one region to the next instead of flattening them into a
single "standard."

It is a public good. Anyone can read it, anyone can contribute to it, and the
words belong to the people who speak them.

## What's inside

- **Dictionary.** Each word carries its meaning, real examples, pronunciation
  you can hear, and how it changes across dialects.
- **Many tongues, one word.** Entries show a word across English, Naijá,
  Cameroon Pidgin, Ghanaian Pidgin and Krio, side by side.
- **Translator.** Pidgin to English and back. A transparent word-level preview
  today, with the Langwa neural model in development.
- **Built in the open.** Free to read, and shaped by the people who speak it.

## How it grows

Pidgin Wiki is community first. People add words, translate sentences, and
transcribe Pidgin audio and video; those contributions are reviewed and feed an
open corpus that anyone can learn from and that trains the Langwa model. The
reference you read here is the published, curated view of that corpus.

If you speak Pidgin, you already know things this dictionary does not. Adding a
word, a meaning, or how your area says it takes a minute and makes the record
better for everyone.

## Develop

Built with [Nuxt 4](https://nuxt.com/) and [Tailwind CSS](https://tailwindcss.com/),
deployed to Cloudflare Workers.

```sh
pnpm install
pnpm dev          # local dev server
pnpm build        # production build (Cloudflare Workers)
```

Pushing to `master` builds with `NITRO_PRESET=cloudflare_module` and deploys via
Wrangler (`.github/workflows/deploy.yml`); set `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` as repository secrets.


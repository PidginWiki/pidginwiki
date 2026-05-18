# Pidgin.wiki

The public [Pidgin.wiki](https://pidgin.wiki) website: a free dictionary, translator, and
encyclopedia for West African Pidgin English.

Built with [Nuxt 4](https://nuxt.com/) and [Tailwind CSS](https://tailwindcss.com/).

## Develop

```sh
pnpm install
pnpm dev          # local dev server
nuxt generate     # static build to .output/public
```

If `pnpm` reports ignored build scripts, run the binary directly with
`./node_modules/.bin/nuxt generate`; the native dependencies are optional and the build
succeeds without them.

## Structure

```
app/
  pages/        home, dictionary, dictionary/[slug], translator, contribute
  layouts/      site header and footer
  data/words.ts seed dictionary entries
  assets/css    Tailwind entry and theme
public/         brand assets, icons, CNAME
```

The dictionary currently ships seed entries. In production the dictionary and translator
are powered by the corpus collected through [Bandolo](https://docs.pidgin.wiki/architecture/bandolo/)
and the Langwa model.

## Deploy

Pushing to `master` triggers the GitHub Pages workflow in
`.github/workflows/deploy.yml`. The custom domain is set via `public/CNAME`.

## License

Source code is licensed under Apache-2.0. See [LICENSE](./LICENSE). Dictionary and corpus
content is licensed CC-BY-4.0.

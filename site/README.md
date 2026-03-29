# Sim2Sim-OnePass Site

This folder contains a small static site for the public-facing Sim2Sim-OnePass research artifact.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Static assets only

## Pages

- `/` showcase page
- `/docs` technical documentation page
- `/results` visual and metric explorer

## Asset conventions

- `public/assets/videos/`
- `public/assets/images/`
- `public/assets/reports/`

These are populated from the canonical `onepass_release` artifact and can be refreshed when new canonical media is selected.

## Local run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Static hosting note

- The app uses `HashRouter` and a relative Vite base so it can be deployed as a simple static bundle on GitHub Pages without server-side route rewrites.
- The intended repo layout is: source lives on `main`, built site publishes to `gh-pages`.
- A GitHub Actions deploy workflow is included at `../.github/workflows/deploy-site.yml`.

## Notes

- This workspace did not have Node.js available on PATH while the site was authored, so the final install/build step could not be executed here.
- The app is intentionally static and lightweight. It is designed to foreground real videos, real plots, and canonical PASS metrics rather than decorative interaction.

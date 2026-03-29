# Sim2Sim-OnePass Site

This branch contains the public website for the Sim2Sim-OnePass research artifact.

Live endpoints:

- website: `https://anthony-olevester.github.io/Robotics_sim-to-sim_OnePass/`
- repository: `https://github.com/ANTHONY-OLEVESTER/Robotics_sim-to-sim_OnePass`
- PyPI companion package: `https://pypi.org/project/sim2sim-onepass/`

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

These are populated from the curated public repo artifact and can be refreshed when new canonical media is selected.

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
- This branch now carries the compiled static site at branch root and the source files used to rebuild it.
- The intended repo layout is: curated repo content on `main`, package work on `pypi-package`, website publishing on `gh-pages`.

## Notes

- The app is intentionally static and lightweight. It is designed to foreground real videos, real plots, and canonical PASS metrics rather than decorative interaction.
- The website should explain the site and link outward to the repo and PyPI package, rather than trying to replace the repository documentation.

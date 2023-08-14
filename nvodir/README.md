# Astro Landing Page with Matrix canvas as background 
(pretty efficient template base from https://github.com/mhyfritz/astro-landing-page)

[![Built with Astro](https://astro.badg.es/v1/built-with-astro.svg)](https://astro.build)

> An Astro + Tailwind CSS example/template + Preact component for Matrixed background for your landing pages.

> Configure as u wish: (/src/components/YellowMatrix.tsx)
 * MINIMAL_SPEED
 * MAX_ADD_SPEED
 * MATRIX_CANVAS_TRAIL_INDICE
 * REDROP_AFTER_INVISIBLE_RATIO 
 * FONT
 * FONT_SIZE
 * FONT_COLOR

![Screenshots of Astro Landing Page](screenshot.png)

## Features

- 💨 Tailwind CSS for styling
- 🎨 Themeable
  - CSS variables are defined in `src/styles/theme.css` and mapped to Tailwind classes (`tailwind.config.cjs`)
- 🌙 Dark mode
- 📱 Responsive (layout, images, typography)
- ♿ Accessible (as measured by https://web.dev/measure/)
- 🔎 SEO-enabled (as measured by https://web.dev/measure/)
- 🔗 Open Graph tags for social media sharing
- 💅 [Prettier](https://prettier.io/) setup for both [Astro](https://github.com/withastro/prettier-plugin-astro) and [Tailwind](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
 - Preact component island to render your landing pages background

## Commands

| Command                | Action                                            |
| :--------------------- | :------------------------------------------------ |
| `npm install`          | Install dependencies                              |
| `npm run dev`          | Start local dev server at `localhost:3000`        |
| `npm run build`        | Build your production site to `./dist/`           |
| `npm run preview`      | Preview your build locally, before deploying      |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check`  |
| `npm run astro --help` | Get help using the Astro CLI                      |
| `npm run format`       | Format code with [Prettier](https://prettier.io/) |
| `npm run clean`        | Remove `node_modules` and build output            |

## Credits

- based on https://github.com/mhyfritz/astro-landing-page
- other than that, a lot of material (showcase data, copy) was taken from official Astro sources, in particular https://astro.build/blog/introducing-astro/ and https://github.com/withastro/astro.build

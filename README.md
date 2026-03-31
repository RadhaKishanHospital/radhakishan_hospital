# Hospital website design

This is a React + Vite codebase for a hospital website design. The original design source is available on Figma:
https://www.figma.com/design/BgxP4veoHHTk9xlXnED9yq/Hospital-website-design

## Local development

- Install dependencies: `npm install`
- Start local dev server: `npm run dev`

## Production checks

- Create production build: `npm run build`
- Run all checks: `npm run check`
- Preview production build locally: `npm run preview`

## Vercel deployment

This repository includes `vercel.json` configured for:
- Vite framework output
- SPA rewrites to `index.html`
- Basic security headers

To deploy:
1. Import this repository into Vercel.
2. Use defaults (`npm install`, `npm run build`, output directory `dist`).
3. Deploy.

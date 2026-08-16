# Sustainable Fit-Out

A standalone web tool where a subcontractor enters material and waste data for a
fit-out project and exports it as a CSV file or a branded PDF report, alongside an
illustrative ESG dashboard showing what portfolio-level review could look like.

Built for Fourfront Group fit-out projects — no login, no database, no backend.
Nothing entered is stored anywhere; the exported file is the record.

Full requirements: [`docs/product-spec.md`](docs/product-spec.md).

## Stack

- React + Vite + Tailwind CSS 4
- jsPDF + jspdf-autotable (client-side PDF generation)
- Deployed on Netlify (auto-deploy on push to `main`)

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

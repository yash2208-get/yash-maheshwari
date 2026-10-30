# Yash Maheshwari · Portfolio

> Senior Software Engineer · Backend Architect · AI Engineer. Personal portfolio built with **pure HTML, CSS & vanilla JavaScript**: no frameworks, no build step.

🔗 **Live:** https://yash2208-get.github.io/yash-maheshwari/

## ✨ Highlights
- Dark glassmorphism UI with animated aurora background, gradient borders and neon accents
- 3D tilt cards, spotlight hover, magnetic buttons, scroll reveal and animated counters
- Animated experience timeline, interactive skills explorer and AI pipeline visualizer
- Case-study modals (Problem → Solution → Architecture → Impact) with deep links (`#project-<id>`)
- Live GitHub section (REST API + session caching), ⌘K command palette, working contact form
- SEO: semantic HTML, Open Graph / Twitter cards, JSON-LD Person schema, sitemap, canonical
- Accessible: skip link, visible focus, ARIA, keyboard support, `prefers-reduced-motion`
- Fast: zero dependencies, inline SVG icon sprite, lazy GitHub fetch, GPU-friendly animations

## 📁 Structure
```
yash-maheshwari/
├── index.html            # Single-page portfolio (semantic, SEO-ready)
├── css/style.css         # Design tokens, components, animations, responsive
├── js/data.js            # Projects & case studies (edit here)
├── js/main.js            # Interactions: reveal, tilt, timeline, modal, GitHub, form, ⌘K
├── assets/
│   ├── favicon.svg
│   ├── og-image.png      # 1200×630 social preview
│   ├── Yash_Maheshwari_Resume.pdf
│   └── Yash_Maheshwari_Resume.docx
├── yash.jpg              # Profile photo (keep from the current repo)
├── robots.txt · sitemap.xml · site.webmanifest · .nojekyll
└── README.md
```

## 🚀 Run locally
```bash
npx serve .        # or: python -m http.server 8080
```

## 🌐 Deploy to GitHub Pages
1. Copy everything into the root of the `yash-maheshwari` repository (keep `yash.jpg`).
2. Commit and push to `main`.
3. Settings → Pages → Deploy from branch → `main` / `(root)`.
4. Optional: add a custom domain (e.g. `yashmaheshwari.dev`) and update the canonical, OG and sitemap URLs. `robots.txt` only takes effect at a domain root.

## ✏️ Customize
- **Projects & case studies** → `js/data.js` (add `image: "assets/projects/<id>.webp"` to replace a mockup with a screenshot)
- **Résumé** → replace `assets/Yash_Maheshwari_Resume.pdf`
- **Contact form** → the first submission sends a FormSubmit activation email to the inbox; confirm it once
- **Colors, fonts, radii** → CSS variables at the top of `css/style.css`

## 📄 License
MIT © Yash Maheshwari
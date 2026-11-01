# InkBloom Reader — website

Static website for InkBloom Reader (11 pages, no build step).

- `index.html` — home, downloads, screenshots, FAQ
- `library.html`, `reader.html`, `import.html`, `stats.html`, `transfer.html` — how the reader works
- `about.html`, `vision.html`, `contact.html`, `privacy.html`, `terms.html` — company and legal pages
- `assets/logo.png` — the original InkBloom logo; `assets/profile.js` — local-only profile (name + photo, browser storage only)
- `assets/shot-phone.png`, `assets/shot-desktop.png` — real screenshots of the live web reader
- `robots.txt`, `sitemap.xml`, `llms.txt`, `schema/*.json` — search and AI-answer-engine files

All download links point to the public `wjia-n/inkbloom-downloads` releases, so they stay live
even if the code repository is made private. Page content contains no mock books, stats or claims:
every number on these pages is a real property of the app.

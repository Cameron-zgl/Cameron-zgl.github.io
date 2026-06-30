# gulizhu.github.io

Personal academic website for **Guli Zhu** (M.S. Health Data Science, University of Michigan),
broadly interested in multimodal foundation models, AI for science and healthcare, and trustworthy
AI, with current work on medical AI and model editing (M³Bench, ECCV 2026).
A static, dependency-free HTML/CSS/JS site styled in the spirit of
[al-folio](https://github.com/alshedivat/al-folio), with a CV page layout inspired by
[pranavraj575.github.io](https://pranavraj575.github.io/).

No build step, no Jekyll, no Node/Ruby toolchain required — just plain files, ready for GitHub Pages.

## Structure

```
web/
├── index.html              Home (bio, research interests, news, selected pubs/projects)
├── research.html           Research interests
├── publications.html       Full publication list, incl. detailed M³Bench (ECCV 2026) entry + BibTeX
├── projects.html           Non-publication research/engineering projects
├── cv.html                 Web CV with collapsible sections + PDF link
├── others.html             Personal / misc page
├── 404.html                GitHub Pages 404
├── .nojekyll                Disables Jekyll processing (pure static site)
└── assets/
    ├── css/style.css       Shared stylesheet (light/dark theme)
    ├── js/main.js          Theme toggle, nav, CV collapsibles, BibTeX copy
    ├── img/                Site images (M³Bench figure, research diagrams, favicon)
    ├── pdf/cv.pdf           Compiled CV (from ../CV/cv.tex)
    └── bibtex/m3bench.bib  Standalone BibTeX file
```

M³Bench (the ECCV 2026 paper) is treated as a **publication**, not a portfolio project: its full
entry — abstract, contributions, figure, and links — lives at `publications.html#m3bench`.
`projects.html` is reserved for non-publication research/engineering work (e.g., the
ultrasound–diabetes prediction pipeline, the DIAG pathology RAG benchmark).

External fonts (Google Fonts: Roboto / Roboto Slab) and icons (Font Awesome 6, via cdnjs) are
loaded from CDN — an internet connection is needed when viewing the site, exactly as it will be
once deployed to GitHub Pages.

## Local preview

No installation needed beyond a local web server (opening `index.html` directly also mostly
works, but a server avoids any path/CORS quirks). From this folder:

```bash
# Option A — Python (already on most systems)
python -m http.server 8000
# then open http://localhost:8000

# Option B — Node, if you have it
npx serve .
```

## Deploying to GitHub Pages (Cameron-zgl/gulizhu.github.io)

This folder is already a git repository with `origin` set to
`https://github.com/Cameron-zgl/gulizhu.github.io.git`. To publish:

```bash
cd E:\VLM\web
git add -A
git commit -m "Build personal academic website"
git push origin main
```

GitHub Pages for a `<username>.github.io` repo serves the `main` branch root automatically —
no extra configuration needed. The site will be live at `https://gulizhu.github.io/`
(or `https://cameron-zgl.github.io/`, depending on the GitHub account namespace) a minute or two
after pushing.

## Updating the CV PDF

The source of truth is `E:\VLM\CV\cv.tex`. To regenerate the PDF after editing it:

```bash
cd E:\VLM\CV
pdflatex cv.tex
copy cv.pdf ..\web\assets\pdf\cv.pdf
```

(Requires a LaTeX distribution such as TinyTeX/MiKTeX with the `enumitem`, `titlesec`, and
`pifont` packages.)

## Placeholders to replace

Search the site for `placeholder-note` / `PLACEHOLDER` / `#` hrefs. As of this build:

- **Google Scholar profile URL** — every page's nav/footer and the home page button (`href="#"`).
- **M³Bench arXiv paper link** — `publications.html` (`href="#"` Paper button) and
  `assets/bibtex/m3bench.bib` (`https://arxiv.org/abs/PLACEHOLDER`).
- **M³Bench Hugging Face dataset link** — `publications.html` (`href="#"` Hugging Face button).
- **`others.html` → "Outside Research"** — left as an explicit placeholder callout; add personal
  interests if you'd like them on the site.
- **`projects.html` → "More Projects Coming Soon"** — a dashed placeholder card for future
  engineering/course projects.

M³Bench's **GitHub repo** (`https://github.com/BioMed-AI-Lab-U-Michgan/M3Bench`) and **project
website** (`https://biomed-ai-lab-u-michgan.github.io/M3Bench/`) are linked as real (non-placeholder)
URLs as provided. Verify both resolve correctly before/after publishing the paper.

No publications, awards, affiliations, or links were invented; anything not present in
`CV/cv.tex` or the `M3Bench`/ECCV paper sources is marked as a placeholder above.

# AGENTS.md

## What this repo is

GitHub Pages **user site** (`jecisc.github.io`): everything built from `main` is published live at https://jecisc.github.io. Pushes to `main` go public immediately — never commit drafts, scratch files, or secrets. (Posts use `draft: true` front matter until ready; drafts never reach CI output.)

Personal page / blog of Cyril Ferlicot-Delbecque, built with **Hugo + the Mana theme** (`themes/mana` git submodule). Single-branch workflow (`main`).

## Commands

- Local preview (includes drafts): `hugo server -D`
- Production build check: `hugo --gc --minify`
- Deploy: push to `main`; `.github/workflows/hugo.yml` builds (Hugo pinned to the locally installed version, extended) and publishes via GitHub Actions
- Update theme: `git submodule update --remote themes/mana`, then check the CSS partial sync note below

## Content conventions

- Posts and pages are **page bundles**: `content/posts/<slug>/index.md` with images next to the `.md`. Markdown image refs (`![](pic.png)`) resolve as page resources.
- `assets/` is for files consumed by templates/config only (`resources.Get`, e.g. avatars) — it is **not** published and cannot be referenced from Markdown. Browser-static files go in `static/` (published verbatim), e.g. `static/favicons/`.
- Avatars: `[params.avatar]` in `hugo.toml` (home hero) and `[params.avatar.about]` (About page); paths relative to `assets/`. Favicons: `[params.favicons]` → `static/favicons/`.

## Gotchas

- **Future-dated front matter silently drops a page from builds** (`hugo list drafts` still sees it). Check `date:` when a new post 404s.
- The long-running dev server often fails to pick up new assets, config changes, or content bundles — restart `hugo server -D` when something doesn't show.
- `layouts/partials/head/css.html` overrides the theme's partial to append `assets/css/custom.css` to the bundle. When bumping the Mana submodule, diff that file against `themes/mana/layouts/partials/head/css.html` and re-sync the file list.
- Global custom styles live in `assets/css/custom.css` with generic classes (`.image-row`, `.centered-figure`) — avoid inline `<style>` in content.

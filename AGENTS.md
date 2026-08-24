# AGENTS.md

## What this repo is

GitHub Pages **user site** (`jecisc.github.io`): everything built from `main` is published live at https://jecisc.github.io. Pushes to `main` go public immediately — never commit drafts, scratch files, or secrets. (Posts use `draft: true` front matter until ready; drafts never reach CI output.)

Personal page / blog of Cyril Ferlicot-Delbecque, built with **Hugo + the Mana theme** (`themes/mana` git submodule). Single-branch workflow (`main`).

## Commands

- Local preview (includes drafts): `hugo server -D`
- Production build check: `hugo --gc --minify`
- Deploy: push to `main`; `.github/workflows/hugo.yml` builds (Hugo pinned to the locally installed version, extended) and publishes via GitHub Actions
- Update theme: `git submodule update --remote themes/mana`, then check the partial sync note below

## Content conventions

- Posts and pages are **page bundles**: `content/posts/<slug>/index.md` with images next to the `.md`. Markdown image refs (`![](pic.png)`) resolve as page resources.
- Post bundle folders are **prefixed with the creation date**: `content/posts/YYYY-MM-DD_<slug>/` (e.g. `2026-08-23_taskbar-drag-and-drop`). The prefix shows up in the post URL; if an already-published post is ever renamed, add `aliases: ["/posts/<old-slug>/"]` to its front matter so the old URL redirects.
- Static pages (CV, Open Source, About) live in `content/pages/`. Their public URLs stay at the site root via `url:` front matter (`/cv/`, `/open-source/`, `/about/`) while `hugo.toml` menus target their logical paths (`pageRef = '/pages/cv'`). The `/pages/` listing itself is suppressed by `_index.md` there (`build: list: never / render: never`). They also carry a `<span class="page-meta-hidden"></span>` marker that `custom.css` uses to hide the meta bar (date / word count / reading time) on non-post pages.
- The About page additionally sets `type: about` so Hugo picks Mana's dedicated `layouts/about/single.html` (avatar header + social links, no breadcrumb/meta/Prev-Next). Its section stays `pages`, so the other pages' Prev/Next chain still reaches it.
- Bottom Prev/Next cards come from the theme's stock system and work for any page inside a real section. Their order follows **ascending `date:` front matter** (Next = newer): keep static-page dates in menu order (CV < Open Source < About) and don't use placeholder weights. Posts chain among themselves by their real dates.
- `assets/` is for files consumed by templates/config only (`resources.Get`, e.g. avatars) — it is **not** published and cannot be referenced from Markdown. Browser-static files go in `static/` (published verbatim), e.g. `static/favicons/`.
- Avatars: `[params.avatar]` in `hugo.toml` (home hero) and `[params.avatar.about]` (About page); paths relative to `assets/`. Favicons: `[params.favicons]` → `static/favicons/`.

## Gotchas

- **Future-dated front matter silently drops a page from builds** (`hugo list drafts` still sees it). Check `date:` when a new post 404s.
- The long-running dev server often fails to pick up new assets, config changes, or content bundles — restart `hugo server -D` when something doesn't show.
- `layouts/partials/head/css.html`, `layouts/partials/head/js.html` **and `layouts/partials/head/opengraph.html`** override the theme's partials: the first two append `assets/css/custom.css` and `assets/js/custom.js` (the JS drives the CV skill-bar fill animation); the third fixes preview-image resolution — blog posts get their list thumbnail (via `post-image-resolve.html`), everything else falls back to the `[params.avatar]` asset. When bumping the Mana submodule, diff all three files against their `themes/mana/layouts/partials/head/` counterparts and re-sync.
- Feeds & crawlers: home output is `['HTML', 'JSON', 'RSS']` (dropping `'RSS'` kills `/index.xml`; `/posts/index.xml` exists regardless) and `enableRobotsTXT = true` generates `robots.txt`.
- Global custom styles live in `assets/css/custom.css` with generic classes (`.image-row`, `.centered-figure`) — avoid inline `<style>` in content.
- The theme's breadcrumb hardcodes `Home › Posts › title` on every leaf page regardless of section — cosmetic quirk, not worth chasing.

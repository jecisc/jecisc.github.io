/* Animate skill bars from 0 to their inline width when they scroll into view.
   Without JS (or without IntersectionObserver) the bars stay at their final width. */
document.addEventListener("DOMContentLoaded", function () {
  var fills = document.querySelectorAll(".skill-fill");
  if (!fills.length || !("IntersectionObserver" in window)) return;
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.width = entry.target.dataset.targetWidth;
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );
  fills.forEach(function (fill) {
    fill.dataset.targetWidth = fill.style.width;
    fill.style.width = "0%";
    observer.observe(fill);
  });
});

/* Mount giscus comments (GitHub Discussions) after the content of blog posts.
   Static pages opt out via the .page-meta-hidden marker; pages without a
   post-content-main block (home, lists) are skipped too. The widget's theme
   follows Mana's light/dark toggle. */
/* Map Mana's data-theme to giscus theme names */
function giscusTheme() {
  return document.documentElement.dataset.theme === "dark" ? "purple_dark" : "light";
}

document.addEventListener("DOMContentLoaded", function () {
  var config = window.siteGiscus;
  if (!config) return;
  if (document.querySelector(".page-meta-hidden")) return;
  var target = document.querySelector(".post-content-main");
  if (!target || document.getElementById("giscus-container")) return;

  var container = document.createElement("div");
  container.id = "giscus-container";
  container.className = "comments";
  target.insertAdjacentElement("afterend", container);

  var script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.async = true;
  script.crossOrigin = "anonymous";
  script.setAttribute("data-repo", config.repo);
  script.setAttribute("data-repo-id", config.repoId);
  script.setAttribute("data-category", config.category);
  script.setAttribute("data-category-id", config.categoryId);
  script.setAttribute("data-mapping", config.mapping);
  script.setAttribute("data-strict", "0");
  script.setAttribute(
    "data-reactions-enabled",
    config.reactionsEnabled ? "1" : "0"
  );
  script.setAttribute("data-emit-metadata", "0");
  script.setAttribute("data-input-position", config.inputPosition);
  script.setAttribute("data-theme", giscusTheme());
  script.setAttribute("data-lang", config.lang);
  container.appendChild(script);

  new MutationObserver(function () {
    var frame = document.querySelector("iframe.giscus-frame");
    if (!frame) return;
    frame.contentWindow.postMessage(
      { giscus: { setConfig: { theme: giscusTheme() } } },
      "https://giscus.app"
    );
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
});

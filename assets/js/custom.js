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

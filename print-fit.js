/* print-fit.js — stops explicitly-paginated print packs from clipping.
 *
 * doc-page prints each <section class="page"> as a fixed letter-size box
 * with overflow hidden, so a page authored taller than the sheet silently
 * loses its bottom (2026-08-12: several worksheet pages printed cut off).
 * This measures every page at TRUE print width — CSS inches are absolute,
 * so an offscreen 8.5in-wide layout is exactly the print layout — and
 * scales any overflowing page's FLOW content down to fit the sheet.
 * Absolutely-positioned children (full-bleed backgrounds, decorations)
 * are left alone so pages stay full-bleed. Non-overflowing pages are
 * untouched. Runs after fonts load so measurements match what prints.
 */
(function () {
  var PAGE_W_IN = 8.5, PAGE_H_IN = 11; // letter — matches doc-page default
  var SAFETY = 0.985;                  // keep a hair above the fold

  function fitAll() {
    var pages = document.querySelectorAll("doc-page section.page");
    if (!pages.length) return;
    var lab = document.createElement("div");
    lab.style.cssText =
      "position:fixed;left:-300vw;top:0;width:" + PAGE_W_IN + "in;" +
      "visibility:hidden;pointer-events:none;contain:layout";
    document.body.appendChild(lab);
    var pageHpx = (lab.getBoundingClientRect().width / PAGE_W_IN) * PAGE_H_IN;

    pages.forEach(function (page) {
      try {
      if (page.getAttribute("data-pf-fitted")) return;
      var clone = page.cloneNode(true);
      clone.style.height = "auto";
      clone.style.minHeight = "0";
      clone.style.width = PAGE_W_IN + "in";
      clone.style.overflow = "visible";
      lab.appendChild(clone);
      var h = clone.getBoundingClientRect().height;
      if (h <= pageHpx + 1) { lab.removeChild(clone); return; } // fits already

      // Pathology guard — genuinely runaway measurements only. NOTE: real
      // overflowing pages measure well past 2 sheets in the unconstrained
      // clone (an earlier 2x threshold silently skipped exactly the pages
      // that need fitting — 2026-08-13 regression), so only truly absurd
      // heights bail out.
      if (!(h > 0) || h > pageHpx * 8) {
        lab.removeChild(clone);
        return;
      }

      var k = pageHpx / h;
      // Scaled content is laid out wider (100%/k) then shrunk — text
      // reflows shorter at the wider width, so refine once against the
      // real target width.
      clone.style.width = (PAGE_W_IN / k) + "in";
      var h2 = clone.getBoundingClientRect().height || h;
      if (k * h2 > pageHpx) k = pageHpx / h2;
      k = Math.max(k, 0.25); // floor far below any real page's need
      k *= SAFETY;
      lab.removeChild(clone);

      // Wrap the page's FLOW children in a scaler that takes over the
      // section's layout role (display/flex/gap/padding), leaving
      // absolute-positioned decorations full-bleed on the section.
      var cs = getComputedStyle(page);
      var wrap = document.createElement("div");
      wrap.className = "pf-fit";
      wrap.style.display = cs.display === "flex" ? "flex" : cs.display;
      wrap.style.flexDirection = cs.flexDirection;
      wrap.style.gap = cs.gap;
      wrap.style.justifyContent = cs.justifyContent;
      wrap.style.alignItems = cs.alignItems;
      wrap.style.padding = cs.padding;
      wrap.style.boxSizing = "border-box";
      wrap.style.transformOrigin = "top left";
      wrap.style.transform = "scale(" + k.toFixed(4) + ")";
      wrap.style.width = "calc(100% / " + k.toFixed(4) + ")";
      var kids = Array.prototype.slice.call(page.childNodes);
      kids.forEach(function (n) {
        if (n.nodeType === 1 && getComputedStyle(n).position === "absolute") return;
        wrap.appendChild(n);
      });
      page.style.padding = "0";
      page.appendChild(wrap);
      page.setAttribute("data-pf-fitted", k.toFixed(4));
      } catch (e) {}
    });
    document.body.removeChild(lab);
  }

  function start() {
    var go = function () { requestAnimationFrame(fitAll); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
    else go();
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", start);
  else start();
})();

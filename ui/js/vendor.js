// Local copies of third-party motion libraries (ui/vendor/). Nothing loads from a CDN (zero external requests).
// GSAP + ScrollTrigger load for every screen.
const cache = new Map();

function loadScript(src) {
  if (!cache.has(src)) {
    cache.set(src, new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = new URL(src, document.baseURI).href;
      s.async = false;
      s.onload = () => resolve();
      s.onerror = () => { cache.delete(src); reject(new Error(`Could not load ${src}`)); };
      document.head.append(s);
    }));
  }
  return cache.get(src);
}

/** Resolves to window.gsap with ScrollTrigger registered. */
export async function loadGsap() {
  await loadScript("vendor/gsap.min.js");
  await loadScript("vendor/ScrollTrigger.min.js");
  window.gsap.registerPlugin(window.ScrollTrigger);
  return window.gsap;
}

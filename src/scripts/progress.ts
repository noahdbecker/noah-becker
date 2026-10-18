/**
 * Page-change progress line under the header. See docs/design.md → Motion.
 *
 * Clicking a link to another page adds `html.nav-loading`: the accent line
 * trickles towards 90%. The click time goes to sessionStorage; the inline
 * script in Base.astro reads it on the next page and resumes the line at the
 * same point (negative animation-delay), so it carries across the View
 * Transition. Once that page has loaded, the line runs to 100% and fades.
 */
const KEY = "nav-start";

const root = document.documentElement;
const bar = document.querySelector<HTMLElement>(".nav-progress");

if (bar && matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  let arriving = root.classList.contains("nav-loading");

  const finish = () => {
    const { a } = new DOMMatrixReadOnly(getComputedStyle(bar).transform);
    root.style.setProperty("--nav-from", String(a));
    root.classList.replace("nav-loading", "nav-done");
  };

  if (arriving) {
    addEventListener(
      "load",
      () => {
        if (arriving) finish();
      },
      { once: true },
    );
    if (document.readyState === "complete") finish();
  }

  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as Element).closest?.<HTMLAnchorElement>("a[href]");
    if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
    const url = new URL(link.href);
    // Other sites, mailto:, and in-page anchor jumps don't load a page of ours.
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return;

    arriving = false;
    root.style.removeProperty("--nav-elapsed");
    root.classList.remove("nav-done");
    root.classList.add("nav-loading");
    try {
      sessionStorage.setItem(KEY, String(Date.now()));
    } catch {}
  });

  // Back/forward cache restores the page mid-animation — complete it.
  addEventListener("pageshow", (e) => {
    if (e.persisted && root.classList.contains("nav-loading")) finish();
  });
}

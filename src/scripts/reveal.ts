/**
 * Scroll reveal for grid rows. See docs/design.md → Motion.
 *
 * Every <Row> renders `.frame[data-reveal]`. While the attribute is present and
 * <html> has `.motion`, global.css keeps the row's cells hidden. When the row
 * scrolls into view it gets `.is-in` (cells fade in, staggered by `--i`);
 * once the animation is done the attribute is removed so components' own
 * transitions (hover etc.) apply untouched.
 */
const STEP_MS = 70;
const MAX_STAGGER = 6;
const SETTLE_MS = 1400;

const root = document.documentElement;

if (root.classList.contains("motion")) {
  root.dataset.revealReady = "";

  const frames = document.querySelectorAll<HTMLElement>(".frame[data-reveal]");

  for (const frame of frames) {
    frame.querySelectorAll<HTMLElement>(":scope > .cells > *").forEach((cell, i) => {
      cell.style.setProperty("--i", String(Math.min(i, MAX_STAGGER)));
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const frame = entry.target as HTMLElement;
        observer.unobserve(frame);
        frame.classList.add("is-in");
        setTimeout(() => {
          frame.removeAttribute("data-reveal");
          frame.classList.remove("is-in");
        }, MAX_STAGGER * STEP_MS + SETTLE_MS);
      }
    },
    // Fixed offset (not %) so short rows at the very bottom of the page still trigger.
    { rootMargin: "0px 0px -40px 0px" },
  );

  frames.forEach((frame) => observer.observe(frame));
}

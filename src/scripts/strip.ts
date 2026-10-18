/**
 * Wires <StripControls> to its <Strip>: prev/next buttons scroll by one card,
 * disable at the ends, and the controls hide when everything fits.
 */
const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

for (const controls of document.querySelectorAll<HTMLElement>("[data-strip-controls]")) {
  const strip = document.getElementById(controls.dataset.stripControls ?? "");
  const prev = controls.querySelector<HTMLButtonElement>("[data-strip-prev]");
  const next = controls.querySelector<HTMLButtonElement>("[data-strip-next]");
  if (!strip || !prev || !next) continue;

  const items = strip.children as HTMLCollectionOf<HTMLElement>;
  // Distance between two card starts (card width + 1px grid gap).
  const step = () => (items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : strip.clientWidth);

  const update = () => {
    prev.disabled = strip.scrollLeft <= 1;
    next.disabled = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 1;
    controls.hidden = strip.scrollWidth <= strip.clientWidth + 1;
  };

  prev.addEventListener("click", () => strip.scrollBy({ left: -step(), behavior }));
  next.addEventListener("click", () => strip.scrollBy({ left: step(), behavior }));
  // Cheap enough (three layout reads) to run on every scroll event.
  strip.addEventListener("scroll", update, { passive: true });
  new ResizeObserver(update).observe(strip);
  update();
}

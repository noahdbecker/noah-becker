/**
 * Dev theme switcher (footer, `npm run dev` only).
 *
 * The inline script in Base.astro sets `html[data-theme]` from
 * localStorage["theme-override"] before first paint; without it the theme
 * follows `prefers-color-scheme` (global.css). This file only wires the buttons.
 */
const OVERRIDE_KEY = "theme-override";

const root = document.documentElement;
const picks = document.querySelectorAll<HTMLButtonElement>("[data-theme-pick]");
const system = matchMedia("(prefers-color-scheme: dark)");

function store(value: string | null) {
  try {
    if (value === null) localStorage.removeItem(OVERRIDE_KEY);
    else localStorage.setItem(OVERRIDE_KEY, value);
  } catch {}
}

function sync() {
  const current = root.dataset.theme ?? "auto";
  for (const button of picks) {
    button.setAttribute("aria-pressed", String(button.dataset.themePick === current));
  }
  document.querySelectorAll("[data-theme-auto]").forEach((el) => {
    el.textContent = system.matches ? "dark" : "light";
  });
}

for (const button of picks) {
  button.addEventListener("click", () => {
    const pick = button.dataset.themePick;
    if (pick === "light" || pick === "dark") {
      root.dataset.theme = pick;
      store(pick);
    } else {
      delete root.dataset.theme;
      store(null);
    }
    sync();
  });
}

if (picks.length) {
  system.addEventListener("change", sync);
  sync();
}

/**
 * Seasonal decorations. See docs/design.md → Seasons.
 *
 * The inline script in Base.astro sets `html[data-season]` (from the date, or
 * the dev override) and `html[data-seasonal="on"]` before first paint, so
 * nothing flashes. This file only wires the buttons and remembers the choice:
 * - header toggle → localStorage["seasonal"] = "on" (absent = off, the default)
 *   Switching off sets `data-seasonal="leaving"` for LEAVE_MS first, so the
 *   glyphs can sink back into their lines and the particles fade out.
 * - dev switcher in the footer → localStorage["season-override"]
 */
import { seasonOf, seasons, type Season } from "../data/seasons";

const ON_KEY = "seasonal";
const OVERRIDE_KEY = "season-override";
// Longest exit in CSS: 450ms sink + 4 × 40ms stagger (SeasonScene.astro).
const LEAVE_MS = 650;

const root = document.documentElement;

const store = {
  get: (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key: string, value: string | null) => {
    try {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    } catch {}
  },
};

const toggles = document.querySelectorAll<HTMLButtonElement>("[data-season-toggle]");
const picks = document.querySelectorAll<HTMLButtonElement>("[data-season-pick]");

const isOn = () => root.dataset.seasonal === "on";

const animated = matchMedia("(prefers-reduced-motion: no-preference)");
let leaving: ReturnType<typeof setTimeout> | undefined;

function setOn(on: boolean) {
  clearTimeout(leaving);
  store.set(ON_KEY, on ? "on" : null);
  if (on) {
    root.dataset.seasonal = "on";
  } else if (isOn() && animated.matches) {
    root.dataset.seasonal = "leaving";
    leaving = setTimeout(() => delete root.dataset.seasonal, LEAVE_MS);
  } else {
    delete root.dataset.seasonal;
  }
}

function sync() {
  const on = isOn();
  for (const button of toggles) {
    button.setAttribute("aria-pressed", String(on));
    button.title = `Seasonal decorations (${root.dataset.season}): ${on ? "on" : "off"}`;
  }
  const override = store.get(OVERRIDE_KEY) ?? "auto";
  for (const button of picks) {
    button.setAttribute("aria-pressed", String(button.dataset.seasonPick === override));
  }
}

for (const button of toggles) {
  button.addEventListener("click", () => {
    setOn(!isOn());
    sync();
  });
}

for (const button of picks) {
  button.addEventListener("click", () => {
    const pick = button.dataset.seasonPick;
    const override = seasons.includes(pick as Season) ? (pick as Season) : null;
    store.set(OVERRIDE_KEY, override);
    root.dataset.season = override ?? seasonOf(new Date());
    setOn(true); // previewing a season implies seeing it
    sync();
  });
}

document.querySelectorAll("[data-season-auto]").forEach((el) => {
  el.textContent = seasonOf(new Date());
});

sync();

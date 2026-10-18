/**
 * Seasonal decorations — scene layouts for the hatched Spacer rows.
 * See docs/design.md → Seasons. Glyphs are drawn in components/Seasons.astro.
 *
 * Which season shows is decided in the browser (inline script in Base.astro),
 * so every Spacer renders all four scenes and CSS shows the current one.
 */

export const seasons = ["spring", "summer", "autumn", "winter"] as const;
export type Season = (typeof seasons)[number];

/** Glyph id (→ `#sd-<id>` in the sprite) and its viewBox size. */
export const glyphs = {
  pumpkin: { w: 40, h: 32 },
  lantern: { w: 40, h: 32 },
  leaf: { w: 24, h: 10 },
  fir: { w: 24, h: 36 },
  snowman: { w: 28, h: 40 },
  drift: { w: 32, h: 10 },
  tulip: { w: 16, h: 36 },
  daisy: { w: 20, h: 28 },
  sprout: { w: 16, h: 14 },
  sun: { w: 40, h: 20 },
  boat: { w: 28, h: 30 },
  wave: { w: 32, h: 8 },
} as const;
export type Glyph = keyof typeof glyphs;

/**
 * One item resting on the spacer's bottom line.
 * x  anchor, % of the row width
 * dx offset from the anchor in spacer heights (keeps clusters together at any width)
 * k  height as a fraction of the spacer height
 * Later items draw on top.
 */
export interface SceneItem {
  g: Glyph;
  x: number;
  dx?: number;
  k: number;
  flip?: boolean;
}

/** Three layouts per season; consecutive spacers cycle through them. */
export const scenes: Record<Season, SceneItem[][]> = {
  spring: [
    [
      { g: "tulip", x: 6, k: 0.8 },
      { g: "tulip", x: 6, dx: 0.32, k: 0.62 },
      { g: "sprout", x: 6, dx: 0.7, k: 0.26 },
      { g: "daisy", x: 82, k: 0.5 },
      { g: "daisy", x: 82, dx: 0.4, k: 0.38 },
    ],
    [
      { g: "sprout", x: 24, k: 0.24 },
      { g: "daisy", x: 48, k: 0.55 },
      { g: "tulip", x: 78, k: 0.85 },
      { g: "tulip", x: 78, dx: 0.3, k: 0.68 },
      { g: "tulip", x: 78, dx: 0.6, k: 0.52 },
    ],
    [
      { g: "daisy", x: 10, k: 0.5 },
      { g: "sprout", x: 10, dx: 0.45, k: 0.26 },
      { g: "tulip", x: 64, k: 0.75 },
      { g: "sprout", x: 88, k: 0.22, flip: true },
    ],
  ],
  summer: [
    [
      { g: "sun", x: 8, k: 0.62 },
      { g: "wave", x: 68, k: 0.16 },
      { g: "boat", x: 68, dx: 0.45, k: 0.78 },
      { g: "wave", x: 68, dx: 0.9, k: 0.16 },
    ],
    [
      { g: "wave", x: 22, k: 0.14 },
      { g: "wave", x: 22, dx: 0.6, k: 0.14 },
      { g: "sun", x: 76, k: 0.7 },
    ],
    [
      { g: "boat", x: 12, k: 0.66, flip: true },
      { g: "wave", x: 12, dx: -0.15, k: 0.15 },
      { g: "sun", x: 58, k: 0.55 },
      { g: "wave", x: 84, k: 0.14 },
    ],
  ],
  autumn: [
    [
      { g: "pumpkin", x: 4, k: 0.7 },
      { g: "pumpkin", x: 4, dx: 1, k: 0.44, flip: true },
      { g: "leaf", x: 4, dx: 1.7, k: 0.14 },
      { g: "leaf", x: 84, dx: -0.4, k: 0.13, flip: true },
      { g: "lantern", x: 84, k: 0.62 },
    ],
    [
      { g: "leaf", x: 30, k: 0.14 },
      { g: "pumpkin", x: 30, dx: 0.5, k: 0.5 },
      { g: "pumpkin", x: 64, k: 0.78, flip: true },
      { g: "leaf", x: 64, dx: 1.3, k: 0.12, flip: true },
    ],
    [
      { g: "lantern", x: 14, k: 0.66 },
      { g: "pumpkin", x: 72, k: 0.5 },
      { g: "pumpkin", x: 72, dx: 0.85, k: 0.36, flip: true },
      { g: "leaf", x: 72, dx: 1.4, k: 0.13 },
    ],
  ],
  winter: [
    [
      { g: "fir", x: 5, k: 0.9 },
      { g: "fir", x: 5, dx: 0.55, k: 0.64 },
      { g: "snowman", x: 80, k: 0.86 },
      { g: "drift", x: 80, dx: 0.55, k: 0.3 },
    ],
    [
      { g: "snowman", x: 12, k: 0.8, flip: true },
      { g: "fir", x: 58, k: 0.7 },
      { g: "fir", x: 58, dx: 0.5, k: 0.9 },
      { g: "drift", x: 58, dx: 1.1, k: 0.26 },
    ],
    [
      { g: "drift", x: 6, k: 0.3 },
      { g: "fir", x: 30, k: 0.85 },
      { g: "snowman", x: 74, k: 0.78 },
      { g: "fir", x: 74, dx: 0.75, k: 0.55 },
    ],
  ],
};

// Spacers take the next layout in render order, so stacked spacers differ.
let next = 0;
export const nextLayout = () => next++ % 3;

/** Meteorological seasons, northern hemisphere. Mirrors the inline script in Base.astro. */
export const seasonOf = (date: Date): Season =>
  (["winter", "spring", "summer", "autumn"] as const)[Math.floor(((date.getMonth() + 1) % 12) / 3)];

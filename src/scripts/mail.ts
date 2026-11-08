/**
 * Turns obfuscated email links (src/lib/mail.ts) into real `mailto:` links
 * on first interaction, before the click lands. Bots that only read the HTML
 * see a link to /imprint/ and an opaque data attribute.
 */
const reveal = (e: Event) => {
  const link = (e.target as Element).closest?.<HTMLAnchorElement>("a[data-mail]");
  if (!link) return;
  try {
    const address = [...atob(link.dataset.mail!)].reverse().join("");
    link.href = `mailto:${address}`;
    link.removeAttribute("data-mail");
  } catch {
    // Malformed value: keep the imprint fallback.
  }
};

for (const type of ["pointerover", "focusin", "touchstart"]) {
  document.addEventListener(type, reveal, { capture: true, passive: true });
}

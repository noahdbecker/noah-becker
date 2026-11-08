/**
 * Spam-safe email links (build time). See docs/decisions.md → "Email link obfuscation".
 *
 * The address never appears in the HTML: it is reversed and base64-encoded
 * into `data-mail`, and `href` points at the imprint (which lists the address)
 * so the link still works without JS. scripts/mail.ts swaps in the real
 * `mailto:` the moment a visitor hovers, focuses or touches the link.
 */
export const MAIL_FALLBACK = "/imprint/";

export function mailLink(address: string) {
  const encoded = btoa([...address].reverse().join(""));
  return { href: MAIL_FALLBACK, "data-mail": encoded };
}

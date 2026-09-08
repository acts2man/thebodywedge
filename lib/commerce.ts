export const SHOP_ORIGIN = "https://thebodywedge.com";

export function checkoutUrl(variantId: number, quantity = 1) {
  const count = Math.max(1, Math.min(20, Math.trunc(quantity) || 1));
  return `${SHOP_ORIGIN}/cart/${variantId}:${count}?ref=bodywedge-phase1`;
}

export const newsletterConsent = "I agree to receive Body Wedge education and product updates by email. I can unsubscribe at any time.";
export const consentVersion = "bodywedge-email-2026-09-08";
export const practitionerInterests = ["Using the Wedge in my practice", "Recommending it to clients", "Wholesale / clinic purchasing", "Education and demonstrations"] as const;

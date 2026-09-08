# The Body Wedge — Phase 1

The priority is direct store sales, followed by email list growth and practitioner interest. This iteration gives the existing premium design a clearer commercial purpose without changing the product name, original logo, or intended use.

## What this version includes

- A homepage that identifies the patented abdominal/psoas self-massage tool immediately, with prominent Shop Now and original demonstration actions.
- Product differentiation through hand-inspired contours, the rocker base, and focused abdominal use. Psoas education connects the core, hips, and lower back without diagnosing symptoms or promising medical results.
- Original product photography, size/density selection, quantity controls, mobile Buy Now, policy links, and instructions near the purchasing decision.
- Two short, attributed customer excerpts from the original site, placed on the homepage and product pages. No invented ratings, review counts, endorsements, or before/after results.
- The original instructional video and the existing video library. Approved Our Approach, How to Use, and Journal hero images are retained.
- An email signup that stores the email, page source, consent wording/version, and timestamp. Practitioner inquiries store business details, country, interest, and the inquiry separately; they do not opt the person into marketing.
- A dedicated Practitioners & Wholesale page and links from navigation, contact, homepage, and product pages.
- A charcoal, blue, white, and restrained red direction using the original logo and existing fonts/motion controls.

## Commerce connection in this review version

Buy Now opens TheBodyWedge.com's existing Shopify checkout with the selected variant and quantity. The order, payment, tax, shipping, and fulfillment remain with Shopify and the merchant. Links include `ref=bodywedge-phase1` for referral context. There is no duplicate payment system or invented stock, delivery, or international shipping guarantee.

The product catalog was checked against the store's public catalog on September 8, 2026. Prices and availability shown in the mockup are a saved snapshot; this is not a live Shopify inventory sync. Checkout confirms the current offer. The kit remains sold out, and the existing limitations on two-Wedge variants are preserved.

Email signup and practitioner inquiries save in this Site's private database after publication. They are not yet synced to Shopify or an email provider, and this version does not send welcome emails, campaigns, or inquiry notifications. The owner can retrieve/export `email_subscribers` and `practitioner_inquiries` through Sites. Before accepting real customer traffic, establish the inbox/lead review process and connect the chosen email platform. Test records must remain outside production.

The Contact page still offers the team's actual email and phone, an explicitly labeled email draft form, and the original store contact form.

## Recommended Shopify launch path

For this Phase 1 and the client's stated preference, port the approved design into an unpublished Shopify theme. React code is not directly uploadable as a Shopify theme: the page layouts become Liquid sections and JSON templates, while the visual assets, design tokens, copy, and motion patterns carry over.

| Current experience | Shopify implementation |
| --- | --- |
| Homepage sections | Theme sections with editable copy, media, and links |
| Product options, price, availability, quantity | Shopify product/variant data and native product form |
| Buy Now | Native Shopify cart/checkout flow |
| Video education and reviews | Editable sections/metafields with original videos and approved attributed feedback |
| Email signup | Native Shopify customer marketing-consent form or the selected email app |
| Practitioner inquiry | Shopify contact form or Shopify Forms with separate tags and notification routing |
| About, Contact, Learn, Journal | Page templates, navigation, and Shopify blog where appropriate |
| Existing subscribers | Consent-preserving import into the selected email platform; honor suppression/unsubscribe status |

Build the theme alongside the current store, connect the native forms and product data, and validate the buying and notification flows before switching themes. Do not replace the store's domain or publish the new Shopify theme during this mockup iteration.

An alternative is to retain the React storefront and add Shopify's Storefront Cart API and checkout integration. That preserves this frontend, but requires a maintained headless integration, access configuration, live catalog handling, marketing form integration, and analytics. It is a larger launch commitment than a native theme for the current brief.

## Launch checks that affect the client

1. Review the product copy and approve the customer excerpts and their attribution.
2. Confirm size/density details, available two-Wedge combinations, stock, shipping regions, returns, and the kit's status in Shopify.
3. Connect signup consent, unsubscribe handling, and email delivery. Route practitioner inquiries to a monitored destination.
4. Confirm analytics measures store sessions, completed orders, conversion rate, and email signups. Treat checkout clicks as an intermediate event, not a completed sale. Assess practitioner submissions separately.
5. Check the native theme on mobile, including size selection, video playback, checkout, and confirmation messages, before publishing it to the merchant's domain.

Future bundles, clinic accounts, wholesale pricing, international markets, and 3PL/drop-shipping are intentionally left for later decisions. The inquiry and product structures provide room for them without advertising them as available now.

## Sources

- [The Body Wedge](https://thebodywedge.com/) — product features, original customer feedback, contact details, and demonstration.
- [Shopify cart permalinks](https://shopify.dev/docs/apps/build/checkout/create-cart-permalinks) — variant/quantity checkout handoff and referral parameter.
- [Shopify email consent](https://shopify.dev/docs/storefronts/themes/customer-engagement/email-consent) — native newsletter implementation for the Shopify port.
- [Shopify theme editor](https://shopify.dev/docs/storefronts/themes/tools/online-editor) — editable theme sections and templates.
- [Cleveland Clinic: psoas anatomy](https://my.clevelandclinic.org/health/body/psoas-muscle) — plain-language anatomy, not an endorsement of the product.
- [NCBI: quadratus lumborum anatomy](https://www.ncbi.nlm.nih.gov/books/NBK535407/) — QL context, not an endorsement of the product.

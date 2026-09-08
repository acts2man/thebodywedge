# The Body Wedge — Free to move

A premium React storefront and brand experience for The Body Wedge.

## Experience
Cinematic product imagery, scroll-linked motion, accessible product options, the full video library, FAQs, journal links, and contact options. Local product imagery and fonts. Reduced-motion preference and a persistent pause control.

## Development and Netlify
This repository is the Netlify-ready Next.js version of the approved storefront. Run `npm install`, then `npm run dev` locally. Netlify detects Next.js from `next.config.ts`; `netlify.toml` runs `npm run build` and publishes the `.next` output through Netlify's Next.js runtime.

## Commerce and contact
Buy Now takes the selected Shopify variant and quantity directly to TheBodyWedge.com checkout. Email signups and practitioner inquiries are stored in a site-scoped Netlify Blobs store with explicit consent. This build does not send email or sync leads to Shopify. Contact drafts open in the visitor’s email application. Journal articles and policy pages retain their original destinations. See `docs/phase-1-launch.md` for the current scope, Shopify theme handoff, and launch dependencies.

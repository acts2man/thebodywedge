# The Body Wedge redesign

Rebuilt in independent React components on Vinext. Catalog, pricing, variants, and availability were verified against the existing Shopify products.json on 2026-09-07. Source site was Shopify, not WordPress.

## Routes
- Home: cinematic product hero, motion, features, demonstration, collection, FAQs.
- /shop and /products/[handle]: all three original products and their actual variant options.
- /about, /faq, /contact, /learn, /journal.
- Video library retains the 26 source YouTube video IDs.

## Intentional external services
Purchases continue to the original Shopify product page with the selected variant. No ecommerce backend, customer account, payment, order, or inventory migration is claimed. Blog article bodies and policy pages retain their existing destinations. Videos load YouTube embeds only on user interaction. Contact form explicitly opens an email draft; the existing store contact form is also linked.

## Art and motion
GPT-6 Astra handled product reference research and one generated studio hero via ImageGen. Original product and demonstration photographs are retained locally. All in-page imagery and fonts are local. CSS and lightweight React effects provide the levitating hero, pointer tilt, scroll parallax, orbit motion, scrolling type, section reveals, and interactive product presentation. Reduced-motion preferences and a persistent pause control are supported.

## Source
https://thebodywedge.com/

---
name: website-sale-operator
description: >-
  Selling a website you built: to one client (done-for-you build), to many buyers as a
  template or theme (Gumroad, Lemon Squeezy, Payhip, Envato/ThemeForest, Astro themes directory),
  or as a starter site / small online business (Flippa, Acquire-style marketplaces). Covers
  choosing the sale model, pricing, licence vs full IP transfer, third-party asset licence checks
  (stock photos, fonts, code), handover of code, hosting and domain (Cloudflare, Vercel, GitHub),
  contracts, escrow and Indian invoicing/GST pointers. Activate whenever the user asks "how do I
  sell this website", "can I sell this template", "what is my site worth", or wants to hand a
  site over to a buyer.
---

# Website Sale Operator (`skills/website-sale-operator`)

A playbook for turning a finished website into money. Start by deciding **what is actually
being sold**, because the buyer, the price and the paperwork all follow from it.

---

## 1. Pick the sale model first

| Model | What the buyer gets | Who buys | Typical price signal | Works when |
| :--- | :--- | :--- | :--- | :--- |
| **A. Done-for-you build (productised service)** | The site rebranded with *their* name, products, contact details, deployed on *their* accounts | Small sellers, local businesses, Instagram shops | One-off setup fee + optional yearly care plan | The site solves a clear niche job (e.g. a catalogue + WhatsApp ordering shop). You keep the code and resell it to many clients. |
| **B. Template / theme (licence, many copies)** | A licence to use the code; demo content | Developers, designers, DIY owners | Low per copy, repeatable | Code is clean, documented, easy to install, and contains no assets you can't redistribute. |
| **C. Whole website / business (one sale, full transfer)** | Code, domain, brand, content, traffic, revenue, social accounts | Investors, people wanting a ready business | Valued on proven profit (often a multiple of monthly profit); near zero without traffic or revenue | There is real traffic, sales history or an audience. A site with sample content and no traffic sells only as a cheap "starter site". |

Rules of thumb:
- **No revenue + no traffic → don't use model C.** Sell the build (A) or the code (B).
- **A beats B for niche sites** sold to non-technical owners: they pay for the setup, not the files.
- **Licence, don't assign, when reselling.** In A and B the buyer gets a licence for their site; you keep
  copyright so you can sell again. Only model C (or a client who pays for exclusivity) gets a full
  IP assignment.

---

## 2. Pre-sale clean-up checklist (all models)

1. **Third-party asset licences**
   - **Stock photos (Unsplash, Pexels, Pixabay):** free to *use*, but their licences forbid selling the
     photos unaltered or bundling them so others can redistribute them. Remove them from anything you
     sell as a template; in a client build, use the client's own photos. Keep demo photos only on the
     hosted demo site, or replace them with your own / AI-generated / properly licensed images.
   - **Fonts:** SIL Open Font License (Google Fonts, Fontsource) allows bundling and sale with software;
     commercial fonts usually do not.
   - **Code:** check every dependency licence (MIT, Apache-2.0, ISC are fine; GPL changes what you can
     do with a theme). Frameworks like Astro, Next.js and Tailwind are MIT.
   - **Brand / logo:** make sure the name doesn't clash with an existing trademark in the buyer's market.
2. **Strip personal and account details:** API keys, `.env`, analytics IDs, your phone/email, your
   Cloudflare account IDs, scratch files, `.trash` folders, local admin data.
3. **Placeholders are obvious:** fake phone numbers and sample products should be clearly labelled so a
   buyer's customers never hit a dead number.
4. **Put the code in version control** (git + private GitHub repo) so delivery and updates are clean.
5. **Docs:** README with install, edit and deploy steps; a 2–5 minute screencast helps non-technical buyers.
6. **Demo:** a live demo URL with a visible "Demo shop" note, plus screenshots (desktop + phone).

---

## 3. Pricing heuristics

- **Model A:** price the outcome, not the hours. Anchor against what the buyer pays elsewhere
  (Shopify/Dukaan/Wix subscription per year, or a freelancer's custom build). Offer 2–3 tiers:
  setup only / setup + photos & copy / setup + yearly care (content updates, hosting help, domain renewals).
- **Model B:** check prices of comparable themes on the same marketplace before listing; offer a
  personal (1 site) and an extended/agency (unlimited client sites) licence.
- **Model C:** valuation is driven by trailing profit, traffic quality and how much work the owner does.
  Without these, value ≈ build cost a buyer would otherwise pay, and starter-site prices are low.
- Always quote currency, what's included, what isn't (hosting, domain, payment gateway fees), and the
  number of revision rounds.

---

## 4. Where to sell

| Channel | Model | Notes |
| :--- | :--- | :--- |
| Direct outreach (Instagram DMs, WhatsApp, local markets, craft fairs, Facebook seller groups) | A | Best fit for niche small-business sites. Show the demo on their phone. |
| Freelance marketplaces (Fiverr, Upwork, Contra) | A | Package it as a fixed-price gig with the demo linked. |
| Gumroad, Lemon Squeezy, Payhip | B | Lemon Squeezy and Paddle act as merchant of record (they handle sales tax/VAT). Gumroad also collects tax in many regions. Check current fees and payout support for your country before choosing. |
| Framework theme directories (e.g. astro.build/themes) | B | Free listing; paid themes link out to your store. Good discovery. |
| Envato ThemeForest | B | Strict review and quality bar; exclusive vs non-exclusive author rates. |
| Flippa, similar marketplaces | C | Listing fee + success fee; buyers expect verified analytics and revenue. Use their escrow. |

---

## 5. Handover (model A and C)

1. **Code:** transfer the GitHub repo (Settings → Transfer) or add the buyer as owner of a fresh repo;
   or deliver a zip.
2. **Hosting:** most hosts (Cloudflare Workers/Pages, Vercel, Netlify) don't move a project between
   accounts. Redeploy the project into the buyer's account (`wrangler login` as the buyer, then deploy),
   then delete it from yours.
3. **Domain:** a subdomain of *your* domain can't be transferred. The buyer registers or brings their own
   domain; if you sell a domain you own, transfer it through the registrar (unlock + auth code), or move
   it within the same registrar/Cloudflare by account push where supported.
4. **Accounts the site depends on:** automation (Make/Zapier), sheets, email, WhatsApp, analytics,
   bot checks — recreate in the buyer's accounts; never hand over your own logins.
5. **Remove your access** after the buyer confirms everything works, and get that confirmation in writing.

---

## 6. Contract, payment and tax

- **Written agreement** (even a one-page email): scope, price, payment schedule, revision rounds,
  delivery date, licence vs assignment, what third-party assets are excluded, support period, no
  warranty of sales/revenue.
- **Payment:** 50% upfront / 50% before handover for builds; escrow (e.g. Escrow.com, or the
  marketplace's escrow) for whole-site sales; hand over the repo/domain only after funds clear.
- **India:** issue an invoice. GST registration becomes mandatory above the services turnover threshold
  (₹20 lakh in most states, ₹10 lakh in special-category states) or for certain inter-state/online
  supplies; export of services to foreign clients can be zero-rated under an LUT once registered.
  Income is taxable as business/professional income. See `india-solopreneur-tax-accounting` and
  confirm with a CA for the specific case.

---

## Claude Execution SOP

1. Read the project (README, config, content, docs) and find: the live URL and whose domain it uses,
   hosting setup, placeholders, third-party assets, revenue/traffic evidence, and anything that only
   runs locally (e.g. a dev-only admin) that a non-technical buyer couldn't use.
2. Recommend one sale model with reasons, and list the blockers to fix before selling.
3. Ask the user who the buyer is and which model they want before changing code, publishing listings or
   contacting anyone. Every listing, message, payment or transfer needs explicit approval.

## Gemini (Antigravity) Execution SOP

1. Use `view_file` to inspect the project (README, configs, content folders, docs) and collect the same
   facts as the Claude SOP step 1.
2. Recommend a sale model and the blocker list; ask the user before any listing, outreach, transfer or
   payment step.

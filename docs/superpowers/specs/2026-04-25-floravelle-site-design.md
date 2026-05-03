# Floravelle Independent Site Design

Date: 2026-04-25
Status: Draft for user review
Project root: `D:\Codex-Workspace\Projects\floravelle-site`

## 1. Goal

Build the first version of an international independent website for a self-owned artificial flower factory.

The site should look like a refined overseas home decor brand, while the conversion path should prioritize wholesale inquiry, sample requests, OEM/ODM customization, and factory trust.

This first version is not a full retail checkout store. It is a brand-led inquiry site that can later expand into ecommerce.

## 2. Working Brand

Working brand name: **Floravelle**

This is temporary and must be easy to replace later. The implementation should keep the brand name in a central config or repeated-content structure, not hard-code it deeply into unrelated components.

Brand positioning:

> Premium faux flowers and botanical decor, crafted by our own factory for homes, weddings, events, and wholesale collections.

Brand tone:

- Refined
- Natural
- Calm
- International
- Home decor oriented
- Factory-capable without looking like a low-price factory site

## 3. Target Customers

Primary customers:

- Overseas home decor buyers
- Wholesale distributors
- Florists and floral studios
- Wedding and event companies
- Interior decorators
- Boutique retailers

Secondary customers:

- Small ecommerce sellers
- Hotel, restaurant, and commercial decor buyers
- Consumers who discover the brand but may later buy through retail features

## 4. Strategic Direction

Recommended direction: **premium brand visual + factory inquiry conversion**.

The site should borrow the visual discipline of premium faux floral brands like the screenshots provided by the user:

- Editorial home styling photography
- Clean product grids
- White, warm white, and pale gray backgrounds
- Elegant serif headings
- Small uppercase navigation and buttons
- Product names that include color, flower type, and dimensions
- Category-first shopping structure

But unlike a pure retail site, the first version should emphasize:

- Request a quote
- Request samples
- Wholesale inquiry
- Custom color and packaging
- OEM and private label
- Factory production capability

## 5. First Version Scope

The first version should include:

- Home page
- Collection/category page
- Product detail page template
- Custom & OEM page
- Factory page
- Inquiry/contact page

The first version should not include:

- Payment checkout
- Complex shipping rules
- Customer accounts
- Inventory management
- Large SKU import workflow
- Tax calculation
- Review system
- Full blog/CMS

These can be added later after the site has real products, real inquiry data, and a clearer sales path.

## 6. Navigation

Top navigation:

- Home
- Artificial Flowers
- Faux Plants
- Wedding & Event
- Custom & OEM
- Factory
- Contact

Primary conversion link:

- Wholesale Inquiry

Header behavior:

- Desktop: centered or left logo, clean nav, inquiry button on the right.
- Mobile: compact logo, menu icon, prominent inquiry action inside the menu.

## 7. Home Page Structure

### 7.1 Hero

Purpose: make the brand feel premium immediately.

Visual:

- Large home decor scene with artificial flowers in a vase.
- Style should feel like a refined kitchen, dining table, mantel, studio, or window-side arrangement.
- Avoid showing factory scenes in the hero.

Copy:

Headline:

> Faux Florals, Made to Feel Effortless

Subheadline:

> Factory-crafted artificial flowers and greenery for refined interiors, event styling, and wholesale collections.

Buttons:

- Explore Collections
- Request Wholesale Quote

### 7.2 Category Entry

Purpose: let buyers quickly understand what the factory can supply.

Categories:

- Hydrangeas
- Orchids
- Blossom Branches
- Greenery
- Hanging Plants
- Wedding Florals

Presentation:

- Circular or clean square image tiles.
- Short labels only.
- No long explanation text.

### 7.3 Featured Products

Purpose: show best-looking, most representative products first.

Layout:

- 4-column grid on desktop.
- 2-column grid on tablet.
- 1 or 2 columns on mobile depending on readability.

Product card fields:

- Product image
- Product name
- Size
- Material or finish tag
- CTA: View Details or Request Quote

Example product naming:

- Real Touch White Hydrangea Stem - 19"
- Cream Magnolia Faux Flower Branch - 35"
- Faux Phalaenopsis Orchid Arrangement - 28"
- UV Resistant Outdoor Greenery Bush - 32"

### 7.4 Scene-Based Collections

Purpose: sell use cases, not only products.

Sections:

- Home Styling
- Wedding & Events
- Hotel & Commercial Decor
- Outdoor UV Greenery

Presentation:

- Large editorial image bands.
- Small overlay text and one button.
- Keep the visual calm and premium.

### 7.5 Factory Capability

Purpose: introduce factory strength without breaking the premium brand feeling.

Key points:

- Own factory production
- Custom colors and materials
- OEM and private label
- Sample support
- Flexible MOQ
- Export packaging
- Quality inspection

Tone:

Avoid:

> cheap factory direct fake flowers

Prefer:

> Factory-crafted faux botanicals with flexible wholesale and custom production.

### 7.6 Custom Process

Four steps:

1. Choose styles
2. Customize color and packaging
3. Confirm samples
4. Start bulk production

This section should be concise and confidence-building.

### 7.7 Inquiry CTA

Headline:

> Start Your Wholesale Collection

Supporting copy:

> Tell us what styles, quantities, and custom details you need. Our team will help prepare samples, pricing, and production options.

Fields:

- Name
- Email
- Company
- Country
- Product interest
- Estimated quantity
- Message

CTA:

- Request a Quote

## 8. Collection Page

Purpose: browse products by category and encourage quote requests.

Features:

- Category title and short description
- Filter-like category chips
- Product grid
- Product detail links
- Quote CTA block after several products

Collection page should feel closer to a premium ecommerce category page than a factory catalog.

## 9. Product Detail Page

Purpose: give enough information for a buyer to inquire confidently.

Content:

- Large product images
- Product name
- Short use-case description
- Specifications
- Materials
- Size
- Color options
- MOQ or "available upon request"
- Custom options
- Packaging note
- Quote/sample CTA

Suggested CTA buttons:

- Request Quote
- Ask for Sample

Specifications table:

- Item type
- Material
- Size
- Color
- Usage
- MOQ
- Customization
- Packaging

## 10. Custom & OEM Page

Purpose: convert B2B buyers who need private label, packaging, color, or product development.

Sections:

- Hero: Custom Faux Floral Production
- What can be customized
- Sample development process
- Packaging and private label
- Recommended buyer types
- Inquiry form

Customizable items:

- Flower color
- Stem length
- Material finish
- Arrangement style
- Packaging
- Label and barcode
- Mixed collection set

## 11. Factory Page

Purpose: build trust.

Sections:

- Factory overview
- Production process
- Quality control
- Packaging and export
- Sample room or showroom
- Why work with us

Visual direction:

Use factory photos, but edit/select them carefully:

- Bright
- Clean
- Ordered
- Human and process-oriented
- Not cluttered

Factory page can be more operational than the homepage, but should still remain neat and premium.

## 12. Contact / Inquiry Page

Purpose: make it easy to contact the company.

Content:

- Inquiry form
- Email
- WhatsApp
- Business hours
- Location/country if suitable
- Short note about response time

Form fields:

- Name
- Email
- WhatsApp
- Company
- Country
- Interested products
- Quantity
- Custom requirements
- File upload can be added later, but not required in the first static prototype.

## 13. Visual System

Color palette:

- Warm white: `#F7F5F1`
- Soft gray: `#E8E6E1`
- Charcoal: `#20201D`
- Sage green: `#7A8B6F`
- Deep olive: `#394333`
- Muted wine accent: `#8B4A4A`

Typography direction:

- Headings: elegant serif style.
- Body: clean modern sans-serif style.
- Buttons and navigation: small uppercase with letter spacing.

Layout principles:

- Generous white space
- Large image-led sections
- Clean product grids
- Minimal borders
- No decorative gradient blobs
- No crowded factory-sales graphics
- No loud discount-first visual language

Button style:

- Black or deep olive background
- Warm white text
- Small uppercase labels
- Sharp or lightly rounded corners

Image direction:

- Hero: lifestyle home decor scenes.
- Products: consistent warm white or light gray backgrounds.
- Details: close-up flower petals, leaves, stems, texture, and scale.
- Factory: clean production, QC, packaging, and sample-room photos.

## 14. Content Guidelines

Use premium manufacturing language.

Good wording:

- Factory-crafted
- Premium faux botanicals
- Wholesale-ready collections
- Custom color development
- Export packaging
- Sample support
- OEM and private label

Avoid wording:

- Cheap
- Fake-looking
- Lowest price
- Factory direct sale
- One-stop bargain
- Too many exclamation marks

## 15. Implementation Direction

First prototype:

- Static responsive website or lightweight frontend app.
- Use temporary placeholder images if real product assets are not ready.
- Keep copy editable.
- Keep brand name replaceable.
- Build clean page templates first.

Later production options:

- Shopify if B2C checkout becomes important.
- WordPress/WooCommerce if the user wants self-hosted flexibility.
- Static site + form backend if the main goal remains B2B inquiry.

For the current stage, the recommended implementation is a local static frontend prototype because it is fastest for visual confirmation and content iteration.

## 16. Success Criteria

The first prototype is successful if:

- It visually feels close to a premium overseas floral/home decor brand.
- It clearly communicates self-owned factory capability.
- A buyer can understand product categories within 10 seconds.
- A wholesale buyer can find the inquiry path quickly.
- The user can replace placeholder products with real products later.
- The site works on desktop and mobile.

## 17. Open Items for Later

These do not block the first prototype:

- Official brand name
- Domain name
- Final logo
- Real product image set
- Final product list
- Pricing policy
- MOQ policy
- Shipping and sample policy
- Payment method
- Whether to add retail checkout

## 18. Approved Initial Direction

The user approved proceeding with the recommended direction:

> Premium brand visual + factory inquiry conversion.


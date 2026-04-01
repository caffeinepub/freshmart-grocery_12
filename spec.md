# FreshMart Grocery

## Current State
New project with default Caffeine scaffold (empty backend actor, no frontend pages).

## Requested Changes (Diff)

### Add
- Full grocery e-commerce frontend with green/white theme
- Homepage: sticky navbar, auto-playing banner slider, category cards, featured products, deals of the day with countdown timer
- Product Listing Page: grid layout, sidebar filters (price, category, brand), real-time search
- Product Detail Page: large image, description, quantity selector, add to cart / buy now, related products
- Cart Page: item list with qty controls, price breakdown (subtotal/discount/delivery/total), checkout CTA
- Checkout Page: form fields (name, address, phone, pincode, email), cash on delivery payment, order summary sidebar, order confirmation state
- Admin Panel at /admin: add/edit/delete products from catalog
- 25-30 dummy products across 6 categories with INR pricing and discount percentages
- Toast notifications on cart actions
- Responsive layout (mobile + desktop)
- Footer with links and social media
- Local cart state management (no backend)

### Modify
- Replace default frontend with multi-page app using React Router

### Remove
- Default placeholder frontend content

## Implementation Plan
1. Set up React Router with routes: /, /products, /products/:id, /cart, /checkout, /admin
2. Create data file with 25-30 Indian grocery products across 6 categories
3. Build CartContext for global cart state
4. Build Navbar component (logo, search, category dropdown, login button, cart badge)
5. Build BannerSlider (auto-play with promo slides)
6. Build CategoryGrid, FeaturedProducts, DealsOfTheDay (with countdown timer)
7. Build ProductListingPage with filters sidebar and real-time search
8. Build ProductDetailPage with quantity selector
9. Build CartPage with price breakdown
10. Build CheckoutPage with form and order confirmation
11. Build AdminPanel for CRUD on products
12. Add toast notifications system
13. Build Footer component
14. Apply green/white theme throughout

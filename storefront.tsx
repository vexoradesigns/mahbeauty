"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { categories, formatPrice, products, type Product, type ProductCategory } from "@/lib/products";
import { Icon } from "./icons";
import { useCart, type CartItem } from "./mah-beauty-shell";

function Stars({ rating, count, small = false }: { rating: number; count?: number; small?: boolean }) {
  return (
    <span className={`rating ${small ? "rating-small" : ""}`}>
      <span className="stars" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, index) => <Icon key={index} name="star" width={small ? 11 : 13} height={small ? 11 : 13} />)}
      </span>
      {count !== undefined && <span className="rating-count">{count} reviews</span>}
    </span>
  );
}

function SectionHeading({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy?: string; action?: React.ReactNode }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {copy && <p className="section-heading-copy">{copy}</p>}
      {action}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link href={`/product/${product.slug}`} className="product-image-link" aria-label={`View ${product.name}`}>
          <img src={product.images[0]} alt={product.name} className="product-image" />
        </Link>
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button className={`wishlist-button ${liked ? "wishlist-active" : ""}`} type="button" aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} onClick={() => setLiked((value) => !value)}>
          <Icon name="heart" width={19} height={19} />
        </button>
        <button className="quick-add" type="button" onClick={() => addToCart(product)}>Quick add <Icon name="plus" width={15} height={15} /></button>
      </div>
      <div className="product-card-content">
        <div className="product-card-title-row">
          <div>
            <p className="product-eyebrow">{product.eyebrow}</p>
            <Link href={`/product/${product.slug}`} className="product-name">{product.name}</Link>
          </div>
          <span className="product-price">{formatPrice(product.price)}</span>
        </div>
        <div className="product-meta-row">
          <Stars rating={product.rating} count={product.reviewCount} small />
          {product.colors && <span className="swatches">{product.colors.slice(0, 3).map((color) => <i key={color} style={{ backgroundColor: color }} />)}</span>}
        </div>
      </div>
    </article>
  );
}

export function HomePage() {
  return (
    <main>
      <section className="hero-section page-pad">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> The soft side of beauty</p>
          <h1>Skin, but<br /><em>softer.</em></h1>
          <p className="hero-description">Thoughtful essentials for your everyday ritual. Easy to love, a joy to use, and made to look like you.</p>
          <div className="hero-actions">
            <Link href="/shop" className="button button-dark">Shop the collection <Icon name="arrow-up-right" width={17} height={17} /></Link>
            <Link href="/shop#bestsellers" className="text-link">Meet the bestsellers <Icon name="arrow-up-right" width={15} height={15} /></Link>
          </div>
          <div className="hero-proof"><div className="proof-avatars"><span>J</span><span>M</span><span>A</span></div><p><strong>4.9/5</strong> loved by 12k+ women</p></div>
        </div>
        <div className="hero-image-panel">
          <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1400&q=88" alt="MahBeauty makeup arranged on a soft blush background" />
          <div className="hero-image-caption"><span>01 / 03</span><span>The glow edit</span></div>
          <div className="hero-floating-card"><span className="floating-spark">✦</span><p>Made for<br /><strong>real life.</strong></p></div>
        </div>
      </section>

      <div className="marquee-band"><div className="marquee-track"><span>Glow softly</span><i>✦</i><span>Feel like yourself</span><i>✦</i><span>Beauty, reimagined</span><i>✦</i><span>Glow softly</span><i>✦</i><span>Feel like yourself</span><i>✦</i></div></div>

      <section className="content-section page-pad collection-section">
        <SectionHeading eyebrow="Find your ritual" title="A little something for every mood." copy="Curated edits that make getting ready feel like a small act of self-care." action={<Link href="/shop" className="text-link heading-link">View all products <Icon name="arrow-up-right" width={15} height={15} /></Link>} />
        <div className="collection-grid">
          <Link href="/shop?category=Makeup" className="collection-card collection-card-large">
            <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=86" alt="Warm neutral makeup collection" />
            <div className="collection-overlay"><span>01</span><h3>Makeup</h3><p>Color that feels like you.</p><Icon name="arrow-up-right" width={21} height={21} /></div>
          </Link>
          <Link href="/shop?category=Skincare" className="collection-card collection-card-tall">
            <img src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=86" alt="Minimal skincare bottles" />
            <div className="collection-overlay"><span>02</span><h3>Skincare</h3><p>Quietly effective essentials.</p><Icon name="arrow-up-right" width={21} height={21} /></div>
          </Link>
          <Link href="/shop?category=Sets" className="collection-card collection-card-wide">
            <img src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1000&q=86" alt="Beauty set with botanical details" />
            <div className="collection-overlay"><span>03</span><h3>Sets & rituals</h3><p>The good kind of more.</p><Icon name="arrow-up-right" width={21} height={21} /></div>
          </Link>
        </div>
      </section>

      <section id="bestsellers" className="content-section page-pad bestseller-section">
        <SectionHeading eyebrow="The good stuff" title="Most-loved, for a reason." copy="The formulas our community keeps coming back to." action={<Link href="/shop" className="text-link heading-link">Shop bestsellers <Icon name="arrow-up-right" width={15} height={15} /></Link>} />
        <div className="product-grid product-grid-four">{products.slice(0, 4).map((product) => <ProductCard product={product} key={product.slug} />)}</div>
      </section>

      <section className="editorial-section page-pad">
        <div className="editorial-image"><img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=86" alt="MahBeauty skincare products in warm light" /><span className="editorial-stamp">MAH<br /><small>Beauty</small></span></div>
        <div className="editorial-copy"><p className="eyebrow">Our point of view</p><h2>Formulated for your <em>real</em> life.</h2><p>We believe beauty should meet you where you are. Our formulas are considered, comfortable, and made with ingredients you can feel good about putting on your skin.</p><Link href="/about" className="button button-outline">Discover MahBeauty <Icon name="arrow-up-right" width={17} height={17} /></Link><div className="editorial-details"><span><strong>01</strong> No unnecessary extras</span><span><strong>02</strong> Always cruelty-free</span><span><strong>03</strong> Made for daily use</span></div></div>
      </section>

      <section className="quote-section page-pad"><p className="eyebrow">Notes from the community</p><blockquote>“MahBeauty makes me feel like the best version of myself, not a different version.”</blockquote><div className="quote-author"><span className="quote-line" /> <span>— Olivia M. · Verified customer</span></div></section>

      <section className="newsletter-section page-pad"><div><p className="eyebrow">A little note from us</p><h2>Good things, softly delivered.</h2><p>Sign up for first access to new drops, thoughtful tips, and 10% off your first order.</p></div><form className="newsletter-form" onSubmit={(event) => event.preventDefault()}><label htmlFor="email">Your email address</label><div><input id="email" type="email" required placeholder="you@email.com" /><button type="submit" aria-label="Subscribe"><Icon name="arrow-up-right" width={20} height={20} /></button></div><small>By subscribing, you agree to our privacy policy.</small></form></section>
    </main>
  );
}

export function ShopPage() {
  const [category, setCategory] = useState<ProductCategory | "All">("All");
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const queryCategory = new URLSearchParams(window.location.search).get("category");
    if (queryCategory === "Makeup" || queryCategory === "Skincare" || queryCategory === "Sets") setCategory(queryCategory);
  }, []);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const searchTerm = search.trim().toLowerCase();
      return matchesCategory && (!searchTerm || `${product.name} ${product.eyebrow} ${product.description}`.toLowerCase().includes(searchTerm));
    });
    return [...filtered].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return products.indexOf(a) - products.indexOf(b);
    });
  }, [category, search, sort]);

  return (
    <main className="shop-page page-pad">
      <section className="shop-intro"><div><p className="eyebrow">The MahBeauty edit</p><h1>Beautifully<br /><em>considered.</em></h1></div><div className="shop-intro-copy"><p>Essentials for skin, cheeks, lips and the in-between moments. Made to be mixed, matched, and made yours.</p><div className="shop-stat-row"><span><strong>08</strong> essentials</span><span><strong>100%</strong> cruelty-free</span></div></div></section>
      <div className="shop-toolbar">
        <div className="category-tabs">{categories.map((item) => <button key={item.value} className={category === item.value ? "tab-active" : ""} type="button" onClick={() => setCategory(item.value)}>{item.label}</button>)}</div>
        <div className="toolbar-actions"><button className="mobile-filter-button" type="button" onClick={() => setFilterOpen((value) => !value)}><Icon name="plus" width={15} height={15} /> Filters</button><label className="search-field"><Icon name="search" width={16} height={16} /><input type="search" placeholder="Search the edit" value={search} onChange={(event) => setSearch(event.target.value)} /></label><label className="sort-field"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><Icon name="chevron-down" width={14} height={14} /></label></div>
      </div>
      <div className={`mobile-filter-panel ${filterOpen ? "mobile-filter-panel-open" : ""}`}><p className="filter-panel-label">Shop by category</p>{categories.map((item) => <button key={item.value} type="button" className={category === item.value ? "filter-option-active" : ""} onClick={() => { setCategory(item.value); setFilterOpen(false); }}>{item.label}<Icon name="check" width={15} height={15} /></button>)}</div>
      <div className="shop-results-line"><p><strong>{visibleProducts.length}</strong> products</p><p className="shop-results-note">Small rituals, meaningful results.</p></div>
      {visibleProducts.length > 0 ? <div className="product-grid product-grid-three">{visibleProducts.map((product) => <ProductCard product={product} key={product.slug} />)}</div> : <div className="no-results"><span>✦</span><h2>Nothing found just yet.</h2><p>Try a different search or explore all of our essentials.</p><button className="button button-dark" type="button" onClick={() => { setSearch(""); setCategory("All"); }}>Clear filters</button></div>}
      <section className="shop-callout"><div><p className="eyebrow">Need a little guidance?</p><h2>Not sure where to start?</h2><p>Take the two-minute MahBeauty ritual finder and we’ll make a little edit, just for you.</p></div><Link href="/#bestsellers" className="button button-outline">Find your ritual <Icon name="arrow-up-right" width={17} height={17} /></Link></section>
    </main>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openInfo, setOpenInfo] = useState("details");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  const related = products.filter((item) => item.slug !== product.slug && item.category === product.category).slice(0, 3);

  return (
    <main className="product-page page-pad">
      <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/shop">Shop</Link><span>/</span><span>{product.name}</span></div>
      <section className="product-detail-grid">
        <div className="product-gallery"><div className="gallery-main"><img src={product.images[selectedImage]} alt={`${product.name} product image ${selectedImage + 1}`} /><span className="gallery-count">{String(selectedImage + 1).padStart(2, "0")} / {String(product.images.length).padStart(2, "0")}</span></div><div className="gallery-thumbs">{product.images.map((image, index) => <button type="button" className={selectedImage === index ? "thumb-active" : ""} onClick={() => setSelectedImage(index)} key={image}><img src={image} alt={`${product.name} view ${index + 1}`} /></button>)}</div></div>
        <div className="product-information"><p className="eyebrow">{product.eyebrow}</p><h1>{product.name}</h1><div className="detail-rating"><Stars rating={product.rating} count={product.reviewCount} /><span className="rating-divider">·</span><span>Write a review</span></div><div className="detail-price"><strong>{formatPrice(product.price)}</strong>{product.compareAt && <><span>{formatPrice(product.compareAt)}</span><em>{product.tag}</em></>}</div><p className="product-lede">{product.longDescription}</p>{product.shade && <div className="shade-detail"><span className="detail-label">{product.category === "Makeup" ? "Shade" : "Size"}</span><strong>{product.shade}</strong>{product.colors && <div className="detail-swatches">{product.colors.map((color, index) => <button type="button" key={color} aria-label={`Select shade ${index + 1}`} style={{ backgroundColor: color }} className={index === 0 ? "swatch-selected" : ""} />)}</div>}</div>}<div className="purchase-row"><div className="quantity-stepper"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Icon name="minus" width={15} height={15} /></button><span>{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}><Icon name="plus" width={15} height={15} /></button></div><button className="button button-dark add-button" type="button" onClick={handleAdd}>{added ? <><Icon name="check" width={18} height={18} /> Added to bag</> : <>Add to bag <span>{formatPrice(product.price * quantity)}</span></>}</button></div><div className="product-perks"><span><Icon name="truck" width={18} height={18} /><strong>Free shipping</strong> over $75</span><span><Icon name="check" width={18} height={18} /><strong>30-day</strong> easy returns</span></div><div className="product-accordions"><Accordion title="The details" open={openInfo === "details"} onClick={() => setOpenInfo(openInfo === "details" ? "" : "details")}><p>{product.description} {product.longDescription}</p><p className="size-note">Size: {product.size}</p></Accordion><Accordion title="Ingredients" open={openInfo === "ingredients"} onClick={() => setOpenInfo(openInfo === "ingredients" ? "" : "ingredients")}><p>{product.ingredients}</p></Accordion><Accordion title={`Reviews (${product.reviewCount})`} open={openInfo === "reviews"} onClick={() => setOpenInfo(openInfo === "reviews" ? "" : "reviews")}><div className="accordion-review-summary"><Stars rating={product.rating} /><strong>{product.rating}</strong><span>Based on {product.reviewCount} reviews</span></div></Accordion></div></div>
      </section>
      <section className="reviews-section"><div className="reviews-heading"><div><p className="eyebrow">What they say</p><h2>Loved by your skin.</h2></div><div className="review-score"><strong>{product.rating}</strong><Stars rating={product.rating} /><span>{product.reviewCount} verified reviews</span></div></div><div className="review-grid">{product.reviews.map((review) => <article className="review-card" key={`${review.name}-${review.date}`}><Stars rating={review.rating} small /><p>“{review.text}”</p><div><strong>{review.name}</strong>{review.verified && <span><Icon name="check" width={12} height={12} /> Verified buyer</span>}<small>{review.date}</small></div></article>)}</div></section>
      <section className="related-products"><SectionHeading eyebrow="Keep exploring" title="You might also like." action={<Link href="/shop" className="text-link heading-link">View all <Icon name="arrow-up-right" width={15} height={15} /></Link>} /><div className="product-grid product-grid-three">{related.map((item) => <ProductCard product={item} key={item.slug} />)}</div></section>
    </main>
  );
}

function Accordion({ title, open, onClick, children }: { title: string; open: boolean; onClick: () => void; children: React.ReactNode }) {
  return <div className={`accordion ${open ? "accordion-open" : ""}`}><button type="button" onClick={onClick}><span>{title}</span><Icon name={open ? "minus" : "plus"} width={16} height={16} /></button>{open && <div className="accordion-content">{children}</div>}</div>;
}

function CheckoutItem({ item }: { item: CartItem }) {
  return <div className="checkout-item"><div className="checkout-item-image"><img src={item.product.images[0]} alt={item.product.name} /><span>{item.quantity}</span></div><div><strong>{item.product.name}</strong><small>{item.product.eyebrow}</small></div><span>{formatPrice(item.product.price * item.quantity)}</span></div>;
}

export function CheckoutPage() {
  const { items, subtotal, setCartOpen } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const shipping = subtotal === 0 || subtotal >= 75 ? 0 : 8;
  const total = subtotal + shipping;

  if (submitted) return <main className="checkout-page page-pad"><div className="order-success"><div className="success-mark"><Icon name="check" width={30} height={30} /></div><p className="eyebrow">Order confirmed</p><h1>Thank you for choosing<br /><em>the softer side.</em></h1><p>Your MahBeauty edit is on its way. We’ve sent a confirmation to your inbox with all the details.</p><span className="order-number">Order #MAH-{Math.floor(10000 + Math.random() * 89999)}</span><Link href="/shop" className="button button-dark">Continue shopping <Icon name="arrow-up-right" width={17} height={17} /></Link></div></main>;

  if (items.length === 0) return <main className="checkout-page page-pad"><div className="checkout-empty"><p className="eyebrow">Your checkout</p><h1>Your bag is beautifully empty.</h1><p>Find a few essentials to make it feel more like yours.</p><Link href="/shop" className="button button-dark">Explore the edit <Icon name="arrow-up-right" width={17} height={17} /></Link></div></main>;

  return <main className="checkout-page page-pad"><div className="checkout-top"><Link href="/" className="checkout-brand">MAH<span>BEAUTY</span></Link><div className="checkout-steps"><span className="step-active"><b>01</b> Information</span><span><b>02</b> Payment</span><span><b>03</b> Confirmation</span></div><button type="button" onClick={() => setCartOpen(true)} className="checkout-bag-link"><Icon name="bag" width={18} height={18} /> {items.reduce((sum, item) => sum + item.quantity, 0)} items</button></div><div className="checkout-layout"><form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><div className="checkout-form-heading"><p className="eyebrow">Almost yours</p><h1>Complete your order</h1><p>Free shipping on orders over $75 · Secure checkout</p></div><fieldset><legend>Contact information</legend><label>Email address<input type="email" required placeholder="you@email.com" /></label><label className="checkbox-label"><input type="checkbox" /> <span>Keep me in the loop about new drops and rituals</span></label></fieldset><fieldset><legend>Shipping address</legend><div className="two-inputs"><label>First name<input required placeholder="First name" /></label><label>Last name<input required placeholder="Last name" /></label></div><label>Address<input required placeholder="Street address" /></label><label>Apartment, suite, etc. <span className="optional">Optional</span><input placeholder="Apartment, suite, etc." /></label><div className="three-inputs"><label>City<input required placeholder="City" /></label><label>State<select required defaultValue=""><option value="" disabled>State</option><option>NY</option><option>CA</option><option>TX</option><option>IL</option><option>FL</option></select></label><label>ZIP code<input required inputMode="numeric" placeholder="00000" /></label></div></fieldset><fieldset><legend>Payment</legend><div className="payment-placeholder"><div><span className="payment-chip">VISA</span><span className="payment-chip payment-chip-light">•••</span><span>Card details</span></div><Icon name="check" width={17} height={17} /></div><div className="two-inputs"><label>Card number<input required inputMode="numeric" placeholder="1234 1234 1234 1234" /></label><label>Expiration / CVC<input required placeholder="MM / YY   ·   123" /></label></div></fieldset><button type="submit" className="button button-dark button-wide checkout-submit">Place order <Icon name="arrow-up-right" width={17} height={17} /></button><p className="checkout-legal">By placing your order, you agree to MahBeauty’s terms and privacy policy.</p></form><aside className="order-summary"><div className="summary-inner"><div className="summary-heading"><h2>Your edit</h2><span>{items.reduce((sum, item) => sum + item.quantity, 0)} items</span></div><div className="checkout-items">{items.map((item) => <CheckoutItem item={item} key={item.product.slug} />)}</div><div className="summary-lines"><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div><span>Shipping</span><strong>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</strong></div><div className="summary-grand-total"><span>Total</span><strong>{formatPrice(total)}</strong></div></div><div className="checkout-reassurance"><span>✦</span><p><strong>Good to know</strong><br />Every MahBeauty order is packed with care in recyclable materials.</p></div></div></aside></div></main>;
}

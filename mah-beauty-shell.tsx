"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { formatPrice, getProduct, type Product } from "@/lib/products";
import { Icon } from "./icons";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeFromCart: (slug: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_STORAGE_KEY = "mah-beauty-cart";

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside StorefrontShell");
  return context;
}

function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as { slug: string; quantity: number }[];
        setItems(
          parsed
            .map(({ slug, quantity }) => {
              const product = getProduct(slug);
              return product && quantity > 0 ? { product, quantity } : null;
            })
            .filter((item): item is CartItem => Boolean(item)),
        );
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(items.map(({ product, quantity }) => ({ slug: product.slug, quantity }))),
    );
  }, [items, isHydrated]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.product.slug === product.slug);
      if (existing) {
        return current.map((item) =>
          item.product.slug === product.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...current, { product, quantity }];
    });
    setCartOpen(true);
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity < 1) {
      setItems((current) => current.filter((item) => item.product.slug !== slug));
      return;
    }
    setItems((current) =>
      current.map((item) => (item.product.slug === slug ? { ...item, quantity } : item)),
    );
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setItems((current) => current.filter((item) => item.product.slug !== slug));
  }, []);

  const value = useMemo(
    () => ({
      items,
      cartCount: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce((total, item) => total + item.product.price * item.quantity, 0),
      isCartOpen,
      setCartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
    }),
    [items, isCartOpen, addToCart, updateQuantity, removeFromCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function Header() {
  const pathname = usePathname();
  const { cartCount, setCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/shop", label: "Shop" },
    { href: "/shop?category=Makeup", label: "Makeup" },
    { href: "/shop?category=Skincare", label: "Skincare" },
    { href: "/shop?category=Sets", label: "Sets" },
  ];

  return (
    <>
      <div className="announcement-bar">
        <span>Complimentary shipping on orders over $75</span>
        <span className="announcement-dot">✦</span>
        <span>Thoughtfully made, always cruelty-free</span>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span /><span />
          </button>
          <Link href="/" className="brand-lockup" onClick={() => setMobileOpen(false)}>
            <span className="brand-mark">MAH</span>
            <span className="brand-submark">BEAUTY</span>
          </Link>
          <nav className={`main-nav ${mobileOpen ? "main-nav-open" : ""}`} aria-label="Main navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? "nav-active" : ""}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/shop#bestsellers" onClick={() => setMobileOpen(false)}>Bestsellers</Link>
          </nav>
          <div className="header-actions">
            <Link href="/shop" className="header-icon-link" aria-label="Search products">
              <Icon name="search" width={20} height={20} />
            </Link>
            <Link href="/about" className="header-icon-link desktop-only" aria-label="Your account">
              <Icon name="user" width={20} height={20} />
            </Link>
            <button className="bag-button" type="button" onClick={() => setCartOpen(true)} aria-label={`Open bag with ${cartCount} items`}>
              <Icon name="bag" width={21} height={21} />
              <span>Bag</span>
              <span className="bag-count">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function CartDrawer() {
  const { items, subtotal, isCartOpen, setCartOpen, updateQuantity, removeFromCart } = useCart();
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <>
      <div className={`drawer-backdrop ${isCartOpen ? "drawer-backdrop-visible" : ""}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-drawer ${isCartOpen ? "cart-drawer-open" : ""}`} aria-label="Shopping bag" aria-hidden={!isCartOpen}>
        <div className="drawer-header">
          <div>
            <p className="eyebrow">Your edit</p>
            <h2>Your bag <span>({items.reduce((count, item) => count + item.quantity, 0)})</span></h2>
          </div>
          <button className="icon-button" type="button" aria-label="Close bag" onClick={() => setCartOpen(false)}>
            <Icon name="close" width={21} height={21} />
          </button>
        </div>
        {items.length === 0 ? (
          <div className="empty-bag">
            <div className="empty-bag-icon"><Icon name="bag" width={26} height={26} /></div>
            <h3>Your bag is waiting.</h3>
            <p>Add something lovely to get started.</p>
            <Link href="/shop" className="button button-dark" onClick={() => setCartOpen(false)}>Explore the edit</Link>
          </div>
        ) : (
          <>
            <div className="free-shipping-note">
              <Icon name="truck" width={19} height={19} />
              {subtotal >= 75 ? "You unlocked complimentary shipping." : `You're ${formatPrice(75 - subtotal)} away from free shipping.`}
            </div>
            <div className="cart-items">
              {items.map(({ product, quantity }) => (
                <div className="cart-item" key={product.slug}>
                  <Link href={`/product/${product.slug}`} onClick={() => setCartOpen(false)} className="cart-item-image">
                    <img src={product.images[0]} alt={product.name} />
                  </Link>
                  <div className="cart-item-info">
                    <div className="cart-item-heading">
                      <div>
                        <p className="cart-item-eyebrow">{product.eyebrow}</p>
                        <Link href={`/product/${product.slug}`} onClick={() => setCartOpen(false)}>{product.name}</Link>
                      </div>
                      <button className="remove-button" type="button" onClick={() => removeFromCart(product.slug)}>Remove</button>
                    </div>
                    <div className="cart-item-bottom">
                      <div className="quantity-stepper small-stepper">
                        <button type="button" aria-label={`Decrease ${product.name} quantity`} onClick={() => updateQuantity(product.slug, quantity - 1)}><Icon name="minus" width={13} height={13} /></button>
                        <span>{quantity}</span>
                        <button type="button" aria-label={`Increase ${product.name} quantity`} onClick={() => updateQuantity(product.slug, quantity + 1)}><Icon name="plus" width={13} height={13} /></button>
                      </div>
                      <span className="cart-line-price">{formatPrice(product.price * quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="drawer-summary">
              <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <div><span>Shipping</span><span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span></div>
              <div className="drawer-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
              <Link href="/checkout" className="button button-dark button-wide" onClick={() => setCartOpen(false)}>Continue to checkout <Icon name="arrow-up-right" width={17} height={17} /></Link>
              <p className="secure-note">Secure checkout · Easy returns within 30 days</p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export function StorefrontShell({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Header />
      {children}
      <CartDrawer />
    </CartProvider>
  );
}

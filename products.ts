export type ProductCategory = "Makeup" | "Skincare" | "Sets";

export type Review = {
  name: string;
  date: string;
  rating: number;
  text: string;
  verified?: boolean;
};

export type Product = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  longDescription: string;
  price: number;
  compareAt?: number;
  category: ProductCategory;
  tag?: string;
  shade?: string;
  size: string;
  colors?: string[];
  images: string[];
  ingredients: string;
  reviews: Review[];
  rating: number;
  reviewCount: number;
};

const image = (id: string, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=86`;

export const products: Product[] = [
  {
    slug: "dew-edit-radiance-serum",
    name: "The Dew Edit",
    eyebrow: "Brightening serum",
    description: "A glass-skin glow without the extra steps.",
    longDescription:
      "A silky, fast-absorbing serum that brings tired skin back to life. Niacinamide, vitamin C and three weights of hyaluronic acid work together to visibly brighten, plump and soften every morning.",
    price: 48,
    category: "Skincare",
    tag: "Bestseller",
    size: "30 ml / 1.0 fl oz",
    images: [
      image("photo-1620916566398-39f1143ab7be"),
      image("photo-1556229010-6c3f2c9ca5f8"),
      image("photo-1611930022073-b7a4ba5fcccd"),
    ],
    ingredients: "Niacinamide 5%, Vitamin C derivative, Hyaluronic acid complex, Aloe vera",
    rating: 4.9,
    reviewCount: 126,
    reviews: [
      { name: "Maya R.", date: "2 weeks ago", rating: 5, text: "My skin looks rested even when I am very much not. The glow is subtle, expensive-looking, and it layers perfectly under makeup.", verified: true },
      { name: "Sofia L.", date: "1 month ago", rating: 5, text: "I noticed the softness after the first week. This is now the one step I refuse to skip.", verified: true },
      { name: "Aisha K.", date: "2 months ago", rating: 4, text: "Beautiful texture and no pilling with my moisturizer. A little really does go a long way.", verified: true },
    ],
  },
  {
    slug: "soft-focus-skin-tint",
    name: "Soft Focus Skin Tint",
    eyebrow: "Breathable complexion",
    description: "Your skin, on its very best day.",
    longDescription:
      "A sheer-to-lightweight tint with a soft satin finish that lets your real skin show through. The flexible formula smooths the look of tone and texture while feeling like skincare.",
    price: 42,
    category: "Makeup",
    tag: "New",
    shade: "12 flexible shades",
    size: "35 ml / 1.18 fl oz",
    colors: ["#f0c6ad", "#d99d7c", "#b97455", "#8b4d37"],
    images: [
      image("photo-1522335789203-aabd1fc54bc9"),
      image("photo-1596462502278-27bfdc403348"),
      image("photo-1512496015851-a90fb38ba796"),
    ],
    ingredients: "Squalane, Jojoba esters, Vitamin E, Mineral pigments",
    rating: 4.8,
    reviewCount: 94,
    reviews: [
      { name: "Camille J.", date: "5 days ago", rating: 5, text: "The perfect ‘I did nothing’ base. It evens me out without hiding my freckles and somehow makes my skin look more hydrated.", verified: true },
      { name: "Elena P.", date: "3 weeks ago", rating: 5, text: "Shade matching was easy and the finish is gorgeous. I wore it through a full workday in the heat.", verified: true },
      { name: "Nina T.", date: "1 month ago", rating: 4, text: "Light, comfortable, and easy to blend with fingers. I would love even more shades eventually.", verified: true },
    ],
  },
  {
    slug: "silk-veil-cream-blush",
    name: "Silk Veil Blush",
    eyebrow: "Cream color",
    description: "A just-pinched flush with a second-skin finish.",
    longDescription:
      "A buildable cream blush that melts into skin for that elusive from-within flush. Tap on with fingers for a sheer veil, or layer it for a little more poetry.",
    price: 28,
    category: "Makeup",
    tag: "Cult favorite",
    shade: "Petal — warm rose",
    size: "5.5 g / 0.19 oz",
    colors: ["#be6c69", "#d8877a", "#e3a08f", "#9f505b"],
    images: [
      image("photo-1512496015851-a90fb38ba796"),
      image("photo-1596462502278-27bfdc403348"),
      image("photo-1522335789203-aabd1fc54bc9"),
    ],
    ingredients: "Murumuru butter, Rosehip oil, Vitamin E, Mineral color",
    rating: 4.9,
    reviewCount: 211,
    reviews: [
      { name: "Jules M.", date: "1 week ago", rating: 5, text: "Petal is the most flattering blush I own. It blends like a dream and still looks fresh after dinner.", verified: true },
      { name: "Priya S.", date: "3 weeks ago", rating: 5, text: "Tiny but mighty. The color payoff is so pretty and never patchy over my sunscreen.", verified: true },
    ],
  },
  {
    slug: "cloud-kiss-lip-oil",
    name: "Cloud Kiss Lip Oil",
    eyebrow: "Nourishing color",
    description: "The shine of gloss. The comfort of a balm.",
    longDescription:
      "An ultra-cushiony lip oil that gives lips a wash of sheer rose color and a plush, non-sticky shine. Made for reapplying, whenever you feel like it.",
    price: 24,
    category: "Makeup",
    tag: "New",
    shade: "Rosewater",
    size: "4.5 ml / 0.15 fl oz",
    colors: ["#d78686", "#a95e6a", "#e2a295"],
    images: [
      image("photo-1586495777744-4413f21062fa"),
      image("photo-1596462502278-27bfdc403348"),
      image("photo-1522335789203-aabd1fc54bc9"),
    ],
    ingredients: "Meadowfoam seed oil, Apricot kernel oil, Vitamin E, Raspberry extract",
    rating: 4.7,
    reviewCount: 76,
    reviews: [
      { name: "Avery B.", date: "4 days ago", rating: 5, text: "Not sticky, not too glossy, just perfect. Rosewater gives my lips the prettiest lived-in tint.", verified: true },
      { name: "Mina C.", date: "2 weeks ago", rating: 4, text: "The applicator is lovely and the formula feels super nourishing. It lives in every bag now.", verified: true },
    ],
  },
  {
    slug: "barrier-bloom-moisturizer",
    name: "Barrier Bloom",
    eyebrow: "Comfort cream",
    description: "A calm, cloud-soft reset for thirsty skin.",
    longDescription:
      "A rich-but-breathable moisturizer that wraps skin in lasting comfort. Ceramides, oat and squalane support the barrier without leaving a heavy finish.",
    price: 36,
    category: "Skincare",
    tag: "Skin reset",
    size: "50 ml / 1.7 fl oz",
    images: [
      image("photo-1556229010-6c3f2c9ca5f8"),
      image("photo-1620916566398-39f1143ab7be"),
      image("photo-1556228578-0d85b1a4d571"),
    ],
    ingredients: "Ceramides, Colloidal oat, Squalane, Panthenol, Shea butter",
    rating: 4.8,
    reviewCount: 148,
    reviews: [
      { name: "Tara W.", date: "1 week ago", rating: 5, text: "My cheeks have never felt this comfortable in winter. It is rich without being greasy and sits beautifully under SPF.", verified: true },
      { name: "Leah D.", date: "1 month ago", rating: 5, text: "A genuinely soothing moisturizer. My skin barrier bounced back in about a week.", verified: true },
    ],
  },
  {
    slug: "moonlit-eye-quad",
    name: "Moonlit Eye Quad",
    eyebrow: "Four-pan shadow",
    description: "Four luminous neutrals for every kind of night.",
    longDescription:
      "A considered edit of four creamy, blendable shadows in warm pearl, soft cocoa, candlelight and deep espresso. One compact, endless ways to wear it.",
    price: 39,
    category: "Makeup",
    tag: "Limited",
    size: "4 x 1.2 g / 0.17 oz",
    colors: ["#ead4bc", "#b58f78", "#d9ae7d", "#574033"],
    images: [
      image("photo-1512207846876-bb54ef505c5a"),
      image("photo-1596462502278-27bfdc403348"),
      image("photo-1522335789203-aabd1fc54bc9"),
    ],
    ingredients: "Mica, Jojoba oil, Rice powder, Vitamin E",
    rating: 4.9,
    reviewCount: 58,
    reviews: [
      { name: "Mara E.", date: "2 weeks ago", rating: 5, text: "The shimmer is refined, not glittery, and the espresso shade makes the prettiest soft liner.", verified: true },
      { name: "Gia N.", date: "1 month ago", rating: 5, text: "Perfect little palette for travel. Every shade gets used and the mirror is actually useful.", verified: true },
    ],
  },
  {
    slug: "petal-polish-set",
    name: "Petal & Polish Set",
    eyebrow: "The color ritual",
    description: "A rosy trio for cheeks, lips and everywhere in between.",
    longDescription:
      "Our most-loved color ritual, bundled together. A full-size Silk Veil Blush, Cloud Kiss Lip Oil and a soft-touch blending puff arrive in our signature blush box.",
    price: 58,
    compareAt: 76,
    category: "Sets",
    tag: "Save 24%",
    size: "3 piece set",
    images: [
      image("photo-1596462502278-27bfdc403348"),
      image("photo-1522335789203-aabd1fc54bc9"),
      image("photo-1512496015851-a90fb38ba796"),
    ],
    ingredients: "See individual product pages for full ingredient lists.",
    rating: 4.9,
    reviewCount: 83,
    reviews: [
      { name: "Hannah K.", date: "1 week ago", rating: 5, text: "Bought this for my sister and immediately ordered one for myself. The packaging is beautiful and every piece is useful.", verified: true },
      { name: "Rina S.", date: "1 month ago", rating: 5, text: "Such a lovely gift set. The blush shade works with everything and the lip oil is my new favorite.", verified: true },
    ],
  },
  {
    slug: "daily-ritual-duo",
    name: "Daily Ritual Duo",
    eyebrow: "Glow essentials",
    description: "Two quiet little steps for a brighter morning.",
    longDescription:
      "Start and finish your glow ritual with The Dew Edit and Barrier Bloom. A simple pairing for skin that feels hydrated, balanced and ready for the day.",
    price: 72,
    compareAt: 84,
    category: "Sets",
    tag: "Best value",
    size: "2 full-size products",
    images: [
      image("photo-1556228578-0d85b1a4d571"),
      image("photo-1620916566398-39f1143ab7be"),
      image("photo-1556229010-6c3f2c9ca5f8"),
    ],
    ingredients: "See individual product pages for full ingredient lists.",
    rating: 4.8,
    reviewCount: 61,
    reviews: [
      { name: "Morgan A.", date: "3 weeks ago", rating: 5, text: "My morning routine feels so much more intentional now. Both products are gentle and make my skin glow.", verified: true },
      { name: "Selene P.", date: "2 months ago", rating: 5, text: "Great value and the set arrived beautifully wrapped. A perfect first step into MahBeauty.", verified: true },
    ],
  },
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);

export const formatPrice = (price: number) => `$${price.toFixed(2)}`;

export const categories: { label: string; value: "All" | ProductCategory }[] = [
  { label: "All products", value: "All" },
  { label: "Makeup", value: "Makeup" },
  { label: "Skincare", value: "Skincare" },
  { label: "Sets & rituals", value: "Sets" },
];

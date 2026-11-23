export const STORE = {
  tokopedia: 'https://www.tokopedia.com/prosperofood',
  shopee: 'https://shopee.co.id/prosperofood',
};

export type Category = 'drinks' | 'snacks' | 'fruit';

export interface Product {
  id: string;
  category: Category;
  name: string;
  description: string;
  detail?: string; // flavours, sizes or variants
  image: string;
  alt: string;
  featured?: boolean;
  /** Direct product links. When empty the buttons open the store front. */
  tokopedia?: string;
  shopee?: string;
}

const img = (name: string) => `${import.meta.env.BASE_URL}images/web/${name}.webp`;

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'drinks', label: 'The Realcho range' },
  { id: 'snacks', label: 'Chobayoo chocolate snacks' },
  { id: 'fruit', label: 'Fruit & savoury' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'realcho-original',
    category: 'drinks',
    name: 'Realcho Original',
    description: 'Deep aroma and full body. Good hot or iced. No milk, no sugar, no preservatives.',
    detail: '125 g · 250 g',
    image: img('realcho'),
    alt: 'Prospero Realcho tube beside a clay cup on burlap',
    featured: true,
  },
  {
    id: 'realcho-variant',
    category: 'drinks',
    name: 'Realcho Variant',
    description: 'Chocolate blended with natural flavours. Still milk-free.',
    detail: 'Banana · Tea · Coffee · Mint · Hazelnut',
    image: img('variant'),
    alt: 'Realcho flavour variant boxes',
  },
  {
    id: 'realcho-bright',
    category: 'drinks',
    name: 'Realcho Bright',
    description: 'With Vitamin A, C and Ginkgo Biloba. For eyes that look at screens all day.',
    image: img('bright'),
    alt: 'Realcho Bright tube with cocoa beans and a wooden spoon',
  },
  {
    id: 'realcho-high-fiber',
    category: 'drinks',
    name: 'Realcho High Fiber',
    description: 'Sweetened with coconut sugar. Helps digestion; safe for diabetics.',
    image: img('fiber'),
    alt: 'Realcho High Fiber tube with flowers',
  },
  {
    id: 'realcho-rewind',
    category: 'drinks',
    name: 'Realcho Rewind',
    description: 'With Niacinamide (B3) and low-GI coconut sugar. For joints and skin.',
    image: img('rewind'),
    alt: 'Realcho Rewind pink tube',
  },
  {
    id: 'dark-85',
    category: 'drinks',
    name: 'Dark Chocolate 85%',
    description: '85% cocoa. Bold and bitter, for people who drink it black.',
    image: img('dark'),
    alt: 'Dark Chocolate 85% jar',
  },
  {
    id: 'biscuitball',
    category: 'snacks',
    name: 'BiscuitBall',
    description: 'Crunchy biscuit balls coated in chocolate. A desk snack.',
    detail: 'Pouch 60 g · Jar 100 g',
    image: img('biscuit'),
    alt: 'Chobayoo BiscuitBall pouch and jar',
  },
  {
    id: 'coffeeball',
    category: 'snacks',
    name: 'CoffeeBall',
    description: 'Roasted Indonesian coffee beans in chocolate. Nutty and crunchy.',
    detail: 'Mini box 20 g · Jar 100 g',
    image: img('coffee'),
    alt: 'Chobayoo CoffeeBall box and jar with coffee beans',
  },
  {
    id: 'belilagi',
    category: 'fruit',
    name: 'Belilagi Freeze-Dried',
    description: 'Dried at –40°C so the vitamins stay. Fine for babies from 6 months.',
    detail: 'Sweet Corn · Mix Fruit · Durian',
    image: img('freezedried'),
    alt: 'Belilagi freeze-dried fruit pouches',
  },
  {
    id: 'fruttachips',
    category: 'fruit',
    name: 'Fruttachips',
    description: 'Vacuum-fried chips from Indonesian fruit. Naturally sweet.',
    detail: 'Mix Fruit · Snake Fruit · Jackfruit · Banana · Apple',
    image: img('fruttachips'),
    alt: 'Fruttachips mix fruit jar',
  },
  {
    id: 'chipsoe',
    category: 'fruit',
    name: 'Chipsoe',
    description: 'Potato, tempeh and salted-egg fish skin chips.',
    detail: 'Smoked Beef · Hot & Spicy · Salted Egg',
    image: img('chipsoe'),
    alt: 'Chipsoe pouches with chips in bowls',
  },
];

export interface CertDoc {
  id: string;
  name: string;
  pages: number;
}

export interface CertGroup {
  id: string;
  label: string;
  title: string;
  note?: string;
  /** No docs = shown as text only, not clickable */
  docs: CertDoc[];
}

export const certPage = (docId: string, page: number) =>
  `${import.meta.env.BASE_URL}images/web/certs/${docId}-${page}.webp`;

export const CERTIFICATES: CertGroup[] = [
  {
    id: 'bpom',
    label: 'BPOM',
    title: 'BPOM product registrations (NIE)',
    note: 'Distribution permits from Indonesia’s food and drug authority.',
    docs: [
      { id: 'nie-realcho', name: 'Realcho Original', pages: 2 },
      { id: 'nie-realcho-125', name: 'Realcho 125 g', pages: 2 },
      { id: 'nie-realcho-250', name: 'Realcho 250 g', pages: 2 },
      { id: 'nie-coffee-pouch', name: 'Chobayoo Coffee Bean — Pouch', pages: 2 },
      { id: 'nie-coffee-jar', name: 'Chobayoo Coffee Bean — Jar', pages: 2 },
      { id: 'nie-coffee-box', name: 'Chobayoo Coffee Bean — Box', pages: 2 },
      { id: 'nie-biscuit-carton', name: 'Chobayoo Biscuit — Carton', pages: 2 },
      { id: 'nie-biscuit-jar', name: 'Chobayoo Biscuit — Jar', pages: 2 },
      { id: 'nie-chobayoo-pouch', name: 'Chobayoo — Pouch', pages: 2 },
      { id: 'nie-fruttachips', name: 'Fruttachips', pages: 2 },
    ],
  },
  {
    id: 'halal',
    label: 'Halal (BPJPH)',
    title: 'Halal certificates (BPJPH)',
    docs: [
      { id: 'halal-drinks', name: 'Chocolate drinks', pages: 3 },
      { id: 'halal-praline', name: 'Chocolate praline', pages: 2 },
    ],
  },
  { id: 'iso', label: 'ISO 9001:2015', title: 'ISO 9001:2015', docs: [] },
  { id: 'fssc', label: 'FSSC 22000', title: 'FSSC 22000', docs: [] },
  { id: 'fda', label: 'US FDA', title: 'US FDA', docs: [] },
  {
    id: 'kosher',
    label: 'Kosher',
    title: 'Kosher certificate',
    note: 'Valid until 9 August 2025.',
    docs: [{ id: 'kosher', name: 'Kosher certificate', pages: 1 }],
  },
];

export const CONTACT = {
  phoneDisplay: '+62 21 2900 03645',
  phoneHref: 'tel:+6221290003645',
  email: 'prosperofood.business@gmail.com',
  address: ['Paramount Marketplace, Ruko Tematik P52', 'Gading Serpong, Tangerang 15810'],
};

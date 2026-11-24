import { useRef, useState } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ShopLinks from './components/ShopLinks';
import CertificateViewer from './components/CertificateViewer';
import { ChocolateDefs, FloatingPiece } from './components/Chocolate';
import { useMotion } from './hooks/useMotion';
import { CATEGORIES, CERTIFICATES, CONTACT, PRODUCTS, STORE, type CertGroup } from './data/products';

const BASE = import.meta.env.BASE_URL;

function SectionLabel({ n, title, count }: { n: string; title: string; count: number }) {
  return (
    <div className="mb-8 flex items-baseline gap-4 border-b border-line-soft pb-3.5">
      <span className="font-serif text-[22px] text-gold">{n}</span>
      <h3 className="text-[15px] font-semibold uppercase tracking-[0.14em]">{title}</h3>
      <span className="ml-auto whitespace-nowrap text-sm text-muted">
        {count} product{count === 1 ? '' : 's'}
      </span>
    </div>
  );
}

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const [cert, setCert] = useState<CertGroup | null>(null);
  useMotion(root);

  const drinks = PRODUCTS.filter((p) => p.category === 'drinks');
  const [featured, ...otherDrinks] = drinks;
  const [secondDrink, ...restDrinks] = otherDrinks;
  const snacks = PRODUCTS.filter((p) => p.category === 'snacks');
  const fruit = PRODUCTS.filter((p) => p.category === 'fruit');
  let cardIndex = 0;

  return (
    <div ref={root} className="relative overflow-x-clip bg-cocoa-950 pb-[84px] font-sans text-cream md:pb-0">
      <a
        href="#products"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-cream focus:px-4 focus:py-2 focus:text-cocoa-950"
      >
        Skip to products
      </a>
      <ChocolateDefs />
      <Header />

      <main>
        {/* ---------- HERO ---------- */}
        <section
          id="top"
          className="relative mx-auto flex max-w-[1440px] flex-wrap items-center gap-12 px-5 pb-24 pt-10 md:px-[5vw] md:pt-16"
        >
          <FloatingPiece kind="bean" depth={0.25} size={54} rotate={24} className="left-[3%] top-14 hidden md:block" />
          <FloatingPiece kind="shard" depth={0.25} size={46} rotate={-30} className="left-[40%] top-6 hidden md:block" />
          <FloatingPiece kind="curl" depth={0.4} size={64} rotate={12} className="bottom-10 left-[30%] hidden md:block" />

          <div className="relative z-10 min-w-0 flex-[1_1_480px]">
            <p data-hero-fade className="mb-6 text-xs uppercase tracking-[0.16em] text-gold md:text-[13px]">
              Prospero Realcho
            </p>
            <h1 className="font-serif text-[clamp(48px,6.6vw,100px)] font-normal leading-[0.98] tracking-[-0.01em]">
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block">Premium</span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block">
                  Indonesian <em className="text-gold-light">chocolate</em>
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block">drink.</span>
              </span>
            </h1>
            <p data-hero-fade className="mt-7 max-w-[480px] text-base leading-relaxed text-cream-dim md:text-lg">
              Rich, deep and made from Indonesian cocoa. No milk, no sugar, no preservatives. Served hot or iced.
            </p>
            <div data-hero-fade className="mt-9 flex flex-wrap gap-3">
              <a
                href="#products"
                className="flex min-h-[52px] items-center rounded-full bg-cream px-7 text-[15px] font-semibold text-cocoa-950 transition-colors hover:bg-white"
              >
                Shop the collection
              </a>
              <ShopLinks variant="pill" className="[&>a]:min-h-[52px] [&>a]:px-5 [&>a]:text-[15px]" />
            </div>
          </div>

          <div className="relative min-w-0 flex-[1_1_520px]">
            <div data-hero-photo className="relative aspect-[4/3.4] overflow-hidden rounded-md bg-black">
              <img
                src={`${BASE}images/web/realcho.webp`}
                alt="Prospero Realcho tube beside a clay cup on burlap"
                {...{ fetchpriority: "high" }}
                className="block h-full w-full object-cover object-[30%_50%]"
              />
            </div>
            <p data-hero-fade className="mt-3.5 flex justify-between text-[13px] text-muted">
              <span>Prospero Realcho, Original</span>
              <span>125 g · 250 g</span>
            </p>
            <FloatingPiece intro kind="chunk" depth={0.9} size={150} rotate={-16} className="-left-6 top-[38%] md:-left-[70px] [&_svg]:max-md:!h-[92px] [&_svg]:max-md:!w-[92px]" />
            <FloatingPiece intro kind="shard" depth={0.8} size={120} rotate={28} className="-right-3 -top-8 md:-right-9 md:-top-11 [&_svg]:max-md:!h-[78px] [&_svg]:max-md:!w-[78px]" />
            <FloatingPiece intro kind="bean" depth={0.7} size={96} rotate={-22} className="-bottom-6 right-[12%]" />
            <FloatingPiece intro kind="curl" depth={0.6} size={70} rotate={40} className="-top-6 left-[22%] hidden md:block" />
          </div>
        </section>

        {/* ---------- CERTIFICATES ---------- */}
        <div
          id="certified"
          className="flex flex-wrap items-center justify-between gap-x-8 gap-y-0 border-y border-line px-5 py-3 text-[11px] uppercase tracking-[0.14em] text-cream-dim md:px-[5vw] md:text-[13px]"
        >
          <span className="text-gold">Certified</span>
          {CERTIFICATES.map((c) =>
            c.docs.length ? (
              <button
                key={c.id}
                type="button"
                onClick={() => setCert(c)}
                aria-haspopup="dialog"
                className="group -mx-2 flex min-h-[44px] items-center gap-2 rounded px-2 uppercase tracking-[0.14em] text-cream transition-colors hover:text-gold-light"
              >
                <span className="border-b border-dotted border-gold/60 pb-0.5 group-hover:border-gold-light">{c.label}</span>
                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100">
                  <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8zM14 3v5h5M9 13h6M9 17h4" />
                </svg>
              </button>
            ) : (
              <span key={c.id} className="flex min-h-[44px] items-center">
                {c.label}
              </span>
            ),
          )}
        </div>

        {/* ---------- REALCHO RANGE ---------- */}
        <section id="range" aria-label="The Realcho range" className="relative pt-24 md:pt-32">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-6 px-5 pb-10 md:px-[5vw]">
            <h2 className="font-serif text-[clamp(44px,5vw,76px)] font-normal leading-none">
              Prospero <em className="text-gold-light">Realcho</em>
            </h2>
            <p className="text-xs uppercase tracking-[0.16em] text-gold md:text-[13px]">
              Original · Variant · Bright · High Fiber · Rewind · Dark 85%
            </p>
          </div>
          <div data-range className="relative">
            <div className="overflow-hidden">
              <img
                data-range-img
                src={`${BASE}images/web/range.webp`}
                alt="The full Prospero range: Realcho tubes, boxes and snack pouches"
                loading="lazy"
                className="block h-[clamp(380px,52vw,720px)] w-full object-cover will-change-transform"
              />
            </div>
            <FloatingPiece kind="chunk" depth={0.85} size={140} rotate={-14} className="-top-14 left-[6%] [&_svg]:max-md:!h-[84px] [&_svg]:max-md:!w-[84px]" />
            <FloatingPiece kind="shard" depth={0.75} size={120} rotate={32} className="-bottom-11 right-[9%] [&_svg]:max-md:!h-[76px] [&_svg]:max-md:!w-[76px]" />
            <FloatingPiece kind="bean" depth={0.6} size={84} rotate={-20} className="-top-6 right-[30%] hidden md:block" />
          </div>
        </section>

        {/* ---------- THE SHELF ---------- */}
        <section id="products" className="relative mx-auto max-w-[1440px] px-5 pb-10 pt-28 md:px-[5vw] md:pt-32">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif text-[clamp(44px,5vw,72px)] font-normal leading-none">The whole shelf</h2>
            <p className="max-w-[420px] text-base leading-relaxed text-cream-dim">
              Every Prospero product, on one page. Available at our official Tokopedia and Shopee stores.
            </p>
          </div>

          <SectionLabel n="01" title={CATEGORIES[0].label} count={drinks.length} />
          <div className="mb-7 flex flex-wrap gap-7">
            <div className="flex min-w-0 flex-[999_1_560px] [&>article]:flex-1">
              <ProductCard product={featured} layout="feature" index={cardIndex++} />
            </div>
            <div className="flex min-w-0 flex-[1_1_320px] [&>article]:flex-1">
              <ProductCard product={secondDrink} index={cardIndex++} />
            </div>
          </div>
          <div className="mb-24 grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-4">
            {restDrinks.map((p) => (
              <ProductCard key={p.id} product={p} index={cardIndex++} />
            ))}
          </div>

          <SectionLabel n="02" title={CATEGORIES[1].label} count={snacks.length} />
          <div className="relative mb-24 grid grid-cols-1 gap-7 lg:grid-cols-2">
            <FloatingPiece kind="bean" depth={0.65} size={80} rotate={18} className="-top-10 left-[47%] hidden lg:block" />
            {snacks.map((p) => (
              <ProductCard key={p.id} product={p} layout="wide" index={cardIndex++} />
            ))}
          </div>

          <SectionLabel n="03" title={CATEGORIES[2].label} count={fruit.length} />
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {fruit.map((p) => (
              <ProductCard key={p.id} product={p} index={cardIndex++} />
            ))}
          </div>
        </section>

        {/* ---------- ORDER ONLINE ---------- */}
        <section className="relative mx-auto max-w-[1440px] px-5 py-28 md:px-[5vw] md:py-32">
          <FloatingPiece kind="curl" depth={0.3} size={70} rotate={16} className="left-[6%] top-16" />
          <h2 className="mb-12 text-center font-serif text-[clamp(40px,4.4vw,64px)] font-normal leading-none">
            Order online
          </h2>
          <div className="flex flex-wrap gap-7">
            {[
              { name: 'Tokopedia', href: STORE.tokopedia, host: 'tokopedia.com/', dot: 'bg-[#42B549]' },
              { name: 'Shopee', href: STORE.shopee, host: 'shopee.co.id/', dot: 'bg-[#EE4D2D]' },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 flex-[1_1_420px] flex-col gap-4 rounded-md border border-line-soft bg-cocoa-850 p-7 text-cream no-underline transition-colors duration-500 hover:border-gold md:p-10"
              >
                <span className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-cream-dim md:text-sm">
                  <span aria-hidden="true" className={`h-3 w-3 rounded-full ${s.dot}`} />
                  {s.name}
                </span>
                <span className="break-words font-serif text-[26px] leading-tight md:text-[40px]">
                  {s.host}
                  <br />
                  prosperofood
                </span>
                <span className="text-[15px] font-semibold text-link">
                  Open the store{' '}
                  <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-[15px] text-cream-dim">
            Café or bulk order? Call <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a> or email{' '}
            <a href={`mailto:${CONTACT.email}`} className="break-all">
              {CONTACT.email}
            </a>
          </p>
        </section>
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer id="contact" className="border-t border-line px-5 pb-10 pt-16 md:px-[5vw]">
        <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-12">
          <div className="flex-[1_1_280px]">
            <img src={`${BASE}images/web/logo-cream.png`} alt="Prospero Food" className="h-10 w-auto" />
            <p className="mt-4 max-w-[300px] text-sm leading-relaxed text-muted">
              Premium Indonesian chocolate drinks and snacks. Made in Tangerang.
            </p>
          </div>
          <div className="flex-[1_1_220px] text-sm leading-7">
            <p className="mb-2 text-xs uppercase tracking-[0.14em] text-gold">Visit</p>
            <p className="text-cream-soft">
              {CONTACT.address[0]}
              <br />
              {CONTACT.address[1]}
            </p>
          </div>
          <div className="flex-[1_1_220px] text-sm leading-7">
            <p className="mb-2 text-xs uppercase tracking-[0.14em] text-gold">Talk to us</p>
            <p>
              <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
              <br />
              <a href={`mailto:${CONTACT.email}`} className="break-all">
                {CONTACT.email}
              </a>
            </p>
          </div>
        </div>
        <p className="mx-auto mt-14 max-w-[1440px] text-[13px] text-muted">
          © {new Date().getFullYear()} ProsperoFood
        </p>
      </footer>

      <CertificateViewer group={cert} onClose={() => setCert(null)} />

      {/* ---------- MOBILE SHOP BAR ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cocoa-950/95 px-4 pb-5 pt-3 backdrop-blur md:hidden">
        <ShopLinks variant="solid" className="[&>a]:min-h-[48px] [&>a]:rounded-full" />
      </div>
    </div>
  );
}

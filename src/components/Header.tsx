import { useEffect, useState } from 'react';
import ShopLinks from './ShopLinks';

const LINKS = [
  { href: '#products', label: 'Products' },
  { href: '#range', label: 'Realcho' },
  { href: '#certified', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-500 ${
        scrolled || open ? 'border-line bg-cocoa-950/95 backdrop-blur' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-3.5 md:px-[5vw] md:py-5">
        <a href="#top" aria-label="Prospero Food, back to top" className="flex">
          <img
            src={`${import.meta.env.BASE_URL}images/web/logo-cream.png`}
            alt="Prospero Food"
            className="h-7 w-auto md:h-9"
          />
        </a>

        <nav aria-label="Main" className="hidden gap-8 text-[15px] md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-cream no-underline transition-colors hover:text-gold-light">
              {l.label}
            </a>
          ))}
        </nav>

        <ShopLinks variant="pill" className="hidden md:flex" />

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-cream md:hidden"
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line px-5 pb-6 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-4 font-serif text-2xl text-cream no-underline"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

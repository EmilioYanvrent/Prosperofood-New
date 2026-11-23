import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power3.out';

let lenisInstance: Lenis | null = null;
/** The page's smooth-scroll instance (null with reduced motion). */
export const getLenis = () => lenisInstance;

/**
 * All page motion lives here:
 *  - Lenis smooth scrolling
 *  - hero entrance
 *  - floating chocolate: scroll parallax by depth, slow bob, mouse tilt
 *  - Realcho range photo zoom
 *  - product cards revealing in rows
 * Everything is skipped when the visitor prefers reduced motion.
 */
export function useMotion(root: RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // ---- smooth scroll ----
    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -72 } });
    lenisInstance = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      // ---- hero entrance ----
      const intro = gsap.timeline({ defaults: { ease: EASE } });
      intro
        .from('[data-hero-line]', { yPercent: 110, duration: 0.9, stagger: 0.12 })
        .from('[data-hero-photo]', { opacity: 0, duration: 1.1 }, 0.1)
        .from('[data-hero-photo] img', { scale: 1.08, duration: 1.8 }, 0.1)
        .from('[data-hero-fade]', { opacity: 0, y: 16, duration: 0.8, stagger: 0.08 }, 0.45)
        // scale + opacity only: y and rotation belong to the bob / parallax tweens
        .from('[data-float][data-intro] [data-bob]', { opacity: 0, scale: 0.8, duration: 1.4, stagger: 0.08 }, 0.55);

      // ---- floating chocolate ----
      const pieces = gsap.utils.toArray<HTMLElement>('[data-float]');
      pieces.forEach((piece, i) => {
        const depth = parseFloat(piece.dataset.float || '0.5');
        // front pieces travel further than the page, back pieces lag behind
        // phones get a gentler drift so pieces never wander onto headings
        const travel = (depth - 0.45) * (window.innerWidth < 768 ? 140 : 360);
        const spin = (i % 2 ? 1 : -1) * (10 + depth * 18);

        gsap.fromTo(
          piece,
          { y: travel, rotation: -spin / 2 },
          {
            y: -travel,
            rotation: spin / 2,
            ease: 'none',
            scrollTrigger: { trigger: piece, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          },
        );

        // slow idle bob, each piece on its own rhythm; paused when off-screen
        const bobEl = piece.querySelector<HTMLElement>('[data-bob]');
        if (bobEl) {
          const bob = gsap.to(bobEl, {
            y: 6 + depth * 6,
            rotation: (i % 2 ? 1 : -1) * 3,
            duration: 5 + ((i * 0.7) % 2.2),
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: (i * 0.37) % 2,
            paused: true,
          });
          ScrollTrigger.create({
            trigger: piece,
            start: 'top bottom+=100',
            end: 'bottom top-=100',
            onToggle: (self) => (self.isActive ? bob.play() : bob.pause()),
          });
        }
      });

      // mouse tilt on front pieces, desktop only
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const front = pieces
          .filter((p) => parseFloat(p.dataset.float || '0') >= 0.6)
          .map((p) => p.querySelector<HTMLElement>('[data-tilt]'))
          .filter((t): t is HTMLElement => !!t)
          .map((t) => ({
            x: gsap.quickTo(t, 'x', { duration: 1.2, ease: EASE }),
            y: gsap.quickTo(t, 'y', { duration: 1.2, ease: EASE }),
          }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          front.forEach((f) => {
            f.x(nx * 24);
            f.y(ny * 24);
          });
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        cleanups.push(() => window.removeEventListener('pointermove', onMove));
      }

      // ---- Realcho range photo: slow camera pull-back ----
      gsap.fromTo(
        '[data-range-img]',
        { scale: 1.15 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-range]', start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );

      // ---- product cards: reveal row by row, once ----
      gsap.set('[data-card]', { opacity: 0, y: 28 });
      ScrollTrigger.batch('[data-card]', {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: EASE, stagger: 0.08 }),
      });
    }, el);

    // images load after layout; recalc trigger positions
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      cleanups.forEach((fn) => fn());
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [root]);
}

import { useEffect, useRef, useState } from 'react';
import { certPage, type CertGroup } from '../data/products';
import { getLenis } from '../hooks/useMotion';

interface Props {
  group: CertGroup | null;
  onClose: () => void;
}

/** Modal that shows a certificate group's documents, page by page. */
export default function CertificateViewer({ group, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [docIndex, setDocIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);

  // open / close the native dialog and pause page scrolling behind it
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (group) {
      setDocIndex(0);
      setPage(1);
      if (!d.open) d.showModal();
      getLenis()?.stop();
      document.documentElement.style.overflow = 'hidden';
    } else if (d.open) {
      d.close();
    }
    return () => {
      getLenis()?.start();
      document.documentElement.style.overflow = '';
    };
  }, [group]);

  const doc = group?.docs[docIndex];
  const pages = doc?.pages ?? 1;

  useEffect(() => setLoaded(false), [doc?.id, page]);

  // arrow keys flip pages
  useEffect(() => {
    if (!group) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setPage((p) => Math.min(pages, p + 1));
      if (e.key === 'ArrowLeft') setPage((p) => Math.max(1, p - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [group, pages]);

  const pickDoc = (i: number) => {
    setDocIndex(i);
    setPage(1);
  };

  const src = doc ? certPage(doc.id, page) : '';

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      aria-labelledby="cert-title"
      className="m-auto h-[min(92vh,980px)] w-[min(94vw,1180px)] max-w-none overflow-hidden rounded-md border border-line-soft bg-cocoa-900 p-0 text-cream backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      {group && doc && (
        <div className="flex h-full flex-col">
          {/* header */}
          <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 md:px-7">
            <div className="min-w-0">
              <h2 id="cert-title" className="font-serif text-2xl leading-tight md:text-3xl">
                {group.title}
              </h2>
              {group.note && <p className="mt-1 text-sm text-muted">{group.note}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close certificate viewer"
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-line-strong text-cream transition-colors hover:border-cream"
            >
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col md:flex-row">
            {/* document list */}
            {group.docs.length > 1 && (
              <nav
                aria-label="Documents"
                data-lenis-prevent
                className="flex flex-none gap-2 overflow-x-auto border-b border-line px-5 py-3 md:w-72 md:flex-col md:gap-1 md:overflow-y-auto md:overflow-x-hidden md:border-b-0 md:border-r md:px-3 md:py-4"
              >
                {group.docs.map((d, i) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => pickDoc(i)}
                    aria-current={i === docIndex ? 'true' : undefined}
                    className={`min-h-[44px] flex-none whitespace-nowrap rounded px-3.5 text-left text-sm transition-colors md:whitespace-normal md:py-2.5 ${
                      i === docIndex
                        ? 'bg-cream font-semibold text-cocoa-950'
                        : 'border border-line-soft text-cream-dim hover:border-cream hover:text-cream md:border-transparent'
                    }`}
                  >
                    {d.name}
                  </button>
                ))}
              </nav>
            )}

            {/* page */}
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
              <div data-lenis-prevent className="relative min-h-0 flex-1 overflow-auto bg-[#0d0a08] p-4 md:p-6">
                {!loaded && (
                  <p className="absolute inset-0 flex items-center justify-center text-sm text-muted">Loading…</p>
                )}
                <img
                  key={src}
                  src={src}
                  alt={`${doc.name}, page ${page} of ${pages}`}
                  onLoad={() => setLoaded(true)}
                  className={`mx-auto h-full w-auto max-w-full rounded-sm bg-white object-contain shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-opacity duration-300 ${
                    loaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3 md:px-7">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    aria-label="Previous page"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong transition-colors hover:border-cream disabled:opacity-30 disabled:hover:border-line-strong"
                  >
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 6l-6 6 6 6" />
                    </svg>
                  </button>
                  <span className="min-w-[96px] text-center text-sm text-cream-dim" aria-live="polite">
                    Page {page} of {pages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(pages, p + 1))}
                    disabled={page >= pages}
                    aria-label="Next page"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong transition-colors hover:border-cream disabled:opacity-30 disabled:hover:border-line-strong"
                  >
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
                <a href={src} target="_blank" rel="noopener noreferrer" className="text-sm">
                  Open full size ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

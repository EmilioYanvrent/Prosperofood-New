import type { Product } from '../data/products';
import ShopLinks from './ShopLinks';
import { Piece, type PieceKind } from './Chocolate';

const HOVER_PIECES: PieceKind[] = ['chunk', 'shard', 'bean'];

interface Props {
  product: Product;
  layout?: 'feature' | 'wide' | 'tall';
  index: number;
}

export default function ProductCard({ product, layout = 'tall', index }: Props) {
  const piece = HOVER_PIECES[index % HOVER_PIECES.length];
  const isRow = layout === 'feature' || layout === 'wide';

  return (
    <article
      data-card
      className={`group relative flex min-w-0 rounded-md bg-cocoa-850 ${
        isRow ? 'flex-col sm:flex-row' : 'flex-col'
      }`}
    >
      {/* chocolate piece that slides out from the corner on hover */}
      <Piece
        kind={piece}
        size={layout === 'feature' ? 64 : 48}
        className="pointer-events-none absolute -right-3 -top-3 z-10 hidden translate-x-[-16px] translate-y-[16px] rotate-12 scale-75 opacity-0 drop-shadow-[0_10px_12px_rgba(0,0,0,0.55)] transition-all duration-500 ease-out-expo [@media(hover:hover)]:block group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-[24deg] group-hover:scale-100 group-hover:opacity-100"
      />

      <div
        className={`overflow-hidden ${
          layout === 'feature'
            ? 'h-72 rounded-t-md sm:h-auto sm:min-h-[380px] sm:w-1/2 sm:rounded-l-md sm:rounded-tr-none'
            : layout === 'wide'
              ? 'h-64 rounded-t-md sm:h-auto sm:min-h-[300px] sm:w-1/2 sm:rounded-l-md sm:rounded-tr-none'
              : 'h-56 rounded-t-md'
        }`}
      >
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
      </div>

      <div className={`flex flex-1 flex-col gap-2.5 ${layout === 'feature' ? 'p-7 sm:p-9' : 'p-6'}`}>
        {product.featured && <p className="text-xs uppercase tracking-[0.14em] text-gold">Signature</p>}
        <h4
          className={`font-serif leading-tight ${
            layout === 'feature' ? 'text-4xl' : layout === 'wide' ? 'text-[28px]' : 'text-2xl'
          }`}
        >
          {product.name}
        </h4>
        <p className="text-[15px] leading-relaxed text-cream-dim">{product.description}</p>
        {product.detail && <p className="text-sm text-gold-light">{product.detail}</p>}
        <ShopLinks
          variant={product.featured ? 'solid' : 'outline'}
          tokopedia={product.tokopedia}
          shopee={product.shopee}
          productName={product.name}
          className="mt-auto pt-3"
        />
      </div>
    </article>
  );
}

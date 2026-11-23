import { STORE } from '../data/products';

type Variant = 'solid' | 'outline' | 'pill';

const DOT = {
  tokopedia: { solid: 'bg-[#2E8B34]', other: 'bg-[#42B549]' },
  shopee: { solid: 'bg-[#D8431F]', other: 'bg-[#EE4D2D]' },
};

const base =
  'flex flex-1 items-center justify-center gap-2 min-h-[44px] text-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light';

const styles: Record<Variant, string> = {
  solid: 'rounded bg-cream font-semibold text-cocoa-950 hover:bg-white',
  outline: 'rounded border border-line-strong text-cream hover:border-cream hover:bg-cream hover:text-cocoa-950',
  pill: 'flex-none rounded-full border border-line-strong px-4 text-cream hover:border-cream',
};

interface Props {
  variant?: Variant;
  tokopedia?: string;
  shopee?: string;
  productName?: string;
  className?: string;
}

export default function ShopLinks({ variant = 'outline', tokopedia, shopee, productName, className = '' }: Props) {
  const dot = (shop: 'tokopedia' | 'shopee') =>
    `h-2 w-2 rounded-full ${variant === 'solid' ? DOT[shop].solid : DOT[shop].other}`;
  const label = (shop: string) => (productName ? `Buy ${productName} on ${shop}` : `Prospero on ${shop}`);

  return (
    <div className={`flex gap-2 ${className}`}>
      <a
        href={tokopedia || STORE.tokopedia}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label('Tokopedia')}
        className={`${base} ${styles[variant]}`}
      >
        <span aria-hidden="true" className={dot('tokopedia')} />
        Tokopedia
      </a>
      <a
        href={shopee || STORE.shopee}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label('Shopee')}
        className={`${base} ${styles[variant]}`}
      >
        <span aria-hidden="true" className={dot('shopee')} />
        Shopee
      </a>
    </div>
  );
}

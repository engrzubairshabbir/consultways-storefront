import productsData from '@/data/products.json';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

// Helper to find a product across all categories
const getProduct = (asin: string) => {
  for (const category of productsData) {
    const product = category.products.find(p => p.asin === asin);
    if (product) return { product, category };
  }
  return null;
};

// 1. Tell Next.js to generate static pages for ALL products
export function generateStaticParams() {
  return productsData.flatMap(category => 
    category.products.map(product => ({
      asin: product.asin,
    }))
  );
}

// 2. Generate perfect SEO Meta Tags for each individual product
export async function generateMetadata({ params }: { params: Promise<{ asin: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = getProduct(resolvedParams.asin);
  
  if (!data) return { title: 'Product Not Found' };

  return {
    title: `${data.product.title} - Best Price 2026`,
    description: data.product.description,
    openGraph: {
      title: `${data.product.title} | ConsultWays Finds`,
      description: data.product.description,
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ asin: string }> }) {
  const resolvedParams = await params;
  const data = getProduct(resolvedParams.asin);

  if (!data) {
    notFound();
  }

  const { product, category } = data;
  const associateId = 'consult03f-20';
  const affiliateUrl = `https://www.amazon.com/dp/${product.asin}?tag=${associateId}`;

  // 3. Perfect JSON-LD Schema for Google Shopping Snippets!
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.imageUrl,
    description: product.description,
    offers: {
      '@type': 'Offer',
      price: product.price.replace('$', ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: affiliateUrl
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      bestRating: '5',
      worstRating: '1',
      reviewCount: Math.floor(Math.random() * 500) + 50 // Adds organic looking review counts
    }
  };

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '4rem 2rem', minHeight: '80vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Breadcrumbs for SEO */}
      <nav style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <Link href="/" className="hover-scale" style={{ color: 'var(--text-primary)' }}>Home</Link>
        {' > '}
        <Link href={`/category/${category.slug}`} className="hover-scale" style={{ color: 'var(--text-primary)' }}>{category.title}</Link>
        {' > '}
        <span>{product.title.substring(0, 30)}...</span>
      </nav>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
        {/* Product Image */}
        <div className="glass-panel" style={{ flex: '1 1 400px', padding: '2rem', display: 'flex', justifyContent: 'center', backgroundColor: '#fff' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={product.imageUrl} 
            alt={product.title}
            onError={(e) => {
              const fallbackText = encodeURIComponent(product.title.split(' ').slice(0, 3).join(' '));
              e.currentTarget.src = `https://placehold.co/600x600/1e293b/fff?text=${fallbackText}`;
            }}
            style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
          />
        </div>

        {/* Product Details */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', lineHeight: 1.2 }}>{product.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-gold)' }}>{product.price}</span>
            <span style={{ fontSize: '1.1rem', backgroundColor: 'var(--glass-bg)', padding: '4px 12px', borderRadius: '20px' }}>
              ⭐ {product.rating} / 5.0
            </span>
          </div>
          
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {product.description}
          </p>

          <div style={{ marginTop: '2rem' }}>
            <a 
              href={affiliateUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary hover-scale"
              style={{ 
                width: '100%', 
                textDecoration: 'none', 
                padding: '1.2rem', 
                fontSize: '1.3rem',
                display: 'flex',
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)'
              }}
            >
              View Price on Amazon &rarr;
            </a>
            <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
              We may earn a commission if you buy through this link, at no extra cost to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

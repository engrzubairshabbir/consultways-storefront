import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';

// Generate static routes for all our categories
export function generateStaticParams() {
  return productsData.map((category) => ({
    slug: category.slug,
  }));
}

// Generate dynamic SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const category = productsData.find((c) => c.slug === resolvedParams.slug);
  
  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.title} | Top Curated Amazon Finds 2026`,
    description: category.description,
    openGraph: {
      title: `${category.title} | ConsultWays Finds`,
      description: category.description,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = productsData.find((c) => c.slug === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  // Generate JSON-LD Schema for Google Rich Snippets (ItemList of Products)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': category.products.map((product, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Product',
        'name': product.title,
        'description': product.description,
        'image': product.imageUrl,
        'offers': {
          '@type': 'Offer',
          'price': product.price.replace('$', ''),
          'priceCurrency': 'USD',
          'availability': 'https://schema.org/InStock',
          'url': `https://www.amazon.com/dp/${product.asin}?tag=consult03f-20`
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': product.rating.toString(),
          'reviewCount': '150' // Placeholder for rich snippet visualization
        }
      }
    }))
  };

  return (
    <>
      <Navbar />
      
      {/* Inject JSON-LD Schema into the Head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{
        flexGrow: 1,
        width: '100%',
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '2rem'
      }}>
        
        {/* Category Header */}
        <div style={{ textAlign: 'center', margin: '3rem 0 4rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem',
            lineHeight: 1.2
          }}>
            <span className="gradient-text">{category.title}</span>
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {category.description}
          </p>
        </div>

        {/* Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '5rem'
        }}>
          {category.products.map((product) => (
            <ProductCard key={product.asin} product={product} />
          ))}
        </div>
        
      </main>
      <Footer />
    </>
  );
}

"use client";
import Image from 'next/image';

interface Product {
  asin: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  rating: number;
}

export default function ProductCard({ product }: { product: Product }) {
  // Hardcoded Amazon Associate ID
  const associateId = 'consult03f-20';
  const affiliateUrl = `https://www.amazon.com/dp/${product.asin}?tag=${associateId}`;

  return (
    <div className="glass-panel animate-fade-in" style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
      position: 'relative'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      
      {/* Image Container wrapped in internal link */}
      <Link href={`/product/${product.asin}`} style={{ textDecoration: 'none' }}>
        <div style={{
          width: '100%',
          height: '250px',
          backgroundColor: '#fff',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          cursor: 'pointer'
        }}>
          {/* Using standard img tag with an onError fallback to handle Amazon hotlink protection (403 errors) */}
          <img 
            src={product.imageUrl} 
            alt={product.title}
            onError={(e) => {
              // Replace broken image with a clean placeholder showing the first few words of the title
              const fallbackText = encodeURIComponent(product.title.split(' ').slice(0, 3).join(' '));
              e.currentTarget.src = `https://placehold.co/400x400/1e293b/fff?text=${fallbackText}`;
            }}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          />
        </div>
      </Link>

      {/* Content Container */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <Link href={`/product/${product.asin}`} style={{ textDecoration: 'none', flex: 1 }}>
            <h3 className="hover-scale" style={{ 
              fontSize: '1.1rem', 
              fontWeight: 600, 
              lineHeight: 1.3,
              color: 'var(--text-primary)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              cursor: 'pointer'
            }}>
              {product.title}
            </h3>
          </Link>
          <span style={{ 
            fontWeight: 700, 
            color: 'var(--accent-gold)', 
            fontSize: '1.1rem',
            marginLeft: '1rem'
          }}>
            {product.price}
          </span>
        </div>

        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '0.9rem', 
          marginBottom: '1.5rem',
          flexGrow: 1
        }}>
          {product.description}
        </p>

        <a 
          href={affiliateUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ width: '100%', textDecoration: 'none', textAlign: 'center' }}
        >
          View on Amazon
        </a>
      </div>
    </div>
  );
}

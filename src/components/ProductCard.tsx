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
      
      {/* Image Container */}
      <div style={{
        width: '100%',
        height: '250px',
        backgroundColor: '#fff',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        {/* Using standard img tag for external URLs to avoid next/image domain config issues initially */}
        <img 
          src={product.imageUrl} 
          alt={product.title}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Content Container */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <h3 style={{ 
            fontSize: '1.1rem', 
            fontWeight: 600, 
            lineHeight: 1.3,
            color: 'var(--text-primary)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.title}
          </h3>
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
          style={{ width: '100%', textDecoration: 'none' }}
        >
          View on Amazon
        </a>
      </div>
    </div>
  );
}

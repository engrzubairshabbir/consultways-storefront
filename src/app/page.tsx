import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{
        flexGrow: 1,
        width: '100%',
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', margin: '4rem 0 6rem' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            marginBottom: '1rem',
            lineHeight: 1.1
          }}>
            Discover The Web's Best <br />
            <span className="gradient-text">Curated Finds</span>
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            We scour the internet to bring you the most viral, highly-rated, and innovative products. Stop searching, start finding.
          </p>
        </div>

        {/* Categories & Products */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          {productsData.map((category) => (
            <section key={category.id}>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{category.title}</h2>
                <p style={{ color: 'var(--text-secondary)' }}>{category.description}</p>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
              }}>
                {category.products.map((product) => (
                  <ProductCard key={product.asin} product={product} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}


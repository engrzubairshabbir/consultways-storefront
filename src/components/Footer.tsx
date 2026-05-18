export default function Footer() {
  return (
    <footer style={{
      marginTop: 'auto',
      padding: '4rem 2rem 2rem',
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        <div>
          <h3 style={{ fontFamily: 'Outfit', fontSize: '1.5rem', marginBottom: '1rem' }}>
            Consult<span className="gradient-text">Ways</span>
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Your ultimate guide to curated, top-tier products across tech, business, and lifestyle. We meticulously research and handpick the best deals.
          </p>
        </div>
        
        <div style={{
          padding: '1.5rem',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '8px',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5
        }}>
          <strong>Affiliate Disclosure:</strong> ConsultWays is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. As an Amazon Associate, we earn from qualifying purchases.
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} ConsultWays. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

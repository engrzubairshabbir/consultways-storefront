import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      height: 'var(--nav-height)',
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      padding: '0 2rem'
    }}>
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* We will use a placeholder or the actual logo if imported properly */}
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, var(--accent-cyan), #3b82f6)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            color: 'white'
          }}>
            CW
          </div>
          <span style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)'
          }}>
            Consult<span className="gradient-text">Ways</span>
          </span>
        </Link>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link href="/" className="hover-scale" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Home</Link>
          <Link href="#" className="hover-scale" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Trending</Link>
          <a href="#" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
            Daily Deals
          </a>
        </div>
      </div>
    </nav>
  );
}

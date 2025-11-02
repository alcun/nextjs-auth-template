import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Next.js Auth Template</h1>
      <p>Production-ready Next.js with Better Auth integration.</p>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <Link href="/login" style={{ padding: '0.5rem 1rem', background: '#0070f3', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
          Login
        </Link>
        <Link href="/signup" style={{ padding: '0.5rem 1rem', border: '1px solid #0070f3', color: '#0070f3', borderRadius: '5px', textDecoration: 'none' }}>
          Sign Up
        </Link>
        <Link href="/dashboard" style={{ padding: '0.5rem 1rem', border: '1px solid #333', color: '#333', borderRadius: '5px', textDecoration: 'none' }}>
          Dashboard
        </Link>
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth-actions';

interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string;
}

interface DashboardClientProps {
  user: User;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logout();
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Dashboard</h1>
        <button
          onClick={handleSignOut}
          style={{
            padding: '0.5rem 1rem',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Sign Out
        </button>
      </div>

      <div style={{ padding: '1.5rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h2>Welcome, {user.name}!</h2>
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>Email Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</p>
        </div>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <h3>Getting Started</h3>
        <p>This is a protected route. You can only see this if you're authenticated.</p>
        <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
          <li>Add your application features here</li>
          <li>Create new protected routes in <code>/app</code></li>
          <li>Update middleware in <code>middleware.ts</code> if needed</li>
          <li>Connect to your API with <code>credentials: 'include'</code></li>
        </ul>
      </div>
    </div>
  );
}

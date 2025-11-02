/**
 * Authentication Actions
 * Raw fetch-based auth functions (no Better Auth client library)
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface SignUpData {
  email: string;
  password: string;
  name: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Session {
  user: User;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string;
    userAgent?: string;
  };
}

/**
 * Sign up a new user
 */
export async function signUp(data: SignUpData) {
  const response = await fetch(`${API_URL}/api/auth/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Sign up failed');
  }

  return response.json();
}

/**
 * Sign in with email and password
 */
export async function signIn(data: SignInData) {
  const response = await fetch(`${API_URL}/api/auth/sign-in/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Sign in failed');
  }

  return response.json();
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const response = await fetch(`${API_URL}/api/auth/sign-out`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Sign out failed');
  }

  return response.json();
}

/**
 * Get current session (server-side only)
 * Call this in Server Components or Server Actions
 */
export async function getSession(): Promise<Session | null> {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get('better-auth.session_token');
  if (!sessionCookie) {
    return null;
  }

  const response = await fetch(`${API_URL}/api/auth/session`, {
    headers: {
      Cookie: `better-auth.session_token=${sessionCookie.value}`,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.session ? data : null;
}

/**
 * Get current user (client-side)
 * Call this in Client Components
 */
export async function getUser(): Promise<User | null> {
  const response = await fetch(`${API_URL}/api/auth/session`, {
    credentials: 'include',
    cache: 'no-store',
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.user || null;
}

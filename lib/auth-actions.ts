'use server'

import { cookies } from 'next/headers'

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
 * Get current session (server-side only)
 * Call this in Server Components or Server Actions
 */
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('__Secure-better-auth.session_token')
    || cookieStore.get('better-auth.session_token')

  if (!sessionToken) {
    return null
  }

  const cookieName = sessionToken.name

  try {
    const response = await fetch(`${API_URL}/api/auth/get-session`, {
      headers: {
        Cookie: `${cookieName}=${sessionToken.value}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to get session:', error)
    return null
  }
}

/**
 * Sign out the current user (server action)
 */
export async function logout() {
  const cookieStore = await cookies()

  try {
    await fetch(`${API_URL}/api/auth/sign-out`, {
      method: 'POST',
      credentials: 'include',
    })
  } catch (error) {
    console.error('Logout failed:', error)
  }

  // Delete both possible cookie names
  cookieStore.delete('__Secure-better-auth.session_token')
  cookieStore.delete('better-auth.session_token')
}

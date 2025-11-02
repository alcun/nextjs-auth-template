import { getSession } from '@/lib/auth-actions';
import { redirect } from 'next/navigation';
import DashboardClient from './dashboard-client';

/**
 * Dashboard - Server Component
 * Validates session server-side before rendering
 */
export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return <DashboardClient user={session.user} />;
}

# Next.js Auth Template

Production-ready Next.js 16 with Better Auth integration.

## Features

- **Next.js 16** - Latest with App Router and Turbopack
- **Better Auth** - Session-based authentication
- **TypeScript** - Full type safety
- **Server Components** - Server-side session validation
- **Middleware** - Route protection
- **No auth client library** - Raw fetch for full control

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url> my-app
cd my-app
npm install
```

Or use Bun:

```bash
bun install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Important:** Point this to your Hono API backend.

### 3. Run Development Server

```bash
npm run dev
```

Or with Bun:

```bash
bun dev
```

App runs on `http://localhost:3001` (or next available port).

## Project Structure

```
app/
├── layout.tsx              # Root layout
├── page.tsx                # Home page
├── login/
│   └── page.tsx            # Login page (client component)
├── signup/
│   └── page.tsx            # Sign up page (client component)
└── dashboard/
    ├── page.tsx            # Dashboard (server component)
    └── dashboard-client.tsx # Dashboard UI (client component)

lib/
└── auth-actions.ts         # Auth functions

middleware.ts               # Route protection
```

## Authentication Flow

### 1. Sign Up / Login (Client-Side)

Client components use raw fetch with `credentials: 'include'`:

```typescript
import { signIn } from '@/lib/auth-actions';

await signIn({ email, password });
router.push('/dashboard');
```

### 2. Middleware Protection

Middleware checks cookie existence before route access:

```typescript
// middleware.ts
const sessionCookie = request.cookies.get('better-auth.session_token');

if (!sessionCookie && !isPublicRoute) {
  return NextResponse.redirect(new URL('/login', request.url));
}
```

### 3. Server Component Validation

Dashboard validates full session server-side:

```typescript
// app/dashboard/page.tsx
const session = await getSession();

if (!session) {
  redirect('/login');
}

return <DashboardClient user={session.user} />;
```

## Auth Functions

All in `lib/auth-actions.ts`:

```typescript
// Sign up
await signUp({ name, email, password });

// Sign in
await signIn({ email, password });

// Sign out
await signOut();

// Get session (server-side)
const session = await getSession();

// Get user (client-side)
const user = await getUser();
```

## Adding Protected Routes

### Option 1: Server Component (Recommended)

```typescript
// app/protected/page.tsx
import { getSession } from '@/lib/auth-actions';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return <div>Welcome {session.user.name}!</div>;
}
```

### Option 2: Update Middleware

Add route to protected list in `middleware.ts`:

```typescript
const protectedRoutes = ['/dashboard', '/profile', '/settings'];
const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
```

## Making API Calls

Always use `credentials: 'include'` to send cookies:

```typescript
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/example`, {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` - Your production API URL

Deploy!

### Coolify

1. Create new application
2. Connect to Git repository
3. Set build command: `npm run build`
4. Set start command: `npm run start`
5. Add environment variables
6. Deploy!

## Cookie Configuration

Better Auth sets these cookies:

- **Name**: `better-auth.session_token`
- **httpOnly**: `true` (not accessible via JavaScript)
- **secure**: `true` (HTTPS only in production)
- **sameSite**: `lax` (CSRF protection)

For cross-subdomain authentication (e.g., `app.yourdomain.com` ↔ `api.yourdomain.com`), configure your backend:

```typescript
// In your Hono API: src/auth.ts
advanced: {
  crossSubDomainCookies: {
    enabled: true,
    domain: 'yourdomain.com',
  },
}
```

## Customization

### Add New Auth Pages

```bash
mkdir app/reset-password
touch app/reset-password/page.tsx
```

### Style with Tailwind (Optional)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `app/layout.tsx`:

```typescript
import './globals.css';
```

### Add Loading States

Use React `useState` for loading:

```typescript
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await signIn({ email, password });
  } finally {
    setLoading(false);
  }
};
```

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (must start with `NEXT_PUBLIC_` for client access)

## Tech Stack

- **Framework**: Next.js 16
- **React**: 19
- **TypeScript**: 5.7
- **Auth**: Better Auth (via backend)
- **Styling**: Inline styles (easily replaceable)

## Scripts

- `npm run dev` - Development with Turbopack
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - ESLint

## License

MIT

# API Relative Path Setup Guide

This project now supports relative path API calls for better compatibility with Vercel and other hosting platforms.

## Setup Complete ✅

1. **Helper Functions Created**: `lib/api-url.ts`
2. **Auth Client Updated**: `lib/auth-client.ts` (no longer needs `NEXT_PUBLIC_APP_URL`)

## Usage Examples

### For Server Components (Pages, Layouts)

```typescript
import { getApiUrl } from '@/lib/api-url';

// Example: Fetch data in a server component
export default async function MyPage() {
  const url = await getApiUrl('/api/getReviews?hotelId=123');
  const response = await fetch(url);
  const data = await response.json();
  
  return <div>{/* render data */}</div>;
}
```

### For Client Components

```typescript
'use client';

export default function MyClientComponent() {
  const fetchData = async () => {
    // Client-side: just use relative paths directly
    const response = await fetch('/api/getReviews?hotelId=123');
    const data = await response.json();
  };
  
  return <button onClick={fetchData}>Load Reviews</button>;
}
```

### For API Route Handlers

```typescript
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Inside API routes, you can use relative paths
  const response = await fetch('/api/other-endpoint');
  // ... or just import and call functions directly
}
```

## How It Works

- **Client-side** (browser): Uses relative paths like `/api/endpoint`
- **Server-side** (SSR): Constructs full URL like `https://yourdomain.com/api/endpoint`
- **Development**: Automatically uses `http://localhost:3000`
- **Production**: Automatically uses `https://` with the actual domain

## Environment Variables

You can now **remove** these from Vercel (optional):
- `NEXT_PUBLIC_APP_URL` - No longer needed!

Keep these (required):
- `MONGO_URI` - Database connection

## Migration Notes

All server components have been refactored to use **direct database queries** instead of API fetches for better performance. This guide is here if you need to make API calls from server components in the future.

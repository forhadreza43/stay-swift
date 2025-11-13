import { headers } from 'next/headers';

/**
 * Get the base URL for API calls
 * - Client-side: returns empty string (uses relative paths)
 * - Server-side: constructs full URL from request headers
 */
export async function getBaseUrl() {
   if (typeof window !== 'undefined') {
      // Client-side: use relative paths
      return '';
   }

   // Server-side: construct full URL
   const headersList = await headers();
   const host = headersList.get('host') || 'localhost:3000';
   const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
   return `${protocol}://${host}`;
}

/**
 * Helper to build full API URL
 * Usage: const url = await getApiUrl('/api/endpoint?param=value')
 */
export async function getApiUrl() {
   const baseUrl = await getBaseUrl();
   return baseUrl;
}

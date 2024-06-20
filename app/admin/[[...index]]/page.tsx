/**
 * This route is responsible for the built-in authoring environment using Sanity Studio v3.
 * All routes under /admin will be handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { metadata } from 'next-sanity/studio';
import Studio from './Studio';

export const dynamic = 'force-static';

export async function generateMetadata() {
  return { ...metadata, title: 'Sanity Studio - Session Token' };
}

export default function StudioPage() {
  return <Studio />;
}

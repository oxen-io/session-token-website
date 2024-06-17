'use client';

import { suspend } from 'suspend-react';

import { isProduction } from '@/lib/env';
import { LiveQueryProvider } from '@sanity/preview-kit';

// suspend-react cache is global, so we use a unique key to avoid collisions
const UniqueKey = Symbol('@/lib/sanity.client');

export default function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token?: string;
}) {
  const { sanityClient: client } = suspend(() => import('@/lib/sanity.client'), [UniqueKey]);
  if (!token) {
    throw new TypeError('Missing token');
  }
  return (
    <LiveQueryProvider client={client} token={token} logger={isProduction() ? undefined : console}>
      {children}
    </LiveQueryProvider>
  );
}

import metadata from '@/lib/metadata';
import { getDocumentBySlug, getDocumentPaths, getSettings } from '@/lib/sanity.fetch';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { isProduction } from '@/lib/env';
import type { Page } from '@/schemas/documents/page';
import PageInner from './PageInner';

export async function generateMetadata({ params }: { params: { slug?: Array<string> } }) {
  const pageSlug = params.slug?.[0] ?? 'coming-soon';

  const [settings, page] = await Promise.all([
    getSettings(),
    getDocumentBySlug<Page>(pageSlug || 'coming-soon', 'page'),
  ]);

  return metadata(page, settings);
}

export async function generateStaticParams() {
  const slugs = await getDocumentPaths('page');
  const allPages = slugs.map(slug => ({ slug }));

  return allPages.map(({ slug }) => ({ slug: slug.current }));
}

export default async function PageSlugRoute({ params }: { params: { slug?: Array<string> } }) {
  const pageSlug = params.slug?.[0] ?? 'coming-soon';

  const [settings, data] = await Promise.all([
    getSettings(),
    getDocumentBySlug<Page>(pageSlug, 'page'),
  ]);

  if (!data && !draftMode().isEnabled) {
    notFound();
  }

  // If the page is not in production and the site is in production, return not found (except for the admin page)
  if (isProduction() && !data.production && !(pageSlug === 'admin')) {
    return notFound();
  }

  return <PageInner data={data} settings={settings} />;
}

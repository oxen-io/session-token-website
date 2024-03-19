import metadata from '@/lib/metadata';
import { getDocumentBySlug, getDocumentPaths, getSettings } from '@/lib/sanity.fetch';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { isNotProduction } from '@/lib/env';
import PageInner from './PageInner';

export async function generateMetadata({ params }: { params: { slug?: Array<string> } }) {
  const { slug } = params;

  const [settings, page] = await Promise.all([
    getSettings(),
    getDocumentBySlug(slug?.[0] || 'coming-soon', 'page'),
  ]);

  return metadata(page, settings);
}

export async function generateStaticParams() {
  const slugs = await getDocumentPaths('page');
  const allPages = slugs.map(slug => ({ slug }));

  return allPages.map(({ slug }) => ({ slug: slug.current }));
}

export default async function PageSlugRoute({ params }: { params: { slug?: Array<string> } }) {
  const [settings, data] = await Promise.all([
    getSettings(),
    getDocumentBySlug(params.slug?.[0] || 'coming-soon', 'page'),
  ]);

  const isDraft = draftMode().isEnabled;

  if (!data && !isDraft) {
    notFound();
  }

  // If the page is not in production and we are in development, we allow the page to be viewed otherwise a not found page is returned
  if (
    params.slug?.[0] &&
    isNotProduction() &&
    !data.production &&
    !['', '/', 'admin'].includes(params.slug[0])
  ) {
    return notFound();
  }

  return <PageInner data={data} settings={settings} />;
}

import { isProduction } from '@/lib/env';
import metadata from '@/lib/metadata';

import CMSPage from '@/components/CMSPage/CMSPage';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { getDocumentData } from '@/lib/sanity.fetch';
import { CMSDocument, sanityQuery } from '@/lib/sanity.queries';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

// TODO: add cms coming soon field to settings
const landingSlug = 'home';

const parseSlug = (slug?: Array<string>) => slug?.join('/') ?? landingSlug;

export async function generateMetadata({ params }: { params: { slug: Array<string> } }) {
  const { settings, page } = await getDocumentData(CMSDocument.Page, parseSlug(params.slug));

  if (!page || !page.title || page.title === '') {
    return metadata({ title: 'Page not found' }, settings);
  }

  return metadata(page, settings);
}

export async function generateStaticParams() {
  const pages = await sanityQuery
    .from(CMSDocument.Page)
    .select()
    .neq('slug.current', null)
    .execute();

  return pages.map(({ slug }) => ({ slug: [slug.current] }));
}

export default async function PageSlugRoute({ params }: { params: { slug: Array<string> } }) {
  const pageSlug = parseSlug(params.slug);
  const { settings, page } = await getDocumentData(CMSDocument.Page, pageSlug);

  if (!page && !draftMode().isEnabled) {
    notFound();
  }

  // If the page is not in production and the site is in production, return not found (except for the admin page)
  if (isProduction() && !page.production && !(pageSlug === 'admin')) {
    return notFound();
  }

  return (
    <PageWrapper>
      <CMSPage page={page} settings={settings} />
    </PageWrapper>
  );
}

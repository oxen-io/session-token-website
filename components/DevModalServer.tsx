import { CMSDocument, sanityQuery } from '@/lib/sanity.queries';
import { DevModal } from './DevModal';

export async function DevModalServer() {
  const allPages = await sanityQuery.from(CMSDocument.Page).select().execute();
  const slugs = allPages.map((page) => page.slug.current);

  return <DevModal slugs={slugs} />;
}

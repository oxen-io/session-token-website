import { getDocumentBySlug, getDocumentPaths, getSettings } from '@/lib/sanity.fetch';

import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import PageWrapper from '@/components/PageWrapper/PageWrapper';
import PostPage from '@/components/Post/Post';
import metadata from '@/lib/metadata';
import generateRssFeed from '@/lib/rss';
import type { Post } from '@/schemas/documents/post';

export async function generateMetadata({ params }: { params: { slug: Array<string> } }) {
  const { slug } = params;

  const [settings, page] = await Promise.all([getSettings(), getDocumentBySlug(slug, 'post')]);

  return metadata(page, settings);
}

export async function generateStaticParams() {
  const allPosts = await getDocumentPaths('post');

  generateRssFeed(allPosts).catch(err => {
    throw new Error(err);
  });

  return allPosts.map(({ slug }) => ({ slug: slug.current }));
}

export default async function BlogPost({ params }: { params: { slug: Array<string> } }) {
  const data = await getDocumentBySlug<Post>(params.slug, 'post');

  const isDraft = draftMode().isEnabled;

  if (!data && !isDraft) {
    notFound();
  }

  return (
    <PageWrapper>
      <PostPage post={data} />
    </PageWrapper>
  );
}

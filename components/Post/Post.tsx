import BlogTile from '@/components/FlexibleContent/Modules/BlogGrid/BlogTile';
import type { Post } from '@/schemas/documents/post';
import type { CopyFields } from '@/schemas/partials/portableText';
import clsx from 'clsx';
import Link from 'next/link';
import s from './Post.module.sass';
import PostContent from './PostContent';

export default function Post({ post }: { post: Post }) {
  return (
    <section className={clsx(s.Outer, `Container Deep`)}>
      <div className={s.BackLink}>
        <Link href={'/blog'}>← Back to blog</Link>
      </div>
      <BlogTile post={post} isFeatured isSingle />
      <PostContent copy={post.copy as CopyFields} />
    </section>
  );
}

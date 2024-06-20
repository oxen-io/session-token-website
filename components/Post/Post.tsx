import PostTile from '@/components/FlexibleContent/Modules/PostGrid/PostTile';
import { SLUG } from '@/lib/constants';
import type { PostSchemaType } from '@/schemas/documents/post';
import type { CopyFields } from '@/schemas/partials/portableText';
import clsx from 'clsx';
import Link from 'next/link';
import BasicCopy from '../Basic Copy/BasicCopy';
import s from './Post.module.sass';

export default function Post({ post }: { post: PostSchemaType }) {
  return (
    <section className={clsx(s.Outer, 'pt-20', 'lg:pt-32')}>
      <div className={s.BackLink}>
        <Link href={`/${SLUG.POSTS}`}>← Back to {SLUG.POSTS.toLocaleLowerCase()}</Link>
      </div>
      <PostTile post={post} isFeatured isSingle isTitle />
      <BasicCopy
        copy={post.copy as CopyFields}
        showOutline={true}
        outlineHeading={'In this article'}
      />
    </section>
  );
}

import { AnimatedElement } from '@/components/AnimatedComponent/AnimatedComponent';
import { CMSDocument, SPECIAL_SELECT, sanityQuery } from '@/lib/sanity.queries';
import clsx from 'clsx';
import s from './PostGrid.module.sass';
import PostGridInner from './PostGridInner';
import PostTile from './PostTile';

export default async function PostGrid({ morePostsTitle }: { morePostsTitle: string }) {
  const posts = await sanityQuery
    .from(CMSDocument.Post)
    .select([SPECIAL_SELECT[CMSDocument.Post]])
    .execute();

  const sortedPosts = posts.sort((a, b) => {
    const aDate = new Date(a.datePosted);
    const bDate = new Date(b.datePosted);

    return bDate.getTime() - aDate.getTime();
  });

  const [firstPost, ...postsWithoutFirst] = sortedPosts;

  if (!firstPost) {
    return null;
  }

  return (
    <section className={clsx(s.Outer)}>
      <PostTile post={firstPost} isFeatured />
      <div className={s.Grid}>
        <AnimatedElement type="h5" delay={300}>
          {morePostsTitle}
        </AnimatedElement>
        <PostGridInner posts={postsWithoutFirst} />
      </div>
    </section>
  );
}

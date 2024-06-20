'use client';

import type { PostSchemaType } from '@/schemas/documents/post';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import s from './PostGrid.module.sass';
import PostTile from './PostTile';

export default function PostGridInner({ posts }: { posts: Array<PostSchemaType> }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasMounted(true);
    }, 200);
  }, []);

  return (
    <ul
      className={clsx(s.List, 'grid grid-cols-1 gap-10', 'lg:grid-cols-3', hasMounted && s.Mounted)}
    >
      {posts.map((post, index) => (
        <li
          key={post.slug.current}
          style={{
            transitionDelay: `${index * 0.1}s`,
          }}
        >
          <PostTile post={post} />
        </li>
      ))}
    </ul>
  );
}

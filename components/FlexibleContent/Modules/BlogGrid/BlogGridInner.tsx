'use client';

import type { PostSchemaType } from '@/schemas/documents/post';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import s from './BlogGrid.module.sass';
import BlogTile from './BlogTile';

export default function BlogGridInner({ posts }: { posts: Array<PostSchemaType> }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasMounted(true);
    }, 200);
  }, []);

  return (
    <ul className={clsx(s.List, hasMounted && s.Mounted)}>
      {posts.map((post, index) => (
        <li
          key={post.slug.current}
          style={{
            transitionDelay: `${index * 0.1}s`,
          }}
        >
          <BlogTile post={post} />
        </li>
      ))}
    </ul>
  );
}

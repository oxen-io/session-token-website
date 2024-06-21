import type { PostSchemaType } from '@/schemas/documents/post';
import fs from 'fs';
import { generateXMLFromObject } from 'mini-xml';
import { SLUG } from './constants';

export async function generateRssFeed(posts: Array<PostSchemaType>) {
  const site_url = 'https://token.getsession.org';

  posts.sort((a, b) => {
    const dateA = new Date(a.datePosted ?? a._createdAt);
    const dateB = new Date(b.datePosted ?? b._createdAt);

    return dateB.getTime() - dateA.getTime();
  });

  const date = new Date();
  const year = date.toLocaleString('en-AU', {
    timeZone: 'Australia/Melbourne',
    year: 'numeric',
  });

  const json = {
    rss: {
      '@version': '2.0',
      '@xmlns:atom': 'http://www.w3.org/2005/Atom',
      '@xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
      '@xmlns:dc': 'http://purl.org/dc/elements/1.1/',
      channel: {
        title: `Session Token Updates`,
        description: 'RSS feed for Session Token updates.',
        link: site_url,
        image: {
          url: `${site_url}/images/logoBlack.png`,
          title: `Session Token Updates`,
          link: site_url,
        },
        generator: 'mini-xml for Node.js',
        lastBuildDate: date,
        'atom:link': {
          '@href': `${site_url}/rss.xml`,
          '@rel': 'self',
          '@type': 'application/rss+xml',
        },
        copyright: `All rights reserved ${year}`,
        item: posts.map((post: PostSchemaType) => ({
          title: post.title.trim(),
          description: {
            '#cdata': `${post.excerpt}<br /><a href="${site_url}/${SLUG.POSTS}/${post.slug.current}">Read more</a>`,
          },
          link: `${site_url}/${SLUG.POSTS}/${post.slug.current}`,
          guid: {
            '@isPermaLink': 'true',
            '#text': `${site_url}/${SLUG.POSTS}/${post.slug.current}`,
          },
          pubDate: new Date(post.datePosted ?? post._createdAt),
        })),
      },
    },
  };

  const feed = generateXMLFromObject(json, { pretty: true, indentSpaces: 2 });

  fs.writeFileSync('./public/rss.xml', feed);
}

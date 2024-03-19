import fs from 'fs';
import RSS from 'rss';
import { isProduction } from './env';

export default async function generateRssFeed(allPosts) {
  const site_url = isProduction() ? 'https://token.getsession.org' : 'http://localhost:3000';

  const feedOptions = {
    title: `Session Token - Articles`,
    description: 'RSS feed for articles on Session Token.',
    site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/images/logoBlack.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  };

  const feed = new RSS(feedOptions);

  allPosts.forEach(post =>
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${site_url}/blog/${post.slug.current}`,
      date: post.datePosted || post._createdAt,
    })
  );

  fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }));
}

'use server';

import { urlForImage, type SanityImage } from '@/lib/sanity.image';
import RoadmapTabsClient from './RoadmapTabsClient';

export default async function RoadmapTabs({ tabs }: { tabs: Array<any> }) {
  const imagePromises = tabs.map(({ buttonImage }) => {
    return getSvgData({ image: buttonImage });
  });

  const images = await Promise.all(imagePromises);

  return <RoadmapTabsClient tabs={tabs} images={images} />;
}

export async function getSvgData({ image }: { image: SanityImage }): Promise<string | undefined> {
  const src = urlForImage(image)?.url();

  if (!src) {
    return '';
  }

  // eslint-disable-next-line more/no-then
  return fetch(src).then(res => res.text());
}

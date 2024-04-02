'use server';

import { log } from '@/lib/logger';
import { urlForImage, type SanityImage } from '@/lib/sanity.image';
import RoadmapTabsClient from './RoadmapTabsClient';

export type RoadmapTabButton = {
  title: string;
  imageData: string;
};

export default async function RoadmapTabs({ tabs }: { tabs: Array<any> }) {
  const imagePromises = tabs.map(({ buttonImage }) => {
    return getSvgData({ image: buttonImage });
  });

  const images = await Promise.allSettled(imagePromises);

  const roadmapButtons: Array<RoadmapTabButton> = [];

  images.forEach((image, i) => {
    if (image.status === 'fulfilled' && image.value) {
      roadmapButtons.push({
        title: tabs[i].title,
        imageData: image.value,
      });
    } else if (image.status === 'rejected') {
      log.error('Failed to fetch image data', image.reason);
    } else {
      log.error('Image data not found');
    }
  });

  return <RoadmapTabsClient tabs={tabs} roadmapButtons={roadmapButtons} />;
}

export async function getSvgData({ image }: { image: SanityImage }): Promise<string | undefined> {
  const src = urlForImage(image)?.url();

  if (!src) {
    return '';
  }

  // eslint-disable-next-line more/no-then
  return fetch(src).then(res => res.text());
}

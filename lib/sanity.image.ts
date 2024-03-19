import { dataset, projectId } from '@/lib/sanity.api';
import createImageUrlBuilder from '@sanity/image-url';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export type SanityImage = {
  asset?: {
    _ref?: string;
    url?: string;
    metadata?: {
      lqip?: string;
    };
  };
  alt?: string;
  blur?: boolean;
};

export const urlForImage = (source: SanityImage) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto('format').fit('max');
};

import { urlForImage } from './sanity.image';

/**
 * Generates metadata for a given object and settings.
 * @param {Object} obj - The object containing the metadata.
 * @param {Object} settings - The settings object.
 * @returns {Object} - The generated metadata object.
 */
const generateMetadata = (obj, settings) => {
  const { title, metadata } = obj || {};

  const { title: metaTitle, description = '', ogpImage } = metadata || {};

  const ogpImageUrl = ogpImage
    ? urlForImage(ogpImage)?.width(1200).height(627).fit('crop').url()
    : '/assets/images/link_preview.png';

  const _title = `${metaTitle || title} - ${settings?.title || undefined}`;

  return {
    metadataBase: new URL('https://token.getsession.org'),
    description,
    title: _title,
    openGraph: {
      title: _title,
      description,
      images: [
        {
          url: ogpImageUrl,
        },
      ],
    },
  };
};

export default generateMetadata;

import { urlForImage, type SanityImage } from '@/lib/sanity.image';
import Image from 'next/image';

export default function ImageBox({
  image,
  width = 3500,
  height = 2000,
  size = '100vw',
  loading = 'lazy',
}: {
  image: SanityImage;
  width?: number;
  height?: number;
  size?: string;
  loading?: 'lazy' | 'eager';
}) {
  const altText = image ? (image.alt ? image.alt : '') : '';
  const imageUrl = image?.asset?.url ? image?.asset?.url : urlForImage(image)?.url();
  const blurImage = image?.asset?.metadata?.lqip ? image?.asset?.metadata?.lqip : null;

  if (!imageUrl) {
    throw new Error('No image url');
  }

  return (
    <div>
      {image && (
        <Image
          alt={altText}
          width={width}
          height={height}
          sizes={size}
          src={imageUrl}
          placeholder={blurImage && image?.blur ? 'blur' : 'empty'}
          blurDataURL={blurImage && image?.blur ? blurImage : undefined}
          loading={loading}
        />
      )}
    </div>
  );
}

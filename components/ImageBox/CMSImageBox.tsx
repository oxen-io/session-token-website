'use client';

import { urlForImage, type SanityImage } from '@/lib/sanity.image';
import Image from 'next/image';
import type { BasicImageBoxProps } from './ImageBox';

type CMSImageBoxProps = BasicImageBoxProps & {
  image: SanityImage;
};

export default function CMSImageBox({
  image,
  width = 3500,
  height = 2000,
  size = '100vw',
  quality = 85,
  loading = 'lazy',
  style,
  blur,
  className = '',
  innerRef,
}: CMSImageBoxProps) {
  if (!image) {
    return null;
  }

  const altText = image ? (image.alt ? image.alt : '') : '';
  const imageUrl = image?.asset?.url ? image?.asset?.url : urlForImage(image)?.url();
  const blurImage =
    blur && image?.blur && image?.asset?.metadata?.lqip ? image?.asset?.metadata?.lqip : null;

  if (!imageUrl) {
    return null;
  }

  return (
    <div
      className={className}
      ref={(ref) => {
        if (innerRef) {
          innerRef(ref);
        }
      }}
      style={style}
    >
      {image && (
        <Image
          alt={altText}
          width={width}
          height={height}
          sizes={size}
          src={imageUrl}
          quality={quality}
          placeholder={blurImage ? 'blur' : 'empty'}
          blurDataURL={blurImage || undefined}
          loading={loading}
        />
      )}
    </div>
  );
}

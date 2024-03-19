'use client';

import { urlForImage, type SanityImage } from '@/lib/sanity.image';
import Image from 'next/image';
import type { CSSProperties } from 'react';

export default function ImageBox({
  image,
  width = 3500,
  height = 2000,
  size = '100vw',
  loading = 'lazy',
  style,
  blur,
  className = '',
  innerRef,
}: {
  image?: SanityImage;
  width?: number;
  height?: number;
  size?: string;
  loading?: 'lazy' | 'eager';
  style?: CSSProperties;
  blur?: boolean;
  className?: string;
  innerRef?: any;
}) {
  if (!image) {
    return null;
  }

  const altText = image ? (image.alt ? image.alt : '') : '';
  const imageUrl = image?.asset?.url ? image?.asset?.url : urlForImage(image)?.url();

  if (!imageUrl) {
    return null;
  }

  return (
    <div
      className={className}
      ref={ref => {
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
          loading={loading}
          placeholder={blur ? 'blur' : 'empty'}
        />
      )}
    </div>
  );
}

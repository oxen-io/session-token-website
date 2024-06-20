'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';

export type BasicImageBoxProps = {
  width?: number;
  height?: number;
  size?: string;
  quality?: number;
  loading?: 'lazy' | 'eager';
  style?: CSSProperties;
  blur?: boolean;
  className?: string;
  innerRef?: any;
};

type ImageBoxProps = BasicImageBoxProps & {
  src: string;
  alt: string;
};

export default function ImageBox({
  src,
  alt,
  width = 3500,
  height = 2000,
  size = '100vw',
  quality = 85,
  loading = 'lazy',
  style,
  className = '',
  innerRef,
}: ImageBoxProps) {
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
      <Image
        alt={alt}
        width={width}
        height={height}
        sizes={size}
        src={src}
        quality={quality}
        loading={loading}
      />
    </div>
  );
}

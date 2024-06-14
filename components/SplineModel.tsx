'use client';

import Spline from '@splinetool/react-spline/next';

export default function SplineModel({ url }: { url: string }) {
  return <Spline scene={url} />;
}

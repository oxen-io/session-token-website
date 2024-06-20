import type { SanityImage } from '@/lib/sanity.image';
import type { Application as SplineScene } from '@splinetool/runtime';
import clsx from 'clsx';
import { Suspense, forwardRef, lazy, useRef } from 'react';
import CMSImageBox from '../ImageBox/CMSImageBox';
import { Loading } from '../Loading/Loading';

const Spline = lazy(() => import('@splinetool/react-spline/next'));

export interface SplineModelProps extends React.HTMLAttributes<HTMLDivElement> {
  splineScene: string;
  fallbackImage?: SanityImage;
}

const SplineModel = forwardRef<HTMLDivElement, SplineModelProps>(
  ({ className, splineScene, fallbackImage, ...props }, ref) => {
    const spline = useRef<SplineScene>();

    function onLoad(scene: SplineScene) {
      spline.current = scene;
      if (spline.current) {
        spline.current.setGlobalEvents(true);
      }
    }

    return (
      <div className={clsx(className)} ref={ref} {...props}>
        {/* <div className="absolute z-20 hidden h-full w-full bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] opacity-75 lg:block" /> */}
        <Suspense fallback={fallbackImage ? <CMSImageBox image={fallbackImage} /> : <Loading />}>
          <Spline scene={splineScene} onLoad={onLoad} className="z-10" />
        </Suspense>
      </div>
    );
  }
);

SplineModel.displayName = 'SplineModel';

export default SplineModel;

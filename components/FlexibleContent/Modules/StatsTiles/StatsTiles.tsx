'use client';

import clsx from 'clsx';

import ImageBox from '@/components/ImageBox/ImageBox';

import { AnimatedElement } from '@/components/AnimatedComponent/AnimatedComponent';
import NumberTicker from '@/components/NumberTicker';
import { useId, useState } from 'react';

export default function StatsTiles({
  tiles,
}: {
  tiles: Array<{
    figure: string;
    copy: string;
    backgroundImage: any;
  }>;
}) {
  const id = useId();
  const [attempt, setAttempt] = useState(0);

  return (
    <section className={clsx('my-12', 'md:mb-20', 'lg:mb-12')}>
      <ul
        className={clsx(
          'm-0 flex w-full list-none flex-col items-center gap-4 p-0',
          'lg:grid lg:grid-cols-3'
        )}
      >
        {tiles?.map((tile, index) => {
          const { figure, copy, backgroundImage } = tile;

          return (
            <AnimatedElement
              key={`${id}-${index}`}
              type={'li'}
              delay={index * 100 + 100}
              className={clsx(
                'flex flex-col items-center justify-center overflow-hidden rounded-[32px] border border-solid border-[#405E56]',
                'h-36 w-full max-w-[350px] px-5',
                'lg:max-w-[420px]',
                'xl:h-48 xl:max-w-none xl:px-8'
              )}
            >
              <div
                className={clsx(
                  'relative z-10 flex h-full w-full flex-col items-start justify-center gap-1 overflow-hidden',
                  'lg:pt-1',
                  'xl:pt-0'
                )}
              >
                <h1
                  className={clsx(
                    'text-[54px] leading-none',
                    'lg:text-[44px]',
                    'xl:text-[68px]',
                    '2xl:text-[72px]'
                  )}
                >
                  <NumberTicker
                    key={`${id}-attempt-${attempt}`}
                    targetNumber={parseFloat(figure)}
                    onClick={() => setAttempt(attempt + 1)}
                  />
                </h1>
                <p className={clsx('w-full text-2xl leading-none')}>{copy}</p>
              </div>
              {backgroundImage && (
                <ImageBox
                  image={backgroundImage}
                  className={clsx('absolute left-0 top-0 *:h-36', 'xl:*:h-48')}
                />
              )}
            </AnimatedElement>
          );
        })}
      </ul>
    </section>
  );
}

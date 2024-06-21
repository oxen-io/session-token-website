'use client';

import clsx from 'clsx';

import PortableText from '@/components/PortableText/PortableText';

import {
  AnimatedBigImage,
  AnimatedElement,
} from '@/components/AnimatedComponent/AnimatedComponent';
import Button from '@/components/Button/Button';
import ScrollButton from '@/components/Button/ScrollButton';
import SplineModel from '@/components/SplineScene/SplineScene';
import type {
  HeroSchemaType,
  HeroVariantType,
  SplineSceneType,
} from '@/schemas/objects/flexibleSections/hero';
import { useState } from 'react';
import DepricatedHero from './DepricatedHero';
import s from './Hero.module.sass';
import RewardStats from './RewardStats';

export default function Hero(props: HeroSchemaType) {
  const [statsHidden, setStatsHidden] = useState<boolean>(true);

  const {
    title,
    copy,
    buttons,
    image,
    variant: _variant,
    splineScene: _splineScene,
    splineSceneUrl,
  } = props;
  const splineScene = _splineScene as SplineSceneType;

  const handleStatsToggleClick = () => {
    setStatsHidden((prev) => !prev);
  };

  // TODO - Remove DepricatedHero support when all heros are updated
  if (!_variant || !image) {
    // eslint-disable-next-line no-console
    console.warn(
      '@deprecated A Hero component is using a depricated schema field. Please update the schema.'
    );

    return <DepricatedHero {...props} />;
  }

  const variant = _variant as HeroVariantType;
  return (
    <section
      className={clsx(
        'flex h-dvh w-full flex-col-reverse items-center justify-around justify-items-end pt-20 align-middle lg:pt-20',
        variant === 'copyImageStatsHero' ? '' : 'lg:grid lg:grid-cols-2 lg:pb-20'
      )}
    >
      <div
        className={clsx(
          s.CopyCont,
          'flex flex-col justify-center gap-4 text-center lg:text-start',
          variant === 'copyImageStatsHero' ? 'left-0 w-80 lg:absolute lg:top-28' : 'w-full'
        )}
      >
        {title && (
          <AnimatedElement
            type="h1"
            className={clsx(
              '-mb-4 bg-gradient-to-tr from-[#FFFFFF] to-[#97A99E] bg-clip-text pb-4 pr-2 text-3xl font-medium text-transparent',
              variant === 'copyImageStatsHero'
                ? 'md:text-4xl'
                : 'md:text-7xl lg:text-5xl xl:text-7xl'
            )}
            delay={100}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        {copy && (
          <AnimatedElement type="div" delay={200} className="text-base lg:text-2xl">
            <PortableText value={copy} />
          </AnimatedElement>
        )}
        {buttons || variant === 'copyImageStatsHero' ? (
          <AnimatedElement
            type={'ul'}
            delay={300}
            className="flex w-full flex-row items-center justify-center gap-3 lg:w-max"
          >
            {buttons?.map((button, index) => {
              return (
                <li key={index}>
                  <Button {...button} />
                </li>
              );
            })}
            {variant === 'copyImageStatsHero' ? (
              <li className="block lg:hidden">
                <Button
                  onClick={handleStatsToggleClick}
                  title={statsHidden ? 'Show Stats' : 'Hide Stats'}
                  size="medium"
                  variant="outline"
                  isUpperCase={true}
                />
              </li>
            ) : null}
          </AnimatedElement>
        ) : null}
        <ScrollButton className="pt-2" />
      </div>
      {splineScene ? (
        <SplineModel
          splineScene={splineScene}
          spineSceneUrl={splineSceneUrl}
          className={clsx(
            'h-dvh w-screen',
            variant === 'copyImageStatsHero'
              ? 'md:h-[110vh] md:w-[110vw]'
              : 'md:w-[150vw] lg:translate-x-[40vw] xl:translate-x-[50vw] 2xl:translate-x-[50vw] 3xl:translate-x-[60vw]',
            variant === 'copyImageStatsHero' && !statsHidden && 'blur-lg lg:blur-none'
          )}
        />
      ) : image ? (
        <AnimatedBigImage
          image={image}
          className={clsx(
            'mt-16 flex w-3/4 select-none md:mt-0 md:w-2/3 lg:w-full',
            variant === 'copyImageStatsHero' ? 'max-w-[75vh]' : 'lg:max-w-[55vw]',
            variant === 'copyImageStatsHero' && !statsHidden && 'blur-lg lg:blur-none'
          )}
        />
      ) : null}
      {variant === 'copyImageStatsHero' ? (
        <RewardStats className={clsx('lg:block', statsHidden && 'hidden')} />
      ) : null}
    </section>
  );
}

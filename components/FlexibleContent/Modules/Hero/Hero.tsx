'use client';

import clsx from 'clsx';

import Button from '@/components/Button/Button';
import PortableText from '@/components/PortableText/PortableText';

import {
  AnimatedBigImage,
  AnimatedElement,
} from '@/components/AnimatedComponent/AnimatedComponent';
import ScrollButton from '@/components/Button/ScrollButton';
import SplineModel from '@/components/SplineModel';
import type { ButtonSchemaType } from '@/schemas/objects/button';
import { useState } from 'react';
import s from './Hero.module.sass';
import RewardStats from './RewardStats';

export default function Hero({
  title,
  copy,
  buttons,
  backgroundImage,
  backgroundSplineModel,
  type,
}: {
  title: string;
  copy: any;
  buttons: Array<ButtonSchemaType>;
  backgroundImage: any;
  backgroundSplineModel: {
    alt: string;
    url: string;
  };
  type: 'default' | 'rewards';
}) {
  const [statsVisibleOnMobile, setStatsVisibleOnMobile] = useState(false);

  const isRewards = type === 'rewards';

  return (
    <section className={clsx(s.Hero, s[`Type-${type}`])}>
      <div className={clsx(s.Cont, 'Container')}>
        <ScrollButton />
        <div className={s.CopyCont}>
          {title && (
            <AnimatedElement
              type="h1"
              delay={100}
              className={clsx({
                h3: isRewards,
                Huge: !isRewards,
              })}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
          {copy && (
            <AnimatedElement type="div" delay={200}>
              <PortableText value={copy} />
            </AnimatedElement>
          )}
          {buttons && (
            <AnimatedElement type={'ul'} delay={300}>
              {buttons.map((button, index) => {
                return (
                  <li key={index}>
                    <Button {...button} />
                  </li>
                );
              })}
              {isRewards && (
                <li className={s.RewardsButton}>
                  <Button
                    onClick={() => {
                      setStatsVisibleOnMobile(!statsVisibleOnMobile);
                    }}
                    title={`${statsVisibleOnMobile ? 'Hide' : 'Show'} stats`}
                  />
                </li>
              )}
            </AnimatedElement>
          )}
        </div>
        {type === 'rewards' ? <RewardStats visibleOnMobile={statsVisibleOnMobile} /> : null}
        <div
          className={clsx(
            s.ImageCont,
            statsVisibleOnMobile && s.Darkened,
            backgroundSplineModel && '-mt-6'
          )}
        >
          {backgroundImage && !backgroundSplineModel && (
            <AnimatedBigImage image={backgroundImage} />
          )}
          {backgroundSplineModel && <SplineModel url={backgroundSplineModel.url} />}
        </div>
      </div>
    </section>
  );
}

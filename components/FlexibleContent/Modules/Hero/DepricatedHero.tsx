'use client';

import clsx from 'clsx';

import PortableText from '@/components/PortableText/PortableText';

import {
  AnimatedBigImage,
  AnimatedElement,
} from '@/components/AnimatedComponent/AnimatedComponent';
import Button from '@/components/Button/Button';
import ScrollButton from '@/components/Button/ScrollButton';
import type { HeroSchemaType } from '@/schemas/objects/flexibleSections/hero';
import s from './Hero.module.sass';

/** @deprecated */
export default function DepricatedHero({ title, copy, buttons, backgroundImage }: HeroSchemaType) {
  return (
    <section className="flex h-dvh w-full flex-col-reverse items-center justify-around justify-items-end pt-20 align-middle lg:grid lg:grid-cols-2 lg:py-20">
      <ScrollButton className="pt-4" />
      <div
        className={clsx(
          s.CopyCont,
          'flex w-full flex-col justify-center gap-4 text-center lg:text-start'
        )}
      >
        {title && (
          <AnimatedElement
            type="h1"
            className="-mb-4 bg-gradient-to-tr from-[#FFFFFF] to-[#97A99E] bg-clip-text pb-4 pr-2 text-4xl font-medium text-transparent md:text-7xl"
            delay={100}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        {copy && (
          <AnimatedElement type="div" delay={200} className="text-base lg:text-2xl">
            <PortableText value={copy} />
          </AnimatedElement>
        )}
        {buttons && (
          <AnimatedElement
            type={'ul'}
            delay={300}
            className="flex w-full flex-row items-center justify-center gap-3 lg:w-max"
          >
            {buttons.map((button, index) => {
              return (
                <li key={index}>
                  <Button {...button} />
                </li>
              );
            })}
          </AnimatedElement>
        )}
      </div>
      {backgroundImage ? (
        <AnimatedBigImage image={backgroundImage} className="w-max-[50vw] flex w-2/3 lg:w-full" />
      ) : null}
    </section>
  );
}

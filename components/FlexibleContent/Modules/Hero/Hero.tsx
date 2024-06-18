'use client';

import clsx from 'clsx';

import PortableText from '@/components/PortableText/PortableText';

import {
  AnimatedBigImage,
  AnimatedElement,
} from '@/components/AnimatedComponent/AnimatedComponent';
import Button from '@/components/Button/Button';
import ScrollButton from '@/components/Button/ScrollButton';
import type { ButtonSchemaType } from '@/schemas/objects/button';
import s from './Hero.module.sass';

export default function Hero({
  title,
  copy,
  buttons,
  backgroundImage,
}: {
  title: string;
  copy: any;
  buttons: Array<ButtonSchemaType>;
  backgroundImage: any;
}) {
  return (
    <section className="flex min-h-dvh w-full flex-col-reverse items-center justify-around justify-items-end pt-20 align-middle lg:flex-row lg:py-20">
      <ScrollButton className="pt-4" />
      <div
        className={clsx(s.CopyCont, 'flex flex-col justify-center gap-4 text-center lg:text-left')}
      >
        {title && (
          <AnimatedElement
            type="h1"
            className="-mb-4 bg-gradient-to-tr from-[#FFFFFF] to-[#97A99E] bg-clip-text pb-4 pr-2 text-4xl font-medium text-transparent md:text-7xl lg:text-[82px] lg:font-bold"
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
        <AnimatedBigImage image={backgroundImage} className="flex w-full lg:w-1/2" />
      ) : null}
    </section>
  );
}

'use client';

import './roadmap.css';

import PortableText from '@/components/PortableText/PortableText';

import {
  AnimatedBigImage,
  AnimatedElement,
} from '@/components/AnimatedComponent/AnimatedComponent';

import clsx from 'clsx';

import type React from 'react';
import s from './RoadmapHero.module.sass';

export default function RoadmapHero({
  subtitle,
  title,
  copy,
  buttonTitle,
  backgroundImage,
  children,
}: {
  subtitle: string;
  title: string;
  copy: any;
  buttonTitle: string;
  backgroundImage: any;
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-dvh w-full max-w-screen-3xl flex-col-reverse items-center justify-end align-middle lg:flex-row lg:justify-around lg:px-20">
      <div
        className={clsx(s.CopyCont, 'flex flex-col justify-center gap-4 text-center lg:text-left')}
      >
        {subtitle && (
          <AnimatedElement
            type="h3"
            className="hidden bg-gradient-to-tr from-[#A0C5B5] to-[#AED0D8] bg-clip-text font-medium text-transparent md:block lg:text-lg"
            delay={0}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}
        {title && (
          <AnimatedElement
            type="h1"
            className="-mb-4 bg-gradient-to-tr from-[#FFFFFF] to-[#97A99E] bg-clip-text pb-4 pr-2 text-7xl font-bold text-transparent lg:text-[82px]"
            delay={100}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        {copy && (
          <AnimatedElement type="div" delay={200} className="text-base lg:text-2xl">
            <PortableText value={copy} />
          </AnimatedElement>
        )}
        {buttonTitle && (
          <AnimatedElement
            className="mt-4 bg-gradient-to-tr from-[#A0C5B5] to-[#AED0D8] bg-clip-text pr-2 text-xl font-extrabold text-transparent"
            delay={300}
            dangerouslySetInnerHTML={{ __html: buttonTitle }}
          />
        )}
        {children}
      </div>
      {backgroundImage ? (
        <AnimatedBigImage image={backgroundImage} className="pt-16 lg:w-1/2 lg:pt-0" />
      ) : null}
    </section>
  );
}

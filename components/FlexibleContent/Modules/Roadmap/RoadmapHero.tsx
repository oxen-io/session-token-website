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

function containsNewLine(str: string) {
  return str.includes('\n');
}

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
        className={clsx(s.CopyCont, 'flex flex-col justify-center gap-3 text-center lg:text-left')}
      >
        {subtitle && (
          <AnimatedElement
            type="h3"
            delay={0}
            dangerouslySetInnerHTML={{ __html: subtitle }}
            className={clsx(containsNewLine(title) && '-mt-24')}
          />
        )}
        {title && (
          <AnimatedElement
            type="h1"
            className="mt-8 bg-gradient-to-tr from-[#FFFFFF] to-[#97A99E] bg-clip-text pr-2 text-xl font-extrabold text-transparent"
            delay={100}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        {copy && (
          <AnimatedElement className="mt-[40px]" type="div" delay={200}>
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
      {backgroundImage ? <AnimatedBigImage image={backgroundImage} className="lg:w-1/2" /> : null}
    </section>
  );
}

'use client';

import './roadmap.css';

import PortableText from '@/components/PortableText/PortableText';

import {
  AnimatedBigImage,
  AnimatedElement,
} from '@/components/AnimatedComponent/AnimatedComponent';

import clsx from 'clsx';

import type React from 'react';
import ScrollButton from '@/components/Button/ScrollButton';
import s from './RoadmapHero.module.sass';
import { HyperGlobe } from './Hyperglobe';

function containsNewLine(str: string) {
  return str.includes('\n');
}

export default function RoadmapHero({
  subtitle,
  title,
  copy,
  buttonTitle,
  backgroundImage,
  replaceImageWithHyperglobe,
  children,
}: {
  subtitle: string;
  title: string;
  copy: any;
  buttonTitle: string;
  backgroundImage: any;
  replaceImageWithHyperglobe: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={clsx(s.Hero)}>
      <div className={clsx(s.Cont, 'Container', 'w-[1500px]')}>
        <ScrollButton />
        <div className={clsx(s.CopyCont)}>
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
              className="bg-gradient-to-tr from-[#FFFFFF] to-[#97A99E] bg-clip-text pr-2 text-transparent font-extrabold text-xl mt-8"
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
              className="bg-gradient-to-tr from-[#A0C5B5] to-[#AED0D8] bg-clip-text pr-2 text-transparent font-extrabold text-xl mt-4"
              delay={300}
              dangerouslySetInnerHTML={{ __html: buttonTitle }}
            />
          )}
          {children}
        </div>
        <div className={s.ImageCont}>
          {replaceImageWithHyperglobe && (
            <div className="flex justify-center">
              <AnimatedElement delay={100}>
                <HyperGlobe />
              </AnimatedElement>
            </div>
          )}
          {backgroundImage && !replaceImageWithHyperglobe && (
            <AnimatedBigImage image={backgroundImage} />
          )}
        </div>
      </div>
    </section>
  );
}

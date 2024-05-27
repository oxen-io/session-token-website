'use client';

import './roadmap.css';

import PortableText from '@/components/PortableText/PortableText';

import {
  AnimatedBigImage,
  AnimatedElement,
} from '@/components/AnimatedComponent/AnimatedComponent';

import clsx from 'clsx';

import ScrollButton from '@/components/Button/ScrollButton';
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
          {backgroundImage ? <AnimatedBigImage image={backgroundImage} /> : null}
        </div>
      </div>
    </section>
  );
}

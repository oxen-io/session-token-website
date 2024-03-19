'use client';

import Button from '@/components/Button/Button';
import { urlForImage, type SanityImage } from '@/lib/sanity.image';

import { AnimatedElement } from '@/components/AnimatedComponent/AnimatedComponent';
import Logo from '@/public/images/logoInline.svg';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import s from './ComingSoon.module.sass';

export default function ComingSoon({
  title,
  buttons,
  backgroundImage,
}: {
  title: string;
  buttons: Array<{
    label: string;
    href: string;
    color: 'primary' | 'secondary' | 'tertiary';
  }>;
  backgroundImage: SanityImage;
}) {
  const backgroundImageUrl = urlForImage(backgroundImage)?.url();

  if (!backgroundImageUrl) {
    throw new Error(`No image URL for ${title}`);
  }

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasMounted(true);
    }, 300);
  }, []);

  return (
    <section className={clsx(s.Outer, hasMounted && s.Mounted)}>
      <Image src={backgroundImageUrl} className={s.Bg} width={1920} height={1080} alt="" />
      <div>
        <AnimatedElement delay={300} type="div">
          <Image src={Logo} alt="Session Token" className={s.Logo} priority />
        </AnimatedElement>
        <AnimatedElement className={`Huge HasGradient`} type="h1" delay={400}>
          {title}
        </AnimatedElement>
        {buttons && (
          <AnimatedElement className={s.Buttons} delay={500} type="ul">
            {buttons.map((button, index) => {
              return (
                <li key={index}>
                  <Button {...button} small />
                </li>
              );
            })}
          </AnimatedElement>
        )}
      </div>
    </section>
  );
}

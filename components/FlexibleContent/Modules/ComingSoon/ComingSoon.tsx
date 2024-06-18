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
  backgroundAlt,
}: {
  title: string;
  buttons: Array<{
    label: string;
    href: string;
    color: 'primary' | 'secondary' | 'tertiary';
  }>;
  backgroundImage: SanityImage;
  backgroundAlt: string;
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
    <section
      className={clsx(
        s.Outer,
        'relative flex flex-col items-center justify-center text-center',
        hasMounted && s.Mounted
      )}
    >
      <Image
        src={backgroundImageUrl}
        className={clsx('top-0 min-h-screen object-cover', 'lg:max-h-screen lg:object-contain')}
        width={1920}
        height={1080}
        alt={backgroundAlt}
      />
      <div className={clsx('absolute w-full')}>
        <AnimatedElement delay={300} type="div">
          <Image src={Logo} alt="Session Token" className={clsx('mb-2 w-52', 'md:mb-4')} priority />
        </AnimatedElement>
        <AnimatedElement
          className={clsx('HasGradient', 'text-5xl', 'md:text-[80px]')}
          type="h1"
          delay={400}
        >
          {title}
        </AnimatedElement>
        {buttons && (
          <AnimatedElement className={s.Buttons} delay={500} type="ul">
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
    </section>
  );
}

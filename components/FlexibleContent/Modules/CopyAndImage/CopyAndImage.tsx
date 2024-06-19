import PortableText from '@/components/PortableText/PortableText';

import Button from '@/components/Button/Button';
import ImageBox from '@/components/shared/ImageBox';

import { AnimatedElement } from '@/components/AnimatedComponent/AnimatedComponent';
import type { SanityImage } from '@/lib/sanity.image';
import type { ButtonSchemaType } from '@/schemas/objects/button';
import clsx from 'clsx';

export default function CopyAndImage({
  title,
  copy,
  subCopy,
  image,
  button,
  alignment,
}: {
  title: string;
  copy: any;
  subCopy: any;
  image: SanityImage;
  button: ButtonSchemaType;
  alignment: 'imageLeft' | 'imageRight';
}) {
  const isReversed = alignment === 'imageLeft';

  return (
    <section className={clsx('my-24')}>
      <div
        className={clsx(
          'flex flex-col-reverse items-center justify-between',
          isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
        )}
      >
        <AnimatedElement
          className={clsx(
            'w-full',
            'lg:flex lg:w-1/2 lg:items-center',
            isReversed ? 'lg:justify-end' : 'lg:justify-start'
          )}
          delay={isReversed ? 200 : 100}
        >
          <div
            className={clsx(
              'flex w-full flex-grow flex-col items-start justify-center',
              'lg:max-w-xs',
              'xl:max-w-lg'
            )}
          >
            <div className={clsx('smallTitle', 'mb-6')}>{title}</div>
            {copy && (
              <h2 className={clsx('mb-5 text-3xl leading-tight', 'xl:text-5xl xl:leading-snug')}>
                <PortableText value={copy} />
              </h2>
            )}
            {subCopy && (
              <h4 className={clsx('mb-5 text-base text-text', 'lg:text-2xl')}>
                <PortableText value={subCopy} />
              </h4>
            )}
            {button && <Button {...button} className={clsx('my-5')} title={button.link.title} />}
          </div>
        </AnimatedElement>
        <AnimatedElement
          className={clsx('mb-5 mt-4 flex w-full', 'lg:mx-auto lg:mb-0 lg:mt-0 lg:w-1/2')}
          delay={isReversed ? 100 : 200}
        >
          {image && <ImageBox image={image} />}
        </AnimatedElement>
      </div>
    </section>
  );
}

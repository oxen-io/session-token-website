import { AnimatedElement } from '@/components/AnimatedComponent/AnimatedComponent';
import Button from '@/components/Button/Button';
import ImageBox from '@/components/ImageBox/ImageBox';
import type { SanityImage } from '@/lib/sanity.image';
import type { ButtonSchemaType } from '@/schemas/objects/button';
import { PortableText } from '@portabletext/react';
import clsx from 'clsx';

export type DeprecatedCopyAndImageProps = {
  title: string;
  copy: any;
  subCopy: any;
  image: SanityImage;
  button: ButtonSchemaType;
  alignment: 'imageLeft' | 'imageRight';
};

/** @deprecated */
export default function DeprecatedCopyAndImage(props: DeprecatedCopyAndImageProps) {
  const { title, copy, subCopy, image, button, alignment } = props;
  const isReversed = alignment === 'imageLeft';

  return (
    <section className={clsx('my-24', 'lg:my-12')}>
      <div
        className={clsx(
          'flex flex-col-reverse items-center justify-between',
          isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
        )}
      >
        <AnimatedElement
          className={clsx(
            'w-full',
            'lg:flex lg:max-w-md lg:items-center',
            'xl:max-w-xl',
            isReversed ? 'lg:justify-end' : 'lg:justify-start'
          )}
          delay={isReversed ? 200 : 100}
        >
          <div
            className={clsx(
              'flex w-full flex-grow flex-col items-start justify-center',
              'md:max-w-xl',
              'lg:max-w-none'
            )}
          >
            <div className={clsx('smallTitle', 'mb-6')}>{title}</div>
            {copy && (
              <h2
                className={clsx(
                  'mb-5 text-3xl leading-tight',
                  'xl:text-4xl xl:leading-snug',
                  '2xl:text-[44px]'
                )}
              >
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
          className={clsx(
            'mb-5 mt-4 flex w-full',
            'lg:mb-0 lg:mt-0 lg:max-w-md',
            'xl:max-w-2xl',
            '2xl:max-w-3xl'
          )}
          delay={isReversed ? 100 : 200}
        >
          {image && <ImageBox image={image} />}
        </AnimatedElement>
      </div>
    </section>
  );
}
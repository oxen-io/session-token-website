import PortableText from '@/components/PortableText/PortableText';

import Button from '@/components/Button/Button';
import CMSImageBox from '@/components/ImageBox/CMSImageBox';

import { AnimatedElement } from '@/components/AnimatedComponent/AnimatedComponent';
import type { SanityImage } from '@/lib/sanity.image';
import type { ButtonSchemaType } from '@/schemas/objects/button';
import clsx from 'clsx';
import type { DeprecatedCopyAndImageProps } from './DeprecatedCopyAndImage';
import DeprecatedCopyAndImage from './DeprecatedCopyAndImage';

type CopyAndImageProps = DeprecatedCopyAndImageProps & {
  title: string;
  copy: any;
  subCopy: any;
  image: SanityImage;
  showButton?: boolean;
  button: ButtonSchemaType;
  mobileAlignment: 'imageAbove' | 'imageBelow' | undefined;
  desktopAlignment: 'imageLeft' | 'imageRight' | undefined;
};

export default function CopyAndImage(props: CopyAndImageProps) {
  const { title, copy, subCopy, image, button, mobileAlignment, desktopAlignment, showButton } =
    props;

  if (!mobileAlignment || !desktopAlignment) {
    // eslint-disable-next-line no-console
    console.warn(
      '@deprecated A CopyAndImage component is using a depricated schema field. Please update the schema.'
    );
    return <DeprecatedCopyAndImage {...props} />;
  }

  return (
    <section className={clsx('my-12', 'lg:my-24')}>
      <div
        className={clsx(
          'flex items-center justify-between',
          mobileAlignment === 'imageAbove' ? 'flex-col-reverse' : 'flex-col',
          desktopAlignment === 'imageLeft' ? 'lg:flex-row-reverse' : 'lg:flex-row'
        )}
      >
        <AnimatedElement
          className={clsx(
            'w-full',
            'lg:flex lg:items-center',
            desktopAlignment === 'imageLeft'
              ? 'lg:ms-16 lg:justify-end'
              : 'lg:me-16 lg:justify-start'
          )}
          delay={mobileAlignment === 'imageAbove' || desktopAlignment === 'imageLeft' ? 200 : 100}
        >
          <div className={clsx('flex w-full flex-grow flex-col items-start justify-center')}>
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
            {showButton && button && (
              <Button {...button} className={clsx('my-5')} title={button.link.title} />
            )}
          </div>
        </AnimatedElement>
        <AnimatedElement
          className={clsx(
            'mb-5 mt-4 flex w-full',
            'lg:mb-0 lg:mt-0 lg:max-w-md',
            'xl:max-w-2xl',
            '2xl:max-w-3xl'
          )}
          delay={mobileAlignment === 'imageAbove' || desktopAlignment === 'imageLeft' ? 100 : 200}
        >
          {image && <CMSImageBox image={image} />}
        </AnimatedElement>
      </div>
    </section>
  );
}

import { AnimatedElement } from '@/components/AnimatedComponent/AnimatedComponent';
import PortableText from '@/components/PortableText/PortableText';
import Socials from '@/components/Socials/Socials';
import { urlForImage, type SanityImage } from '@/lib/sanity.image';
import type { SocialLinksSchemaType } from '@/schemas/partials/socialLinks';
import clsx from 'clsx';
import s from './JoinCta.module.sass';

export default function JoinCta({
  preTitle,
  title,
  copy,
  image,
  socialLinks,
}: {
  preTitle: string;
  title: string;
  copy: any;
  image: SanityImage;
  socialLinks: Array<SocialLinksSchemaType>;
}) {
  const bgUrl = urlForImage(image)?.url();

  if (!bgUrl) {
    throw new Error('No image url');
  }

  return (
    <section className={clsx(s.Outer, 'my-12', 'lg:my-24')}>
      <AnimatedElement
        className={clsx(
          'flex flex-col-reverse items-center overflow-hidden rounded-3xl border border-solid border-white border-opacity-20',
          'lg:flex-row'
        )}
        delay={100}
      >
        <div className={clsx('px-6 py-8', 'md:max-w-2xl', 'lg:max-w-sm lg:pl-10', 'xl:max-w-lg')}>
          <div className="smallTitle">/ {preTitle}</div>
          <h2
            className={clsx(
              'my-5 text-4xl font-medium leading-tight',
              // line height at lg gets overriden by sass somewhere
              'lg:mb-10 lg:mt-16 lg:text-6xl lg:font-semibold lg:leading-tight'
            )}
          >
            {title}
          </h2>
          <div className={clsx('mb-8 font-light', 'lg:mb-16 lg:text-2xl')}>
            <PortableText value={copy} />
          </div>
          <Socials
            socialLinks={socialLinks}
            className={clsx('mt-5 gap-5', 'lg:mb-2 lg:mt-28 lg:gap-6')}
          />
        </div>
        <div
          className={clsx(
            'h-72 w-full bg-cover bg-center bg-no-repeat',
            'lg:-my-12 lg:h-[780px]',
            'xl:h-[680px]'
          )}
          style={{
            backgroundImage: `url(${bgUrl})`,
          }}
        />
      </AnimatedElement>
    </section>
  );
}

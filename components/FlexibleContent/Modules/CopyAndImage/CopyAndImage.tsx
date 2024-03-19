import PortableText from '@/components/PortableText/PortableText';

import Button from '@/components/Button/Button';
import ImageBox from '@/components/shared/ImageBox';

import { AnimatedElement } from '@/components/AnimatedComponent/AnimatedComponent';
import type { SanityImage } from '@/lib/sanity.image';
import clsx from 'clsx';
import s from './CopyAndImage.module.sass';

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
  button: any;
  alignment: 'imageLeft' | 'imageRight';
}) {
  const isReversed = alignment === 'imageLeft';

  return (
    <section className={clsx(s.CopyAndImage)}>
      <div className={clsx(s.Cont, 'Container', alignment && s[alignment])}>
        <AnimatedElement className={s.Content} delay={isReversed ? 200 : 100}>
          <div className="smallTitle">{title}</div>
          {copy && (
            <h2>
              <PortableText value={copy} />
            </h2>
          )}
          {subCopy && (
            <h4 className={s.SubCopy}>
              <PortableText value={subCopy} />
            </h4>
          )}
          {button && (
            <Button
              title={button.link.title}
              isPrimary={button.isPrimary}
              hasArrow={button.hasArrow}
              iconName={button.iconName}
            />
          )}
        </AnimatedElement>
        <AnimatedElement className={s.Image} delay={isReversed ? 100 : 200}>
          {image && <ImageBox image={image} />}
        </AnimatedElement>
      </div>
    </section>
  );
}

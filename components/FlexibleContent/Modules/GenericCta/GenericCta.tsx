import Button from '@/components/Button/Button';
import PortableText from '@/components/PortableText/PortableText';
import type { ButtonSchemaType } from '@/schemas/objects/button';
import clsx from 'clsx';
import s from './GenericCta.module.sass';

export default function GenericCta({
  title,
  copy,
  buttons,
}: {
  title: string;
  copy: any;
  buttons: Array<ButtonSchemaType>;
}) {
  return (
    <section className={clsx(s.Outer, 'my-24 text-center')}>
      <div className={clsx('flex flex-col items-center pt-24', 'lg:pb-24')}>
        <h2
          className={clsx(
            'HasGradient Vertical',
            'white mb-4 text-6xl',
            'md:text-8xl',
            'lg:text-9xl'
          )}
        >
          {title}
        </h2>
        <div className={clsx(s.Copy, 'mb-8 max-w-3xl text-base', 'md:text-xl', 'lg:text-2xl')}>
          <PortableText className={clsx('my-5')} value={copy} />
        </div>
        <div className={clsx('flex flex-wrap items-center justify-center gap-4')}>
          {buttons.map((button, index) => {
            return <Button {...button} key={index} />;
          })}
        </div>
      </div>
    </section>
  );
}

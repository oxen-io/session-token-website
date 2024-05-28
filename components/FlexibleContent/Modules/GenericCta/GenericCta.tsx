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
    <section className={s.Outer}>
      <div className="Container">
        <h2 className="h1 Massive HasGradient Vertical">{title}</h2>
        <div className={clsx(s.Copy, `Copy Large`)}>
          <PortableText value={copy} />
        </div>
        <ul className={s.Buttons}>
          {buttons.map((button, index) => {
            return (
              <li key={index}>
                <Button {...button} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

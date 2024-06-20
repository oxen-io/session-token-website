import clsx from 'clsx';

import CMSImageBox from '@/components/ImageBox/CMSImageBox';

import s from './IconStrip.module.sass';

export default function IconStrip({ title, icons }: { title: string; icons: any }) {
  return (
    <section className={s.IconStrip}>
      <div className={clsx(s.Cont)}>
        {title && <div className="smallTitle">{title}</div>}
        {icons && (
          <ul>
            {icons.map((icon, index) => {
              if (!icon) {
                return null;
              }

              return (
                <li key={index}>
                  <CMSImageBox image={icon} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

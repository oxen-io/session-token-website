import clsx from 'clsx';

import ImageBox from '@/components/ImageBox/ImageBox';

import { AnimatedElement } from '@/components/AnimatedComponent/AnimatedComponent';
import NumberTicker from '@/components/NumberTicker';
import s from './StatsTiles.module.sass';

export default function StatsTiles({
  tiles,
}: {
  tiles: Array<{
    figure: string;
    copy: string;
    backgroundImage: any;
  }>;
}) {
  return (
    <section className={s.StatsTiles}>
      <div className={clsx(s.Cont)}>
        <ul>
          {tiles?.map((tile, index) => {
            const { figure, copy, backgroundImage } = tile;

            return (
              <AnimatedElement key={index} type={'li'} delay={index * 100 + 100}>
                <h1 className="large">
                  <NumberTicker targetNumber={parseFloat(figure)} />
                </h1>
                <p>{copy}</p>
                {backgroundImage && <ImageBox image={backgroundImage} />}
              </AnimatedElement>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

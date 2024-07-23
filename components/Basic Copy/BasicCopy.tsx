'use client';

import { AnimatedElement } from '@/components/AnimatedComponent/AnimatedComponent';
import PortableText from '@/components/PortableText/PortableText';
import type { CopyBlock, CopyFields } from '@/schemas/partials/portableText';
import clsx from 'clsx';
import { useRef } from 'react';
import s from './BasicCopy.module.sass';

export default function BasicCopy({
  copy,
  showOutline,
  outlineHeading = 'In this page',
}: {
  copy: CopyFields;
  showOutline: boolean;
  outlineHeading?: string;
}) {
  const mainRef = useRef<any>();

  const allH2s = copy.filter(
    (block) => block._type === 'block' && block.style === 'h2'
  ) as Array<CopyBlock>;

  return (
    <section className={clsx(s.Outer, 'post-content mb-48 mt-24 flex w-full gap-12')}>
      <AnimatedElement innerRef={mainRef} type="main" delay={250}>
        <PortableText value={copy} />
      </AnimatedElement>
      {allH2s.length > 0 && showOutline ? (
        <AnimatedElement
          type="aside"
          delay={100}
          className={clsx('wrap hidden w-max max-w-[25vw]', 'lg:block')}
        >
          <div className="sticky top-12">
            <h5 className="text-nowrap text-xl font-medium uppercase tracking-wider">
              {outlineHeading}
            </h5>
            <ul className="mt-2 flex flex-col gap-1">
              {allH2s.map(({ _key, children }, index) => {
                const textContent = children[0]?.text;

                return (
                  <li key={_key}>
                    <button
                      className="hover:text-primary"
                      onClick={() => {
                        const target = mainRef.current?.querySelector(
                          `h2:nth-of-type(${index + 1})`
                        );
                        target?.scrollIntoView({
                          behavior: 'smooth',
                          offsetTop: 100,
                        });
                      }}
                    >
                      {textContent}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </AnimatedElement>
      ) : null}
    </section>
  );
}

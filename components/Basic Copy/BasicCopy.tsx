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
    <section
      className={clsx(
        'post-content flex w-full',
        s.Outer,
        allH2s.length > 0 && showOutline && 'md:grid'
      )}
    >
      <AnimatedElement innerRef={mainRef} type="main" delay={250}>
        <PortableText value={copy} />
      </AnimatedElement>
      {allH2s.length > 0 && showOutline ? (
        <aside>
          <AnimatedElement type="div" delay={300}>
            <h5>{outlineHeading}</h5>
            <ul>
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
          </AnimatedElement>
        </aside>
      ) : null}
    </section>
  );
}

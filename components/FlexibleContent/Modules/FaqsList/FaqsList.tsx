'use client';

import { useRef, useState } from 'react';

import clsx from 'clsx';
import PortableText from '@/components/PortableText/PortableText';
import FadeCollapse from '@/components/FadeCollapse/FadeCollapse';
import { AnimatedElement } from '@/components/AnimatedComponent/AnimatedComponent';
import s from './FaqsList.module.sass';

export default function FaqsList({ categories }: { categories: any }) {
  const [openCategories, setOpenCategories] = useState<any>([]);
  const categoryRefs = useRef<any>({});

  return (
    <section className={clsx(s.Outer, 'Container')}>
      <AnimatedElement type="legend" delay={100} className={s.Legend}>
        <div>
          <strong>Table of contents</strong>
          <ul>
            {categories.map(({ _key, title }) => {
              return (
                <li key={_key}>
                  <button
                    className="hover:text-primary"
                    onClick={() => {
                      const target = categoryRefs.current[_key];
                      target?.scrollIntoView({
                        behavior: 'smooth',
                      });
                    }}
                  >
                    {title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </AnimatedElement>
      <AnimatedElement type="main" delay={200}>
        <ul className={s.Categories}>
          {categories.map(({ _key, title, faqs }) => {
            return (
              <li
                key={_key}
                ref={ref => {
                  categoryRefs.current[_key] = ref;
                }}
              >
                <strong>{title}</strong>
                <ul className={s.FaqsGroup}>
                  {faqs.map(({ _key: _keyInnter, question, answer }) => {
                    const isOpen = openCategories.includes(_keyInnter);

                    return (
                      <li key={_keyInnter} className={isOpen ? s.Open : ''}>
                        <button
                          onClick={() => {
                            setOpenCategories(
                              openCategories.includes(_keyInnter)
                                ? openCategories.filter(category => category !== _keyInnter)
                                : [...openCategories, _keyInnter]
                            );
                          }}
                          className="hover:text-primary"
                        >
                          <em />
                          {question}
                        </button>
                        <FadeCollapse open={isOpen}>
                          <div className={s.Answer}>
                            <PortableText value={answer} />
                          </div>
                        </FadeCollapse>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </AnimatedElement>
    </section>
  );
}

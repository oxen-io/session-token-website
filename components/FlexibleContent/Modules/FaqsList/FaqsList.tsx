/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */

'use client';

import { forwardRef, useEffect, useId, useRef, type HTMLAttributes } from 'react';

import { AnimatedElement } from '@/components/AnimatedComponent/AnimatedComponent';
import { MinusIcon } from '@/components/Icons/MinusIcon';
import { PlusIcon } from '@/components/Icons/PlusIcon';
import PortableText from '@/components/PortableText/PortableText';
import type { FAQSchemaType } from '@/schemas/objects/flexibleSections/faqsList';
import type { MaxWidthType } from '@/schemas/partials/styling';
import clsx from 'clsx';

export default function FaqsList({
  categories,
  maxWidth: _maxWidth,
  hideCategoryTitles,
  hideTableOfContents,
}: FAQSchemaType) {
  const categoryRefs = useRef<any>({});
  const maxWidth = _maxWidth as MaxWidthType;

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const target = document.querySelector(hash);
      target?.scrollIntoView({
        behavior: 'smooth',
      });
      // click on the target label to expand the FAQ
      const inputId = target?.getAttribute('for');
      if (inputId) {
        const input = document.getElementById(inputId) as HTMLInputElement | undefined;
        if (input) {
          input.checked = true;
        }
      }
    }
  }, []);

  return (
    <section
      className={clsx(
        'mx-auto flex flex-row gap-24 pt-32',
        maxWidth === 'medium' && 'max-w-screen-lg'
      )}
    >
      {!hideTableOfContents ? (
        <AnimatedElement
          type="legend"
          delay={100}
          className={clsx('wrap hidden w-max max-w-[25vw]', 'lg:block')}
        >
          <div className="sticky top-12">
            <span className="text-nowrap text-xl font-semibold uppercase">Table of contents</span>
            <ul className="mt-2 flex flex-col gap-1">
              {categories.map(({ _key, title }) => {
                return (
                  <li key={_key}>
                    <button
                      className="py-1 hover:text-primary"
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
      ) : null}
      <AnimatedElement type="main" delay={200}>
        <ul className="flex flex-col gap-12">
          {categories.map(({ _key, title, faqs }) => {
            return (
              <li
                key={_key}
                className="scroll-mt-12"
                ref={(ref) => {
                  categoryRefs.current[_key] = ref;
                }}
              >
                {!hideCategoryTitles ? (
                  <span className="text-xl font-semibold uppercase">{title}</span>
                ) : null}
                <ul>
                  {faqs.map((props: FAQItemProps) => {
                    return <FAQItem key={props.question} {...props} />;
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

type ToggleCardExpansionButtonProps = HTMLAttributes<SVGSVGElement> & {
  action: 'Expand' | 'Collapse';
  htmlFor: string;
};

const ToggleCardExpansionButton = forwardRef<SVGSVGElement, ToggleCardExpansionButtonProps>(
  ({ className, action, ...props }, ref) => {
    const Icon = action === 'Expand' ? PlusIcon : MinusIcon;
    return (
      <Icon
        role="button"
        className={clsx('absolute top-[22px] h-3 w-3 cursor-pointer select-none', className)}
        ref={ref}
        {...props}
      />
    );
  }
);
ToggleCardExpansionButton.displayName = 'ToggleCardExpansionButton';

type FAQItemProps = {
  question: string;
  answer: any;
};

function FAQItem({ question, answer }: FAQItemProps) {
  const id = useId();
  const questionSlug = question
    .replace(/[^\w\s]/gi, '')
    .trim()
    .replaceAll(/\s/g, '-')
    .toLowerCase();

  const onExpand = () => {
    if (history) {
      history.pushState(null, '', `#${questionSlug}`);
    }
  };

  const onCollapse = () => {
    if (history) {
      history.pushState(null, '', '#');
    }
  };

  return (
    <li>
      <div className="group -mb-4 flex h-max w-full flex-row flex-wrap gap-3 align-middle text-lg duration-150">
        <input
          id={id}
          type="checkbox"
          className="peer hidden appearance-none"
          onChange={(e) => {
            return e.target.checked ? onExpand() : onCollapse();
          }}
        />
        <ToggleCardExpansionButton
          action="Expand"
          className="block stroke-white group-hover:stroke-primary peer-checked:hidden peer-checked:stroke-primary"
          htmlFor={id}
        />
        <ToggleCardExpansionButton
          action="Collapse"
          className="hidden stroke-white group-hover:stroke-primary peer-checked:block peer-checked:stroke-primary"
          htmlFor={id}
        />
        <label
          className="w-full flex-grow select-none scroll-mt-[83px] flex-nowrap py-4 pl-7 group-hover:text-primary peer-checked:select-auto peer-checked:text-primary"
          role="button"
          htmlFor={id}
          id={questionSlug}
        >
          {question}
        </label>
        <div
          className={clsx(
            '-mt-4 ml-7 max-h-0 w-full overflow-y-hidden text-base opacity-0 transition-all duration-300 ease-in-out peer-checked:max-h-screen peer-checked:pb-8 peer-checked:opacity-100',
            '[&>*>a]:text-primary [&>p]:mt-3 first:[&>p]:mt-0'
          )}
        >
          <PortableText value={answer} />
        </div>
      </div>
      <div className="h-px max-w-2xl bg-gradient-to-r from-[#515151] to-[rgba(255,255,255,0)]" />
    </li>
  );
}

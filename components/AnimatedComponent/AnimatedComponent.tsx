'use client';

import CMSImageBox from '@/components/ImageBox/CMSImageBox';
import clsx from 'clsx';
import { useCallback } from 'react';

import type { SanityImage } from '@/lib/sanity.image';
import { useInView } from 'react-intersection-observer';

export type AllowedElement =
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'ul'
  | 'li'
  | 'legend'
  | 'aside'
  | 'main';

export const AnimatedElement = ({
  type = 'div',
  children,
  delay = 0,
  className = '',
  disabled,
  innerRef,
  dangerouslySetInnerHTML,
  ...props
}: {
  type?: AllowedElement;
  children?: React.ReactNode;
  delay?: number;
  className?: string;
  disabled?: boolean;
  innerRef?: React.RefObject<any>;
  props?: any;
  dangerouslySetInnerHTML?: { __html: string };
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const _visible = disabled || inView;

  const Comp = type;

  const handleRefs = useCallback(
    (node: Element) => {
      ref(node);

      if (innerRef) {
        // TODO: FIX THIS NIGHTMARE
        // @ts-expect-error - innerRef is a ref object
        // eslint-disable-next-line no-param-reassign
        innerRef.current = node;
      }
    },
    [innerRef, ref]
  );

  return (
    <Comp
      {...props}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      // TODO: FIX THIS NIGHTMARE
      // @ts-expect-error - it "works" so it's not a priority
      ref={handleRefs}
      className={clsx(`${className} AnimatedElement`, {
        [`Visible`]: _visible,
      })}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Comp>
  );
};

export const AnimatedBigImage = ({
  image,
  className = '',
  delay = 0,
}: {
  image: SanityImage;
  className?: string;
  delay?: number;
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <CMSImageBox
      image={image}
      className={clsx(className, `AnimatedBigImage`, {
        [`Visible`]: inView,
      })}
      innerRef={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    />
  );
};

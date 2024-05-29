'use client';

import NavLink from '@/components/NavLink/NavLink';
import { resolveLinkFromSanityOrString } from '@/lib/sanity.links';
import buttonLogos from '@/public/images/buttonLogos';
import type { LinkSchemaType } from '@/schemas/objects/link';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { forwardRef } from 'react';

const buttonVariants = cva(
  [
    'font-atyp-display uppercase leading-none flex whitespace-nowrap items-center gap-[5px] disabled:pointer-events-none border border-solid border-primary rounded-[40px]',
    'transition duration-200',
  ],
  {
    variants: {
      variant: {
        default: ['bg-primary text-black', 'hover:bg-transparent hover:text-primary'],
        outline: ['bg-transparent text-primary', 'hover:bg-primary hover:text-black'],
      },
      size: {
        default: ['text-sm w-fit px-4 py-3', 'lg:text-md lg:px-[20px] lg:py-[16px]'],
        small: ['text-xs w-fit px-3 py-1', 'lg:text-sm lg:px-[16px] lg:py-[10px]'],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  link?: LinkSchemaType;
  url?: string;
  prefetch?: boolean;
  small?: boolean;
  iconName?: string;
  hasArrow?: boolean;
  isPrimary?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      link,
      url,
      title,
      iconName,
      small,
      hasArrow,
      isPrimary,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = !url && !link ? 'button' : NavLink;
    const text = link?.title ?? title;

    return (
      <Comp
        className={clsx(
          buttonVariants({
            variant: !isPrimary ? 'outline' : variant,
            size: small ? 'small' : size,
            className,
          })
        )}
        href={(link ? resolveLinkFromSanityOrString(link) : url) ?? ''}
        ref={ref}
        {...props}
      >
        {iconName && iconName !== '' && iconName.toLowerCase() !== 'none' ? (
          <span
            className={clsx('w-3 h-3 fill-current', 'lg:w-5 lg:h-5', 'transition duration-200')}
          >
            {buttonLogos[iconName]}
          </span>
        ) : null}
        {text && (
          <span className={clsx('flex flex-row items-center top-[1px]')}>
            {text ?? children}
            {hasArrow ? ' ↗' : ''}
          </span>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export default Button;

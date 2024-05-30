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
        small: ['text-xs w-fit px-4 h-11'],
        medium: ['text-sm w-fit px-6 h-12'],
        large: ['text-md w-fit px-7 h-14'],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  link?: LinkSchemaType;
  url?: string;
  prefetch?: boolean;
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
      hasArrow,
      isPrimary,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = !url && !link ? 'button' : NavLink;
    const text = link?.title ?? title;
    const hasIcon = iconName && Boolean(iconName !== '' && iconName.toLowerCase() !== 'none');

    const iconClasses = [
      'fill-current',
      (!size || size === 'medium') && 'w-4 h-4',
      size === 'small' && 'w-3 h-3',
      size === 'large' && 'w-5 h-5',
      'transition duration-200',
    ];

    return (
      <Comp
        className={clsx(
          buttonVariants({
            variant: !isPrimary ? 'outline' : variant,
            size,
            className,
          })
        )}
        href={(link ? resolveLinkFromSanityOrString(link) : url) ?? ''}
        ref={ref}
        {...props}
      >
        {hasIcon ? <span className={clsx(iconClasses)}>{buttonLogos[iconName]}</span> : null}
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

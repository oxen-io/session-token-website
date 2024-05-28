'use client';

import NavLink from '@/components/NavLink/NavLink';
import { getLinkUrl } from '@/lib/sanity.links';
import buttonLogos from '@/public/images/buttonLogos';
import type { LinkSchemaType } from '@/schemas/objects/link';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'border border-solid border-primary uppercase text-md leading-none rounded-[40px] transition duration-200 flex items-center gap-[5px] disabled:pointer-events-none font-atyp-display [&>svg]:h-[18px] [&>svg]:w-[18px] [&>svg]:inline [&>svg>path]:transition [&>svg>path]:duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-primary hover:bg-transparent text-black hover:text-primary [&>svg>path]:fill-black [&>svg>path]:hover:fill-primary',
        outline:
          'bg-transparent hover:bg-primary text-primary hover:text-black [&>svg>path]:fill-primary [&>svg>path]:hover:fill-black',
      },
      size: {
        default: 'w-fit px-[20px] py-[16px]',
        small: 'w-fit px-[16px] py-[10px]',
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
        href={(link ? getLinkUrl(link) : url) ?? ''}
        ref={ref}
        {...props}
      >
        {iconName ? buttonLogos[iconName] : null}
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

import { forwardRef } from 'react';
import { type SVGAttributes } from './types';

export const MinusIcon = forwardRef<SVGSVGElement, SVGAttributes>((props, ref) => (
  <svg
    width="21"
    height="4"
    viewBox="0 0 21 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    ref={ref}
  >
    <path
      d="M19.206 1.9638L1.71982 1.96378"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="bevel"
    />
  </svg>
));
MinusIcon.displayName = 'MinusIcon';

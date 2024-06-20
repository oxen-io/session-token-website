import { forwardRef } from 'react';
import { type SVGAttributes } from './types';

export const PlusIcon = forwardRef<SVGSVGElement, SVGAttributes>((props, ref) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    ref={ref}
  >
    <path
      d="M10.6116 1.96531L10.6116 19.4876M19.2035 10.5935L1.71737 10.5934"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="bevel"
    />
  </svg>
));
PlusIcon.displayName = 'PlusIcon';

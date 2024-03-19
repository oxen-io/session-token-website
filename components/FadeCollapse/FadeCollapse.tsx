import SmoothCollapse from 'react-smooth-collapse';
import type { ReactNode } from 'react';

import clsx from 'clsx';
import s from './FadeCollapse.module.sass';

export default function FadeCollapse({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div className={clsx(s.Outer, open && s.Open)}>
      <SmoothCollapse allowOverflowWhenOpen expanded={!!open}>
        {children}
      </SmoothCollapse>
    </div>
  );
}

import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

// Values should match Constants.UI.CONTAINER_*
export function Container(props: Props) {
  const { children, className } = props;

  return (
    <div className={clsx('w-full', className)}>
      <div className={clsx('relative mx-auto w-full max-w-[1440px] px-[5vw]', 'container:px-0')}>
        {children}
      </div>
    </div>
  );
}

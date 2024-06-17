import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

// Values should match Constants.UI.CONTAINER_*
export function Container(props: Props) {
  const { children } = props;

  return (
    <div className={clsx('w-full')}>
      <div className={clsx('relative mx-auto w-full max-w-[1440px] px-[5vw]', 'container:px-0')}>
        {children}
      </div>
    </div>
  );
}

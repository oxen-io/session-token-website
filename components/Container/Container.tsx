import { UI } from '@/lib/constants';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function Container(props: Props) {
  const { children } = props;

  const containerStyle = {
    paddingLeft: `${UI.CONTAINER_PADDING_VW}vw`,
    paddingRight: `${UI.CONTAINER_PADDING_VW}vw`,
    width: '100%',
    maxWidth: `${UI.CONTAINER_MAX_WIDTH_PX}`,
    margin: '0 auto',
  };

  return (
    <div className={clsx('w-full')}>
      <div className="relative" style={containerStyle}>
        {children}
      </div>
    </div>
  );
}

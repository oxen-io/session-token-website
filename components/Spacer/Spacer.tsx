import clsx from 'clsx';

type SpacerProps = {
  /** 4px | 8px | 16px | 24px | 48px | 64px | 96px | 128px */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  className?: string;
};

export const Spacer = (props: SpacerProps) => {
  const { size = 'md', className } = props;
  const sizeClasses = [
    size === 'xs' && 'm-0.5',
    size === 'sm' && 'm-1',
    size === 'md' && 'm-2',
    size === 'lg' && 'm-4',
    size === 'xl' && 'm-6',
    size === '2xl' && 'm-8',
    size === '3xl' && 'm-12',
    size === '4xl' && 'm-20',
  ];

  return <div className={clsx(sizeClasses, className)} />;
};

import clsx from 'clsx';

export default function BackgroundGradientContainer({
  children,
  className,
  gradientClassName = 'w-full',
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  gradientClassName?: string;
  as?: React.ElementType;
}) {
  const Comp = as;
  return (
    <Comp className={clsx('relative', className)}>
      <>
        <div
          className={clsx(
            'absolute hidden h-full bg-gradient-to-b from-transparent via-primary to-transparent opacity-10 lg:block',
            gradientClassName
          )}
        />
        <div
          className={clsx(
            'absolute hidden h-full bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-90 lg:block',
            gradientClassName
          )}
        />
      </>
      {children}
    </Comp>
  );
}

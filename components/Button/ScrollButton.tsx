'use client';

import clsx from 'clsx';

export default function ScrollButton({ className }: { className?: string }) {
  // When the button is clicked nudge the screen down a little
  const nudgeDown = () => {
    window.scrollBy({
      top: window.innerHeight - 100,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={clsx(
        'flex w-full flex-col items-center justify-center gap-1 opacity-70',
        'lg:hidden',
        className
      )}
      onClick={nudgeDown}
    >
      <div className={clsx('h-16 w-px bg-white opacity-70')} />
      <span className={clsx('uppercase')}>Scroll</span>
    </div>
  );
}

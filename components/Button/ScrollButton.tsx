'use client';

import clsx from 'clsx';

export default function ScrollButton() {
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
        'absolute bottom-5 left-0 flex w-full flex-col items-center justify-center gap-1 opacity-70',
        'lg:hidden'
      )}
      onClick={nudgeDown}
    >
      <div className={clsx('h-[70px] w-px bg-white opacity-70')} />
      <span className={clsx('uppercase')}>Scroll</span>
    </div>
  );
}

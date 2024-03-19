'use client';

import s from './ScrollButton.module.sass';

export default function ScrollButton() {
  // When the button is clicked nudge the screen down a little
  const nudgeDown = () => {
    window.scrollBy({
      top: window.innerHeight - 100,
      behavior: 'smooth',
    });
  };

  return (
    <div className={s.MobileScroll} onClick={nudgeDown}>
      <div className={s.ScrollIcon} />
      <span>Scrolls</span>
    </div>
  );
}

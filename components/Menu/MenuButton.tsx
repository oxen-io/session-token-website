import clsx from 'clsx';
import s from './MenuButton.module.sass';

export default function MenuButton({
  open,
  setOpen,
  className,
}: {
  open: boolean;
  setOpen: () => void;
  className?: string;
}) {
  return (
    <button
      className={clsx(
        'ml-1 h-9 w-9 rounded-full border border-solid border-primary',
        s.Outer,
        open && s.Open,
        className
      )}
      onClick={setOpen}
    >
      <div />
      <div />
      <div />
    </button>
  );
}

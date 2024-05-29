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
        'h-9 w-9 border border-solid border-primary rounded-full ml-1',
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

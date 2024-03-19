import clsx from 'clsx';
import s from './MenuButton.module.sass';

export default function MenuButton({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <button className={clsx(s.Outer, open && s.Open)} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </button>
  );
}

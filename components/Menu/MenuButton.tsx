import clsx from 'clsx';
import s from './MenuButton.module.sass';

export default function MenuButton({ open, setOpen }: { open: boolean; setOpen: () => void }) {
  return (
    <button className={clsx(s.Outer, open && s.Open)} onClick={setOpen}>
      <div />
      <div />
      <div />
    </button>
  );
}

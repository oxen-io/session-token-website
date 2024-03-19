import clsx from 'clsx';
import s from './SmoothOpen.module.sass';

function SmoothOpen({ children, open }: { children: React.ReactNode; open: boolean }) {
  return (
    <div className={clsx(s.SmoothOpen, open && s.isOpen)}>
      <div>{children}</div>
    </div>
  );
}

export default SmoothOpen;

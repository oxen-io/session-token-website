import Button from '@/components/Button/Button';
import clsx from 'clsx';

export default async function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen align-middle p-32">
      <div
        className={clsx(
          'flex flex-col gap-10 justify-center items-center align-middle',
          'lg:flex-row  lg:h-[200px] '
        )}
      >
        <span className={clsx('text-9xl font-bold pt-10', 'lg:text-[200px]')}>404</span>
        <div className={clsx('bg-gray-300 min-w-full min-h-px', 'lg:min-w-px lg:min-h-full')} />
        <div className={clsx('flex flex-col justify-center items-center gap-5', 'lg:items-start')}>
          <p className={clsx('text-xl text-center', 'lg:max-w-[340px] lg:text-start')}>
            {"Sorry! We couldn't find the page you were looking for."}
          </p>
          <Button url="/" title={'↖ Return Home'} size="large" variant="outline"></Button>
        </div>
      </div>
    </div>
  );
}

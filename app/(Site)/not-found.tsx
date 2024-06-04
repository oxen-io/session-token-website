import Button from '@/components/Button/Button';
import clsx from 'clsx';

export default async function NotFound() {
  return (
    <div className={clsx('flex flex-col justify-center items-center w-full h-screen align-middle')}>
      {/* https://github.com/vercel/next.js/issues/45620 */}
      <title>Page not found - Session Token</title>
      <div
        className={clsx(
          'flex flex-col gap-4 justify-center items-center align-middle mt-16',
          'lg:flex-row lg:justify-start lg:gap-10 lg:max-h-[140px] lg:mt-0'
        )}
      >
        <span className={clsx('relative', 'lg:max-h-[140px]')}>
          <span
            className={clsx(
              'font-monument-extended text-9xl font-bold text-gradient-to-r from-[#F3F5F4] to-[#BDC7C2] bg-clip-text leading-none',
              'lg:text-[196px] lg:top-[-19px]'
            )}
          >
            404
          </span>
        </span>
        <div
          className={clsx(
            'bg-gray-300 min-w-px min-h-full max-h-[140px] m-0 p-0 hidden',
            'lg:block'
          )}
        />
        <div
          className={clsx(
            'flex flex-col justify-center items-center gap-5',
            'lg:items-start lg:justify-between lg:h-full lg:max-h-[140px] lg:-mt-2'
          )}
        >
          <p className={clsx('text-2xl text-center px-1 max-w-sm', 'lg:px-0  lg:text-start')}>
            {"Sorry! We couldn't find the page you were looking for."}
          </p>
          <Button
            url="/"
            title={'Return home'}
            size="large"
            variant="outline"
            iconName="house"
            isUpperCase={false}
          />
        </div>
      </div>
    </div>
  );
}

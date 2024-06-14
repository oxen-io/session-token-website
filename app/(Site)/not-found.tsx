import Button from '@/components/Button/Button';
import clsx from 'clsx';

export default async function NotFound() {
  return (
    <div className={clsx('flex h-screen w-full flex-col items-center justify-center align-middle')}>
      <div
        className={clsx(
          'mt-16 flex flex-col items-center justify-center gap-4 align-middle',
          'lg:mt-0 lg:max-h-[140px] lg:flex-row lg:justify-start lg:gap-10'
        )}
      >
        <span className={clsx('relative', 'lg:max-h-[140px]')}>
          <span
            className={clsx(
              'text-gradient-to-r from-[#F3F5F4] to-[#BDC7C2] bg-clip-text font-monument-extended text-9xl font-bold leading-none',
              'lg:top-[-19px] lg:text-[196px]'
            )}
          >
            404
          </span>
        </span>
        <div
          className={clsx(
            'm-0 hidden max-h-[140px] min-h-full min-w-px bg-gray-300 p-0',
            'lg:block'
          )}
        />
        <div
          className={clsx(
            'flex flex-col items-center justify-center gap-5',
            'lg:-mt-2 lg:h-full lg:max-h-[140px] lg:items-start lg:justify-between'
          )}
        >
          <p className={clsx('max-w-sm px-1 text-center text-2xl', 'lg:px-0 lg:text-start')}>
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

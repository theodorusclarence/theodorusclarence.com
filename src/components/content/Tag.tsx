import clsx from 'clsx';
import * as React from 'react';

export default function Tag({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      className={clsx(
        className,
        'inline-block px-1.5 py-0.5 font-medium rounded-md transition-colors',
        'text-gray-700 bg-gray-100 hover:text-black disabled:text-gray-300 disabled:bg-gray-200',
        'dark:disabled:bg-gray-600 dark:disabled:text-gray-500 dark:hover:text-white dark:text-gray-200 dark:bg-gray-700',
        'focus:outline-none focus-visible:ring focus-visible:ring-primary-300 disabled:cursor-not-allowed'
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function SkipNavTag({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<'a'>) {
  return (
    <>
      <a
        href='#skip-tags'
        className={clsx(
          'inline-block px-1.5 py-0.5 font-medium rounded-md transition',
          'text-gray-700 bg-gray-100 hover:text-black disabled:text-gray-300 disabled:bg-gray-200',
          'dark:disabled:bg-gray-600 dark:disabled:text-gray-500 dark:hover:text-white dark:text-gray-200 dark:bg-gray-700',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-300 disabled:cursor-not-allowed',
          'absolute opacity-0 pointer-events-none focus:translate-y-[1.4rem] focus:inline-block focus:opacity-100'
        )}
        {...rest}
      >
        Skip tag
      </a>
      {children}
      <div id='skip-tags' className='hidden' />
    </>
  );
}

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
        'py-0.5 px-1.5 rounded-md inline-block font-medium transition-colors',
        'bg-gray-100 text-gray-700 hover:text-black disabled:bg-gray-200 disabled:text-gray-300',
        'dark:bg-gray-700 dark:text-gray-200 dark:hover:text-white dark:disabled:bg-gray-600 dark:disabled:text-gray-500',
        'disabled:cursor-not-allowed focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

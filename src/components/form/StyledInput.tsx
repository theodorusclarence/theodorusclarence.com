import clsx from 'clsx';
import * as React from 'react';

export default function StyledInput({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'input'>) {
  return (
    <input
      className={clsx(
        className,
        'dark:bg-dark w-full rounded-md',
        'border border-gray-300 dark:border-gray-600',
        'focus:outline-none focus:ring-0 focus:border-primary-300 dark:focus:border-primary-300'
      )}
      {...rest}
    />
  );
}

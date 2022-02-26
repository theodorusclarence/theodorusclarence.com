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
        'w-full rounded-md dark:bg-dark',
        'border border-gray-300 dark:border-gray-600',
        'focus:border-primary-300 focus:outline-none focus:ring-0 dark:focus:border-primary-300'
      )}
      {...rest}
    />
  );
}

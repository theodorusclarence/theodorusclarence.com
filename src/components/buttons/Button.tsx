import clsx from 'clsx';
import * as React from 'react';
import { ImSpinner2 } from 'react-icons/im';

enum ButtonVariant {
  'default',
}

type ButtonProps = {
  isLoading?: boolean;
  variant?: keyof typeof ButtonVariant;
} & React.ComponentPropsWithoutRef<'button'>;

export default function Button({
  children,
  className,
  disabled: buttonDisabled,
  isLoading,
  variant = 'default',
  ...rest
}: ButtonProps) {
  const disabled = isLoading || buttonDisabled;

  return (
    <button
      {...rest}
      disabled={disabled}
      className={clsx(
        'px-4 py-2 font-bold rounded',
        'border border-gray-300 shadow-sm dark:border-gray-600',
        'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
        'transform-gpu scale-100 hover:scale-[1.03] active:scale-[0.97]',
        'transition duration-100',
        'animate-shadow',
        {
          'bg-white disabled:bg-gray-200 text-gray-600 dark:text-gray-300 dark:bg-dark dark:disabled:bg-gray-700':
            variant === 'default',
        },
        'disabled:transform-none disabled:cursor-not-allowed',
        isLoading &&
          'relative !text-transparent hover:!text-transparent !cursor-wait transition-none',
        className
      )}
    >
      {isLoading && (
        <div
          className={clsx(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'text-black dark:text-white'
          )}
        >
          <ImSpinner2 className='animate-spin' />
        </div>
      )}
      {children}
    </button>
  );
}

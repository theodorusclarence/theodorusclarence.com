import clsx from 'clsx';
import * as React from 'react';
import { ImSpinner2 } from 'react-icons/im';

enum ButtonVariant {
  'dark',
  'light',
  'primary',
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
        'py-2 px-4 rounded font-bold btn',
        'border border-gray-300 dark:border-gray-600 shadow-sm',
        'focus:outline-none',
        {
          'bg-white disabled:bg-gray-200 text-gray-600 dark:text-gray-300 dark:bg-dark dark:disabled:bg-gray-700':
            variant === 'default',
          'bg-white disabled:bg-gray-200 text-dark hover:bg-gray-200 hover:text-dark focus-visible:text-dark border-gray-400 disabled:hover:text-dark':
            variant === 'light',
          'bg-primary-400 text-black hover:bg-primary-400/90 hover:text-black border-primary-500 disabled:hover:bg-primary-400 disabled:brightness-75  focus-visible:text-dark':
            variant === 'primary',
        },
        'disabled:cursor-not-allowed',
        isLoading &&
          'relative text-transparent hover:!text-transparent !cursor-wait transition-none',
        className
      )}
      style={
        variant === 'primary'
          ? ({
              '--clr-primary-400': 'white',
              '--clr-primary-500': 'white',
            } as React.CSSProperties)
          : undefined
      }
    >
      {isLoading && (
        <div
          className={clsx(
            'absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2',
            variant !== 'dark' ? 'text-black' : 'text-white'
          )}
        >
          <ImSpinner2 className='animate-spin' />
        </div>
      )}
      {children}
    </button>
  );
}

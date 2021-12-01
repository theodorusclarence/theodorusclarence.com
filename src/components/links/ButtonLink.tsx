import clsx from 'clsx';

import UnstyledLink, { UnstyledLinkProps } from './UnstyledLink';

enum ButtonVariant {
  'default',
}

type ButtonLinkProps = {
  variant?: keyof typeof ButtonVariant;
} & UnstyledLinkProps;

export default function ButtonLink({
  children,
  className = '',
  variant = 'default',
  ...rest
}: ButtonLinkProps) {
  return (
    <UnstyledLink
      {...rest}
      className={clsx(
        'inline-flex px-4 py-2 font-bold rounded',
        'border border-gray-300 shadow-sm dark:border-gray-600',
        'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
        'transform-gpu scale-100 hover:scale-[1.03] active:scale-[0.97]',
        'transition duration-100',
        'animate-shadow',
        {
          'bg-white disabled:bg-gray-200 text-gray-800 dark:text-gray-100 dark:bg-dark dark:disabled:bg-gray-700':
            variant === 'default',
        },
        className
      )}
    >
      {children}
    </UnstyledLink>
  );
}

import clsx from 'clsx';

import UnstyledLink, { UnstyledLinkProps } from './UnstyledLink';

export default function CustomLink({
  children,
  className = '',
  ...rest
}: UnstyledLinkProps) {
  return (
    <UnstyledLink
      {...rest}
      className={clsx(
        'custom-link inline-flex items-center font-medium animated-underline',
        'focus:outline-none focus-visible:ring ring-primary-400/70',
        'border-b border-dotted border-dark hover:border-black/0',
        className
      )}
    >
      <span className='dark:text-transparent dark:bg-gradient-to-tr dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text'>
        {children}
      </span>
    </UnstyledLink>
  );
}

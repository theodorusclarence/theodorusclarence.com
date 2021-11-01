import clsx from 'clsx';
import * as React from 'react';

type AccentType = React.ComponentPropsWithoutRef<'span'>;

export default function Accent({ children, className }: AccentType) {
  return (
    <span
      className={clsx(
        className,
        'bg-primary-300/50 transition-colors',
        'dark:text-transparent dark:bg-gradient-to-tr dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text'
      )}
    >
      {children}
    </span>
  );
}

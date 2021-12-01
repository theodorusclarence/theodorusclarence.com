import clsx from 'clsx';
import * as React from 'react';
import { Tooltip as TippyTooltip } from 'react-tippy';

type TooltipTextProps = {
  content?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  spanClassName?: string;
  withUnderline?: boolean;
};

export default function Tooltip({
  content,
  children,
  className,
  spanClassName,
  withUnderline = false,
}: TooltipTextProps) {
  return (
    <TippyTooltip
      trigger='mouseenter'
      interactive
      html={
        <div
          className={clsx(
            className,
            'inline-block p-2 text-gray-600 bg-white rounded-md shadow-md dark:bg-dark dark:text-gray-200',
            'border dark:border-gray-600 '
          )}
        >
          {content}
        </div>
      }
    >
      {withUnderline ? (
        <span
          className={clsx(spanClassName, 'underline')}
          style={{ textDecorationStyle: 'dotted' }}
        >
          {children}
        </span>
      ) : (
        <>{children}</>
      )}
    </TippyTooltip>
  );
}

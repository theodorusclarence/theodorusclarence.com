import clsx from 'clsx';
import * as React from 'react';
import { BiCheck, BiCopy } from 'react-icons/bi';
import { BsTextWrap } from 'react-icons/bs';

import clsxm from '@/lib/clsxm';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';

export function Pre({
  className,
  children,
  ...rest
}: React.ComponentPropsWithRef<'pre'>) {
  const preRef = React.useRef<HTMLPreElement>(null);

  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [shouldWrap, setShouldWrap] = React.useState(false);

  const [copy] = useCopyToClipboard();

  return (
    // word-break: break-word;
    // @apply nx-whitespace-pre-wrap md:nx-whitespace-pre;
    <pre
      {...rest}
      ref={preRef}
      className={clsxm([
        'group relative',
        // 'whitespace-pre-wrap break-words',
        className,
      ])}
      data-word-wrap={shouldWrap}
    >
      {children}
      <div
        className={clsx(
          'opacity-0 transition focus-within:opacity-100 group-hover:opacity-100',
          'absolute right-0 top-0 z-10 m-[11px] flex gap-1'
        )}
      >
        <button
          onClick={() => setShouldWrap((prev) => !prev)}
          title='Wrap code'
          className={clsx([
            'md:hidden',
            'rounded p-1 text-lg transition-colors md:block',
            'border border-gray-300 dark:border-gray-600',
            'text-gray-700 dark:text-gray-300',
            'bg-[#f2f7fc] hover:bg-gray-100 dark:bg-[#22272e] dark:hover:bg-gray-700',
          ])}
        >
          <BsTextWrap />
        </button>
        <button
          onClick={() => {
            copy(preRef?.current?.textContent ?? '').then(() => {
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 1500);
            });
          }}
          title='Copy code'
          className={clsx([
            'rounded p-1 text-lg transition-colors md:block',
            'border border-gray-300 dark:border-gray-600',
            'text-gray-700 dark:text-gray-300',
            'bg-[#f2f7fc] hover:bg-gray-100 dark:bg-[#22272e] dark:hover:bg-gray-700',
          ])}
        >
          {isCopied ? <BiCheck /> : <BiCopy />}
        </button>
      </div>
    </pre>
  );
}

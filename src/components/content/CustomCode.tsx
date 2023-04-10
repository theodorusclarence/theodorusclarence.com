import * as React from 'react';
import { HiCheckCircle, HiClipboard } from 'react-icons/hi';

import useCopyToClipboard from '@/hooks/useCopyToClipboard';

export function Pre(props: React.ComponentPropsWithRef<'pre'>) {
  return (
    <pre {...props}>
      {props.children}
      <style jsx>{`
        pre {
          position: relative;
          padding-top: 2.5rem;
        }
      `}</style>
    </pre>
  );
}

export default function CustomCode(props: React.ComponentPropsWithRef<'code'>) {
  const textRef = React.useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [copy] = useCopyToClipboard();

  const language = props.className?.includes('language')
    ? props.className.replace('language-', '').replace(' code-highlight', '')
    : null;

  return (
    <code {...props} data-code-type={language && 'code-block'}>
      {language ? (
        <div ref={textRef} className='overflow-x-auto'>
          {props.children}
        </div>
      ) : (
        <span>{props.children}</span>
      )}

      {language && (
        <div className='absolute left-6 top-0 rounded-b-md border border-t-0 border-gray-600 px-3 py-1'>
          <span className='select-none bg-gradient-to-tr from-primary-300 to-primary-400 bg-clip-text font-medium text-transparent'>
            {language}
          </span>
        </div>
      )}
      {language && (
        <button
          onClick={() => {
            copy(textRef?.current?.textContent ?? '').then(() => {
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 1500);
            });
          }}
          className='absolute right-2 top-2 hidden rounded border border-gray-600 p-2 text-lg transition-colors hover:bg-gray-700 md:block'
        >
          {isCopied ? (
            <HiCheckCircle className='text-green-400' />
          ) : (
            <HiClipboard />
          )}
        </button>
      )}
    </code>
  );
}

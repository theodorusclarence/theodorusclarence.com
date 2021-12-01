import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { HiCheckCircle, HiClipboard } from 'react-icons/hi';

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

  const language = props.className?.includes('language')
    ? props.className.replace('language-', '').replace(' code-highlight', '')
    : null;

  return (
    <code {...props}>
      {language ? (
        <div ref={textRef} className='overflow-x-auto'>
          {props.children}
        </div>
      ) : (
        <span>{props.children}</span>
      )}

      {language && (
        <div className='absolute top-0 left-6 px-3 py-1 rounded-b-md border border-t-0 border-gray-600'>
          <span className='font-medium text-transparent bg-clip-text bg-gradient-to-tr from-primary-300 to-primary-400 select-none'>
            {language}
          </span>
        </div>
      )}
      {language && (
        <CopyToClipboard
          text={textRef?.current?.textContent ?? ''}
          onCopy={() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500);
          }}
        >
          <button className='hidden absolute top-2 right-2 p-2 text-lg rounded border border-gray-600 transition-colors md:block hover:bg-gray-700'>
            {isCopied ? (
              <HiCheckCircle className='text-green-400' />
            ) : (
              <HiClipboard />
            )}
          </button>
        </CopyToClipboard>
      )}
    </code>
  );
}

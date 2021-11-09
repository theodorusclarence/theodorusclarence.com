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
        <div className='absolute top-0 px-3 py-1 border border-t-0 border-gray-600 rounded-b-md left-6'>
          <span className='font-medium text-transparent select-none bg-gradient-to-tr from-primary-300 to-primary-400 bg-clip-text'>
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
          <button className='absolute hidden p-2 text-lg transition-colors border border-gray-600 rounded md:block hover:bg-gray-700 top-2 right-2'>
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

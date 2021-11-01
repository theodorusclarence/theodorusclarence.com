import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { HiClipboard, HiCheckCircle } from 'react-icons/hi';

export function Pre(props) {
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

export default function CustomCode(props) {
  const textRef = React.useRef(null);
  const [isCopied, setIsCopied] = React.useState(false);

  const language = props.className?.includes('language')
    ? props.className.replace('language-', '')
    : null;

  return (
    <code {...props}>
      <span ref={textRef}>{props.children}</span>
      {language && (
        <div className='absolute top-0 px-3 py-1 border-t-0 rounded-b-md border-thin left-6'>
          <span className='font-medium select-none accent'>{language}</span>
        </div>
      )}
      {language && (
        <CopyToClipboard
          text={textRef?.current?.textContent}
          onCopy={() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500);
          }}
        >
          <button className='absolute hidden p-2 text-lg transition-colors rounded md:block border-thin hover:bg-gray-700 top-2 right-2'>
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

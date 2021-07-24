import { useState } from 'react';
import Tippy from '@tippyjs/react';
import CopyToClipboard from 'react-copy-to-clipboard';

export default function CopyableText({ children }) {
  const [copyStatus, setCopyStatus] = useState('Click to Copy');

  return (
    <Tippy
      animation='scale-subtle'
      hideOnClick={false}
      offset={5}
      content={
        <span className='inline-block p-3 bg-white rounded-md shadow-md dark:bg-dark border-thin'>
          {copyStatus}
        </span>
      }
    >
      {/* <button onClick={clickToCopy} className=' focus:outline-none'> */}
      <span>
        <CopyToClipboard
          text={children}
          onCopy={() => {
            setCopyStatus('Copied to clipboard 🥳');
            setTimeout(() => setCopyStatus('Click to Copy'), 1500);
          }}
        >
          <span className='cursor-pointer accent'>{children}</span>
        </CopyToClipboard>
      </span>
      {/* </button> */}
    </Tippy>
  );
}

import Tippy from '@tippyjs/react';
import { useState } from 'react';

export default function CopyableText({ children }) {
    const [copyStatus, setCopyStatus] = useState('Click to Copy');

    const clickToCopy = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(children);
        setCopyStatus('Copied to clipboard');
        setTimeout(() => setCopyStatus('Click to Copy'), 1500);
    };
    return (
        <Tippy
            animation='scale-subtle'
            hideOnClick={false}
            offset={5}
            content={
                <span className='inline-block p-2 bg-white rounded-md shadow-md dark:bg-dark border-thin'>
                    {copyStatus}
                </span>
            }
        >
            {/* <button onClick={clickToCopy} className=' focus:outline-none'> */}
            <span onClick={clickToCopy} className='cursor-pointer accent'>
                {children}
            </span>
            {/* </button> */}
        </Tippy>
    );
}

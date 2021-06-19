import { useState } from 'react';
import Tippy from '@tippyjs/react';
import { FiMail } from 'react-icons/fi';
import { SiGithub, SiLinkedin } from 'react-icons/si';

import UnstyledLink from './UnstyledLink';
import SpotifyPlaying from './SpotifyPlaying';

export default function Footer() {
  const [copyStatus, setCopyStatus] = useState('Click again to copy');

  const clickToCopy = () => {
    navigator.clipboard.writeText('theodorusclarence@gmail.com');
    setCopyStatus('Copied to clipboard');
    setTimeout(() => setCopyStatus('Click again to copy'), 1500);
  };

  return (
    <footer className='pb-2 mt-auto'>
      <main className='flex flex-col items-center pt-6 border-t-thin dark:border-gray-600 layout'>
        <p className='mb-1 font-medium'>Reach me out</p>
        <div className='flex mb-4 space-x-4'>
          <Tippy
            animation='scale-subtle'
            interactive={true}
            hideOnClick={false}
            className='focus:outline-none'
            content={
              <span className='inline-flex flex-col items-center p-2 bg-white rounded-md shadow-md dark:bg-dark border-thin'>
                {/* <button onClick={clickToCopy} className='focus:outline-none'> */}
                {copyStatus}
                <span className='inline-block font-medium accent ring-0'>
                  theodorusclarence@gmail.com
                </span>
                {/* </button> */}
              </span>
            }
          >
            <button className='rounded-sm ring-vis' onClick={clickToCopy}>
              <FiMail className='align-middle text-dark dark:text-light hover:text-accent-200 dark:hover:text-accent-200 w-7 h-7' />
            </button>
          </Tippy>
          <UnstyledLink
            className='inline-flex items-center justify-center rounded-sm ring-vis'
            href='https://clarence.link/github'
          >
            <SiGithub className='w-6 h-6 my-auto align-middle text-dark dark:text-light hover:text-accent-200 dark:hover:text-accent-200' />
          </UnstyledLink>
          <UnstyledLink
            className='inline-flex items-center justify-center rounded-sm ring-vis'
            href='https://clarence.link/linkedin'
          >
            <SiLinkedin className='w-6 h-6 my-auto align-middle text-dark dark:text-light hover:text-accent-200 dark:hover:text-accent-200' />
          </UnstyledLink>
        </div>
        <SpotifyPlaying />
        <p className='mt-4 text-xs font-dark '>
          © Theodorus Clarence {new Date().getFullYear()}
        </p>
      </main>
    </footer>
  );
}

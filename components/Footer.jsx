import { useState } from 'react';
import Tippy from '@tippyjs/react';
import { FiMail } from 'react-icons/fi';
import { SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si';
import CopyToClipboard from 'react-copy-to-clipboard';

import UnstyledLink from './UnstyledLink';
import CustomLink from './CustomLink';
import SpotifyPlaying from './SpotifyPlaying';

export default function Footer() {
  const [copyStatus, setCopyStatus] = useState('Click the mail logo to copy');

  return (
    <footer className='pb-2 mt-auto'>
      <main className='flex flex-col items-center pt-6 border-t-thin dark:border-gray-600 layout'>
        <FooterLinks />
        <p className='mt-8 font-medium'>Reach me out</p>
        <div className='flex mt-2 space-x-4'>
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
            <div className='flex items-center justify-center'>
              <CopyToClipboard
                text='theodorusclarence@gmail.com'
                onCopy={() => {
                  setCopyStatus('Copied to clipboard 🥳');
                  setTimeout(
                    () => setCopyStatus('Click the mail logo to copy'),
                    1500
                  );
                }}
              >
                <button className='rounded-sm ring-vis'>
                  <FiMail className='align-middle text-dark dark:text-light hover:text-accent-200 dark:hover:text-accent-200 w-7 h-7' />
                </button>
              </CopyToClipboard>
            </div>
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
          <UnstyledLink
            className='inline-flex items-center justify-center rounded-sm ring-vis'
            href='https://clarence.link/twt'
          >
            <SiTwitter className='w-6 h-6 my-auto align-middle text-dark dark:text-light hover:text-accent-200 dark:hover:text-accent-200' />
          </UnstyledLink>
        </div>
        <SpotifyPlaying />
        <p className='mt-8 text-xs font-dark '>
          © Theodorus Clarence {new Date().getFullYear()}
        </p>
      </main>
    </footer>
  );
}

function FooterLinks() {
  return (
    <div className='grid justify-center w-full grid-cols-2 gap-2 sm:gap-8 justify-items-start sm:flex'>
      {footerLinks.map(({ href, text }) => (
        <UnstyledLink
          key={href}
          className='text-sm font-medium rounded-sm view dark:text-gray-200 animated-underline ring-vis'
          href={href}
        >
          {text}
        </UnstyledLink>
      ))}
    </div>
  );
}

const footerLinks = [
  {
    href: '/projects/side-projects',
    text: 'Side Projects',
  },
  {
    href: 'https://clarence.link/booknotes',
    text: 'Booknotes',
  },
  {
    href: 'https://pw.theodorusclarence.com',
    text: 'Polywork',
  },
  {
    href: 'https://clarence.link/starters',
    text: 'Starter Templates',
  },
];

import clsx from 'clsx';
import { useState } from 'react';
import Tippy from '@tippyjs/react';
import { FiMail } from 'react-icons/fi';
import { SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si';
import CopyToClipboard from 'react-copy-to-clipboard';

import UnstyledLink from './UnstyledLink';
import SpotifyPlaying from './SpotifyPlaying';

import { trackEvent } from '@/utils/analytics';

export default function Footer({ large = false }) {
  const [copyStatus, setCopyStatus] = useState('Click the mail logo to copy');

  return (
    <footer className='pb-2 mt-auto'>
      <main
        className={clsx(
          'flex flex-col items-center pt-6 border-t-thin dark:border-gray-600 layout',
          {
            'lg:max-w-[68rem]': large,
          }
        )}
      >
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
                {copyStatus}
                <span className='inline-block font-medium accent ring-0'>
                  theodorusclarence@gmail.com
                </span>
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
          {socials.map((social) => (
            <UnstyledLink
              key={social.text}
              className='inline-flex items-center justify-center rounded-sm ring-vis'
              href={social.href}
              onClick={() => {
                trackEvent(`Footer Link: ${social.text}`, 'link');
              }}
            >
              <social.icon className='w-6 h-6 my-auto align-middle text-dark dark:text-light hover:text-accent-200 dark:hover:text-accent-200' />
            </UnstyledLink>
          ))}
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
          onClick={() => {
            trackEvent(`Footer Link: ${text}`, 'link');
          }}
        >
          {text}
        </UnstyledLink>
      ))}
    </div>
  );
}

const footerLinks = [
  {
    href: 'https://clarence.link/docs',
    text: 'Docs',
  },
  {
    href: 'https://clarence.link/booknotes',
    text: 'Book Notes',
  },
  {
    href: 'https://pw.theodorusclarence.com',
    text: 'Polywork',
  },
  {
    href: 'https://clarence.link/starters',
    text: 'Starter Templates',
  },
  {
    href: 'https://clarence.link/um',
    text: 'Statistics',
  },
];

const socials = [
  {
    href: 'https://clarence.link/github',
    icon: SiGithub,
    text: 'Github',
  },
  {
    href: 'https://clarence.link/linkedin',
    icon: SiLinkedin,
    text: 'Linkedin',
  },
  {
    href: 'https://clarence.link/twt',
    icon: SiTwitter,
    text: 'Twitter',
  },
];

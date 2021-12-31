import * as React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FiMail } from 'react-icons/fi';
import { SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si';
import { Tooltip as TooltipTippy } from 'react-tippy';

import { trackEvent } from '@/lib/analytics';

import Accent from '@/components/Accent';
import Spotify from '@/components/layout/Spotify';
import UnstyledLink from '@/components/links/UnstyledLink';
import Tooltip from '@/components/Tooltip';

import { spotifyFlag } from '@/constants/env';

export default function Footer() {
  return (
    <footer className='pb-2 mt-4'>
      <main className='layout flex flex-col items-center pt-6 border-t dark:border-gray-600'>
        <FooterLinks />

        {spotifyFlag && <Spotify className='mt-8' />}

        <p className='mt-12 font-medium text-gray-600 dark:text-gray-300'>
          Reach me out
        </p>
        <SocialLinks />

        <p className='mt-8 text-sm text-gray-600 dark:text-gray-300'>
          © Theodorus Clarence {new Date().getFullYear()}
        </p>
      </main>
    </footer>
  );
}

function FooterLinks() {
  return (
    <div className='flex flex-wrap gap-y-4 gap-x-8 justify-center'>
      {footerLinks.map(({ href, text }) => (
        <UnstyledLink
          key={href}
          className='animated-underline text-sm font-medium rounded-sm dark:text-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
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

function SocialLinks() {
  const [copyStatus, setCopyStatus] = React.useState(
    'Click the mail logo to copy'
  );

  return (
    <div className='flex mt-2 space-x-4'>
      <div className='flex justify-center items-center'>
        <TooltipTippy
          trigger='mouseenter'
          hideOnClick={false}
          interactive
          html={
            <div className='inline-block p-2 text-gray-600 bg-white rounded-md border shadow-md dark:bg-dark dark:text-gray-200 dark:border-gray-600'>
              {copyStatus}
              <Accent className='inline-block font-medium'>
                me@theodorusclarence.com
              </Accent>
            </div>
          }
        >
          <CopyToClipboard
            text='me@theodorusclarence.com'
            onCopy={() => {
              setCopyStatus('Copied to clipboard 🥳');
              setTimeout(
                () => setCopyStatus('Click the mail logo to copy'),
                1500
              );
            }}
          >
            <button className='align-middle rounded-sm focus:outline-none focus-visible:ring focus-visible:ring-primary-300'>
              <FiMail className='w-7 h-7 text-gray-600 align-middle dark:hover:text-primary-300 dark:text-gray-300 hover:text-primary-300' />
            </button>
          </CopyToClipboard>
        </TooltipTippy>
      </div>
      {socials.map((social) => (
        <Tooltip
          interactive={false}
          key={social.href}
          withUnderline
          content={social.text}
        >
          <UnstyledLink
            className='inline-flex justify-center items-center rounded-sm focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
            href={social.href}
            onClick={() => {
              trackEvent(`Footer Link: ${social.text}`, 'link');
            }}
          >
            <social.icon className='my-auto w-6 h-6 text-gray-600 align-middle transition-colors dark:hover:text-primary-300 dark:text-gray-300 hover:text-primary-300' />
          </UnstyledLink>
        </Tooltip>
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
    href: 'https://clarence.link/starters',
    text: 'Starter Templates',
  },
  {
    href: 'https://clarence.link/um',
    text: 'Analytics',
  },
  {
    href: '/statistics',
    text: 'Statistics',
  },
  {
    href: '/guestbook',
    text: 'Guestbook',
  },
  {
    href: '/subscribe',
    text: 'Subscribe',
  },
  {
    href: 'https://theodorusclarence.com/rss.xml',
    text: 'RSS',
  },
];

const socials = [
  {
    href: 'https://clarence.link/github',
    icon: SiGithub,
    text: (
      <>
        See my projects on <Accent>Github</Accent>
      </>
    ),
  },
  {
    href: 'https://clarence.link/linkedin',
    icon: SiLinkedin,
    text: (
      <>
        Find me on <Accent>Linkedin</Accent>
      </>
    ),
  },
  {
    href: 'https://clarence.link/twt',
    icon: SiTwitter,
    text: (
      <>
        I post updates, tips, insight, and sometimes do some talk. Follow me on{' '}
        <Accent>Twitter</Accent>!
      </>
    ),
  },
];

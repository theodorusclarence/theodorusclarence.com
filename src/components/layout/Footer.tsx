import * as React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FiMail } from 'react-icons/fi';
import { SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si';
import { Tooltip } from 'react-tippy';

import { trackEvent } from '@/lib/analytics';

import Accent from '@/components/Accent';
import Spotify from '@/components/layout/Spotify';
import UnstyledLink from '@/components/links/UnstyledLink';

import { spotifyFlag } from '@/constants/env';

export default function Footer() {
  return (
    <footer className='pb-2 mt-4'>
      <main className='flex flex-col items-center pt-6 border-t dark:border-gray-600 layout'>
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
    <div className='flex flex-wrap justify-center gap-x-8 gap-y-4'>
      {footerLinks.map(({ href, text }) => (
        <UnstyledLink
          key={href}
          className='text-sm font-medium rounded-sm dark:text-gray-200 animated-underline focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
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
      <div className='flex items-center justify-center'>
        <Tooltip
          trigger='mouseenter'
          hideOnClick={false}
          interactive
          html={
            <div className='inline-block p-2 text-gray-600 bg-white border rounded-md shadow-md dark:text-gray-200 dark:border-gray-600 dark:bg-dark'>
              {copyStatus}
              <Accent className='inline-block font-medium'>
                theodorusclarence@gmail.com
              </Accent>
            </div>
          }
        >
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
            <button className='align-middle rounded-sm focus:outline-none focus-visible:ring focus-visible:ring-primary-300'>
              <FiMail className='text-gray-600 align-middle dark:text-gray-300 hover:text-primary-300 dark:hover:text-primary-300 w-7 h-7' />
            </button>
          </CopyToClipboard>
        </Tooltip>
      </div>
      {socials.map((social) => (
        <UnstyledLink
          key={social.text}
          className='inline-flex items-center justify-center rounded-sm focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
          href={social.href}
          onClick={() => {
            trackEvent(`Footer Link: ${social.text}`, 'link');
          }}
        >
          <social.icon className='w-6 h-6 my-auto text-gray-600 align-middle transition-colors dark:text-gray-300 hover:text-primary-300 dark:hover:text-primary-300' />
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

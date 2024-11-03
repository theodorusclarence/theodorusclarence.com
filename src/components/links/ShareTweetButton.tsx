import clsx from 'clsx';
import * as React from 'react';
import { SiX } from 'react-icons/si';

import ButtonLink, { ButtonLinkProps } from '@/components/links/ButtonLink';

type ShareTweetButtonProps = {
  url: string;
  title: string;
} & Omit<ButtonLinkProps, 'children' | 'href'>;

export default function ShareTweetButton({
  url,
  title,
  className,
  ...rest
}: ShareTweetButtonProps) {
  const text = `I just read an article about ${title} by @th_clarence.`;
  const intentUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(text)}%0A%0A`;

  return (
    <ButtonLink
      {...rest}
      href={intentUrl}
      className={clsx('items-center gap-2', className)}
    >
      <SiX className='text-[1.2em] text-[#1da1f2]' />
      Share this article
    </ButtonLink>
  );
}

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import * as React from 'react';
import { SiSpotify } from 'react-icons/si';
import { Tooltip } from 'react-tippy';

import { getSpotifyNowPlaying } from '@/lib/requests/spotify';

import NextImage from '@/components/images/NextImage';
import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';

export default function Spotify({
  className,
  ...rest
}: Omit<UnstyledLinkProps, 'href' | 'children'>) {
  const { data: spotify } = useQuery({
    queryKey: ['spotify'],
    queryFn: getSpotifyNowPlaying,
  });

  return spotify?.isPlaying ? (
    <figure className={className} data-cy='spotify'>
      <Tooltip
        trigger='mouseenter'
        interactive
        html={
          <div className='inline-block rounded-md border bg-white p-2 text-gray-600 shadow-md dark:border-gray-600 dark:bg-dark dark:text-gray-200'>
            <p>Currently playing on my Spotify</p>
          </div>
        }
      >
        <UnstyledLink
          {...rest}
          href={spotify.songUrl}
          className={clsx(
            'relative flex items-center gap-4 p-3',
            'border dark:border-gray-600',
            'border-thin w-72 rounded-md',
            'shadow-sm dark:shadow-none',
            'focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
          )}
        >
          <NextImage
            useSkeleton
            className='w-16 shadow-sm dark:shadow-none'
            src={spotify.albumImageUrl}
            alt={spotify.album}
            width={640}
            height={640}
            unoptimized
          />
          <div className='flex-1'>
            <p className='text-sm font-medium'>{spotify.title}</p>
            <p className='mt-1 text-xs text-gray-600 dark:text-gray-300'>
              {spotify.artist}
            </p>
          </div>
          <div className='absolute bottom-1.5 right-1.5'>
            <SiSpotify size={20} color='#1ED760' />
          </div>
        </UnstyledLink>
      </Tooltip>
    </figure>
  ) : null;
}

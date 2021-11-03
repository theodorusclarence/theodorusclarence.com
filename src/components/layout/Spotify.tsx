import clsx from 'clsx';
import * as React from 'react';
import { SiSpotify } from 'react-icons/si';
import { Tooltip } from 'react-tippy';
import useSWR from 'swr';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';

import { SpotifyData } from '@/types/spotify';

export default function Spotify({
  className,
  ...rest
}: Omit<UnstyledLinkProps, 'href' | 'children'>) {
  const { data } = useSWR<SpotifyData>('/api/spotify');

  return data?.isPlaying ? (
    <figure className={className}>
      <Tooltip
        trigger='mouseenter'
        interactive
        html={
          <div className='inline-block p-2 text-gray-600 bg-white border rounded-md shadow-md dark:text-gray-200 dark:border-gray-600 dark:bg-dark'>
            <p>Currently playing on my Spotify</p>
          </div>
        }
      >
        <UnstyledLink
          {...rest}
          href={data.songUrl}
          className={clsx(
            'relative flex items-center p-3 gap-4',
            'border dark:border-gray-600',
            'rounded-md border-thin w-72',
            'shadow-sm dark:shadow-none',
            'focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
          )}
        >
          <NextImage
            useSkeleton
            className='w-16 shadow-sm dark:shadow-none'
            src={data.albumImageUrl}
            alt={data.album}
            width={640}
            height={640}
          />
          <div className='flex-1'>
            <p className='text-sm font-medium'>{data.title}</p>
            <p className='mt-1 text-xs text-gray-600 dark:text-gray-300'>
              {data.artist}
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

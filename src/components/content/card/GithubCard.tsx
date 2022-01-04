import clsx from 'clsx';
import * as React from 'react';
import { BiGitRepoForked } from 'react-icons/bi';
import { HiOutlineStar } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';
import useSWR from 'swr';

import Accent from '@/components/Accent';
import UnstyledLink from '@/components/links/UnstyledLink';

interface GithubRepo {
  full_name: string;
  description: string;
  forks: number;
  stargazers_count: number;
  html_url: string;
  owner: {
    avatar_url: string;
    login: string;
    html_url: string;
  };
}

type GithubCardProps = {
  repo: string;
} & React.ComponentPropsWithoutRef<'div'>;

export default function GithubCard({ repo, className }: GithubCardProps) {
  const { data: repository, error } = useSWR<GithubRepo>(
    `https://api.github.com/repos/${repo}`
  );

  return !error && repository ? (
    <div className='not-prose'>
      <UnstyledLink
        href={repository.html_url}
        className={clsx(
          'max-w-xl !block',
          'not-prose px-4 py-3',
          'rounded-lg border border-gray-300 dark:border-gray-600',
          'transform-gpu scale-100 hover:scale-[1.02] active:scale-[0.97]',
          'transition duration-100',
          'animate-shadow',
          className
        )}
      >
        <div className='flex gap-2 items-center text-sm md:text-base'>
          <SiGithub className='shrink-0 text-[1.2em] ml-0.5' />
          <Accent className={clsx('font-semibold truncate overflow-ellipsis')}>
            {repository.full_name}
          </Accent>
        </div>
        <p className={clsx('mt-2 text-sm text-gray-700 dark:text-gray-200')}>
          {repository.description}
        </p>
        <div className='flex gap-3 mt-2'>
          <div className='flex gap-1 items-center text-xs'>
            <HiOutlineStar className='shrink-0 text-[1.2em]' />
            <span>{repository.stargazers_count}</span>
          </div>
          <div className='flex gap-1 items-center text-xs'>
            <BiGitRepoForked className='shrink-0 text-[1.2em]' />
            <span>{repository.forks}</span>
          </div>
        </div>
      </UnstyledLink>
    </div>
  ) : (
    <div
      className={clsx(
        'mx-auto max-w-xl !block',
        'not-prose px-4 py-3',
        'rounded-lg border border-gray-300 dark:border-gray-600',
        'bg-gray-300 animate-pulse dark:bg-gray-600',
        'h-[111px] animate-pulse'
      )}
    />
  );
}

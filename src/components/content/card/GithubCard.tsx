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
          '!block max-w-xl',
          'not-prose px-4 py-3',
          'rounded-lg border border-gray-300 dark:border-gray-600',
          'scale-100 transform-gpu hover:scale-[1.02] active:scale-[0.97]',
          'transition duration-100',
          'animate-shadow',
          className
        )}
      >
        <div className='flex items-center gap-2 text-sm md:text-base'>
          <SiGithub className='ml-0.5 shrink-0 text-[1.2em]' />
          <Accent className={clsx('truncate overflow-ellipsis font-semibold')}>
            {repository.full_name}
          </Accent>
        </div>
        <p className={clsx('mt-2 text-sm text-gray-700 dark:text-gray-200')}>
          {repository.description}
        </p>
        <div className='mt-2 flex gap-3'>
          <div className='flex items-center gap-1 text-xs'>
            <HiOutlineStar className='shrink-0 text-[1.2em]' />
            <span>{repository.stargazers_count.toLocaleString()}</span>
          </div>
          <div className='flex items-center gap-1 text-xs'>
            <BiGitRepoForked className='shrink-0 text-[1.2em]' />
            <span>{repository.forks.toLocaleString()}</span>
          </div>
        </div>
      </UnstyledLink>
    </div>
  ) : (
    <div
      className={clsx(
        'mx-auto !block max-w-xl',
        'not-prose px-4 py-3',
        'rounded-lg border border-gray-300 dark:border-gray-600',
        'animate-pulse bg-gray-300 dark:bg-gray-600',
        'h-[111px] animate-pulse'
      )}
    />
  );
}

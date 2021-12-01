import clsx from 'clsx';
import * as React from 'react';
import { GiTechnoHeart } from 'react-icons/gi';

import Accent from '@/components/Accent';
import UnstyledLink from '@/components/links/UnstyledLink';
import TechIcons, { TechListType } from '@/components/TechIcons';

import { InjectedMeta, LibraryFrontmatter } from '@/types/frontmatters';

type LibraryCardProps = {
  snippet: LibraryFrontmatter & InjectedMeta;
} & React.ComponentPropsWithoutRef<'li'>;

export default function LibraryCard({ className, snippet }: LibraryCardProps) {
  return (
    <li
      className={clsx(
        'ring-vis-0 h-full bg-white rounded-md border dark:bg-dark dark:border-gray-600',
        'transform-gpu scale-100 hover:scale-[1.04] active:scale-[0.97]',
        'transition duration-100',
        'animate-shadow',
        className
      )}
    >
      <UnstyledLink
        href={`/library/${snippet.slug}`}
        className='block h-full rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
      >
        <div className='p-4'>
          <h4 className='text-gray-800 dark:text-gray-100'>{snippet.title}</h4>

          <div className='flex gap-3 justify-start items-center mt-1 text-sm font-medium text-gray-600 dark:text-gray-300'>
            <div className='flex gap-1 items-center'>
              <GiTechnoHeart className='inline-block text-base' />
              <Accent>{snippet?.likes ?? '–––'} likes</Accent>
            </div>
            <span>•</span>
            <TechIcons techs={snippet.tags.split(',') as Array<TechListType>} />
          </div>

          <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
            {snippet.description}
          </p>
        </div>
      </UnstyledLink>
    </li>
  );
}

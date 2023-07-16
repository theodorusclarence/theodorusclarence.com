import clsx from 'clsx';
import * as React from 'react';
import { GiTechnoHeart } from 'react-icons/gi';
import { HiOutlineEye } from 'react-icons/hi';

import Accent from '@/components/Accent';
import Tag from '@/components/content/Tag';
import UnstyledLink from '@/components/links/UnstyledLink';

import { InjectedMeta, LibraryFrontmatter } from '@/types/frontmatters';

type ShortsCardProps = {
  short: LibraryFrontmatter & InjectedMeta;
  checkTagged?: (tag: string) => boolean;
} & React.ComponentPropsWithoutRef<'li'>;

export default function ShortsCard({
  className,
  checkTagged,
  short,
}: ShortsCardProps) {
  return (
    <li
      className={clsx([
        'ring-vis-0 h-full rounded-md bg-white dark:bg-dark',
        'border dark:border-gray-600',
        'scale-100 hover:scale-[1.04] active:scale-[0.97] motion-safe:transform-gpu',
        'transition duration-100',
        'motion-reduce:hover:scale-100',
        'animate-shadow',
        className,
      ])}
    >
      <UnstyledLink
        href={`/shorts/${short.slug}`}
        className='block h-full rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
      >
        <div className='p-4'>
          <h4 className='font-semibold tracking-tight text-gray-800 dark:text-gray-100'>
            {short.title}
          </h4>

          <div className='mt-2 flex flex-wrap gap-x-1 gap-y-1 text-sm text-black dark:text-gray-100'>
            {short.tags.split(',').map((tag) => (
              <Tag
                tabIndex={-1}
                className='bg-opacity-80 dark:!bg-opacity-60'
                key={tag}
              >
                {checkTagged?.(tag) ? <Accent>{tag}</Accent> : tag}
              </Tag>
            ))}
          </div>
          <div className='mt-4 flex items-center justify-start gap-3 text-sm font-medium text-gray-600 dark:text-gray-300'>
            <div className='flex items-center gap-1'>
              <HiOutlineEye className='inline-block text-base' />
              <Accent>{short?.views?.toLocaleString() ?? '–––'} views</Accent>
            </div>
            <div className='flex items-center gap-1'>
              <GiTechnoHeart className='inline-block text-base' />
              <Accent>{short?.likes ?? '–––'} likes</Accent>
            </div>
          </div>

          {/* <p className='mt-4 text-sm text-gray-600 dark:text-gray-300'>
            {short.description}
          </p> */}
        </div>
      </UnstyledLink>
    </li>
  );
}

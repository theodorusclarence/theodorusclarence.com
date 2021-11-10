import clsx from 'clsx';
import { format } from 'date-fns';
import * as React from 'react';
import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi';

import Accent from '@/components/Accent';
import Tag from '@/components/content/Tag';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import UnstyledLink from '@/components/links/UnstyledLink';

import { BlogFrontmatter, InjectedMeta } from '@/types/content';

type BlogCardProps = {
  post: BlogFrontmatter & InjectedMeta;
  checkTagged?: (tag: string) => boolean;
} & React.ComponentPropsWithoutRef<'li'>;

export default function BlogCard({
  post,
  className,
  checkTagged,
}: BlogCardProps) {
  return (
    <li
      className={clsx(
        'w-full bg-white rounded-md border dark:border-gray-600 border-gray-300 dark:bg-dark',
        'transform-gpu scale-100 hover:scale-[1.02] active:scale-[0.97]',
        'transition duration-100',
        'animate-shadow',
        className
      )}
    >
      <UnstyledLink
        className='block h-full rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
        href={`/blog/${post.slug}`}
      >
        <div className='relative'>
          <CloudinaryImg
            noStyle
            className='overflow-hidden pointer-events-none rounded-t-md'
            publicId={`theodorusclarence/banner/${post.banner}`}
            alt='Photo taken from unsplash'
            width={1200}
            height={(1200 * 2) / 5}
            aspect={{ height: 2, width: 5 }}
            preview={false}
          />
          <div
            className={clsx(
              'absolute bottom-0 w-full px-4 py-2',
              'flex flex-wrap justify-end mt-2 text-sm text-black gap-x-2 gap-y-1 dark:text-gray-100'
            )}
          >
            {post.tags.split(',').map((tag) => (
              <Tag className='bg-opacity-80 dark:!bg-opacity-60' key={tag}>
                {checkTagged?.(tag) ? <Accent>{tag}</Accent> : tag}
              </Tag>
            ))}
          </div>
        </div>
        <div className='p-4'>
          <h4 className='text-gray-800 dark:text-gray-100'>{post.title}</h4>
          <div className='flex items-center justify-start gap-2 mt-2 text-sm font-medium text-gray-600 dark:text-gray-300'>
            <div className='flex items-center gap-1'>
              <HiOutlineClock className='inline-block text-base' />
              <Accent>{post.readingTime.text}</Accent>
            </div>
            <div className='flex items-center gap-1'>
              <HiOutlineEye className='inline-block text-base' />
              <Accent>{post?.views ?? '–––'} views</Accent>
            </div>
          </div>
          <p className='my-2 text-sm text-gray-600 dark:text-gray-300'>
            <span className='font-bold text-gray-800 dark:text-gray-100'>
              {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
            </span>
          </p>
          <p className='text-sm text-gray-700 dark:text-gray-300'>
            {post.description}
          </p>
        </div>
      </UnstyledLink>
    </li>
  );
}

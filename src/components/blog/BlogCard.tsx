import clsx from 'clsx';
import { format } from 'date-fns';
import * as React from 'react';
import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi';

import CloudinaryImg from '@/components/CloudinaryImg';
import UnstyledLink from '@/components/links/UnstyledLink';

import Accent from '../Accent';

import { BlogFrontmatter } from '@/types/content';

type BlogCardProps = {
  post: BlogFrontmatter;
} & React.ComponentPropsWithoutRef<'li'>;

export default function BlogCard({ post, className }: BlogCardProps) {
  return (
    <li
      className={clsx(
        'w-full bg-white rounded-md card border transition-colors dark:border-gray-600 border-gray-300 dark:bg-dark',
        className
      )}
    >
      <UnstyledLink
        className='block h-full rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
        href={`/blog/${post.slug}`}
      >
        <figure className='h-full overflow-hidden pointer-events-none rounded-t-md'>
          <CloudinaryImg
            publicId={`theodorusclarence/banner/${
              post?.banner ?? 'nextjs-vs-cra_oql54x'
            }`}
            alt='Photo taken from unsplash'
            width={1200}
            height={(1200 * 2) / 5}
            aspect={{ height: 2, width: 5 }}
            preview={false}
          />
          <div className='p-4'>
            <header className='flex justify-between'>
              <h4 className='text-gray-800 dark:text-gray-100'>{post.title}</h4>
            </header>
            <div className='flex items-center justify-start gap-2 mt-2 text-sm font-medium text-gray-600 dark:text-gray-300'>
              <div className='flex items-center gap-1'>
                <HiOutlineClock className='inline-block text-base' />
                <Accent>{post.readingTime.text}</Accent>
              </div>
              <div className='flex items-center gap-1'>
                <HiOutlineEye className='inline-block text-base' />
                <Accent>
                  {/* {post?.views ?? '–––'}  */}
                  10 views
                </Accent>
              </div>
            </div>
            <p className='my-2 text-sm text-gray-600 dark:text-gray-300'>
              <span className='font-bold text-gray-800 dark:text-gray-100'>
                {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
              </span>{' '}
            </p>
            <p className='text-sm text-gray-700 dark:text-gray-300'>
              {post.description}
            </p>
          </div>
        </figure>
      </UnstyledLink>
    </li>
  );
}

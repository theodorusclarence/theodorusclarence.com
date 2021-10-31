import { motion } from 'framer-motion';

import UnstyledLink from './UnstyledLink';

import { classNames, formatDate } from '@/utils/helper';
import CloudinaryImg from './CloudinaryImg';
import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi';

export default function PostCard({ post, className }) {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={classNames(
        'w-full bg-white rounded-md card ring-vis-0 border-thin dark:bg-dark card-2',
        className
      )}
    >
      <UnstyledLink
        className='block h-full rounded-md ring-vis-0'
        href={`/blog/${post.slug}`}
      >
        <figure className='overflow-hidden shadow-md pointer-events-none rounded-t-md dark:shadow-none'>
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
        </figure>
        <div className='p-4'>
          <header className='flex justify-between'>
            <h4 className='text-gray-800 dark:text-gray-100'>
              <span>{post.title}</span>
            </h4>
          </header>
          <p className='mt-1 font-medium component text-dark dark:text-light'>
            <HiOutlineClock className='inline-block mr-1 text-base' />
            <span className='mr-2 accent'>{post.readingTime.text}</span>
            <HiOutlineEye className='inline-block mr-1 text-base' />
            <span className='accent'>{post?.views ?? '–––'} views</span>
          </p>
          <p className='my-2 component text-dark dark:text-light'>
            <span className='font-bold text-gray-800 dark:text-gray-100'>
              {formatDate(post.publishedAt)}
            </span>{' '}
          </p>
          <p className='text-gray-700 component dark:text-gray-300'>
            {post.description}
          </p>
        </div>
      </UnstyledLink>
    </motion.li>
  );
}

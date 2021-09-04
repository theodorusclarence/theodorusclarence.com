import { motion } from 'framer-motion';

import UnstyledLink from './UnstyledLink';

import { formatDate } from '@/utils/helper';

export default function PostCard({ post }) {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className='w-full bg-white rounded-md card ring-vis-0 border-thin dark:bg-dark card-2'
    >
      <UnstyledLink
        className='block p-5 rounded-md ring-vis-0'
        href={`/blog/${post.slug}`}
      >
        <header className='flex justify-between'>
          <h4>
            <span>{post.title}</span>
          </h4>
          <p className='self-center flex-shrink-0 font-medium component text-dark dark:text-light'>
            <span className='accent'>{post?.views ?? '–––'} views</span>
          </p>
        </header>
        <p className='my-2 component text-dark dark:text-light'>
          <span className='font-bold'>{formatDate(post.publishedAt)}</span> •{' '}
          <span className='accent'>{post.readingTime.text}</span>
        </p>
        <p className='component'>{post.description}</p>
      </UnstyledLink>
    </motion.li>
  );
}

import { motion } from 'framer-motion';

import UnstyledLink from './UnstyledLink';

import { checkBlogPrefix, formatDate } from '@/utils/helper';
import useContentMeta from '@/hooks/useContentMeta';

export default function PostCard({ post, index }) {
  const checkedSlug = checkBlogPrefix(post.slug);
  const { isLoading, contentViews } = useContentMeta(`b_${checkedSlug}`);
  const { data: postData } = post;
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      // to remove layoutId from index page to blog page
      // layoutId={index ? null : post.slug}
      className='w-full bg-white rounded-md card ring-vis-0 border-thin dark:bg-dark card-2'
    >
      <UnstyledLink
        className='block p-5 rounded-md ring-vis-0'
        href={`/blog/${post.slug}`}
      >
        <header className='flex justify-between'>
          <h4>
            <span>{postData.title}</span>
          </h4>
          <p className='self-center flex-shrink-0 font-medium component text-dark dark:text-light'>
            <span className='accent'>
              {isLoading ? '–––' : contentViews} views
            </span>
          </p>
        </header>
        <p className='my-2 component text-dark dark:text-light'>
          <span className='font-bold'>{formatDate(postData.publishedAt)}</span>{' '}
          • <span className='accent'>{post.readingTime}</span>
        </p>
        <p className='component'>{postData.description}</p>
      </UnstyledLink>
    </motion.li>
  );
}

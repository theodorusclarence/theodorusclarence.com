import { motion } from 'framer-motion';

import PickTech from './PickTech';
import UnstyledLink from './UnstyledLink';

export default function LibraryCard({ post, slug }) {
  const techArray = post.techs.split(',');
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      layoutId={slug}
      className='h-full bg-white rounded-md card border-thin ring-vis-0 dark:bg-dark'
      style={{ minHeight: '9rem' }}
    >
      <UnstyledLink
        href={`/library/${slug}`}
        className='block h-full p-4 rounded-md ring-vis-0'
      >
        <div>
          <h4>
            <span>{post.title}</span>
          </h4>
          <PickTech techs={techArray} />
          <p className='component'>{post.description}</p>
        </div>
      </UnstyledLink>
    </motion.li>
  );
}

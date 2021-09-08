import { motion } from 'framer-motion';

import PickTech from './PickTech';
import UnstyledLink from './UnstyledLink';

export default function LibraryCard({ snippet }) {
  const techArray = snippet.techs.split(',');

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className='h-full bg-white rounded-md card border-thin ring-vis-0 dark:bg-dark'
      style={{ minHeight: '9rem' }}
    >
      <UnstyledLink
        href={`/library/${snippet.slug}`}
        className='block h-full p-4 rounded-md ring-vis-0'
      >
        <div>
          <header className='flex justify-between'>
            <h4 className='text-gray-800 dark:text-gray-100'>
              <span>{snippet.title}</span>
            </h4>
            <p className='self-center flex-shrink-0 font-medium component text-dark dark:text-light min-w-[8ch] text-right'>
              <span className='accent'>{snippet?.likes ?? '---'} likes</span>
            </p>
          </header>

          <PickTech techs={techArray} />

          <p className='text-gray-700 component dark:text-gray-300'>
            {snippet.description}
          </p>
        </div>
      </UnstyledLink>
    </motion.li>
  );
}

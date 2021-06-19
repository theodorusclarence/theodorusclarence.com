import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { SiGithub, SiYoutube } from 'react-icons/si';

import PickTech from './PickTech';
import UnstyledLink from './UnstyledLink';
import CloudinaryImg from './CloudinaryImg';

export default function ProjectCard({ data }) {
  return (
    <motion.li className='max-w-md rounded-md card project-card md:w-full border-thin ring-vis-0'>
      <UnstyledLink
        href={data.page || data.link || data.youtube || data.github}
        // target='_blank'
        // rel='noopener noreferrer'
        className='block p-5 rounded-md ring-vis-0'
      >
        <header className='flex justify-between'>
          <h4>
            <span>{data.name}</span>
          </h4>
          <div className='flex space-x-2'>
            {data.github && (
              <UnstyledLink
                className='inline-flex items-center justify-center rounded-sm ring-vis'
                href={data.github}
              >
                <SiGithub className='w-5 h-5 align-middle text-dark dark:text-light hover:text-accent-200 dark:hover:text-accent-200' />
              </UnstyledLink>
            )}
            {data.youtube && (
              <UnstyledLink
                className='inline-flex items-center justify-center rounded-sm ring-vis'
                href={data.youtube}
              >
                <SiYoutube className='w-5 h-5 align-middle text-dark dark:text-light hover:text-accent-200 dark:hover:text-accent-200' />
              </UnstyledLink>
            )}
            {data.link && (
              <UnstyledLink
                className='inline-flex items-center justify-center rounded-sm ring-vis'
                href={data.link}
              >
                <FiExternalLink className='w-5 h-5 align-middle text-dark dark:text-light hover:text-accent-200 dark:hover:text-accent-200' />
              </UnstyledLink>
            )}
          </div>
        </header>
        <p className='component'>{data.description}</p>
        <PickTech techs={data.techStack} />
        <div className='w-full shadow-md'>
          <CloudinaryImg
            publicId={data.cloudinaryPublicId}
            width='1440'
            height='792'
            alt={data.name}
          />
        </div>
        {data.page && (
          <p className='inline-block mt-4 font-medium view'>View More →</p>
        )}
      </UnstyledLink>
    </motion.li>
  );
}

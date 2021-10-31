import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { SiGithub, SiYoutube } from 'react-icons/si';

import PickTech from './PickTech';
import UnstyledLink from './UnstyledLink';
import CloudinaryImg from './CloudinaryImg';

export default function ProjectCard({ data }) {
  return (
    <motion.li className='rounded-md card project-card md:w-full border-thin ring-vis-0'>
      <div className='relative flex flex-col h-full p-5 rounded-md ring-vis-0'>
        <header className='flex justify-between'>
          <UnstyledLink
            href={data.page || data.link || data.youtube || data.github}
            className='z-0 after:rounded-md after:absolute after:inset-0 ring-vis-0 project-card-after'
          >
            <h4 className='text-gray-800 dark:text-gray-100'>
              <span>{data.name}</span>
            </h4>
          </UnstyledLink>
          <div className='relative flex space-x-2'>
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
        <p className='mb-auto text-gray-700 component dark:text-gray-300'>
          {data.description}
        </p>
        <PickTech techs={data.techStack} />
        <div className='w-full shadow-md pointer-events-none'>
          <CloudinaryImg
            publicId={data.cloudinaryPublicId}
            width='1440'
            height='792'
            alt={data.name}
          />
        </div>

        <p className='self-start inline-block mt-4 font-medium view'>
          View More →
        </p>
      </div>
    </motion.li>
  );
}

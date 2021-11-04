import clsx from 'clsx';
import * as React from 'react';

import CloudinaryImg from '../CloudinaryImg';
import UnstyledLink from '../links/UnstyledLink';
import TechIcons, { TechListType } from '../TechIcons';

import { ProjectFrontmatter } from '@/types/content';

export default function ProjectCard({
  project,
}: {
  project: ProjectFrontmatter;
}) {
  return (
    <li
      className={clsx(
        'rounded-md card project-card md:w-full',
        'border border-gray-600'
      )}
    >
      <UnstyledLink
        href={`/projects/${project.slug}`}
        className='block h-full p-4 rounded-md group focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
      >
        <h4>{project.title}</h4>
        <p className='mt-1 text-sm text-gray-700 dark:text-gray-300'>
          {project.description}
        </p>
        <div className='mt-2'>
          <TechIcons techs={project.techs.split(',') as Array<TechListType>} />
        </div>

        <CloudinaryImg
          className='mt-3 overflow-hidden shadow-md pointer-events-none dark:shadow-none'
          publicId={`theodorusclarence/${project.banner}`}
          alt={project.title}
          width={1440}
          height={792}
          preview={false}
        />

        <p className='inline-block mt-2 animated-underline'>See more →</p>
      </UnstyledLink>
    </li>
  );
}

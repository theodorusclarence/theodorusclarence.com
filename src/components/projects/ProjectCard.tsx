import clsx from 'clsx';
import * as React from 'react';

import CloudinaryImg from '@/components/CloudinaryImg';
import UnstyledLink from '@/components/links/UnstyledLink';
import TechIcons, { TechListType } from '@/components/TechIcons';

import { ProjectFrontmatter } from '@/types/content';

type ProjectCardProps = {
  project: ProjectFrontmatter;
} & React.ComponentPropsWithoutRef<'li'>;

export default function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <li
      className={clsx(
        'rounded-md project-card md:w-full',
        'border dark:border-gray-600',
        'transform-gpu scale-100 hover:scale-[1.03] active:scale-[0.97]',
        'transition duration-100',
        'animate-shadow',
        className
      )}
    >
      <UnstyledLink
        href={`/projects/${project.slug}`}
        className='block h-full p-4 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
      >
        <h4>{project.title}</h4>
        <p className='text-sm text-gray-700 dark:text-gray-300'>
          {project.description}
        </p>
        <div className='mt-2'>
          <TechIcons techs={project.techs.split(',') as Array<TechListType>} />
        </div>

        <CloudinaryImg
          className='mt-3 pointer-events-none'
          publicId={`theodorusclarence/${project.banner}`}
          alt={project.title}
          width={1440}
          height={792}
          preview={false}
        />

        <p className='inline-block mt-2 font-medium animated-underline'>
          See more →
        </p>
      </UnstyledLink>
    </li>
  );
}

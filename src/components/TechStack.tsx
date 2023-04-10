import clsx from 'clsx';
import * as React from 'react';
import { IoLogoVercel } from 'react-icons/io5';
import {
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

import CustomLink from '@/components/links/CustomLink';
import Tooltip from '@/components/Tooltip';

export default function TechStack() {
  return (
    <div className='flex space-x-2 md:space-x-4'>
      {stacks.map((tech) => (
        <Tooltip key={tech.id} tipChildren={<p>{tech.tooltip}</p>}>
          <tech.icon
            key={tech.id}
            className={clsx(
              'h-8 w-8 md:h-10 md:w-10',
              'text-gray-600 hover:text-primary-300 dark:text-gray-200 dark:hover:text-primary-300',
              'transition-colors'
            )}
          />
        </Tooltip>
      ))}
    </div>
  );
}

const stacks = [
  {
    id: 'nextjs',
    icon: SiNextdotjs,
    tooltip: (
      <>
        <CustomLink href='https://nextjs.org'>Next.js</CustomLink>, currently my
        go-to framework because of the static generation, dynamic paths, and
        built-in api.
      </>
    ),
  },
  {
    id: 'react',
    icon: SiReact,
    tooltip: (
      <>
        <CustomLink href='https://reactjs.org/'>Create React App</CustomLink>,
        first frontend framework that I learned, great if you are making an
        authenticated website.
      </>
    ),
  },
  {
    id: 'typescript',
    icon: SiTypescript,
    tooltip: (
      <>
        <CustomLink href='https://www.typescriptlang.org/'>
          TypeScript
        </CustomLink>
        , finally jumping on this one, I love the experience! Check out my{' '}
        <CustomLink href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter'>
          starter template
        </CustomLink>{' '}
        using Next.js, Tailwind CSS, and TypeScript
      </>
    ),
  },
  {
    id: 'tailwind',
    icon: SiTailwindcss,
    tooltip: (
      <>
        <CustomLink href='https://tailwindcss.com/'>Tailwind CSS</CustomLink> is
        awesome, I have never achieved this much reusability. Make sure you get
        the{' '}
        <CustomLink href='https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss'>
          extension
        </CustomLink>
        .
      </>
    ),
  },
  {
    id: 'vercel',
    icon: IoLogoVercel,
    tooltip: (
      <>
        <CustomLink href='https://swr.vercel.app/'>SWR by Vercel</CustomLink>,
        great react hooks for data fetching and caching, the{' '}
        <CustomLink href='https://swr.vercel.app/docs/revalidation#revalidate-on-focus'>
          revalidate on focus
        </CustomLink>{' '}
        is unreal. react-query is also a great alternative to this.
      </>
    ),
  },
  {
    id: 'node',
    icon: SiNodedotjs,
    tooltip: (
      <>
        <CustomLink href='https://nodejs.org/'>Node.js</CustomLink>, simple
        backend language so you don't need to learn another language. Not using
        this too often because Next.js already has a backend built-in.
      </>
    ),
  },
];

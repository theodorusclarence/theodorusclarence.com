import clsx from 'clsx';
import * as React from 'react';
import {
  SiAmazonaws,
  SiGit,
  SiGithub,
  SiGraphql,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
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
// TODO: change out links and tooltips
const stacks = [
  {
    id: 'javascript',
    icon: SiJavascript,
    tooltip: (
      <>
        <CustomLink href='https://www.javascript.com/'>JavaScript</CustomLink>,
        everyone's web developer's first love.
      </>
    ),
  },
  {
    id: 'nextjs',
    icon: SiNextdotjs,
    tooltip: (
      <>
        <CustomLink href='https://nextjs.org'>Next.js</CustomLink>, currently my
        go-to framework because of the static generation, dynamic paths, and
        built-in API. <em>ps: this site was built on it.</em>
      </>
    ),
  },
  {
    id: 'nodejs',
    icon: SiNodedotjs,
    tooltip: (
      <>
        <CustomLink href='https://nodejs.org/'>Node.js</CustomLink>, whatever
        you can do on the frontend, you can do on the backend (or so they say).
      </>
    ),
  },
  {
    id: 'react',
    icon: SiReact,
    tooltip: (
      <>
        <CustomLink href='https://reactjs.org/'>React</CustomLink>, underlying
        library of Next.js. It's the only time I'll say it: I love slugs!
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
        , for those who like law and order with their JavaScript.
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
    id: 'python',
    icon: SiPython,
    tooltip: (
      <>
        <CustomLink href='https://www.python.org/'>Python</CustomLink>, my
        favored backend language. I don't even like snakes but here we are.
      </>
    ),
  },
  {
    id: 'aws',
    icon: SiAmazonaws,
    tooltip: (
      <>
        <CustomLink href='https://aws.amazon.com/'>
          Amazon Web Services
        </CustomLink>
        , currently my preferred serverless ecosystem. They offer so much!
      </>
    ),
  },
  {
    id: 'graphql',
    icon: SiGraphql,
    tooltip: (
      <>
        <CustomLink href='https://graphql.org/'>GraphQL</CustomLink>, one of the
        best data query and manipulation languages to use. I love the way it
        pulls declaritive contracts and data fetching into a single layer!
      </>
    ),
  },
  {
    id: 'postgresql',
    icon: SiPostgresql,
    tooltip: (
      <>
        <CustomLink href='https://www.postgresql.org/'>PostgresSQL</CustomLink>,
        my go-to database management system.
      </>
    ),
  },
  {
    id: 'git',
    icon: SiGit,
    tooltip: (
      <>
        <CustomLink href='https://www.git-scm.com/'>Git</CustomLink>, if you
        don't have version control, you're living on the edge!
      </>
    ),
  },
  {
    id: 'github',
    icon: SiGithub,
    tooltip: (
      <>
        <CustomLink href='https://github.com/'>GitHub</CustomLink>, "Git is the
        filing system, GitHub is the best file cabinet", as my grandmother
        always used to say.
      </>
    ),
  },
];

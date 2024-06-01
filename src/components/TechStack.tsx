import clsx from 'clsx';
import * as React from 'react';
import {
  SiAmazonaws,
  SiGit,
  SiGithub,
  SiGraphql,
  SiJavascript,
  SiNextdotjs,
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
        <CustomLink href='https://nextjs.org'>Next.js</CustomLink>, currently my
        go-to framework because of the static generation, dynamic paths, and
        built-in API. <em>ps: I like pages folder better than the new one.</em>
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
        built-in API. <em>ps: I like pages folder better than the new one.</em>
      </>
    ),
  },
  {
    id: 'react',
    icon: SiReact,
    tooltip: (
      <>
        <CustomLink href='https://reactjs.org/'>React</CustomLink>, underlying
        library of Next.js. I love the declarative approach and the ecosystem.
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
        , can't live without it! Check out my{' '}
        <CustomLink href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter'>
          starter template
        </CustomLink>{' '}
        using Next.js, Tailwind CSS, and TypeScript.
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
        <CustomLink href='https://www.prisma.io/?via=clarence'>
          Python
        </CustomLink>
        , great and simple ORM. A little bit of documentation and you're good to
        go.
      </>
    ),
  },
  {
    id: 'aws',
    icon: SiAmazonaws,
    tooltip: (
      <>
        <CustomLink href='https://www.prisma.io/?via=clarence'>
          Python
        </CustomLink>
        , great and simple ORM. A little bit of documentation and you're good to
        go.
      </>
    ),
  },
  {
    id: 'graphql',
    icon: SiGraphql,
    tooltip: (
      <>
        <CustomLink href='https://www.prisma.io/?via=clarence'>
          Python
        </CustomLink>
        , great and simple ORM. A little bit of documentation and you're good to
        go.
      </>
    ),
  },
  {
    id: 'postgresql',
    icon: SiPostgresql,
    tooltip: (
      <>
        <CustomLink href='https://www.prisma.io/?via=clarence'>
          Python
        </CustomLink>
        , great and simple ORM. A little bit of documentation and you're good to
        go.
      </>
    ),
  },
  {
    id: 'git',
    icon: SiGit,
    tooltip: (
      <>
        <CustomLink href='https://www.prisma.io/?via=clarence'>
          Python
        </CustomLink>
        , great and simple ORM. A little bit of documentation and you're good to
        go.
      </>
    ),
  },
  {
    id: 'github',
    icon: SiGithub,
    tooltip: (
      <>
        <CustomLink href='https://www.prisma.io/?via=clarence'>
          Python
        </CustomLink>
        , great and simple ORM. A little bit of documentation and you're good to
        go.
      </>
    ),
  },
];

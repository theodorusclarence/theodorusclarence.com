import Tippy from '@tippyjs/react';
import { motion } from 'framer-motion';
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiFirebase,
  SiTypescript,
} from 'react-icons/si';
import { IoLogoVercel } from 'react-icons/io5';

import { fadeInAndUp } from '@/utils/FramerAnimation';
import { currentTechStack } from '@/data/featured';

import CustomLink from './CustomLink';

const techObject = {
  nextjs: [
    () => (
      <>
        <CustomLink href='https://nextjs.org'>Next.js</CustomLink>, currently my
        go-to framework because of the static generation, dynamic paths, and
        built-in api.
      </>
    ),
    () => (
      <SiNextdotjs className='w-10 h-10 text-dark dark:text-light dark:hover:text-accent-200 hover:text-accent-200 md:w-12 md:h-12' />
    ),
  ],
  react: [
    () => (
      <>
        <CustomLink href='https://reactjs.org/'>Create React App</CustomLink>,
        first frontend framework that I learned, great if you are making an
        authenticated website.
      </>
    ),
    () => (
      <SiReact className='w-10 h-10 text-dark dark:text-light dark:hover:text-accent-200 hover:text-accent-200 md:w-12 md:h-12' />
    ),
  ],
  typescript: [
    () => (
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
    () => (
      <SiTypescript className='w-10 h-10 text-dark dark:text-light dark:hover:text-accent-200 hover:text-accent-200 md:w-12 md:h-12' />
    ),
  ],
  tailwindcss: [
    () => (
      <>
        <CustomLink href='https://tailwindcss.com/'>Tailwind CSS</CustomLink>, I
        recently converted my styling from SCSS to Tailwind CSS, a great
        decision. Make sure you get the{' '}
        <CustomLink href='https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss'>
          extension
        </CustomLink>
        .
      </>
    ),
    () => (
      <SiTailwindcss className='w-10 h-10 text-dark dark:text-light dark:hover:text-accent-200 hover:text-accent-200 md:w-12 md:h-12' />
    ),
  ],
  nodejs: [
    () => (
      <>
        <CustomLink href='https://nodejs.org/'>Node.js</CustomLink>, simple
        backend language so you don't need to learn another language. Not using
        this too often because Next.js already has a backend built-in.
      </>
    ),
    () => (
      <SiNodedotjs className='w-10 h-10 text-dark dark:text-light dark:hover:text-accent-200 hover:text-accent-200 md:w-12 md:h-12' />
    ),
  ],
  swr: [
    () => (
      <>
        <CustomLink href='https://swr.vercel.app/'>SWR by Vercel</CustomLink>,
        great react hooks for data fetching and caching, the{' '}
        <CustomLink href='https://swr.vercel.app/docs/revalidation#revalidate-on-focus'>
          revalidate on focus
        </CustomLink>{' '}
        is unreal. react-query is also a great alternative to this.
      </>
    ),
    () => (
      <IoLogoVercel className='w-10 h-10 text-dark dark:text-light dark:hover:text-accent-200 hover:text-accent-200 md:w-12 md:h-12' />
    ),
  ],
  firebase: [
    () => (
      <>
        <CustomLink href='https://firebase.google.com/'>Firebase</CustomLink>, a
        great backend as a service. I just got comfortable with it, and it is
        awesome. Combine it with Next.js API, you don't even need to make a
        backend app
      </>
    ),
    () => (
      <SiFirebase className='w-10 h-10 text-dark dark:text-light dark:hover:text-accent-200 hover:text-accent-200 md:w-12 md:h-12' />
    ),
  ],
};

export default function TechStack() {
  return (
    <motion.div
      className='flex mt-2 space-x-2 md:space-x-4'
      variants={fadeInAndUp}
    >
      {currentTechStack.map((tech, index) => (
        <Tippy
          key={index}
          animation='scale-subtle'
          interactive={true}
          content={
            <span className='inline-block p-2 bg-white rounded-md shadow-md dark:bg-dark border-thin'>
              {techObject[tech][0]()}
            </span>
          }
        >
          <motion.button className='rounded-sm md:w-12 ring-vis'>
            {techObject[tech][1]()}
          </motion.button>
        </Tippy>
      ))}
    </motion.div>
  );
}

import Tippy from '@tippyjs/react';
import {
  SiNextDotJs,
  SiMongodb,
  SiSass,
  SiReact,
  SiTailwindcss,
  SiNodeDotJs,
  SiMarkdown,
  SiJavascript,
  SiPrettier,
  SiGoogleanalytics,
  SiFirebase,
  SiRedux,
  SiGit,
} from 'react-icons/si';
import { IoLogoVercel } from 'react-icons/io5';

const techSpan = {
  nextjs: [
    'Next.js',
    () => <SiNextDotJs className='w-6 h-6 text-dark dark:text-light' />,
  ],
  react: [
    'Create React App',
    () => <SiReact className='w-6 h-6 text-dark dark:text-light' />,
  ],
  tailwindcss: [
    'Tailwindcss',
    () => <SiTailwindcss className='w-6 h-6 text-dark dark:text-light' />,
  ],
  scss: [
    'SCSS',
    () => <SiSass className='w-6 h-6 text-dark dark:text-light' />,
  ],
  js: [
    'Vanilla JavaScript',
    () => <SiJavascript className='w-6 h-6 text-dark dark:text-light' />,
  ],
  nodejs: [
    'Node.js',
    () => <SiNodeDotJs className='w-6 h-6 text-dark dark:text-light' />,
  ],
  firebase: [
    'Firebase',
    () => <SiFirebase className='w-6 h-6 text-dark dark:text-light' />,
  ],
  mongodb: [
    'MongoDB',
    () => <SiMongodb className='w-6 h-6 text-dark dark:text-light' />,
  ],
  swr: [
    'SWR',
    () => <IoLogoVercel className='w-6 h-6 text-dark dark:text-light' />,
  ],
  redux: [
    'Redux',
    () => <SiRedux className='w-6 h-6 text-dark dark:text-light' />,
  ],
  mdx: [
    'MDX',
    () => <SiMarkdown className='w-6 h-6 text-dark dark:text-light' />,
  ],
  prettier: [
    'Prettier',
    () => <SiPrettier className='w-6 h-6 text-dark dark:text-light' />,
  ],
  analytics: [
    'Google Analytics',
    () => <SiGoogleanalytics className='w-6 h-6 text-dark dark:text-light' />,
  ],
  git: ['Git', () => <SiGit className='w-6 h-6 text-dark dark:text-light' />],
  winner: [
    'Won a Hackathon',
    () => (
      <span
        style={{ backgroundColor: '#F3BF1E' }}
        className='px-2 py-1 text-xs tracking-wide uppercase rounded text-dark'
      >
        Winner
      </span>
    ),
  ],
};

/**
 * Pick tech stack
 *
 * @param {string[]} techs Techs
 */
export default function PickTech({ techs }) {
  return (
    <div className='flex mt-3 mb-5 space-x-2'>
      {techs.map((tech, index) => (
        <Tippy
          key={index}
          animation='scale-subtle'
          interactive={true}
          content={
            <span className='inline-block p-2 bg-white rounded-md shadow-md dark:bg-dark border-thin'>
              {techSpan[tech][0]}
            </span>
          }
        >
          <div
            className='relative'
            style={tech === 'winner' ? { marginLeft: 'auto' } : null}
          >
            {techSpan[tech][1]()}
          </div>
        </Tippy>
      ))}
    </div>
  );
}

import Tippy from '@tippyjs/react';
import { IconContext } from 'react-icons/lib';
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
} from 'react-icons/si';

import { IoLogoVercel } from 'react-icons/io5';

const techSpan = {
    nextjs: ['Next.js', () => <SiNextDotJs />],
    react: ['Create React App', () => <SiReact />],
    tailwindcss: ['Tailwindcss', () => <SiTailwindcss />],
    scss: ['SCSS', () => <SiSass />],
    js: ['Vanilla JavaScript', () => <SiJavascript />],
    nodejs: ['Node.js', () => <SiNodeDotJs />],
    firebase: ['Firebase', () => <SiFirebase />],
    mongodb: ['MongoDB', () => <SiMongodb />],
    swr: ['SWR', () => <IoLogoVercel />],
    redux: ['Redux', () => <SiRedux />],
    mdx: ['MDX', () => <SiMarkdown />],
    prettier: ['Prettier', () => <SiPrettier />],
    analytics: ['Google Analytics', () => <SiGoogleanalytics />],
};

/**
 * Pick tech stack
 *
 * @param {string[]} techs Techs
 */
export default function PickTech({ techs }) {
    return (
        <div className='flex mt-2 mb-2 space-x-2'>
            <IconContext.Provider
                value={{ className: 'text-dark dark:text-light w-6 h-6' }}
            >
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
                        <div>{techSpan[tech][1]()}</div>
                    </Tippy>
                ))}
            </IconContext.Provider>
        </div>
    );
}

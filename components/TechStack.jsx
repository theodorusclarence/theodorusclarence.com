import { IconContext } from 'react-icons/lib';
import { SiNextDotJs, SiReact, SiTailwindcss, SiNodeDotJs } from 'react-icons/si';
import { IoLogoVercel } from 'react-icons/io5';
import Tippy from '@tippyjs/react';
import CustomLink from './CustomLink';
import { currentTechStack } from '../data/featured';

const techObject = {
    nextjs: [
        () => (
            <>
                <CustomLink href='https://nextjs.org'>Next.js</CustomLink>, currently my go-to
                framework because of the static generation, dynamic paths, and built-in api.
            </>
        ),
        () => <SiNextDotJs />,
    ],
    react: [
        () => (
            <>
                <CustomLink href='https://reactjs.org/'>Create React App</CustomLink>, first
                frontend framework that I learned, great if you are making an authenticated website.
            </>
        ),
        () => <SiReact />,
    ],
    tailwindcss: [
        () => (
            <>
                <CustomLink href='https://tailwindcss.com/'>Tailwindcss</CustomLink>, I recently
                converted my styling from SCSS to tailwindcss, a great decision. Make sure you get
                the{' '}
                <CustomLink href='https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss'>
                    extension
                </CustomLink>
                .
            </>
        ),
        () => <SiTailwindcss />,
    ],
    nodejs: [
        () => (
            <>
                <CustomLink href='https://nodejs.org/'>Node.js</CustomLink>, simple backend language
                so you don't need to learn another language. Not using this too often because
                Next.js already has a backend built-in.
            </>
        ),
        () => <SiNodeDotJs />,
    ],
    swr: [
        () => (
            <>
                <CustomLink href='https://swr.vercel.app/'>SWR by Vercel</CustomLink>, great react
                hooks for data fetching and caching, the{' '}
                <CustomLink href='https://swr.vercel.app/docs/revalidation#revalidate-on-focus'>
                    revalidate on focus
                </CustomLink>{' '}
                is unreal. react-query is also a great alternative to this.
            </>
        ),
        () => <IoLogoVercel />,
    ],
};

export default function TechStack() {
    return (
        <div className='flex mt-2 space-x-4'>
            <IconContext.Provider
                value={{
                    className:
                        'text-dark dark:text-light dark:hover:text-accent-200 hover:text-accent-200 w-12 h-12',
                }}
            >
                {currentTechStack.map((tech) => (
                    <Tippy
                        animation='scale-subtle'
                        interactive={true}
                        content={
                            <span className='inline-block p-2 bg-white rounded-md shadow-md dark:bg-dark border-thin'>
                                {techObject[tech][0]()}
                            </span>
                        }
                    >
                        <div>{techObject[tech][1]()}</div>
                    </Tippy>
                ))}
            </IconContext.Provider>
        </div>
    );
}

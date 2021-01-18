import Tippy from '@tippyjs/react';
import { IconContext } from 'react-icons/lib';
import {
    SiNextDotJs,
    SiMongodb,
    SiSass,
    SiReact,
    SiTailwindcss,
    SiNodeDotJs,
} from 'react-icons/si';

import { IoLogoVercel } from 'react-icons/io5';

/**
 * Pick tech stack
 *
 * @param {string[]} techs Techs
 */
export default function PickTech({ techs }) {
    return (
        <div className='flex mt-2 mb-2 space-x-2'>
            <IconContext.Provider value={{ className: 'text-dark dark:text-light w-6 h-6' }}>
                {techs.find((tech) => tech === 'nextjs') && (
                    <Tippy
                        animation='scale-subtle'
                        interactive={true}
                        content={
                            <span className='inline-block p-2 bg-white rounded-md shadow-md dark:bg-dark border-thin'>
                                NextJS
                            </span>
                        }
                    >
                        <div>
                            <SiNextDotJs />
                        </div>
                    </Tippy>
                )}
                {techs.find((tech) => tech === 'react') && (
                    <Tippy
                        animation='scale-subtle'
                        interactive={true}
                        content={
                            <span className='inline-block p-2 bg-white rounded-md shadow-md dark:bg-dark border-thin'>
                                Create React App
                            </span>
                        }
                    >
                        <div>
                            <SiReact />
                        </div>
                    </Tippy>
                )}
                {techs.find((tech) => tech === 'tailwindcss') && (
                    <Tippy
                        animation='scale-subtle'
                        interactive={true}
                        content={
                            <span className='inline-block p-2 bg-white rounded-md shadow-md dark:bg-dark border-thin'>
                                Tailwindcss
                            </span>
                        }
                    >
                        <div>
                            <SiTailwindcss />
                        </div>
                    </Tippy>
                )}
                {techs.find((tech) => tech === 'scss') && (
                    <Tippy
                        animation='scale-subtle'
                        interactive={true}
                        content={
                            <span className='inline-block p-2 bg-white rounded-md shadow-md dark:bg-dark border-thin'>
                                SCSS
                            </span>
                        }
                    >
                        <div>
                            <SiSass />
                        </div>
                    </Tippy>
                )}
                {techs.find((tech) => tech === 'mongodb') && (
                    <Tippy
                        animation='scale-subtle'
                        interactive={true}
                        content={
                            <span className='inline-block p-2 bg-white rounded-md shadow-md dark:bg-dark border-thin'>
                                MongoDB
                            </span>
                        }
                    >
                        <div>
                            <SiMongodb />
                        </div>
                    </Tippy>
                )}
                {techs.find((tech) => tech === 'nodejs') && (
                    <Tippy
                        animation='scale-subtle'
                        interactive={true}
                        content={
                            <span className='inline-block p-2 bg-white rounded-md shadow-md dark:bg-dark border-thin'>
                                NodeJS
                            </span>
                        }
                    >
                        <div>
                            <SiNodeDotJs />
                        </div>
                    </Tippy>
                )}
                {techs.find((tech) => tech === 'swr') && (
                    <Tippy
                        animation='scale-subtle'
                        interactive={true}
                        content={
                            <span className='inline-block p-2 bg-white rounded-md shadow-md dark:bg-dark border-thin'>
                                SWR
                            </span>
                        }
                    >
                        <div>
                            <IoLogoVercel />
                        </div>
                    </Tippy>
                )}
            </IconContext.Provider>
        </div>
    );
}

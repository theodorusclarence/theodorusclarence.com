import { IconContext } from 'react-icons/lib';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { FiMail } from 'react-icons/fi';
import CustomLink from './CustomLink';
import Tippy from '@tippyjs/react';
import { useState } from 'react';
import SpotifyPlaying from './SpotifyPlaying';

export default function Footer() {
    const [copyStatus, setCopyStatus] = useState('Click to Copy');

    const clickToCopy = () => {
        navigator.clipboard.writeText('theodorusclarence@gmail.com');
        'theodorusclarence@gmail.com'.select();
        setCopyStatus('Copied to clipboard');
        setTimeout(() => setCopyStatus('Click to Copy'), 1500);
    };

    return (
        <footer className='pb-2 mt-auto'>
            <main className='flex flex-col items-center pt-6 border-t-thin layout'>
                <p className='mb-1 font-medium'>Reach me out</p>
                <div className='flex mb-4 space-x-4'>
                    <IconContext.Provider
                        value={{
                            className: 'text-dark hover:text-accent-200 w-7 h-7 align-middle',
                        }}
                    >
                        <Tippy
                            animation='scale-subtle'
                            interactive={true}
                            hideOnClick={false}
                            className='focus:outline-none'
                            content={
                                <span className='inline-flex flex-col items-center p-2 bg-white rounded-md shadow-md border-thin'>
                                    {/* <button onClick={clickToCopy} className='focus:outline-none'> */}
                                    {copyStatus}
                                    <span className='inline-block font-medium accent ring-0'>
                                        theodorusclarence@gmail.com
                                    </span>
                                    {/* </button> */}
                                </span>
                            }
                        >
                            <div onClick={clickToCopy}>
                                <FiMail />
                            </div>
                        </Tippy>
                    </IconContext.Provider>
                    <IconContext.Provider
                        value={{
                            className: 'text-dark hover:text-accent-200 w-6 h-6 align-middle',
                        }}
                    >
                        <CustomLink href='https://github.com/theodorusclarence'>
                            <SiGithub />
                        </CustomLink>
                        <CustomLink href='https://www.linkedin.com/in/theodorus-clarence/'>
                            <SiLinkedin />
                        </CustomLink>
                    </IconContext.Provider>
                </div>
                <SpotifyPlaying />
                <p className='mt-4 text-xs font-dark '>
                    © Theodorus Clarence {new Date().getFullYear()}
                </p>
            </main>
        </footer>
    );
}

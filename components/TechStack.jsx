import { IconContext } from 'react-icons/lib';
import { SiNextDotJs, SiReact, SiTailwindcss, SiNodeDotJs } from 'react-icons/si';

export default function TechStack() {
    return (
        <div className='flex mt-2 space-x-4'>
            <IconContext.Provider
                value={{ className: 'text-black dark:text-green hover:text-accent-200 w-12 h-12' }}
            >
                <div>
                    <SiNextDotJs />
                </div>
                <div>
                    <SiReact />
                </div>
                <div>
                    <SiTailwindcss />
                </div>
                <div>
                    <SiNodeDotJs />
                </div>
            </IconContext.Provider>
        </div>
    );
}

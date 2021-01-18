import { IconContext } from 'react-icons/lib';
import { SiNextDotJs, SiReact, SiTailwindcss, SiNodeDotJs } from 'react-icons/si';

/**
 * Pick tech stack
 *
 * @param {string[]} techs Techs
 */
export default function PickTech({ techs }) {
    return (
        <div className='flex mt-2 mb-2 space-x-2'>
            <IconContext.Provider value={{ className: 'text-dark w-6 h-6' }}>
                {techs.find((tech) => tech === 'nextjs') && (
                    <div>
                        <SiNextDotJs />
                    </div>
                )}
                {techs.find((tech) => tech === 'react') && (
                    <div>
                        <SiReact />
                    </div>
                )}
                {techs.find((tech) => tech === 'tailwindcss') && (
                    <div>
                        <SiTailwindcss />
                    </div>
                )}
                {techs.find((tech) => tech === 'nodejs') && (
                    <div>
                        <SiNodeDotJs />
                    </div>
                )}
            </IconContext.Provider>
        </div>
    );
}

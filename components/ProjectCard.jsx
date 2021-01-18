import { SiGithub } from 'react-icons/si';
import { FiExternalLink } from 'react-icons/fi';
import { IconContext } from 'react-icons/lib';
import Link from 'next/link';
import PickTech from './PickTech';
import Image from 'next/image';
import CustomLink from './CustomLink';
export default function ProjectCard({ data }) {
    return (
        <div className='w-10/12 max-w-xs p-5 transition-shadow rounded-md hover:shadow-md border-thin'>
            <header className='flex justify-between'>
                <h4>Petrolida 2021</h4>
                <div className='flex space-x-2'>
                    <IconContext.Provider
                        value={{
                            className: 'text-dark hover:text-accent-200 w-5 h-5 align-middle',
                        }}
                    >
                        <CustomLink href='https://github'>
                            <SiGithub />
                        </CustomLink>
                        <CustomLink href='https://petrolida.its.ac.id'>
                            <FiExternalLink />
                        </CustomLink>
                    </IconContext.Provider>
                </div>
            </header>
            <p className='component'>This website is used to promote Petrolida 2021 event.</p>
            <PickTech techs={['nextjs', 'tailwindcss']} />

            <div className='w-full shadow-md'>
                <Image
                    width={1400}
                    height={834}
                    layout='responsive'
                    src={`/images/projects/petrolida.jpg`}
                    alt='petrolida'
                />
            </div>
        </div>
    );
}

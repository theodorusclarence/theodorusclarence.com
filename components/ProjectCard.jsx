import { SiGithub } from 'react-icons/si';
import { FiExternalLink } from 'react-icons/fi';
import { IconContext } from 'react-icons/lib';
import PickTech from './PickTech';
import Image from 'next/image';
import CustomLink from './CustomLink';
export default function ProjectCard({ data }) {
    return (
        <div className='max-w-sm p-5 transition-shadow rounded-md md:w-full hover:shadow-md border-thin md:even:ml-4'>
            <header className='flex justify-between'>
                <h4>{data.name}</h4>
                <div className='flex space-x-2'>
                    <IconContext.Provider
                        value={{
                            className:
                                'text-dark dark:text-light hover:text-accent-200 dark:hover:text-accent-200 w-5 h-5 align-middle',
                        }}
                    >
                        {data.github && (
                            <CustomLink href={data.github}>
                                <SiGithub />
                            </CustomLink>
                        )}

                        <CustomLink href={data.link}>
                            <FiExternalLink />
                        </CustomLink>
                    </IconContext.Provider>
                </div>
            </header>
            <p className='component'>{data.description}</p>
            <PickTech techs={data.techStack} />

            <div className='w-full shadow-md'>
                <Image
                    width={1400}
                    height={834}
                    layout='responsive'
                    src={`/images/projects/${data.thumbnail}`}
                    alt='petrolida'
                />
            </div>
        </div>
    );
}

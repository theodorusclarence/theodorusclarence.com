import Image from 'next/image';
import CustomLink from './CustomLink';

export default function ProjectHeader({ data }) {
    return (
        <header className='space-y-2'>
            <h1>{data.name}</h1>
            <p className='text-dark dark:text-light'>
                Category: {data.category || 'Built Solo'}
            </p>
            <p className=''>
                {data.github && (
                    <CustomLink href={data.github}>Repository</CustomLink>
                )}
                {data.github && (data.youtube || data.link) && ' • '}
                {data.youtube && (
                    <CustomLink href={data.youtube}>Video Demo</CustomLink>
                )}
                {data.youtube && data.link && ' • '}
                {data.link && (
                    <CustomLink href={data.link}>Visit Live</CustomLink>
                )}
            </p>
            <figure className='shadow-md dark:shadow-none'>
                <Image
                    className='bg-gray-500 rounded-sm '
                    width={1400}
                    height={834}
                    layout='responsive'
                    src={`/images/projects/${data.thumbnail}`}
                    alt={data.name}
                />
            </figure>
        </header>
    );
}

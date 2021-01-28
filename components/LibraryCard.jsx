import Link from 'next/link';
import PickTech from './PickTech';

export default function LibraryCard({ post, slug }) {
    const techArray = post.techs.split(',');
    return (
        <Link href={`/library/${slug}`}>
            <a className='h-full p-4 transition-shadow duration-100 rounded-md group border-thin active:shadow-none hover:shadow-md ring-vis-0'>
                <div>
                    <h4>{post.title}</h4>
                    <PickTech techs={techArray} />
                    <p className='component'>{post.description}</p>
                </div>
            </a>
        </Link>
    );
}

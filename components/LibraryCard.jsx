import Link from 'next/link';
import PickTech from './PickTech';

export default function LibraryCard({ post, slug }) {
    const techArray = post.techs.split(',');
    return (
        <Link href={`/library/${slug}`}>
            <a className='h-full p-4 rounded-md card group border-thin ring-vis-0'>
                <div>
                    <h4>
                        <span>{post.title}</span>
                    </h4>
                    <PickTech techs={techArray} />
                    <p className='component'>{post.description}</p>
                </div>
            </a>
        </Link>
    );
}

import Link from 'next/link';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { formatDate } from '../utils/helper';

export default function PostCard({ post }) {
    //TODO uncomment this
    // const { data } = useSWR(`/api/${post.slug}`, fetcher);
    const data = { count: 1 };
    const { data: postData } = post;
    return (
        <Link href={`/blog/${post.slug}`}>
            <a className='block w-full p-5 transition-shadow duration-100 rounded-md active:shadow-none hover:shadow-md border-thin'>
                <header className='flex justify-between'>
                    <h4>{postData.title}</h4>
                    <p className='self-center flex-shrink-0 component text-dark'>
                        {data?.count >= 0 ? data.count : '–––'} views
                    </p>
                </header>
                <p className='component text-dark'>{formatDate(postData.publishedAt)}</p>
                <p className='component'>{postData.description}</p>
            </a>
        </Link>
    );
}

import { motion } from 'framer-motion';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { formatDate } from '../utils/helper';

export default function PostCard({ post }) {
    const { data } = useSWR(`/api/${post.slug}`, fetcher);
    const { data: postData } = post;
    return (
        <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            layoutId={post.slug}
            whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
            className='w-full bg-white rounded-md ring-vis-0 border-thin dark:bg-dark'
        >
            <Link href={`/blog/${post.slug}`}>
                <a className='block p-5'>
                    <header className='flex justify-between'>
                        <h4>
                            <span>{postData.title}</span>
                        </h4>
                        <p className='self-center flex-shrink-0 component text-dark dark:text-light'>
                            {data?.count >= 0 ? data.count : '–––'} views
                        </p>
                    </header>
                    <p className='component text-dark dark:text-light'>
                        {formatDate(postData.publishedAt)} • {post.readingTime}
                    </p>
                    <p className='component'>{postData.description}</p>
                </a>
            </Link>
        </motion.li>
    );
}

import { motion } from 'framer-motion';
import Link from 'next/link';
import PickTech from './PickTech';

export default function LibraryCard({ post, slug }) {
    const techArray = post.techs.split(',');
    return (
        <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            layoutId={slug}
            whileHover={{ scale: 1.03, transition: { duration: 0.1 } }}
            className='h-full bg-white rounded-md border-thin ring-vis-0 dark:bg-dark'
            style={{ minHeight: '9rem' }}
        >
            <Link href={`/library/${slug}`}>
                <a className='block p-4'>
                    <div>
                        <h4>
                            <span>{post.title}</span>
                        </h4>
                        <PickTech techs={techArray} />
                        <p className='component'>{post.description}</p>
                    </div>
                </a>
            </Link>
        </motion.li>
    );
}

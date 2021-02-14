import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';
import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import Tippy from '@tippyjs/react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import CustomLink from '@/components/CustomLink';
import { BLOGS_PATH, postFilePaths } from '@/utils/mdxUtils';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeInAndUp, staggerFaster } from '@/utils/FramerAnimation';

const url = 'https://theodorusclarence.com/blog';
const title = 'Blog – theodorusclarence.com';
const description =
    'Thoughts on the frontend development and other interesting things.';

export default function BlogPage({ posts }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([...posts]);

    // sort the newest blog first.
    posts.sort(
        (postA, postB) =>
            new Date(postB.data.publishedAt) - new Date(postA.data.publishedAt)
    );

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const results = posts.filter(
                (post) =>
                    post.data.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    post.data.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
            setFilteredPosts(results);
        }, 200);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    return (
        <>
            <NextSeo
                title={title}
                description={description}
                canonical={url}
                openGraph={{
                    url,
                    title,
                    description,
                }}
            />
            <div className='flex flex-col min-h-screen'>
                <Nav />
                <motion.section
                    className='py-6 mt-4'
                    initial='initial'
                    animate='animate'
                >
                    <motion.main
                        className='space-y-4 layout'
                        variants={staggerFaster}
                    >
                        <header className='space-y-2'>
                            <motion.h1 variants={fadeInAndUp}>Blog</motion.h1>
                            <motion.p
                                variants={fadeInAndUp}
                                className='text-dark dark:text-light'
                            >
                                Some of my thoughts. It will be written in{' '}
                                <Tippy
                                    animation='scale-subtle'
                                    // offset={5}
                                    content={
                                        <span className='inline-block p-2 bg-white rounded-md shadow-md dark:bg-dark border-thin'>
                                            I felt like there are not much
                                            content in Bahasa Indonesia for
                                            Next.js and other frontend
                                            technologies.
                                        </span>
                                    }
                                >
                                    <span className='accent'>
                                        Bahasa Indonesia
                                    </span>
                                </Tippy>
                                .
                            </motion.p>
                            <motion.p
                                variants={fadeInAndUp}
                                className='text-dark dark:text-light'
                            >
                                Kindly{' '}
                                <CustomLink href='https://buttondown.email/theodorusclarence'>
                                    subscribe to my newsletter
                                </CustomLink>{' '}
                                if you want an update everytime I post.
                            </motion.p>
                        </header>
                        <motion.div variants={fadeInAndUp} className='pb-4'>
                            <p className='font-medium'>Search</p>
                            <input
                                className='w-full px-4 py-2 transition-colors rounded-md border-thin dark:bg-dark focus:outline-none focus:ring-1 focus:ring-accent-200'
                                type='text'
                                placeholder='Type to search...'
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </motion.div>
                        <AnimatePresence>
                            <motion.ul
                                variants={fadeInAndUp}
                                className='space-y-4'
                            >
                                {filteredPosts.map((post, index) => (
                                    <PostCard key={post.filePath} post={post} />
                                ))}

                                {filteredPosts.length === 0 && (
                                    <h4>
                                        Oops, not found, try searching another
                                        one ;)
                                    </h4>
                                )}
                            </motion.ul>
                        </AnimatePresence>
                    </motion.main>
                </motion.section>
                <Footer />
            </div>
        </>
    );
}

export function getStaticProps() {
    const posts = postFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(BLOGS_PATH, filePath));
        const { content, data } = matter(source);
        const slug = filePath.replace(/\.mdx?$/, '');

        return {
            content,
            data,
            filePath,
            slug,
            readingTime: readingTime(content).text,
        };
    });

    return { props: { posts } };
}

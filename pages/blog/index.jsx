import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { BLOGS_PATH, postFilePaths } from '../../utils/mdxUtils';
import Seo from '../../components/Seo';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import PostCard from '../../components/PostCard';
import { useState } from 'react';
import { NextSeo } from 'next-seo';

const url = 'https://theodorusclarence.com/blog';
const title = 'Blog – theodorusclarence.com';
const description = 'Thoughts on the frontend development and other interesting things.';

export default function BlogPage({ posts }) {
    const [text, setText] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([...posts]);
    // sort the newest blog first.
    posts.sort(
        (postA, postB) => new Date(postB.data.publishedAt) - new Date(postA.data.publishedAt)
    );

    const handleSearch = (e) => {
        e.preventDefault();
        setText(e.target.value);
        setFilteredPosts(
            posts.filter(
                (post) =>
                    post.data.title.toLowerCase().includes(text.toLowerCase()) ||
                    post.data.description.toLowerCase().includes(text.toLowerCase())
            )
        );
        if (e.target.value === '') {
            setFilteredPosts([...posts]);
        }
    };

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
                <section className='py-6 mt-4'>
                    <main className='space-y-4 layout'>
                        <header>
                            <h1>Blog</h1>
                            <p className='text-dark'>Some of my thoughts.</p>
                        </header>
                        <div className='pb-4'>
                            <p className='font-medium'>Search</p>
                            <input
                                className='w-full px-4 py-2 rounded-md border-thin dark:bg-dark focus:outline-none focus:ring-1 focus:ring-accent-200'
                                type='text'
                                placeholder='Type to search...'
                                value={text}
                                onChange={handleSearch}
                            />
                        </div>
                        <ul className='space-y-4'>
                            {filteredPosts.map((post) => (
                                <PostCard key={post.filePath} post={post} />
                            ))}

                            {filteredPosts.length === 0 && (
                                <h4>Oops, not found, try searching another one ;)</h4>
                            )}
                        </ul>
                    </main>
                </section>
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
        };
    });

    return { props: { posts } };
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { useState } from 'react';
import { NextSeo } from 'next-seo';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LibraryCard from '@/components/LibraryCard';
import { LIBRARY_PATH, postLibraryPaths } from '@/utils/mdxUtils';

const url = 'https://theodorusclarence.com/blog';
const title = 'Library – theodorusclarence.com';
const description =
    'Some collection of codes that I usually use that I put for easy access, feel free to reuse!';

export default function BlogPage({ snippets }) {
    const [text, setText] = useState('');
    const [filteredSnippets, setFilteredSnippets] = useState([...snippets]);

    // sort the newest blog first.
    snippets.sort(
        (postA, postB) =>
            new Date(postB.data.publishedAt) - new Date(postA.data.publishedAt)
    );

    const handleSearch = (e) => {
        e.preventDefault();
        setText(e.target.value);
        setFilteredSnippets(
            snippets.filter(
                (snippet) =>
                    snippet.data.title
                        .toLowerCase()
                        .includes(text.toLowerCase()) ||
                    snippet.data.description
                        .toLowerCase()
                        .includes(text.toLowerCase())
            )
        );
        if (e.target.value === '') {
            setFilteredSnippets([...snippets]);
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
                        <header className='space-y-2'>
                            <h1>Library</h1>
                            <p className='text-dark dark:text-light'>
                                {description}
                            </p>
                        </header>
                        <div className='pb-4'>
                            <p className='font-medium'>Search</p>
                            <input
                                className='w-full px-4 py-2 transition-colors rounded-md border-thin dark:bg-dark focus:outline-none focus:ring-1 focus:ring-accent-200'
                                type='text'
                                placeholder='Type to search...'
                                value={text}
                                onChange={handleSearch}
                            />
                        </div>
                        <ul className='grid gap-4 md:grid-cols-2'>
                            {filteredSnippets.map((snippet) => (
                                <LibraryCard
                                    key={snippet.slug}
                                    post={snippet.data}
                                    slug={snippet.slug}
                                />
                            ))}

                            {filteredSnippets.length === 0 && (
                                <h4>
                                    Oops, not found, try searching another one
                                    ;)
                                </h4>
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
    const snippets = postLibraryPaths.map((filePath) => {
        const source = fs.readFileSync(path.join(LIBRARY_PATH, filePath));
        const { content, data } = matter(source);
        const slug = filePath.replace(/\.mdx?$/, '');

        return {
            content,
            data,
            filePath,
            slug,
        };
    });

    return { props: { snippets } };
}

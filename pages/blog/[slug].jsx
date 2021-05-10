import fs from 'fs';
import path from 'path';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import mdxPrism from 'mdx-prism';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';

import fetcher from '@/utils/fetcher.js';
import { checkBlogPrefix, formatDate } from '@/utils/helper.js';
import { BLOGS_PATH, postFilePaths } from '@/utils/mdxUtils';

import CustomCode, { Pre } from '@/components/CustomCode.jsx';
import CustomLink from '@/components/CustomLink.jsx';
import UnstyledLink from '@/components/UnstyledLink.jsx';
import Footer from '@/components/Footer.jsx';
import Nav from '@/components/Nav.jsx';
import CloudinaryImg from '@/components/CloudinaryImg';

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
    a: CustomLink,
    // It also works with dynamically-imported components, which is especially
    // useful for conditionally loading components for certain routes.
    // See the notes in README.md for more details.
    // TestComponent: dynamic(() => import('../../components/TestComponent')),
    Head,
    Image,
    CloudinaryImg,
    code: CustomCode,
    pre: Pre,
};

export default function PostPage({ source, frontMatter, slug, readingTime }) {
    const url = `https://theodorusclarence.com/blog/${slug}`;
    const title = `${frontMatter.title} – theodorusclarence.com`;
    const description = frontMatter.description;
    const checkedSlug = checkBlogPrefix(slug);
    const isEnglish = checkedSlug === slug;

    const content = hydrate(source, { components });
    const { data } = useSWR(`/api/${checkedSlug}`, fetcher);
    useEffect(() => {
        const addCount = async () => {
            await fetch(`/api/${checkedSlug}`, { method: 'POST' });
            mutate(`/api/${checkedSlug}`);
        };

        addCount();
    }, []);

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
                    <main className='layout'>
                        <div className='pb-4 border-b-thin'>
                            <h1 className='mb-2'>{frontMatter.title}</h1>

                            <p className='component text-dark dark:text-light'>
                                Written on {formatDate(frontMatter.publishedAt)}{' '}
                                by{' '}
                                <div className='inline-flex items-end align-bottom'>
                                    <div style={{ width: 25, height: 25 }}>
                                        <Image
                                            width={500}
                                            className='rounded-full '
                                            height={500}
                                            objectFit='cover'
                                            src={'/images/me.jpg'}
                                            alt={'photo of me'}
                                        />{' '}
                                    </div>
                                    <p className='ml-1'>Theodorus Clarence.</p>
                                </div>
                                <p className='mb-2'>
                                    {data?.count >= 0 ? data.count : '–––'}{' '}
                                    views • {readingTime}
                                </p>
                                <CustomLink
                                    href={`/blog/${
                                        isEnglish ? 'id-' : ''
                                    }${checkedSlug}`}
                                >
                                    Read in{' '}
                                    {isEnglish ? 'Bahasa Indonesia' : 'English'}
                                </CustomLink>
                            </p>

                            {/* <Link href={`/blog/${slug}`} scroll={false}>
                                <a className='fixed p-2 text-black bg-green-200 rounded-md bottom-6 right-6'>
                                    Reload
                                </a>
                            </Link> */}
                        </div>
                        <article className='py-4 mx-auto prose transition-colors dark:prose-dark'>
                            {content}
                        </article>
                        <UnstyledLink
                            href='/blog'
                            className='inline-block mt-4 view'
                        >
                            ← Back to blog
                        </UnstyledLink>
                    </main>
                </section>
                <Footer />
            </div>
        </>
    );
}

export const getStaticProps = async ({ params }) => {
    const postFilePath = path.join(BLOGS_PATH, `${params.slug}.mdx`);
    const source = fs.readFileSync(postFilePath);

    const { content, data } = matter(source);

    const mdxSource = await renderToString(content, {
        components,
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [mdxPrism],
        },
        scope: data,
    });

    return {
        props: {
            source: mdxSource,
            frontMatter: data,
            slug: params.slug,
            readingTime: readingTime(content).text,
        },
    };
};

export const getStaticPaths = async () => {
    const paths = postFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug } }));

    return {
        paths,
        fallback: false,
    };
};

import fs from 'fs';
import matter from 'gray-matter';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import path from 'path';
import mdxPrism from 'mdx-prism';
import CustomLink from '../../components/CustomLink.jsx';
import { postFilePaths, BLOGS_PATH } from '../../utils/mdxUtils';
import { useEffect } from 'react';
import { mutate } from 'swr';

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
    // code: CodeBlock,
};

export default function PostPage({ source, frontMatter }) {
    const content = hydrate(source, { components });
    // useEffect(() => {
    //     const addCount = async () => {
    //         await fetch(`/api/${slug}`, { method: 'POST' });
    //         mutate(`/api/${slug}`);
    //     };

    //     addCount();
    // }, []);

    return (
        <div>
            <header>
                <nav>
                    <Link href='/'>
                        <a>👈 Go back home</a>
                    </Link>
                </nav>
            </header>
            <div className='post-header'>
                <h1>{frontMatter.title}</h1>
                {frontMatter.description && (
                    <p className='description'>{frontMatter.description}</p>
                )}
            </div>

            <article className='prose'>{content}</article>

            <style jsx>{`
                .post-header h1 {
                    margin-bottom: 0;
                }
                .post-header {
                    margin-bottom: 2rem;
                }
                .description {
                    opacity: 0.6;
                }
            `}</style>
        </div>
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

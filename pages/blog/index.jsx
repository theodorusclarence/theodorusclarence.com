import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import Link from 'next/link';
import BlogCard from '../../components/BlogCard';
import SpotifyPlaying from '../../components/SpotifyPlaying';
import { BLOGS_PATH, postFilePaths } from '../../utils/mdxUtils';

export default function BlogPage({ posts }) {
    return (
        <div className='container mx-auto'>
            <h1 className='inline-block text-transparent bg-gradient-to-tr from-green-400 to-cyan-400 bg-clip-text'>
                My Blog
            </h1>
            {['first-blog', 'second-blog', 'makan-bibi', 'air-tawar'].map((slug) => (
                <BlogCard key={slug} slug={slug} />
            ))}

            <ul>
                {posts.map((post) => (
                    <li key={post.filePath}>
                        <Link href={`/blog/${post.filePath.replace(/\.mdx?$/, '')}`}>
                            <a>{post.data.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
            {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
            <SpotifyPlaying />
        </div>
    );
}

export function getStaticProps() {
    const posts = postFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(BLOGS_PATH, filePath));
        const { content, data } = matter(source);

        return {
            content,
            data,
            filePath,
        };
    });

    return { props: { posts } };
}

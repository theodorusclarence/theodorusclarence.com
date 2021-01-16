import { useEffect } from 'react';
import { mutate } from 'swr';
import BlogCard from '../../components/BlogCard';

export default function BlogPosts({ slug }) {
    useEffect(() => {
        const addCount = async () => {
            await fetch(`/api/${slug}`, { method: 'POST' });
            mutate(`/api/${slug}`);
        };

        addCount();
    }, []);

    return (
        <div className='container mx-auto'>
            <BlogCard slug={slug} />
        </div>
    );
}

export async function getStaticProps(context) {
    return {
        props: { slug: context.params.slug },
    };
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: 'first-blog' } },
            { params: { slug: 'second-blog' } },
            { params: { slug: 'makan-bibi' } },
            { params: { slug: 'air-tawar' } },
        ],
        fallback: false,
    };
}

import { InferGetStaticPropsType } from 'next';
import * as React from 'react';

import { getAllFilesFrontMatter, sortByDate } from '@/lib/mdx';

import Accent from '@/components/Accent';
import BlogCard from '@/components/blog/BlogCard';
import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import SortListbox from '@/components/SortListbox';

export type SortOption = {
  id: string;
  name: string;
};

const sortOptions: Array<SortOption> = [
  {
    id: 'date',
    name: 'Sort by date',
  },
  { id: 'views', name: 'Sort by views' },
];

export default function IndexPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [sortOrder, setSortOrder] = React.useState<SortOption>(sortOptions[0]);
  return (
    <Layout>
      <Seo templateTitle='Blog' />

      <main>
        <section>
          <div className='layout'>
            <h1>
              <Accent>Blog</Accent>
            </h1>
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
              Thoughts and tutorials about Front-end Development
            </p>
            <div className='flex flex-col gap-4 !mt-8 z-10 items-end relative md:items-center text-gray-600 dark:text-gray-300 md:flex-row md:justify-between'>
              <Button className='text-sm !font-medium'>
                Read in Bahasa Indonesia
              </Button>
              <SortListbox
                selected={sortOrder}
                setSelected={setSortOrder}
                options={sortOptions}
              />
            </div>
            <ul className='grid gap-4 mt-8 sm:grid-cols-2 xl:grid-cols-3'>
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = await getAllFilesFrontMatter('blog');
  const posts = sortByDate(files);

  return { props: { posts } };
}

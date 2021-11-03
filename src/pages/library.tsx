import { InferGetStaticPropsType } from 'next';
import * as React from 'react';

import { getAllFilesFrontMatter } from '@/lib/mdx';
import { getTags, sortByTitle } from '@/lib/mdx-client';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import LibraryCard from '@/components/library/LibraryCard';
import Seo from '@/components/Seo';

export default function LibraryPage({
  snippets,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // eslint-disable-next-line no-console
  console.log('🚀 ~ file: library.tsx ~ line 17 ~ tags', tags);
  return (
    <Layout>
      <Seo templateTitle='Library' />

      <main>
        <section className=''>
          <div className='py-12 layout'>
            <h1>
              <Accent>Library</Accent>
            </h1>
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
              Some collection of code snippets that I put for easy access, feel
              free to reuse!
            </p>

            <ul className='grid gap-4 mt-4 sm:grid-cols-2 xl:grid-cols-3'>
              {snippets.length > 0 ? (
                snippets.map((snippet) => (
                  <LibraryCard key={snippet.slug} snippet={snippet} />
                ))
              ) : (
                <p>empty</p>
              )}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = await getAllFilesFrontMatter('library');
  const snippets = sortByTitle(files);

  // Accumulate tags and remove duplicate
  const tags = getTags(snippets);

  return { props: { snippets, tags } };
}

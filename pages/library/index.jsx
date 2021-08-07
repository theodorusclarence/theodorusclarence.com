import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { LIBRARY_PATH, postLibraryPaths } from '@/utils/mdxUtils';
import { classNames } from '@/utils/helper';
import useLoadingWithPreload from '@/hooks/useLoadingWithPreload';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LibraryCard from '@/components/LibraryCard';
import Seo from '@/components/Seo';

export default function LibraryPage({ snippets }) {
  const { isLoaded } = useLoadingWithPreload();

  snippets.sort((a, b) =>
    a.data.title > b.data.title ? 1 : b.data.title > a.data.title ? -1 : 0
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSnippets, setFilteredSnippets] = useState([...snippets]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const results = snippets.filter(
        (snippet) =>
          snippet.data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          snippet.data.techs.toLowerCase().includes(searchTerm.toLowerCase()) ||
          snippet.data.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );

      // sort by title
      const sortedResult = results.sort((a, b) =>
        a.data.title > b.data.title ? 1 : b.data.title > a.data.title ? -1 : 0
      );

      setFilteredSnippets(sortedResult);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const description =
    'Some collection of code snippets that I put for easy access, feel free to reuse!';

  return (
    <>
      <Seo title='Library – theodorusclarence.com' description={description} />
      <div
        className={classNames(
          'flex flex-col min-h-screen',
          isLoaded && 'animate-fade-in-start'
        )}
      >
        <Nav />
        <section className='py-6 mt-4'>
          <main className='space-y-4 layout'>
            <header className='space-y-2'>
              <h1 className='animate-fade-in-initial fade-in-1'>
                <span className='accent'>Library</span>
              </h1>
              <p className='text-dark dark:text-light animate-fade-in-initial fade-in-2'>
                {description}
              </p>
            </header>
            <div className='pb-4 animate-fade-in-initial fade-in-3'>
              <p className='font-medium'>Search</p>
              <input
                className='w-full px-4 py-2 transition-colors rounded-md shadow-none focus:border-accent-200 border-thin dark:bg-dark focus:outline-none focus:ring-1 focus:ring-accent-200'
                type='text'
                placeholder='Type to search title or tech stack...'
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <AnimatePresence>
              <ul className='grid gap-4 md:grid-cols-2 animate-fade-in-initial fade-in-4'>
                {filteredSnippets.map((snippet) => (
                  <LibraryCard
                    key={snippet.slug}
                    post={snippet.data}
                    slug={snippet.slug}
                  />
                ))}

                {filteredSnippets.length === 0 && (
                  <h4>Oops, not found, try searching another one ;)</h4>
                )}
              </ul>
            </AnimatePresence>
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
      data,
      filePath,
      slug,
    };
  });

  return { props: { snippets } };
}

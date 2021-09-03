import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { classNames } from '@/utils/helper';
import { getAllFilesFrontMatter, sortByTitle } from '@/utils/mdx';
import useLoadingWithPreload from '@/hooks/useLoadingWithPreload';

import Seo from '@/components/Seo';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LibraryCard from '@/components/LibraryCard';

export default function LibraryPage({ snippets }) {
  const { isLoaded } = useLoadingWithPreload();

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
          snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          snippet.techs.toLowerCase().includes(searchTerm.toLowerCase()) ||
          snippet.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // sort by title
      const sortedResult = results.sort((a, b) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
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
                className='w-full px-4 py-2 mt-2 transition-colors rounded-md shadow-none focus:border-accent-200 border-thin dark:bg-dark focus:outline-none focus:ring-1 focus:ring-accent-200'
                type='text'
                placeholder='Type to search title or tech stack...'
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <AnimatePresence>
              <ul className='grid gap-4 md:grid-cols-2 animate-fade-in-initial fade-in-4'>
                {filteredSnippets.map((snippet) => (
                  <LibraryCard key={snippet.slug} snippet={snippet} />
                ))}

                {filteredSnippets.length === 0 && (
                  <h4>Oops, not found, try searching another one {';)'}</h4>
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

export async function getStaticProps() {
  const contents = await getAllFilesFrontMatter('library');
  const snippets = sortByTitle(contents);

  return { props: { snippets } };
}

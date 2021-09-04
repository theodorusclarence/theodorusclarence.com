import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import fetcher from '@/utils/fetcher';
import { getLibrary } from '@/utils/contentMeta';
import { getAllFilesFrontMatter } from '@/utils/mdx';
import { classNames, sortByTitle } from '@/utils/helper';
import useLoadingWithPreload from '@/hooks/useLoadingWithPreload';

import Seo from '@/components/Seo';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LibraryCard from '@/components/LibraryCard';
import SortListbox from '@/components/SortListbox';

export default function LibraryPage({ snippets }) {
  const { isLoaded } = useLoadingWithPreload();

  //#region ====== Insert Likes to Snippets
  const { data: contentMeta, error } = useSWR('/api/content', fetcher, {
    revalidateOnFocus: false,
  });
  const isLoading = !error & !contentMeta;
  const library = getLibrary(contentMeta);

  const [populatedSnippets, setPopulatedSnippets] = useState([...snippets]);

  useEffect(() => {
    if (library) {
      const mapped = snippets.map((t) => {
        const likes = library.find((l) => l.slug === t.slug)?.likes;
        return { ...t, likes };
      });

      console.log(mapped);
      setPopulatedSnippets(mapped);
    }
  }, [isLoading]);
  //#endregion ====== Insert Likes to Snippets

  const [filteredSnippets, setFilteredSnippets] = useState([...snippets]);

  //#region ====== Search logic
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const results = populatedSnippets.filter(
        (snippet) =>
          snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          snippet.techs.toLowerCase().includes(searchTerm.toLowerCase()) ||
          snippet.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (sortOrder.id === 'name') {
        results.sort((a, b) =>
          a.title > b.title ? 1 : b.title > a.title ? -1 : 0
        );
      } else if (sortOrder.id === 'popular') {
        results.sort((a, b) => a?.likes < b?.likes);
      }

      setFilteredSnippets(results);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm, populatedSnippets]);
  //#endregion ====== Search logic

  //#region sorting effect
  const [sortOrder, setSortOrder] = useState(sortOptions[0]);

  useEffect(() => {
    const sortArr = [...filteredSnippets];

    if (sortOrder.id === 'name') {
      sortArr.sort((a, b) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      );
    } else if (sortOrder.id === 'popular') {
      sortArr.sort((a, b) => a?.likes < b?.likes);
    }

    setFilteredSnippets(sortArr);
  }, [sortOrder]);
  //#endregion sorting effect

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
            <div className='flex flex-col gap-4 md:!mt-8 z-10 relative items-end text-dark dark:text-light animate-fade-in-initial fade-in-4'>
              <SortListbox
                selected={sortOrder}
                setSelected={setSortOrder}
                options={sortOptions}
              />
            </div>
            <AnimatePresence>
              <ul className='grid gap-4 md:grid-cols-2 animate-fade-in-initial fade-in-5'>
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

const sortOptions = [
  {
    id: 'name',
    name: 'Sort by name',
  },
  { id: 'popular', name: 'Sort by popularity' },
];

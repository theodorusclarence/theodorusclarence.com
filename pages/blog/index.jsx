import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import {
  checkBlogPrefix,
  classNames,
  getFromSessionStorage,
} from '@/utils/helper';
import { getAllFilesFrontMatter } from '@/utils/mdx';
import fetcher from '@/utils/fetcher';
import { sortByDate } from '@/utils/helper';
import { getBlogs } from '@/utils/contentMeta';

import useLoadingWithPreload from '@/hooks/useLoadingWithPreload';

import Seo from '@/components/Seo';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import CustomLink from '@/components/CustomLink';
import SortListbox from '@/components/SortListbox';

const sortOptions = [
  {
    id: 'date',
    name: 'Sort by date',
  },
  { id: 'views', name: 'Sort by views' },
];

export default function BlogPage({ posts }) {
  const { isLoaded } = useLoadingWithPreload();

  const [selectedEnglish, setSelectedEnglish] = useState(true);

  //#region //*====== Insert Likes to Snippets
  const { data: contentMeta, error } = useSWR('/api/content', fetcher);
  const isLoading = !error & !contentMeta;
  const blogMeta = getBlogs(contentMeta);

  const [populatedPosts, setPopulatedPosts] = useState([...posts]);

  useEffect(() => {
    if (blogMeta) {
      const mapped = posts.map((post) => {
        const views = blogMeta.find(
          (meta) => meta.slug === checkBlogPrefix(post.slug)
        )?.views;
        return { ...post, views };
      });

      console.log(mapped);
      setPopulatedPosts(mapped);
    }
  }, [isLoading]);
  //#endregion ====== Insert Likes to Snippets

  const [filteredPosts, setFilteredPosts] = useState([...posts]);

  //#region //*====== sorting effect
  const [sortOrder, setSortOrder] = useState(
    () => sortOptions[getFromSessionStorage('blog-sort') || 0]
  );

  useEffect(() => {
    const sortArr = [...filteredPosts];

    if (sortOrder.id === 'date') {
      sortArr.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      sessionStorage.setItem('blog-sort', 0);
    } else if (sortOrder.id === 'views') {
      sortArr.sort((a, b) => a?.views < b?.views);
      sessionStorage.setItem('blog-sort', 1);
    }

    setFilteredPosts(sortArr);
  }, [sortOrder]);
  //#endregion sorting effect

  //#region //*====== search logic
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const results = populatedPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (sortOrder.id === 'date') {
        results.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
      } else if (sortOrder.id === 'views') {
        results.sort((a, b) => a?.views < b?.views);
      }

      setFilteredPosts(results);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm, populatedPosts]);
  //#endregion ====== search logic

  const langPosts = filteredPosts.filter((post) =>
    selectedEnglish
      ? post.slug.slice(0, 3) !== 'id-'
      : post.slug.slice(0, 3) === 'id-'
  );

  return (
    <>
      <Seo
        title='Blog – theodorusclarence.com'
        description='Thoughts on the frontend development and other interesting things.'
      />
      <div className='flex flex-col min-h-screen'>
        <Nav large />
        <section
          className={classNames(
            'py-6 mt-4',
            isLoaded && 'animate-fade-in-start'
          )}
        >
          <main className='space-y-4 layout lg:max-w-[68rem]'>
            <header className='space-y-2'>
              <h1 className='animate-fade-in-initial fade-in-1'>
                <span className='accent no-under'>
                  Blog
                  {selectedEnglish ? '' : ' Bahasa Indonesia'}
                </span>
              </h1>
              <p className='text-dark dark:text-light animate-fade-in-initial fade-in-2'>
                Some of my thoughts.
              </p>
              <p className='text-dark dark:text-light animate-fade-in-initial fade-in-3'>
                Kindly{' '}
                <CustomLink href='https://buttondown.email/theodorusclarence'>
                  subscribe to my newsletter
                </CustomLink>{' '}
                if you want an update everytime I post.
              </p>
            </header>
            <div className='animate-fade-in-initial fade-in-4'>
              <p className='font-medium'>Search</p>
              <input
                className='w-full px-4 py-2 mt-2 transition-colors rounded-md shadow-none border-thin dark:bg-dark focus:border-accent-200 focus:outline-none focus:ring-1 focus:ring-accent-200 '
                type='text'
                placeholder='Type to search...'
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className='flex flex-col gap-4 !mt-8 z-10 items-end relative md:items-center text-dark dark:text-light animate-fade-in-initial fade-in-5 md:flex-row md:justify-between'>
              <button
                className='inline-block px-4 py-2 font-medium transition-shadow duration-100 rounded-md sm:text-sm btn active:shadow-none hover:shadow-md border-thin ring-vis-0'
                onClick={() => setSelectedEnglish(!selectedEnglish)}
              >
                Read in {selectedEnglish ? 'Bahasa Indonesia' : 'English'}
              </button>
              <SortListbox
                selected={sortOrder}
                setSelected={setSortOrder}
                options={sortOptions}
              />
            </div>

            <AnimatePresence>
              <ul className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3 animate-fade-in-initial fade-in-6'>
                {langPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}

                {langPosts.length === 0 && (
                  <h4>Oops, not found, try searching another one {';)'}</h4>
                )}
              </ul>
            </AnimatePresence>
          </main>
        </section>
        <Footer large />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const files = await getAllFilesFrontMatter('blog');
  const posts = sortByDate(files);

  return { props: { posts } };
}

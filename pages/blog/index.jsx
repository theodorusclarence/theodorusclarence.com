import fs from 'fs';
import path from 'path';
import readingTime from 'reading-time';
import matter from 'gray-matter';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { classNames } from '@/utils/helper';
import { BLOGS_PATH, postFilePaths } from '@/utils/mdxUtils';
import useLoadingWithPreload from '@/hooks/useLoadingWithPreload';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import CustomLink from '@/components/CustomLink';
import Seo from '@/components/Seo';

export default function BlogPage({ posts }) {
  const { isLoaded } = useLoadingWithPreload();

  const englishPosts = [];
  const indPosts = [];

  posts.forEach((post) => {
    // post indo
    if (post.slug.slice(0, 3) !== 'id-') {
      englishPosts.push(post);
    } else {
      indPosts.push(post);
    }
  });

  const [selectedEnglish, setSelectedEnglish] = useState(true);
  const [selectedPosts, setSelectedPosts] = useState([...englishPosts]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([...englishPosts]);

  // sort the newest blog first.
  selectedPosts.sort(
    (postA, postB) =>
      new Date(postB.data.publishedAt) - new Date(postA.data.publishedAt)
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const results = selectedPosts.filter(
        (post) =>
          post.data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.data.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(results);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // // Set Preferred Language on Render
  // useEffect(() => {
  //     let preferredLanguage = localStorage.getItem('preferredBlogLang');
  //     console.log(
  //         '🚀 ~ file: index.jsx ~ line 97 ~ useEffect ~ preferredLanguage',
  //         preferredLanguage
  //     );
  //     if (!preferredLanguage) {
  //         localStorage.setItem('preferredBlogLang', 'en');
  //         preferredLanguage = 'en';
  //     } else if (preferredLanguage === 'id') {
  //         setSelectedEnglish(false);
  //     }
  // }, []);

  // Change post state based on languange
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      if (selectedEnglish) {
        setSelectedPosts(englishPosts);
        setFilteredPosts(englishPosts);
      } else {
        setSelectedPosts(indPosts);
        setFilteredPosts(indPosts);
      }
      // reset filter
      setSearchTerm('');
    }
  }, [selectedEnglish]);

  return (
    <>
      <Seo
        title='Blog – theodorusclarence.com'
        description='Thoughts on the frontend development and other interesting things.'
      />
      <div className='flex flex-col min-h-screen'>
        <Nav />
        <section
          className={classNames(
            'py-6 mt-4',
            isLoaded && 'animate-fade-in-start'
          )}
        >
          <main className='space-y-4 layout'>
            <header className='space-y-2'>
              <h1 className='animate-fade-in-initial fade-in-1'>
                <span className='accent'>
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
              <div className='text-dark dark:text-light animate-fade-in-initial fade-in-4'>
                <button
                  className='inline-block px-4 py-2 mt-2 font-medium transition-shadow duration-100 rounded-md btn active:shadow-none hover:shadow-md border-thin ring-vis-0'
                  onClick={() => setSelectedEnglish(!selectedEnglish)}
                >
                  Read in {selectedEnglish ? 'Bahasa Indonesia' : 'English'}
                </button>
              </div>
            </header>
            <div className='pb-4 animate-fade-in-initial fade-in-5'>
              <p className='font-medium'>Search</p>
              <input
                className='w-full px-4 py-2 transition-colors rounded-md shadow-none border-thin dark:bg-dark focus:border-accent-200 focus:outline-none focus:ring-1 focus:ring-accent-200 '
                type='text'
                placeholder='Type to search...'
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <AnimatePresence>
              <ul className='space-y-4 animate-fade-in-initial fade-in-6'>
                {filteredPosts.map((post) => (
                  <PostCard key={post.filePath} post={post} />
                ))}

                {filteredPosts.length === 0 && (
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
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(BLOGS_PATH, filePath));
    const { content, data } = matter(source);
    const slug = filePath.replace(/\.mdx?$/, '');

    return {
      data,
      filePath,
      slug,
      readingTime: readingTime(content).text,
    };
  });

  posts.sort(
    (postA, postB) =>
      new Date(postB.data.publishedAt) - new Date(postA.data.publishedAt)
  );

  return { props: { posts } };
}

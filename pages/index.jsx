import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoArrowDownOutline } from 'react-icons/io5';

import { projects } from '@/data/projects';
import {
  featuredPostsArr,
  featuredSnippetsArr,
  featuredProjectsArr,
} from '@/data/featured';

import useLoadingWithPreload from '@/hooks/useLoadingWithPreload';

import fetcher from '@/utils/fetcher';
import { getBlogs, getLibrary } from '@/utils/contentMeta';
import { checkBlogPrefix, classNames } from '@/utils/helper';
import { getAllFilesFrontMatter, sortByDate, sortByTitle } from '@/utils/mdx';

import Seo from '@/components/Seo';
import Nav from '@/components/Nav';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import TechStack from '@/components/TechStack';
import CustomLink from '@/components/CustomLink';
import ProjectCard from '@/components/ProjectCard';
import LibraryCard from '@/components/LibraryCard';
import InViewSection from '@/components/InViewSection';

export default function Home({
  featuredPosts,
  featuredProjects,
  featuredSnippets,
}) {
  const { isLoaded } = useLoadingWithPreload();

  //#region //*====== Insert likes and views
  const { data: contentMeta, error } = useSWR('/api/content', fetcher);
  const isContentMetaLoading = !error & !contentMeta;
  const blogMeta = getBlogs(contentMeta);
  const snippetMeta = getLibrary(contentMeta);

  const [populatedPosts, setPopulatedPosts] = useState([...featuredPosts]);
  const [populatedSnippets, setPopulatedSnippets] = useState([
    ...featuredSnippets,
  ]);

  useEffect(() => {
    if (contentMeta) {
      const mappedPosts = featuredPosts.map((post) => {
        const meta = blogMeta.find(
          (m) => m.slug === checkBlogPrefix(post.slug)
        );
        return { ...post, views: meta?.views };
      });
      setPopulatedPosts(mappedPosts);

      const mappedSnippets = featuredSnippets.map((snippet) => {
        const meta = snippetMeta.find((m) => m.slug === snippet.slug);
        return { ...snippet, likes: meta?.likes };
      });
      setPopulatedSnippets(mappedSnippets);
    }
  }, [isContentMetaLoading]);
  //#endregion ====== Insert Likes to Snippets

  return (
    <>
      <Seo />
      <Nav />

      <motion.main className='flex flex-col min-h-screen'>
        {/* //* Home and Tech Stack */}
        <div
          className={classNames(
            'flex flex-col justify-center min-h-[calc(100vh-82px)]',
            isLoaded && 'animate-fade-in-start'
          )}
        >
          <section className='pb-6 -mt-24'>
            <article className='layout'>
              <h2 className='md:mb-2 animate-fade-in-initial fade-in-1'>Hi!</h2>
              <h1 className='mb-2 animate-fade-in-initial fade-in-2'>
                You can call me{' '}
                <span className='accent no-under bg-accent-200/50'>
                  Clarence
                </span>
              </h1>
              <p className='prose dark:text-light animate-fade-in-initial fade-in-3'>
                I'm a fast learner and hardworking Informatics Student at
                Institut Teknologi Sepuluh Nopember. I'm currently really
                interested in Frontend Development.{' '}
                <CustomLink href='/about'>Reach me out</CustomLink> to talk more
                about frontend works!
              </p>
            </article>
          </section>
          <section className='py-6'>
            <article className='layout'>
              <h2 className='mb-2 animate-fade-in-initial fade-in-4'>
                Current Favorite Tech Stack
              </h2>
              <figure className='animate-fade-in-initial fade-in-5'>
                <TechStack />
              </figure>
            </article>
          </section>
          <button
            className='absolute -translate-x-1/2 rounded-md cursor-pointer bottom-2 hover:text-accent-300 focus-visible:text-accent-300 md:bottom-10 left-1/2 animate-fade-in-initial fade-in-6 ring-vis'
            onClick={(e) => {
              e.preventDefault();
              window.scrollBy({
                top: window.innerHeight - 130,
                left: 0,
                behavior: 'smooth',
              });
            }}
          >
            <IoArrowDownOutline className='w-8 h-8 md:w-10 md:h-10 animate-bounce' />
          </button>
        </div>

        {/* //* Featured Projects */}
        {/* padding top smaller to reduce gap */}
        <InViewSection id='projects' className='pt-2 pb-16'>
          <motion.main className='layout'>
            <motion.h2 className='mb-4 no-under'>
              <span className='accent no-under'>Featured Projects</span>
            </motion.h2>
            <motion.ul className='grid gap-4 mb-4 md:grid-cols-2'>
              {featuredProjects.map((project, index) => (
                <ProjectCard key={index} data={project} />
              ))}
            </motion.ul>
            <Button href='/projects'>See More</Button>
          </motion.main>
        </InViewSection>

        {/* //* Featured Posts */}
        <InViewSection className='py-16'>
          <article className='layout'>
            <h2>
              <span className='accent no-under'>Featured Posts</span>
            </h2>
            <p className='mb-4 text-gray-700 component dark:text-gray-300'>
              Kindly{' '}
              <CustomLink href='https://buttondown.email/theodorusclarence'>
                subscribe to my newsletter
              </CustomLink>{' '}
              if you want an update everytime I post.
            </p>
            <AnimatePresence>
              <ul className='mb-4 space-y-4'>
                {populatedPosts.map((post) => (
                  <PostCard key={post.slug} index post={post} />
                ))}
              </ul>
            </AnimatePresence>
            <div className='space-x-4'>
              <Button href='/blog'>See More</Button>
              <Button href='/suggest'>Suggest Topic</Button>
            </div>
          </article>
        </InViewSection>

        {/* //* Code Library */}
        <InViewSection className='py-16'>
          <article className='layout'>
            <h2 className=''>
              <span className='accent no-under'>Check out my code library</span>
            </h2>
            <p className='mt-2 mb-4 text-gray-700 component dark:text-gray-300'>
              List of code snippets that I store for easy access.
            </p>
            <AnimatePresence>
              <ul className='grid gap-4 md:grid-cols-2'>
                {populatedSnippets.map((snippet) => (
                  <LibraryCard key={snippet.slug} index snippet={snippet} />
                ))}
              </ul>
            </AnimatePresence>
            <Button className='mt-4' href='/library'>
              See more
            </Button>
          </article>
        </InViewSection>
      </motion.main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog');
  const featuredPosts = sortByDate(
    posts.filter((post) => featuredPostsArr.includes(post.slug))
  );

  const featuredProjects = projects.filter((project) =>
    featuredProjectsArr.find((pr) => pr === project.id)
  );

  const snippets = await getAllFilesFrontMatter('library');
  const featuredSnippets = sortByTitle(
    snippets.filter((snippet) => featuredSnippetsArr.includes(snippet.slug))
  );

  return {
    props: {
      featuredPosts,
      featuredProjects,
      featuredSnippets,
    },
  };
}

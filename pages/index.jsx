import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Timeline, Reveal } from 'react-gsap';
import { IoArrowDownOutline } from 'react-icons/io5';

import { projects } from '@/data/projects';
import { featured, featuredProj } from '@/data/featured';
import { BLOGS_PATH, postFilePaths } from '@/utils/mdxUtils';

import Seo from '@/components/Seo';
import Nav from '@/components/Nav';
import CustomLink from '@/components/CustomLink';
import TechStack from '@/components/TechStack';
import ProjectCard from '@/components/ProjectCard';
import PostCard from '@/components/PostCard';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import FadeUp from '@/components/animations/FadeUp';

export default function Home({ featuredPosts, featuredProjects }) {
  console.log(`██   ██ ███████ ██      ██       ██████      ██████  ███████ ██    ██ ███████ ██       ██████  ██████  ███████ ██████  ██ 
██   ██ ██      ██      ██      ██    ██     ██   ██ ██      ██    ██ ██      ██      ██    ██ ██   ██ ██      ██   ██ ██ 
███████ █████   ██      ██      ██    ██     ██   ██ █████   ██    ██ █████   ██      ██    ██ ██████  █████   ██████  ██ 
██   ██ ██      ██      ██      ██    ██     ██   ██ ██       ██  ██  ██      ██      ██    ██ ██      ██      ██   ██    
██   ██ ███████ ███████ ███████  ██████      ██████  ███████   ████   ███████ ███████  ██████  ██      ███████ ██   ██ ██ `);
  console.log(
    'Welcome to my page! Also feel free to contact me via email at theodorusclarence@gmail.com 🙌'
  );

  return (
    <>
      <Seo />
      <div className='fixed inset-0 transition-opacity bg-white preloader dark:bg-dark'></div>
      <Nav />

      <main className='flex flex-col min-h-screen'>
        {/* //* Home and Tech Stack */}
        <div className='flex flex-col justify-center min-h-screen'>
          <Timeline trigger={<div />}>
            <section className='pb-6 -mt-24'>
              <article className='layout'>
                <FadeUp stagger={0.1}>
                  <h2 className='md:mb-2'>Hi!</h2>
                  <h1 className='mb-2'>
                    You can call me <span className='accent'>Clarence</span>
                  </h1>
                  <p className='prose dark:text-light'>
                    I'm a fast learner and hardworking Informatics Student at
                    Institut Teknologi Sepuluh Nopember. I'm currently really
                    interested in Frontend Development.{' '}
                    <CustomLink href='/about'>Reach me out</CustomLink> to talk
                    more about frontend works!
                  </p>
                </FadeUp>
              </article>
            </section>
            <section className='py-6'>
              <article className='layout'>
                <FadeUp stagger={0.1} delay={-0.2}>
                  <h2 className='mb-2'>Current Favorite Tech Stack</h2>
                  <div>
                    <TechStack />
                  </div>
                </FadeUp>
              </article>
            </section>
            <figure
              className='absolute -translate-x-1/2 cursor-pointer bottom-2 md:bottom-10 left-1/2'
              onClick={(e) => {
                e.preventDefault();
                window.scrollBy({
                  top: window.innerHeight - 60,
                  left: 0,
                  behavior: 'smooth',
                });
              }}
            >
              <IoArrowDownOutline className='w-8 h-8 md:w-10 md:h-10 animate-bounce hover:text-accent-300' />
            </figure>
          </Timeline>
        </div>

        {/* //* Featured Projects */}
        {/* padding top smaller to reduce gap */}
        <Reveal threshold={0.33}>
          <section id='projects' className='pt-2 pb-16'>
            <FadeUp>
              <main className='layout'>
                <h2 className='mb-4'>
                  <span className='accent'>Featured Projects</span>
                </h2>
                <ul className='grid gap-4 mb-4 md:grid-cols-2'>
                  {featuredProjects.map((project, index) => (
                    <ProjectCard key={index} data={project} />
                  ))}
                </ul>
                <Button href='/projects'>See More</Button>
              </main>
            </FadeUp>
          </section>
        </Reveal>

        {/* //* Featured Posts */}
        <Reveal threshold={0.33}>
          <section className='py-16'>
            <FadeUp>
              <article className='layout'>
                <h2>
                  <span className='accent'>Featured Posts</span>
                </h2>
                <p className='mb-4 component'>
                  Kindly{' '}
                  <CustomLink href='https://buttondown.email/theodorusclarence'>
                    subscribe to my newsletter
                  </CustomLink>{' '}
                  if you want an update everytime I post.
                </p>
                <ul className='mb-4 space-y-4'>
                  {featuredPosts.map((post) => (
                    <PostCard key={post.filePath} index post={post} />
                  ))}
                </ul>
                <div className='space-x-4'>
                  <Button href='/blog'>See More</Button>
                  <Button href='/suggest'>Suggest Topic</Button>
                </div>
              </article>
            </FadeUp>
          </section>
        </Reveal>

        {/* //* Code Library */}
        <Reveal threshold={0.33}>
          <section className='py-16'>
            <FadeUp>
              <article className='layout'>
                <h2 className=''>
                  <span className='accent'>Check out my code library</span>
                </h2>
                <p className='mb-4 component'>
                  List of code snippets that I store for easy access.
                </p>
                <Button href='/library'>Go to Code Library</Button>
              </article>
            </FadeUp>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = postFilePaths
    .filter((filePath) => {
      const slugPath = filePath.replace(/\.mdx?$/, '');
      return featured.find((feature) => feature === slugPath);
    })
    .map((filePath) => {
      const source = fs.readFileSync(path.join(BLOGS_PATH, filePath));
      const { content, data } = matter(source);
      const slug = filePath.replace(/\.mdx?$/, '');

      return {
        content,
        data,
        filePath,
        slug,
        readingTime: readingTime(content).text,
      };
    });

  // Sort Featured Posts Newest First
  featuredPosts.sort(
    (postA, postB) =>
      new Date(postB.data.publishedAt) - new Date(postA.data.publishedAt)
  );

  const featuredProjects = projects.filter((project) =>
    featuredProj.find((pr) => pr === project.id)
  );

  return { props: { featuredPosts, featuredProjects } };
}

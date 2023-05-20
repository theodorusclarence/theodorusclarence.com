import clsx from 'clsx';
import { InferGetStaticPropsType } from 'next';
import * as React from 'react';
import { IoArrowDownOutline } from 'react-icons/io5';
// import { IoNewspaperSharp } from 'react-icons/io5';
// import { SiGithub, SiTwitter } from 'react-icons/si';
import { InView } from 'react-intersection-observer';

import { trackEvent } from '@/lib/analytics';
import { getAllFilesFrontmatter, getFeatured } from '@/lib/mdx';
import { generateRss } from '@/lib/rss';
import useInjectContentMeta from '@/hooks/useInjectContentMeta';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import BlogCard from '@/components/content/blog/BlogCard';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
// import TC from '@/components/TC';

export default function IndexPage({
  featuredPosts,
}: // featuredProjects,
// featuredLibrary,
// introPosts,
InferGetStaticPropsType<typeof getStaticProps>) {
  const populatedPosts = useInjectContentMeta('blog', featuredPosts);
  // const populatedIntro = useInjectContentMeta('blog', introPosts);
  // const populatedProjects = useInjectContentMeta('projects', featuredProjects);
  // const populatedLibrary = useInjectContentMeta('library', featuredLibrary);

  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo />

      <main>
        <section
          className={clsx(
            'min-h-main -mt-20 mb-20 flex flex-col justify-center',
            isLoaded && 'fade-in-start'
          )}
        >
          <article className='layout'>
            <h2 className='text-2xl md:text-4xl 2xl:text-5xl' data-fade='1'>
              Welcome! 👋
            </h2>
            <h1
              className='mt-1 text-3xl md:text-5xl 2xl:text-6xl'
              data-fade='2'
            >
              <Accent>Solution Engineering</Accent> with Jeff Fan
            </h1>
            <p
              className={clsx(
                'mt-4 max-w-4xl text-gray-700 dark:text-gray-200 md:mt-6',
                'md:text-lg 2xl:text-xl'
              )}
              data-fade='3'
            >
              I’m a Senior Solutions Engineer specializing in advocating cloud
              computing and building interesting ideas with cloud. Currently,
              I’m focused on helping customers to build successful products with
              simplicity at DigitalOcean.
            </p>
            {/* <p
              className='mt-3 max-w-4xl leading-relaxed text-gray-700 dark:text-gray-200 md:mt-4 md:text-lg 2xl:text-xl'
              data-fade='4'
            >
              Don't forget to sign my{' '}
              <CustomLink href='/guestbook'>guestbook</CustomLink>!
            </p> */}
            <div
              data-fade='5'
              className='mt-8 flex flex-wrap gap-4 md:!text-lg'
            >
              <div className='group relative'>
                <div
                  className={clsx(
                    'absolute -inset-0.5 animate-tilt rounded blur',
                    'bg-gradient-to-r from-primary-300 to-primary-400',
                    'dark:from-primary-200 dark:via-primary-300',
                    'opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200'
                  )}
                />
                <ButtonLink href='#intro'>Read the blog</ButtonLink>
              </div>
              <ButtonLink href='/about'>Who am I?</ButtonLink>
            </div>
            <div
              data-fade='6'
              className='mt-4 flex flex-wrap gap-4 gap-y-2 md:mt-8'
            >
              {/* <UnstyledLink
                href='https://clarence.link/cv'
                className={clsx(
                  'inline-flex items-center gap-1 text-sm font-medium md:text-base',
                  'text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white',
                  'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
                  'transition-colors'
                )}
                onClick={() => {
                  trackEvent('Social Link: Resume', 'link');
                }}
              >
                <IoNewspaperSharp className='shrink-0' />
                <span>Resume</span>
              </UnstyledLink> */}
              {/* <UnstyledLink
                href='https://twitter.com/th_clarence'
                className={clsx(
                  'inline-flex items-center gap-1 text-sm font-medium md:text-base',
                  'group text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white',
                  'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
                  'transition-colors'
                )}
                onClick={() => {
                  trackEvent('Social Link: Twitter', 'link');
                }}
              >
                <SiTwitter className='shrink-0 transition-colors group-hover:text-[#1da1f2]' />
                <span>@th_clarence</span>
              </UnstyledLink> */}
              {/* <UnstyledLink
                href='https://github.com/iambigmomma'
                className={clsx(
                  'inline-flex items-center gap-1 text-sm font-medium md:text-base',
                  'text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white',
                  'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
                  'transition-colors'
                )}
                onClick={() => {
                  trackEvent('Social Link: Github', 'link');
                }}
              >
                <SiGithub className='shrink-0' />
                <span>iambigmomma</span>
              </UnstyledLink> */}
            </div>
          </article>
          <UnstyledLink
            href='#intro'
            className={clsx(
              'absolute bottom-2 left-1/2 -translate-x-1/2 md:bottom-10',
              'cursor-pointer rounded-md transition-colors',
              'hover:text-primary-300 focus-visible:text-primary-300'
            )}
          >
            <IoArrowDownOutline className='h-8 w-8 animate-bounce md:h-10 md:w-10' />
          </UnstyledLink>
          {/* <TC
            className={clsx(
              'absolute bottom-0 right-6',
              'translate-y-[37%] transform-gpu',
              'w-[calc(100%-3rem)] md:w-[600px] 2xl:w-[900px]',
              'z-[-1] opacity-70 dark:opacity-30'
            )}
          /> */}
        </section>

        {/* <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              id='intro'
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article
                className={clsx(
                  'layout flex flex-col-reverse items-center md:flex-row md:justify-start',
                  'md:gap-4'
                )}
                data-fade='0'
              >
                <div className='mt-8 h-full w-full md:mt-0'>
                  <h2 className='text-4xl md:text-6xl'>
                    <Accent className='inline decoration-clone leading-snug dark:leading-none'>
                      Simplify cloud complexity
                    </Accent>
                  </h2>
                  <p className='mt-4 text-base text-gray-600 dark:text-gray-300 md:text-lg'>
                    <Tooltip
                      withUnderline
                      content={
                        <>
                          Jargon is the specialized terminology associated with
                          a particular field or area of activity.Jargon is
                          normally employed in a particular communicative
                          context and may not be well understood outside that
                          context.
                        </>
                      }
                    >
                      Cloud jargons
                    </Tooltip>{' '}
                    like{' '}
                    <strong className='text-gray-700 dark:text-gray-200'>
                      microservices, CDN, and Kubernetes
                    </strong>{' '}
                    are hard to understand for non-tech people. In this series,
                    I want to simplify the most popular cloud jargon with a
                    proper analogy so that you can engage in more tech-related
                    conversations!
                  </p>
                </div>
                <div className='h-full w-full'>
                  <ul className='relative h-full'>
                    <BlogCard
                      className={clsx(
                        'absolute max-w-[350px] transform-gpu',
                        'top-1/2 translate-y-[-55%] md:translate-y-[-50%] lg:translate-y-[-60%]',
                        'left-1/2 -translate-x-1/2 md:translate-x-[-50%] lg:translate-x-[-30%]',
                        'rotate-3 md:rotate-6 lg:rotate-12',
                        'pointer-events-none md:pointer-events-auto'
                      )}
                      post={populatedIntro[1]}
                    />
                    <BlogCard
                      className='mx-auto max-w-[350px]'
                      post={populatedIntro[0]}
                    />
                  </ul>
                </div>
              </article>
            </section>
          )}
        </InView> */}

        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article className='layout' data-fade='0'>
                <h2 className='text-2xl md:text-4xl' id='blog'>
                  <Accent>Thoughts</Accent>
                </h2>
                <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {populatedPosts.map((post, i) => (
                    <BlogCard
                      key={post.slug}
                      post={post}
                      className={clsx(i > 2 && 'hidden sm:block')}
                    />
                  ))}
                </ul>
                <ButtonLink
                  className='mt-4'
                  href='/blog'
                  onClick={() => trackEvent('Home: See more post', 'navigate')}
                >
                  See more thoughts
                </ButtonLink>
              </article>
            </section>
          )}
        </InView>

        {/* <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article className='layout' data-fade='0'>
                <h2 className='text-2xl md:text-4xl' id='projects'>
                  <Accent>Conference Notes</Accent>
                </h2>
                <p className='mt-2 text-gray-600 dark:text-gray-300'>
                  My learning from impactful conferences
                </p>
                <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {populatedProjects.map((project, i) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      className={clsx(i > 2 && 'hidden sm:block')}
                    />
                  ))}
                </ul>
                <ButtonLink
                  className='mt-4'
                  href='/projects'
                  onClick={() =>
                    trackEvent('Home: See more project', 'navigate')
                  }
                >
                  See more conference notes
                </ButtonLink>
              </article>
            </section>
          )}
        </InView>

        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article className='layout' data-fade='0'>
                <h2 className='text-2xl md:text-4xl' id='library'>
                  <Accent>Cloud Projects</Accent>
                </h2>
                <p className='mt-2 text-gray-600 dark:text-gray-300'>
                  List of demo code that enable you to quickstart an amazing
                  journey!
                </p>
                <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {populatedLibrary.map((snippet, i) => (
                    <LibraryCard
                      key={snippet.slug}
                      snippet={snippet}
                      className={clsx(i > 2 && 'hidden sm:block')}
                    />
                  ))}
                </ul>
                <ButtonLink
                  className='mt-4'
                  href='/library'
                  onClick={() =>
                    trackEvent('Home: See more snippets', 'navigate')
                  }
                >
                  See more projects
                </ButtonLink>
              </article>
            </section>
          )}
        </InView> */}
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  generateRss();

  const blogs = await getAllFilesFrontmatter('blog');
  const projects = await getAllFilesFrontmatter('projects');
  const library = await getAllFilesFrontmatter('library');

  const featuredPosts = getFeatured(blogs, ['cloud-expo-2023']);
  const featuredProjects = getFeatured(projects, []);
  const featuredLibrary = getFeatured(library, []);

  const introPosts = getFeatured(blogs, ['cloud-expo-2023']);

  return {
    props: { featuredPosts, featuredProjects, featuredLibrary, introPosts },
  };
}

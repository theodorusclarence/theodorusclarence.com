import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

import { getFiles, getFileBySlug } from '@/utils/mdx';
import {
  checkBlogPrefix,
  classNames,
  formatDate,
  ogGenerate,
} from '@/utils/helper.js';

import useScrollSpy from '@/hooks/useScrollspy';
import useContentMeta from '@/hooks/useContentMeta';

import Seo from '@/components/Seo';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Comments from '@/components/Comments';
import LikeButton from '@/components/LikeButton';
import CustomLink from '@/components/CustomLink';
import UnstyledLink from '@/components/UnstyledLink';
import MDXComponents from '@/components/blog/MDXComponents';
import SubscribeCard from '@/components/blog/SubscribeCard';
import CloudinaryImg from '@/components/CloudinaryImg';

export default function PostPage({ code, frontMatter }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  const title = `${frontMatter.title} – theodorusclarence.com`;
  const description = frontMatter.description;
  const checkedSlug = checkBlogPrefix(frontMatter.slug);
  const isEnglish = checkedSlug === frontMatter.slug;

  const { isLoading, contentViews } = useContentMeta(`b_${checkedSlug}`, {
    runEffect: true,
  });

  const imageOg = ogGenerate(frontMatter.title, 'Blog', description);

  useEffect(() => {
    document.documentElement.classList.add('smooth');

    return () => {
      document.documentElement.classList.remove('smooth');
    };
  }, []);

  //#region  //*============== Scrollspy
  const activeSection = useScrollSpy();

  const [toc, setToc] = useState(null);
  const minLevel =
    toc?.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0;

  useEffect(() => {
    const headings = document.querySelectorAll('.mdx h1, .mdx h2, .mdx h3');

    const headingArr = [];
    headings.forEach((heading) => {
      const id = heading.id;
      const level = +heading.tagName.replace('H', '');
      const text = heading.textContent;

      headingArr.push({ id, level, text });
    });

    setToc(headingArr);
  }, []);
  //#endregion  //*============== Scrollspy

  return (
    <>
      <Seo
        title={title}
        description={description}
        image={imageOg}
        date={new Date(frontMatter.publishedAt).toISOString()}
        type='article'
      />
      <div className='flex flex-col min-h-screen'>
        <Nav large />

        <section className='py-6 mt-4'>
          <main className='layout lg:max-w-[68rem]'>
            <div className='pb-4 border-b-thin dark:border-gray-600'>
              <figure className='overflow-hidden rounded-md shadow-md dark:shadow-none'>
                <CloudinaryImg
                  publicId={`theodorusclarence/banner/${
                    frontMatter?.banner ?? 'nextjs-vs-cra_oql54x'
                  }`}
                  alt='Photo taken from unsplash'
                  width={1200}
                  height={(1200 * 2) / 5}
                  aspect={{ height: 2, width: 5 }}
                />
              </figure>

              <h1 className='mt-4 mb-2 '>{frontMatter.title}</h1>

              <p className='component text-dark dark:text-light'>
                Written on {formatDate(frontMatter.publishedAt)} by{' '}
                <div className='inline-flex items-end align-bottom'>
                  <div style={{ width: 25, height: 25 }}>
                    <Image
                      width={500}
                      className='rounded-full'
                      height={500}
                      objectFit='cover'
                      src={'/images/me-square.jpg'}
                      alt={'photo of me'}
                    />{' '}
                  </div>
                  <p className='ml-1'>Theodorus Clarence.</p>
                </div>
                <p className='mt-1'>
                  {isLoading ? '–––' : contentViews} views •{' '}
                  {frontMatter.readingTime.text}
                </p>
                {!frontMatter?.englishOnly && (
                  <CustomLink
                    href={`/blog/${isEnglish ? 'id-' : ''}${checkedSlug}`}
                    className='mt-2'
                  >
                    Read in {isEnglish ? 'Bahasa Indonesia' : 'English'}
                  </CustomLink>
                )}
              </p>
            </div>

            <div className='lg:grid lg:grid-cols-[auto,250px] lg:gap-8'>
              <article className='w-full py-4 mx-auto prose transition-colors mdx dark:prose-dark'>
                <Component
                  components={{
                    ...MDXComponents,
                  }}
                />
              </article>

              <aside className='py-4'>
                <div className='sticky top-36'>
                  <div className='overflow-auto max-h-[calc(100vh-9rem-113px)] pb-4 lg:block hidden'>
                    <h3 className='text-gray-900 dark:text-gray-100 md:text-xl'>
                      Table of Contents
                    </h3>
                    <div className='flex flex-col mt-4 space-y-2 text-sm'>
                      {toc
                        ? toc.map(({ id, level, text }) => (
                            <UnstyledLink
                              href={`#${id}`}
                              className={classNames(
                                'font-medium hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none',
                                'focus-visible:text-gray-700 dark:focus-visible:text-gray-200',
                                activeSection === id
                                  ? 'text-gray-900 dark:text-gray-100'
                                  : 'text-gray-400 dark:text-gray-500'
                              )}
                              style={{ marginLeft: (level - minLevel) * 16 }}
                            >
                              {text}
                            </UnstyledLink>
                          ))
                        : null}
                    </div>
                  </div>
                  <div className='flex items-center justify-center py-8'>
                    <LikeButton slug={`b_${checkedSlug}`} />
                  </div>
                </div>
              </aside>
            </div>

            <SubscribeCard className='mt-4' />

            <div className='mt-4'>
              <Comments />
            </div>

            <div className='flex flex-col items-start gap-4 mt-4 md:flex-row-reverse md:justify-between'>
              <CustomLink
                href={`https://github.com/theodorusclarence/theodorusclarence.com/blob/main/data/blog/${frontMatter.slug}.mdx`}
              >
                Edit this on GitHub
              </CustomLink>
              <UnstyledLink
                href='/blog'
                className='inline-block rounded-sm view ring-vis'
              >
                ← Back to blog
              </UnstyledLink>
            </div>
          </main>
        </section>
        <Footer large />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await getFiles('blog');

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug('blog', params.slug);

  return { props: { ...post } };
}

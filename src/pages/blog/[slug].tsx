/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';
import { format } from 'date-fns';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';
import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi';

import { cleanBlogPrefix } from '@/lib/helper';
import { getFileBySlug, getFiles } from '@/lib/mdx';
import useScrollSpy from '@/hooks/useScrollspy';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Comment from '@/components/mdx/Comment';
import MDXComponents from '@/components/mdx/MDXComponents';
import Seo from '@/components/Seo';

import { Content } from '@/types/content';

type HeadingScrollSpy = Array<{ id: string; level: number; text: string }>;

export default function SingleBlogPage({ code, frontMatter }: Content) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  //#region  //*=========== Blog Language ===========
  const checkedSlug = cleanBlogPrefix(frontMatter.slug);
  const isEnglish = checkedSlug === frontMatter.slug;
  //#endregion  //*======== Blog Language ===========

  //#region  //*=========== Scrollspy ===========
  const activeSection = useScrollSpy();

  const [toc, setToc] = React.useState<HeadingScrollSpy>();
  const minLevel =
    toc?.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0;

  React.useEffect(() => {
    const headings = document.querySelectorAll('.mdx h1, .mdx h2, .mdx h3');

    const headingArr: HeadingScrollSpy = [];
    headings.forEach((heading) => {
      const id = heading.id;
      const level = +heading.tagName.replace('H', '');
      const text = heading.textContent + '';

      headingArr.push({ id, level, text });
    });

    setToc(headingArr);
  }, []);
  //#endregion  //*======== Scrollspy ===========

  return (
    <Layout>
      <Seo
        templateTitle={frontMatter.title}
        description={frontMatter.description}
      />

      <main>
        <section className=''>
          <div className='layout'>
            <div className='pb-4 border-b-thin dark:border-gray-600'>
              {/* <figure className='overflow-hidden rounded-md shadow-md dark:shadow-none'>
                <CloudinaryImg
                  publicId={`theodorusclarence/banner/${
                    frontMatter?.banner ?? 'nextjs-vs-cra_oql54x'
                  }`
                  alt='Photo taken from unsplash'
                  width={1200}
                  height={(1200 * 2) / 5}
                  aspect={{ height: 2, width: 5 }}
                />
              </figure> */}

              <h1 className='mt-4'>{frontMatter.title}</h1>

              <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                Written on{' '}
                {format(new Date(frontMatter.publishedAt), 'MMMM dd, yyyy')} by
                Theodorus Clarence.
                {frontMatter.lastUpdated && (
                  <span className='font-medium text-gray-700 dark:text-gray-200'>
                    {' '}
                    Last updated{' '}
                    {format(new Date(frontMatter.lastUpdated), 'MMMM dd, yyyy')}
                  </span>
                )}
              </p>
              <div className='flex items-center justify-start gap-2 mt-2 text-sm font-medium text-gray-600 dark:text-gray-300'>
                <div className='flex items-center gap-1'>
                  <HiOutlineClock className='inline-block text-base' />
                  <Accent>{frontMatter.readingTime.text}</Accent>
                </div>
                <div className='flex items-center gap-1'>
                  <HiOutlineEye className='inline-block text-base' />
                  <Accent>
                    {/* {frontMatter?.views ?? '–––'}  */}
                    10 views
                  </Accent>
                </div>
              </div>
              {!frontMatter?.englishOnly && (
                <CustomLink
                  href={clsx('/blog/', isEnglish ? 'id-' : '', checkedSlug)}
                  className='mt-2'
                >
                  Read in {isEnglish ? 'Bahasa Indonesia' : 'English'}
                </CustomLink>
              )}
            </div>

            <hr className='dark:border-gray-600' />

            <section className='lg:grid lg:grid-cols-[auto,250px] lg:gap-8'>
              <article className='w-full mx-auto mt-4 prose transition-colors mdx dark:prose-dark'>
                <Component
                  components={
                    {
                      ...MDXComponents,
                    } as any
                  }
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
                              key={id}
                              href={`#${id}`}
                              className={clsx(
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
                    {/* <LikeButton slug={`b_${checkedSlug}`} /> */}
                  </div>
                </div>
              </aside>
            </section>

            <figure className='mt-4'>
              <Comment />
            </figure>

            <div className='flex flex-col items-start gap-4 mt-4 md:flex-row-reverse md:justify-between'>
              <CustomLink
                href={`https://github.com/theodorusclarence/theodorusclarence.com/blob/main/data/blog/${frontMatter.slug}.mdx`}
              >
                Edit this on GitHub
              </CustomLink>
              <CustomLink href='/blog'>← Back to blog</CustomLink>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFiles('blog');

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const post = await getFileBySlug('blog', params?.slug as string);

  return { props: { ...post } };
};

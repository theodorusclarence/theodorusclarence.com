import { useEffect, useMemo, useState } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

import { ogGenerate, classNames } from '@/utils/helper';
import { getFileBySlug, getFiles } from '@/utils/mdx';

import useScrollSpy from '@/hooks/useScrollspy';
import useContentMeta from '@/hooks/useContentMeta';

import Seo from '@/components/Seo';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Comments from '@/components/Comments';
import CustomLink from '@/components/CustomLink';
import LikeButton from '@/components/LikeButton';
import UnstyledLink from '@/components/UnstyledLink';
import MDXComponents from '@/components/blog/MDXComponents';

export default function PostPage({ code, frontMatter }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  const title = `${frontMatter.title} – theodorusclarence.com`;
  const description = frontMatter.description;

  const { isLoading, contentViews } = useContentMeta(`l_${frontMatter.slug}`, {
    runEffect: true,
  });

  const imageOg = ogGenerate(frontMatter.title, 'Code Snippets');

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
      <Seo title={title} description={description} image={imageOg} />
      <div className='flex flex-col min-h-screen'>
        <Nav large />

        <section className='py-6 mt-4'>
          <main className='layout lg:max-w-[68rem]'>
            <div className='pb-4 border-b-thin dark:border-gray-600'>
              <h1 className='mb-2'>{frontMatter.title}</h1>

              <p className='component text-dark dark:text-light'>
                {frontMatter.description}
              </p>
              <p className='mt-2'>{isLoading ? '–––' : contentViews} views</p>
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
                    <LikeButton slug={`l_${frontMatter.slug}`} />
                  </div>
                </div>
              </aside>
            </div>

            <Comments />

            <div className='flex flex-col items-start gap-4 mt-4 md:flex-row-reverse md:justify-between'>
              <CustomLink
                href={`https://github.com/theodorusclarence/theodorusclarence.com/blob/main/data/library/${frontMatter.slug}.mdx`}
              >
                Edit this on GitHub
              </CustomLink>
              <UnstyledLink
                href='/library'
                className='inline-block rounded-sm view ring-vis'
              >
                ← Back to library
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
  const snippets = await getFiles('library');

  return {
    paths: snippets.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const snippet = await getFileBySlug('library', params.slug);

  return { props: { ...snippet } };
}

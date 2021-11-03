import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';
import { HiOutlineEye } from 'react-icons/hi';

import { getFileBySlug, getFiles } from '@/lib/mdx';
import useScrollSpy from '@/hooks/useScrollspy';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import MDXComponents from '@/components/mdx/MDXComponents';
import TableOfContents, {
  HeadingScrollSpy,
} from '@/components/mdx/TableOfContents';
import Seo from '@/components/Seo';

import { LibraryType } from '@/types/content';

export default function SingleLibraryPage({ code, frontMatter }: LibraryType) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

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
              <h1 className='mt-4'>{frontMatter.title}</h1>
              <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                {frontMatter.description}
              </p>
              <div className='flex items-center justify-start gap-2 mt-2 text-sm font-medium text-gray-600 dark:text-gray-300'>
                <div className='flex items-center gap-1'>
                  <HiOutlineEye className='inline-block text-base' />
                  <Accent>
                    {/* {frontMatter?.views ?? '–––'}  */}
                    10 views
                  </Accent>
                </div>
              </div>
            </div>

            <hr className='dark:border-gray-600' />

            <section className='lg:grid lg:grid-cols-[auto,250px] lg:gap-8'>
              <article className='w-full mx-auto mt-4 prose transition-colors mdx dark:prose-dark'>
                <Component
                  components={
                    {
                      ...MDXComponents,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                      <TableOfContents
                        activeSection={activeSection}
                        toc={toc}
                        minLevel={minLevel}
                      />
                    </div>
                  </div>
                  <div className='flex items-center justify-center py-8'>
                    {/* <LikeButton slug={`b_${checkedSlug}`} /> */}
                  </div>
                </div>
              </aside>
            </section>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFiles('library');

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
  const post = await getFileBySlug('library', params?.slug as string);

  return {
    props: { ...post },
  };
};

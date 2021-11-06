import clsx from 'clsx';
import { format } from 'date-fns';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';
import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi';

import { cleanBlogPrefix } from '@/lib/helper';
import { getFileBySlug, getFiles, getRecommendations } from '@/lib/mdx';
import useContentMeta from '@/hooks/useContentMeta';
import useScrollSpy from '@/hooks/useScrollspy';

import Accent from '@/components/Accent';
import BlogCard from '@/components/blog/BlogCard';
import SubscribeCard from '@/components/blog/SubscribeCard';
import CloudinaryImg from '@/components/CloudinaryImg';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import Comment from '@/components/mdx/Comment';
import LikeButton from '@/components/mdx/LikeButton';
import MDXComponents from '@/components/mdx/MDXComponents';
import TableOfContents, {
  HeadingScrollSpy,
} from '@/components/mdx/TableOfContents';
import Seo from '@/components/Seo';

import { BlogFrontmatter, BlogType } from '@/types/content';

type SingleBlogPageProps = {
  recommendations: BlogFrontmatter[];
} & BlogType;

export default function SingleBlogPage({
  code,
  frontMatter,
  recommendations,
}: SingleBlogPageProps) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  //#region  //*=========== Blog Language ===========
  const cleanSlug = cleanBlogPrefix(frontMatter.slug);
  const isEnglish = cleanSlug === frontMatter.slug;
  //#endregion  //*======== Blog Language ===========

  //#region  //*=========== Content Meta ===========
  const contentSlug = `b_${cleanSlug}`;
  const meta = useContentMeta(contentSlug, { runIncrement: true });
  //#endregion  //*======== Content Meta ===========

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
            <div className='pb-4 dark:border-gray-600'>
              <CloudinaryImg
                publicId={`theodorusclarence/banner/${frontMatter.banner}`}
                alt={`Photo from unsplash: ${frontMatter.banner}`}
                width={1200}
                height={(1200 * 2) / 5}
                aspect={{ height: 2, width: 5 }}
              />

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
                  <Accent>{meta?.views ?? '–––'} views</Accent>
                </div>
              </div>
              {!frontMatter?.englishOnly && (
                <CustomLink
                  href={`/blog/${isEnglish ? 'id-' : ''}${cleanSlug}`}
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
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any
                  }
                />
              </article>

              <aside className='py-4'>
                <div className='sticky top-36'>
                  <TableOfContents
                    toc={toc}
                    minLevel={minLevel}
                    activeSection={activeSection}
                  />
                  <div className='flex items-center justify-center py-8'>
                    <LikeButton slug={contentSlug} />
                  </div>
                </div>
              </aside>
            </section>

            <figure className='mt-12'>
              <Comment />
            </figure>

            {recommendations.length > 0 && (
              <div className='mt-20'>
                <h2>
                  <Accent>Other posts that you might like</Accent>
                </h2>
                <ul className='grid gap-4 mt-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {recommendations.map((post, i) => (
                    <BlogCard
                      className={clsx({ 'hidden xl:block': i === 2 })}
                      key={post.slug}
                      post={post}
                    />
                  ))}
                </ul>
              </div>
            )}

            <SubscribeCard className='mt-12' title='Enjoying this post?' />

            <div className='flex flex-col items-start gap-4 mt-8 md:flex-row-reverse md:justify-between'>
              <CustomLink
                href={`https://github.com/theodorusclarence/theodorusclarence.com/blob/main/src/contents/blog/${frontMatter.slug}.mdx`}
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

  const recommendations = await getRecommendations(params?.slug as string);

  return {
    props: { ...post, recommendations },
  };
};

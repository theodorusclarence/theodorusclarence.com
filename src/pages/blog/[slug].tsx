import clsx from 'clsx';
import { format } from 'date-fns';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';
import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi';

import { trackEvent } from '@/lib/analytics';
import { cleanBlogPrefix } from '@/lib/helper';
import { getFileBySlug, getFiles, getRecommendations } from '@/lib/mdx';
import useContentMeta from '@/hooks/useContentMeta';
import useInjectContentMeta from '@/hooks/useInjectContentMeta';
import useScrollSpy from '@/hooks/useScrollspy';

import Accent from '@/components/Accent';
import BlogCard from '@/components/content/blog/BlogCard';
import SubscribeCard from '@/components/content/blog/SubscribeCard';
import Comment from '@/components/content/Comment';
import LikeButton from '@/components/content/LikeButton';
import MDXComponents from '@/components/content/MDXComponents';
import ReloadDevtool from '@/components/content/ReloadDevtool';
import TableOfContents, {
  HeadingScrollSpy,
} from '@/components/content/TableOfContents';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

import { BlogFrontmatter, BlogType } from '@/types/frontmatters';

type SingleBlogPageProps = {
  recommendations: BlogFrontmatter[];
} & BlogType;

export default function SingleBlogPage({
  code,
  frontmatter,
  recommendations,
}: SingleBlogPageProps) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  const populatedRecommendations = useInjectContentMeta(
    'blog',
    recommendations
  );

  //#region  //*=========== Blog Language ===========
  const cleanSlug = cleanBlogPrefix(frontmatter.slug);
  const isEnglish = cleanSlug === frontmatter.slug;
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
  }, [frontmatter.slug]);
  //#endregion  //*======== Scrollspy ===========

  return (
    <Layout>
      <Seo
        templateTitle={frontmatter.title}
        description={frontmatter.description}
      />

      <main>
        <ReloadDevtool />
        <section className=''>
          <div className='layout'>
            <div className='dark:border-gray-600 pb-4'>
              <CloudinaryImg
                publicId={`theodorusclarence/banner/${frontmatter.banner}`}
                alt={`Photo from unsplash: ${frontmatter.banner}`}
                width={1200}
                height={(1200 * 2) / 5}
                aspect={{ height: 2, width: 5 }}
              />

              <h1 className='mt-4'>{frontmatter.title}</h1>

              <p className='dark:text-gray-300 mt-2 text-gray-600 text-sm'>
                Written on{' '}
                {format(new Date(frontmatter.publishedAt), 'MMMM dd, yyyy')} by
                Theodorus Clarence.
                {frontmatter.lastUpdated && (
                  <span className='dark:text-gray-200 font-medium text-gray-700'>
                    {' '}
                    Last updated{' '}
                    {format(new Date(frontmatter.lastUpdated), 'MMMM dd, yyyy')}
                  </span>
                )}
              </p>
              <div className='dark:text-gray-300 flex font-medium gap-2 items-center justify-start mt-2 text-gray-600 text-sm'>
                <div className='flex gap-1 items-center'>
                  <HiOutlineClock className='inline-block text-base' />
                  <Accent>{frontmatter.readingTime.text}</Accent>
                </div>
                <div className='flex gap-1 items-center'>
                  <HiOutlineEye className='inline-block text-base' />
                  <Accent>{meta?.views ?? '–––'} views</Accent>
                </div>
              </div>
              {!frontmatter?.englishOnly && (
                <CustomLink
                  href={`/blog/${isEnglish ? 'id-' : ''}${cleanSlug}`}
                  className='mt-2'
                >
                  Read in {isEnglish ? 'Bahasa Indonesia' : 'English'}
                </CustomLink>
              )}
            </div>

            <hr className='dark:border-gray-600' />

            <section className='lg:gap-8 lg:grid lg:grid-cols-[auto,250px]'>
              <article className='dark:prose-dark mdx mt-4 mx-auto prose transition-colors w-full'>
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

            {populatedRecommendations.length > 0 && (
              <div className='mt-20'>
                <h2>
                  <Accent>Other posts that you might like</Accent>
                </h2>
                <ul className='gap-4 grid mt-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {populatedRecommendations.map((post, i) => (
                    <BlogCard
                      onClick={() => {
                        trackEvent(post.slug, 'recommend');
                      }}
                      className={clsx({ 'hidden xl:block': i === 2 })}
                      key={post.slug}
                      post={post}
                    />
                  ))}
                </ul>
              </div>
            )}

            <SubscribeCard className='mt-12' title='Enjoying this post?' />

            <div className='flex flex-col gap-4 items-start mt-8 md:flex-row-reverse md:justify-between'>
              <CustomLink
                href={`https://github.com/theodorusclarence/theodorusclarence.com/blob/main/src/contents/blog/${frontmatter.slug}.mdx`}
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

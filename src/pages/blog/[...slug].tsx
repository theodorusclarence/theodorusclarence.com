import clsx from 'clsx';
import { format } from 'date-fns';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import * as React from 'react';
import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi';
import { MdHistory } from 'react-icons/md';

import { trackEvent } from '@/lib/analytics';
import { cleanBlogPrefix } from '@/lib/helper.client';
import {
  getFileBySlug,
  getFileSlugArray,
  getRecommendations,
} from '@/lib/mdx.server';
import useContentMeta from '@/hooks/useContentMeta';
import useInjectContentMeta from '@/hooks/useInjectContentMeta';
import useScrollSpy from '@/hooks/useScrollspy';

import Accent from '@/components/Accent';
import CarbonAds from '@/components/CarbonAds';
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
import ShareTweetButton from '@/components/links/ShareTweetButton';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import Tooltip from '@/components/Tooltip';

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

  //#region  //*=========== Link Constants ===========
  const COMMIT_HISTORY_LINK = `https://github.com/theodorusclarence/theodorusclarence.com/commits/main/src/contents/blog/${frontmatter.slug}.mdx`;
  const GITHUB_EDIT_LINK = `https://github.com/theodorusclarence/theodorusclarence.com/blob/main/src/contents/blog/${frontmatter.slug}.mdx`;
  const OG_BANNER_LINK = `https://res.cloudinary.com/theodorusclarence/image/upload/f_auto,g_auto,c_fill,ar_4:5,w_1200/theodorusclarence/banner/${frontmatter.banner}`;
  //#endregion  //*======== Link Constants ===========

  //#region  //*=========== Blog Language ===========
  // TODO: add implementation, should be bugged if folder/id-slug.mdx
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
        isBlog
        banner={OG_BANNER_LINK}
        date={new Date(
          frontmatter.lastUpdated ?? frontmatter.publishedAt
        ).toISOString()}
        canonical={frontmatter.repost}
        tags={frontmatter.tags}
      />

      <main>
        <ReloadDevtool />
        <section className=''>
          <div className='layout'>
            <div className='pb-4 dark:border-gray-600'>
              <CloudinaryImg
                publicId={`theodorusclarence/banner/${frontmatter.banner}`}
                alt={`Photo from unsplash: ${frontmatter.banner}`}
                width={1200}
                height={(1200 * 2) / 5}
                aspect={{ height: 2, width: 5 }}
              />

              <h1 className='mt-4'>{frontmatter.title}</h1>

              <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                Written on{' '}
                {format(new Date(frontmatter.publishedAt), 'MMMM dd, yyyy')} by
                Theodorus Clarence.
              </p>
              {frontmatter.lastUpdated && (
                <div className='mt-2 flex flex-wrap gap-2 text-sm text-gray-700 dark:text-gray-200'>
                  <p>
                    Last updated{' '}
                    {format(new Date(frontmatter.lastUpdated), 'MMMM dd, yyyy')}
                    .
                  </p>
                  <UnstyledLink
                    href={COMMIT_HISTORY_LINK}
                    className={clsx(
                      'inline-flex items-center gap-1 rounded-sm font-medium',
                      'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-primary-300',
                      'focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
                    )}
                  >
                    <MdHistory className='text-lg' />
                    <span>See changes</span>
                  </UnstyledLink>
                </div>
              )}
              <div className='mt-6 flex items-center justify-start gap-2 text-sm font-medium text-gray-600 dark:text-gray-300'>
                <div className='flex items-center gap-1'>
                  <HiOutlineClock className='inline-block text-base' />
                  <Accent>{frontmatter.readingTime.text}</Accent>
                </div>
                {meta?.devtoViews ? (
                  <Tooltip
                    tipChildren={
                      <>
                        {meta.devtoViews.toLocaleString()} views on{' '}
                        <CustomLink href='https://dev.to/theodorusclarence'>
                          dev.to
                        </CustomLink>
                      </>
                    }
                    position='bottom'
                  >
                    <div className='flex items-center gap-1'>
                      <HiOutlineEye className='inline-block text-base' />
                      <Accent>
                        {meta?.views?.toLocaleString() ?? '–––'} views
                      </Accent>
                    </div>
                  </Tooltip>
                ) : (
                  <div className='flex items-center gap-1'>
                    <HiOutlineEye className='inline-block text-base' />
                    <Accent>
                      {meta?.views?.toLocaleString() ?? '–––'} views
                    </Accent>
                  </div>
                )}
              </div>
              {!frontmatter?.englishOnly && (
                <CustomLink
                  href={`/blog/${isEnglish ? 'id-' : ''}${cleanSlug}`}
                  className='mt-4'
                >
                  Read in {isEnglish ? 'Bahasa Indonesia' : 'English'}
                </CustomLink>
              )}
            </div>

            <hr className='dark:border-gray-600' />

            <section className='lg:grid lg:grid-cols-[auto,250px] lg:gap-8'>
              <article className='mdx prose mx-auto mt-4 w-full transition-colors dark:prose-invert'>
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

            <ShareTweetButton
              className='mt-12'
              url={`https://theodorusclarence.com/blog/${frontmatter.slug}`}
              title={frontmatter.title}
            />

            <CarbonAds className='mt-8' />

            <figure className='mt-12'>
              <Comment key={frontmatter.slug} />
            </figure>

            {populatedRecommendations.length > 0 && (
              <div className='mt-20'>
                <h2>
                  <Accent>Other posts that you might like</Accent>
                </h2>
                <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {populatedRecommendations.map((post, i) => (
                    <BlogCard
                      onClick={() => {
                        trackEvent(post.slug, { type: 'recommend' });
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

            <div className='mt-8 flex flex-col items-start gap-4 md:flex-row-reverse md:justify-between'>
              <CustomLink href={GITHUB_EDIT_LINK}>
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
  const posts = await getFileSlugArray('blog');

  return {
    paths: posts.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};

interface Params extends ParsedUrlQuery {
  slug: string[];
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as Params;

  const post = await getFileBySlug('blog', slug.join('/'));
  const recommendations = await getRecommendations(slug.join('/'));

  return {
    props: { ...post, recommendations },
  };
};

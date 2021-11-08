import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';
import { HiLink, HiOutlineEye, HiPlay } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';

import { getFileBySlug, getFiles } from '@/lib/mdx';
import useContentMeta from '@/hooks/useContentMeta';
import useScrollSpy from '@/hooks/useScrollspy';

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

import { ProjectType } from '@/types/content';

export default function SingleProjectPage({ code, frontMatter }: ProjectType) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  //#region  //*=========== Content Meta ===========
  const contentSlug = `p_${frontMatter.slug}`;
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
            <CloudinaryImg
              publicId={`theodorusclarence/${frontMatter.banner}`}
              alt={frontMatter.title}
              width={1440}
              height={792}
            />

            <h1 className='mt-4'>{frontMatter.title}</h1>
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
              {frontMatter.description}
            </p>
            <div className='flex flex-wrap items-center justify-start gap-3 mt-2 text-sm font-medium text-gray-600 dark:text-gray-300'>
              <div className='flex items-center gap-1'>
                <HiOutlineEye className='inline-block text-base' />
                {meta?.views ?? '–––'} views
              </div>
              <span>-</span>
              {frontMatter.github && (
                <CustomLink
                  // onClick={() => trackEvent(`Project Github: ${frontMatter.name}`, 'link')}
                  href={frontMatter.github}
                  className='mt-1'
                >
                  <span className='inline-flex items-center gap-2'>
                    <SiGithub className='text-lg text-gray-800 dark:text-white' />
                    <span>Repository</span>
                  </span>
                </CustomLink>
              )}
              {frontMatter.github &&
                (frontMatter.youtube || frontMatter.link) &&
                ' - '}
              {frontMatter.youtube && (
                <CustomLink
                  href={frontMatter.youtube}
                  className='mt-1'
                  // onClick={() => trackEvent(`Project Video: ${frontMatter.name}`, 'link')}
                >
                  <span className='inline-flex items-center gap-2'>
                    <HiPlay className='text-xl text-gray-800 dark:text-white' />
                    <span>Demo Video</span>
                  </span>
                </CustomLink>
              )}
              {frontMatter.youtube && frontMatter.link && ' - '}
              {frontMatter.link && (
                <CustomLink
                  href={frontMatter.link}
                  className='mt-1'

                  // onClick={() => trackEvent(`Project Live: ${frontMatter.name}`, 'link')}
                >
                  <span className='inline-flex items-center gap-2'>
                    <HiLink className='text-lg text-gray-800 dark:text-white' />
                    <span>Open Live Site</span>
                  </span>
                </CustomLink>
              )}
            </div>

            <hr className='mt-4 dark:border-gray-600' />

            <section className='lg:grid lg:grid-cols-[auto,250px] lg:gap-8'>
              <article className='w-full mx-auto prose transition-colors projects mdx dark:prose-dark'>
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

            <div className='flex flex-col items-start gap-4 mt-8 md:flex-row-reverse md:justify-between'>
              <CustomLink
                href={`https://github.com/theodorusclarence/theodorusclarence.com/blob/main/src/contents/projects/${frontMatter.slug}.mdx`}
              >
                Edit this on GitHub
              </CustomLink>
              <CustomLink href='/projects'>← Back to projects</CustomLink>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFiles('projects');

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
  const post = await getFileBySlug('projects', params?.slug as string);

  return {
    props: { ...post },
  };
};

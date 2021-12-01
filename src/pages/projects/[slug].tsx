import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';
import { HiLink, HiOutlineEye, HiPlay, HiUser } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';

import { trackEvent } from '@/lib/analytics';
import { getFileBySlug, getFiles } from '@/lib/mdx';
import useContentMeta from '@/hooks/useContentMeta';
import useScrollSpy from '@/hooks/useScrollspy';

import Comment from '@/components/content/Comment';
import LikeButton from '@/components/content/LikeButton';
import MDXComponents from '@/components/content/MDXComponents';
import TableOfContents, {
  HeadingScrollSpy,
} from '@/components/content/TableOfContents';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

import { ProjectType } from '@/types/frontmatters';

export default function SingleProjectPage({ code, frontmatter }: ProjectType) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  //#region  //*=========== Content Meta ===========
  const contentSlug = `p_${frontmatter.slug}`;
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
        <section className=''>
          <div className='layout'>
            <CloudinaryImg
              publicId={`theodorusclarence/${frontmatter.banner}`}
              alt={frontmatter.title}
              width={1440}
              height={792}
            />

            <h1 className='mt-4'>{frontmatter.title}</h1>
            <p className='dark:text-gray-300 mt-2 text-gray-600 text-sm'>
              {frontmatter.description}
            </p>

            <div className='dark:text-gray-300 flex flex-wrap font-medium gap-3 items-center justify-start mt-2 text-gray-600 text-sm'>
              <div className='flex gap-1 items-center'>
                <HiOutlineEye className='inline-block text-base' />
                {meta?.views ?? '–––'} views
              </div>
              {(frontmatter.github ||
                frontmatter.youtube ||
                frontmatter.link) &&
                ' - '}
              {frontmatter.github && (
                <div className='gap-2 inline-flex items-center'>
                  <SiGithub className='dark:text-white text-gray-800 text-lg' />
                  <CustomLink
                    onClick={() =>
                      trackEvent(`Project Github: ${frontmatter.title}`, 'link')
                    }
                    href={frontmatter.github}
                    className='mt-1'
                  >
                    Repository
                  </CustomLink>
                </div>
              )}
              {frontmatter.github &&
                (frontmatter.youtube || frontmatter.link) &&
                ' - '}
              {frontmatter.youtube && (
                <div className='gap-2 inline-flex items-center'>
                  <HiPlay className='dark:text-white text-gray-800 text-xl' />
                  <CustomLink
                    href={frontmatter.youtube}
                    className='mt-1'
                    onClick={() =>
                      trackEvent(`Project Video: ${frontmatter.title}`, 'link')
                    }
                  >
                    Demo Video
                  </CustomLink>
                </div>
              )}
              {frontmatter.youtube && frontmatter.link && ' - '}
              {frontmatter.link && (
                <div className='gap-2 inline-flex items-center'>
                  <HiLink className='dark:text-white text-gray-800 text-lg' />
                  <CustomLink
                    href={frontmatter.link}
                    className='mt-1'
                    onClick={() =>
                      trackEvent(`Project Live: ${frontmatter.title}`, 'link')
                    }
                  >
                    Open Live Site
                  </CustomLink>
                </div>
              )}
            </div>

            {frontmatter.category && (
              <p className='dark:text-gray-300 flex gap-2 items-center justify-start mt-2 text-gray-600 text-sm'>
                <HiUser className='dark:text-white text-gray-800 text-lg' />{' '}
                {frontmatter.category}
              </p>
            )}

            <hr className='dark:border-gray-600 mt-4' />

            <section className='lg:gap-8 lg:grid lg:grid-cols-[auto,250px]'>
              <article className='dark:prose-dark mdx mx-auto projects prose transition-colors w-full'>
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

            <div className='flex flex-col gap-4 items-start mt-8 md:flex-row-reverse md:justify-between'>
              <CustomLink
                href={`https://github.com/theodorusclarence/theodorusclarence.com/blob/main/src/contents/projects/${frontmatter.slug}.mdx`}
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

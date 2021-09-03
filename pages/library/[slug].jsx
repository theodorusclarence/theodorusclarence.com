import { useEffect, useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

import { ogGenerate } from '@/utils/helper';
import { getFileBySlug, getFiles } from '@/utils/mdx';
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

  return (
    <>
      <Seo title={title} description={description} image={imageOg} />
      <div className='flex flex-col min-h-screen'>
        <Nav />

        <section className='py-6 mt-4'>
          <main className='layout'>
            <div className='pb-4 border-b-thin dark:border-gray-600'>
              <h1 className='mb-2'>{frontMatter.title}</h1>

              <p className='component text-dark dark:text-light'>
                {frontMatter.description}
              </p>
              <p className='mt-2'>{isLoading ? '–––' : contentViews} views</p>
            </div>

            <article className='py-4 mx-auto prose transition-colors mdx dark:prose-dark'>
              <Component
                components={{
                  ...MDXComponents,
                }}
              />
            </article>

            <div className='flex items-center justify-center py-8'>
              <LikeButton slug={`l_${frontMatter.slug}`} />
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
        <Footer />
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

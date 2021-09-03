import Image from 'next/image';
import { useEffect, useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

import { getFiles, getFileBySlug } from '@/utils/mdx';
import { checkBlogPrefix, formatDate, ogGenerate } from '@/utils/helper.js';

import useContentMeta from '@/hooks/useContentMeta';

import Seo from '@/components/Seo';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Comments from '@/components/Comments';
import LikeButton from '@/components/LikeButton';
import CustomLink from '@/components/CustomLink';
import UnstyledLink from '@/components/UnstyledLink';
import MDXComponents from '@/components/blog/MDXComponents';

export default function PostPage({ code, frontMatter }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  const title = `${frontMatter.title} – theodorusclarence.com`;
  const description = frontMatter.description;
  const checkedSlug = checkBlogPrefix(frontMatter.slug);
  const isEnglish = checkedSlug === frontMatter.slug;

  const { isLoading, contentViews } = useContentMeta(`b_${checkedSlug}`, {
    runEffect: true,
  });

  const imageOg = ogGenerate(frontMatter.title);

  useEffect(() => {
    document.documentElement.classList.add('smooth');

    return () => {
      document.documentElement.classList.remove('smooth');
    };
  }, []);

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
        <Nav />

        <section className='py-6 mt-4'>
          <main className='layout'>
            <div className='pb-4 border-b-thin dark:border-gray-600'>
              <h1 className='mb-2'>{frontMatter.title}</h1>

              <p className='component text-dark dark:text-light'>
                Written on {formatDate(frontMatter.publishedAt)} by{' '}
                <div className='inline-flex items-end align-bottom'>
                  <div style={{ width: 25, height: 25 }}>
                    <Image
                      width={500}
                      className='rounded-full '
                      height={500}
                      objectFit='cover'
                      src={'/images/me.jpg'}
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

            <article className='py-4 mx-auto prose transition-colors mdx dark:prose-dark'>
              <Component
                components={{
                  ...MDXComponents,
                }}
              />
            </article>

            <div className='flex items-center justify-center py-8'>
              <LikeButton slug={`b_${checkedSlug}`} />
            </div>
            <Comments />

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
        <Footer />
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

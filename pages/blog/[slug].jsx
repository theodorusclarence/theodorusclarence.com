import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Image from 'next/image';
import matter from 'gray-matter';
import mdxPrism from 'mdx-prism';
import { useEffect } from 'react';
import readingTime from 'reading-time';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';

import { checkBlogPrefix, formatDate, ogGenerate } from '@/utils/helper.js';
import { BLOGS_PATH, postFilePaths } from '@/utils/mdxUtils';

import CustomCode, { Pre } from '@/components/CustomCode.jsx';
import CustomLink from '@/components/CustomLink.jsx';
import UnstyledLink from '@/components/UnstyledLink.jsx';
import Footer from '@/components/Footer.jsx';
import Seo from '@/components/Seo';
import Nav from '@/components/Nav.jsx';
import CloudinaryImg from '@/components/CloudinaryImg';
import useContentMeta from '@/hooks/useContentMeta';
import LikeButton from '@/components/LikeButton';
import Comments from '@/components/Comments';

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  // TestComponent: dynamic(() => import('../../components/TestComponent')),
  Head,
  Image,
  CloudinaryImg,
  code: CustomCode,
  pre: Pre,
};

export default function PostPage({ source, frontMatter, slug, readingTime }) {
  const title = `${frontMatter.title} – theodorusclarence.com`;
  const description = frontMatter.description;
  const checkedSlug = checkBlogPrefix(slug);
  const isEnglish = checkedSlug === slug;

  const content = hydrate(source, { components });

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
                  {isLoading ? '–––' : contentViews} views • {readingTime}
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

              {/* <Link href={`/blog/${slug}`} scroll={false}>
              <a className='fixed p-2 text-black bg-green-200 rounded-md bottom-6 right-6'>
                  Reload
              </a>
            </Link> */}
            </div>
            <article className='py-4 mx-auto prose transition-colors mdx dark:prose-dark'>
              {content}
            </article>
            <div className='flex items-center justify-center py-8'>
              <LikeButton slug={`b_${checkedSlug}`} />
            </div>
            <Comments />
            <div className='flex flex-col items-start gap-4 mt-4 md:flex-row-reverse md:justify-between'>
              <CustomLink
                href={`https://github.com/theodorusclarence/theodorusclarence.com/blob/main/data/blog/${slug}.mdx`}
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

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(BLOGS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await renderToString(content, {
    components,
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [
        require('remark-slug'),
        [
          require('remark-autolink-headings'),
          {
            linkProperties: {
              className: ['hash-anchor'],
            },
          },
        ],
      ],
      rehypePlugins: [mdxPrism],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      slug: params.slug,
      readingTime: readingTime(content).text,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

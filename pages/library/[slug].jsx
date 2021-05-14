import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import matter from 'gray-matter';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import mdxPrism from 'mdx-prism';

import { postLibraryPaths, LIBRARY_PATH } from '@/utils/mdxUtils';

import Nav from '@/components/Nav.jsx';
import Footer from '@/components/Footer.jsx';
import UnstyledLink from '@/components/UnstyledLink';
import CustomLink from '@/components/CustomLink.jsx';
import CustomCode, { Pre } from '@/components/CustomCode.jsx';
import CloudinaryImg from '@/components/CloudinaryImg';
import Seo from '@/components/Seo';
import { ogGenerate } from '@/utils/helper';

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

export default function PostPage({ source, frontMatter, slug }) {
  const title = `${frontMatter.title} – theodorusclarence.com`;
  const description = frontMatter.description;

  const content = hydrate(source, { components });

  const imageOg = ogGenerate(frontMatter.title, 'Code Snippets');

  return (
    <>
      <Seo title={title} description={description} image={imageOg} />
      <div className='flex flex-col min-h-screen'>
        <Nav />

        <section className='py-6 mt-4'>
          <main className='layout'>
            <div className='pb-4 border-b-thin'>
              <Link href={`/library/${slug}`} className='focus:outline-none'>
                <a>
                  <h1 className='mb-2'>{frontMatter.title}</h1>
                </a>
              </Link>

              <p className='component text-dark dark:text-light'>
                {frontMatter.description}
              </p>
            </div>
            <article className='py-4 mx-auto prose transition-colors dark:prose-dark'>
              {content}
            </article>
            <UnstyledLink href='/library' className='inline-block mt-4 view'>
              ← Back to library
            </UnstyledLink>
          </main>
        </section>
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(LIBRARY_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await renderToString(content, {
    components,
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [mdxPrism],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      slug: params.slug,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postLibraryPaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

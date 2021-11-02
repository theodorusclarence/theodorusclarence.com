/* eslint-disable @typescript-eslint/no-explicit-any */
import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import { join } from 'path';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

// Code from https://github.com/leerob/leerob.io/blob/main/lib/mdx.js

type ContentType = 'blog' | 'library';

export async function getFiles(type: ContentType) {
  return readdirSync(join(process.cwd(), 'src', 'contents', type));
}

// export function sortByDate(contents: any) {
//   return contents.sort(
//     (contentA: any, contentB: any) =>
//       new Date(contentB.publishedAt) - new Date(contentA.publishedAt)
//   );
// }

// export function sortByTitle(contents) {
//   return contents.sort((a, b) =>
//     a.title > b.title ? 1 : b.title > a.title ? -1 : 0
//   );
// }

export async function getFileBySlug(type: ContentType, slug: string) {
  const source = slug
    ? readFileSync(
        join(process.cwd(), 'src', 'contents', type, `${slug}.mdx`),
        'utf8'
      )
    : readFileSync(
        join(process.cwd(), 'src', 'contents', `${type}.mdx`),
        'utf8'
      );

  const { code, frontmatter } = await bundleMDX(source, {
    xdmOptions(options) {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['hash-anchor'],
            },
          },
        ],
      ];
      return options;
    },
  });

  return {
    code,
    frontMatter: {
      wordCount: source.split(/\s+/gu).length,
      readingTime: readingTime(source),
      slug: slug || null,
      ...frontmatter,
    },
  };
}

export async function getAllFilesFrontMatter(type: ContentType) {
  const files = readdirSync(join(process.cwd(), 'src', 'contents', type));

  return files.reduce((allPosts, postSlug) => {
    const source = readFileSync(
      join(process.cwd(), 'src', 'contents', type, postSlug),
      'utf8'
    );
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: postSlug.replace('.mdx', ''),
        readingTime: readingTime(source),
      } as never,
      ...allPosts,
    ];
  }, []);
}

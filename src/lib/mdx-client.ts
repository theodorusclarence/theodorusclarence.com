import { BlogFrontmatter } from '@/types/content';

export function sortDateFn(
  contentA: BlogFrontmatter,
  contentB: BlogFrontmatter
) {
  return (
    new Date(contentB.publishedAt).valueOf() -
    new Date(contentA.publishedAt).valueOf()
  );
}

export function sortByDate(contents: Array<BlogFrontmatter>) {
  return contents.sort(sortDateFn);
}

/**
 * Get tags of each post and remove duplicates
 */
export function getTags(posts: Array<BlogFrontmatter>) {
  const tags = posts.reduce(
    (accTags: string[], post) => [...accTags, ...post.tags.split(',')],
    []
  );
  return Array.from(new Set(tags));
}

// export function sortByTitle(contents) {
//   return contents.sort((a, b) =>
//     a.title > b.title ? 1 : b.title > a.title ? -1 : 0
//   );
// }

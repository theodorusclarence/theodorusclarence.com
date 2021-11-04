import {
  BlogFrontmatter,
  Frontmatter,
  FrontmatterWithTags,
} from '@/types/content';

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

export function sortTitleFn<T extends Frontmatter>(contentA: T, contentB: T) {
  return contentA.title.localeCompare(contentB.title);
}

export function sortByTitle<T extends Array<Frontmatter>>(contents: T): T {
  return contents.sort((a, b) =>
    a.title > b.title ? 1 : b.title > a.title ? -1 : 0
  );
}

/**
 * Get tags of each post and remove duplicates
 */
export function getTags<T extends Array<FrontmatterWithTags>>(contents: T) {
  const tags = contents.reduce(
    (accTags: string[], content) => [...accTags, ...content.tags.split(',')],
    []
  );
  return Array.from(new Set(tags));
}

import { FrontMatterType } from '@/types/content';

export function sortByDate(contents: Array<FrontMatterType>) {
  return contents.sort(
    (contentA, contentB) =>
      new Date(contentB.publishedAt).valueOf() -
      new Date(contentA.publishedAt).valueOf()
  );
}

export function sortDateFn(
  contentA: FrontMatterType,
  contentB: FrontMatterType
) {
  return (
    new Date(contentB.publishedAt).valueOf() -
    new Date(contentA.publishedAt).valueOf()
  );
}

// export function sortByTitle(contents) {
//   return contents.sort((a, b) =>
//     a.title > b.title ? 1 : b.title > a.title ? -1 : 0
//   );
// }

import { ContentType } from '@/types/content';
import { ContentMeta } from '@/types/fauna';

export function pickContentMeta<T extends ContentType>(
  data: Array<ContentMeta> | undefined,
  type: T
) {
  return data
    ?.filter((item) => item.slug.startsWith(type.slice(0, 1)))
    .map((item) => ({ ...item, slug: item.slug.slice(2) }));
}

import { ContentType } from '@/types/frontmatters';
import { ContentMeta } from '@/types/meta';

export function pickContentMeta<T extends ContentType>(
  data: Array<ContentMeta> | undefined,
  type: T
): Array<ContentMeta> {
  return (
    data
      ?.filter((item) => item.slug.startsWith(type.slice(0, 1)))
      .map((item) => ({ ...item, slug: item.slug.slice(2) })) ?? []
  );
}

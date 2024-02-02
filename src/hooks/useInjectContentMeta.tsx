import { useQuery } from '@tanstack/react-query';
import * as React from 'react';

import { pickContentMeta } from '@/lib/contentMeta';
import { cleanBlogPrefix } from '@/lib/helper.client';
import { getContentMeta } from '@/lib/requests/content-meta';

import { contentMetaFlag } from '@/constants/env';

import {
  ContentType,
  InjectedMeta,
  PickFrontmatter,
} from '@/types/frontmatters';

export default function useInjectContentMeta<T extends ContentType>(
  type: T,
  frontmatter: Array<PickFrontmatter<T>>
) {
  const { data: contentMeta, error } = useQuery({
    queryKey: ['contents'],
    queryFn: getContentMeta,
    enabled: contentMetaFlag,
  });
  const isLoading = !error && !contentMeta;
  const meta = React.useMemo(
    () => pickContentMeta(contentMeta, type),
    [contentMeta, type]
  );

  type PopulatedContent = Array<PickFrontmatter<T> & InjectedMeta>;

  const [populatedContent, setPopulatedContent] =
    React.useState<PopulatedContent>(
      () => [...frontmatter] as PopulatedContent
    );

  React.useEffect(() => {
    if (meta) {
      const mapped = frontmatter.map((fm) => {
        const views = meta.find(
          (meta) => meta.slug.replace('|', '/') === cleanBlogPrefix(fm.slug)
        )?.views;
        const likes = meta.find(
          (meta) => meta.slug.replace('|', '/') === cleanBlogPrefix(fm.slug)
        )?.likes;
        return { ...fm, views, likes };
      });

      setPopulatedContent(mapped);
    }
  }, [meta, isLoading, frontmatter]);

  return populatedContent;
}

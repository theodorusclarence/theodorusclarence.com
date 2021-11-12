import * as React from 'react';
import useSWR from 'swr';

import { pickContentMeta } from '@/lib/contentMeta';
import { cleanBlogPrefix } from '@/lib/helper';

import { contentMetaFlag } from '@/constants/env';

import { ContentMeta } from '@/types/fauna';
import {
  ContentType,
  InjectedMeta,
  PickFrontmatter,
} from '@/types/frontmatters';

export default function useInjectContentMeta<T extends ContentType>(
  type: T,
  frontmatter: Array<PickFrontmatter<T>>
) {
  const { data: contentMeta, error } = useSWR<Array<ContentMeta>>(
    contentMetaFlag ? '/api/content' : null
  );
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
          (meta) => meta.slug === cleanBlogPrefix(fm.slug)
        )?.views;
        const likes = meta.find(
          (meta) => meta.slug === cleanBlogPrefix(fm.slug)
        )?.likes;
        return { ...fm, views, likes };
      });

      setPopulatedContent(mapped);
    }
  }, [meta, isLoading, frontmatter]);

  return populatedContent;
}

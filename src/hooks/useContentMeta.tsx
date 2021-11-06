import axios from 'axios';
import * as React from 'react';
import useSWR from 'swr';

import { cacheOnly } from '@/lib/swr';

import { isProd } from '@/constants/env';

import { ContentMeta, SingleContentMeta } from '@/types/fauna';

export default function useContentMeta(
  slug: string,
  { runIncrement = false }: { runIncrement?: boolean } = {}
) {
  //#region  //*=========== Get content cache ===========
  const { data: allContentMeta } = useSWR<Array<ContentMeta>>(
    '/api/content',
    cacheOnly
  );
  const _preloadMeta = allContentMeta?.find((meta) => meta.slug === slug);
  const preloadMeta: SingleContentMeta | undefined = _preloadMeta
    ? {
        contentLikes: _preloadMeta.likes,
        contentViews: _preloadMeta.views,
        likesByUser: 0,
      }
    : undefined;
  //#endregion  //*======== Get content cache ===========

  const {
    data,
    error: isError,
    mutate,
  } = useSWR<SingleContentMeta>('/api/content/' + slug, {
    fallbackData: preloadMeta,
  });

  React.useEffect(() => {
    if (runIncrement && isProd) {
      incrementViews(slug).then((fetched) => {
        mutate({
          ...fetched,
        });
      });
    }
  }, [mutate, runIncrement, slug]);

  return { isLoading: !isError && !data, isError, views: data?.contentViews };
}

async function incrementViews(slug: string) {
  const res = await axios.post<SingleContentMeta>('/api/content/' + slug);

  return res.data;
}

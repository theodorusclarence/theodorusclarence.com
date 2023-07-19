import axios from 'axios';
import debounce from 'lodash/debounce';
import * as React from 'react';
import useSWR from 'swr';

import { contentMetaFlag, incrementMetaFlag } from '@/constants/env';
import { cacheOnly } from '@/constants/swr';

import { ContentMeta, SingleContentMeta } from '@/types/meta';

export default function useContentMeta(
  slug: string,
  { runIncrement = false }: { runIncrement?: boolean } = {}
) {
  //#region  //*=========== Get content cache ===========
  const { data: allContentMeta } = useSWR<Array<ContentMeta>>(
    contentMetaFlag ? '/api/content' : null,
    cacheOnly
  );
  const _preloadMeta = allContentMeta?.find((meta) => meta.slug === slug);
  const preloadMeta: SingleContentMeta | undefined = _preloadMeta
    ? {
        contentLikes: _preloadMeta.likes,
        contentViews: _preloadMeta.views,
        likesByUser: _preloadMeta.likesByUser,
        devtoViews: _preloadMeta.devtoViews,
      }
    : undefined;
  //#endregion  //*======== Get content cache ===========

  const {
    data,
    error: isError,
    mutate,
  } = useSWR<SingleContentMeta>(
    contentMetaFlag ? '/api/content/' + slug : null,
    {
      fallbackData: preloadMeta,
    }
  );

  React.useEffect(() => {
    if (runIncrement && incrementMetaFlag) {
      incrementViews(slug).then((fetched) => {
        mutate({
          ...fetched,
        });
      });
    }
  }, [mutate, runIncrement, slug]);

  const addLike = () => {
    // Don't run if data not populated,
    // and if maximum likes
    if (!data || data.likesByUser >= 5) return;

    // Mutate optimistically
    mutate(
      {
        contentViews: data.contentViews,
        contentLikes: data.contentLikes + 1,
        likesByUser: data.likesByUser + 1,
        devtoViews: data.devtoViews,
      },
      false
    );

    incrementLikes(slug).then(() => {
      debounce(() => {
        mutate();
      }, 1000)();
    });
  };

  return {
    isLoading: !isError && !data,
    isError,
    views: data?.contentViews,
    contentLikes: data?.contentLikes ?? 0,
    devtoViews: data?.devtoViews,
    likesByUser: data?.likesByUser ?? 0,
    addLike,
  };
}

async function incrementViews(slug: string) {
  const res = await axios.post<SingleContentMeta>('/api/content/' + slug);

  return res.data;
}

async function incrementLikes(slug: string) {
  const res = await axios.post<SingleContentMeta>('/api/like/' + slug);

  return res.data;
}

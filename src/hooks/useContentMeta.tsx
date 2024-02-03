import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';

import {
  getSingleContentMeta,
  incrementLikeCount,
  incrementViewCount,
} from '@/lib/requests/content-meta';

import { contentMetaFlag, incrementMetaFlag } from '@/constants/env';

import { ContentMeta, SingleContentMeta } from '@/types/meta';

export default function useContentMeta(
  slug: string,
  { runIncrement = false }: { runIncrement?: boolean } = {}
) {
  //#region  //*=========== Get Content Cache ===========
  const queryClient = useQueryClient();
  const allContentMeta = queryClient.getQueryData<Array<ContentMeta>>([
    'contents',
  ]);
  const _preloadMeta = allContentMeta?.find((meta) => meta.slug === slug);
  const preloadMeta: SingleContentMeta | undefined = _preloadMeta
    ? {
        contentLikes: _preloadMeta.likes,
        contentViews: _preloadMeta.views,
        likesByUser: _preloadMeta.likesByUser ?? null,
        devtoViews: _preloadMeta.devtoViews,
      }
    : undefined;
  //#endregion  //*======== Get Content Cache ===========

  const {
    data: contentMeta,
    isLoading,
    error: isError,
  } = useQuery({
    queryKey: ['contents', slug],
    queryFn: () => getSingleContentMeta({ slug }),
    initialData: preloadMeta,
    enabled: contentMetaFlag,
  });

  //#region  //*=========== Increment Views ===========
  const { mutate: mutateIncrementViews } = useMutation({
    mutationFn: () => incrementViewCount({ slug }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['contents'] });
      const previousSingleMeta = queryClient.getQueryData<SingleContentMeta>([
        'contents',
        slug,
      ]);
      queryClient.setQueryData<SingleContentMeta>(['contents', slug], (prev) =>
        prev
          ? {
              ...prev,
              contentViews: prev.contentViews + 1,
            }
          : undefined
      );
      const previousAllMeta = queryClient.getQueryData<Array<ContentMeta>>([
        'contents',
      ]);
      queryClient.setQueryData<Array<ContentMeta>>(['contents'], (prev) =>
        prev
          ? prev.map((meta) =>
              meta.slug === slug
                ? {
                    ...meta,
                    views: meta.views + 1,
                  }
                : meta
            )
          : undefined
      );
      return { previousSingleMeta, previousAllMeta };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData<SingleContentMeta>(
        ['contents', slug],
        context?.previousSingleMeta
      );
      queryClient.setQueryData<Array<ContentMeta>>(
        ['contents'],
        context?.previousAllMeta
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['contents', slug],
        exact: true,
      });
      queryClient.invalidateQueries({ queryKey: ['contents'], exact: true });
    },
  });
  //#endregion  //*======== Increment Views ===========

  //#region  //*=========== Increment Like ===========
  const { mutate: mutateIncrementLikes } = useMutation({
    mutationFn: () => incrementLikeCount({ slug }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['contents'] });
      const previousSingleMeta = queryClient.getQueryData<SingleContentMeta>([
        'contents',
        slug,
      ]);
      queryClient.setQueryData<SingleContentMeta>(['contents', slug], (prev) =>
        prev
          ? {
              ...prev,
              contentLikes: prev.contentLikes + 1,
              likesByUser: (prev.likesByUser || 0) + 1,
            }
          : undefined
      );
      const previousAllMeta = queryClient.getQueryData<Array<ContentMeta>>([
        'contents',
      ]);
      queryClient.setQueryData<Array<ContentMeta>>(['contents'], (prev) =>
        prev
          ? prev.map((meta) =>
              meta.slug === slug
                ? {
                    ...meta,
                    likes: meta.likes + 1,
                  }
                : meta
            )
          : undefined
      );
      return { previousSingleMeta, previousAllMeta };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData<SingleContentMeta>(
        ['contents', slug],
        context?.previousSingleMeta
      );
      queryClient.setQueryData<Array<ContentMeta>>(
        ['contents'],
        context?.previousAllMeta
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['contents', slug],
        exact: true,
      });
      queryClient.invalidateQueries({ queryKey: ['contents'], exact: true });
    },
  });
  //#endregion  //*======== Increment Like ===========

  React.useEffect(() => {
    if (runIncrement && incrementMetaFlag) {
      mutateIncrementViews();
    }
  }, [mutateIncrementViews, runIncrement, slug]);

  const addLike = () => {
    // Don't run if data not populated,
    // and if maximum likes
    if (
      !contentMeta ||
      contentMeta?.likesByUser === null ||
      contentMeta.likesByUser >= 5
    )
      return;

    // Mutate optimistically
    mutateIncrementLikes();
  };

  return {
    isLoading,
    isError,
    views: contentMeta?.contentViews,
    contentLikes: contentMeta?.contentLikes ?? 0,
    devtoViews: contentMeta?.devtoViews,
    likesByUser: contentMeta?.likesByUser ?? null,
    addLike,
  };
}

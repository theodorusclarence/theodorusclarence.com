import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { useEffect } from 'react';

async function incrementViews(slug) {
  const res = await fetch('/api/content/' + slug, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  return res.json();
}

async function incrementLikes(slug) {
  const res = await fetch('/api/like/' + slug, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json();
}

export default function useContentMeta(
  slug,
  { runEffect } = { runEffect: false }
) {
  if (!slug) throw new Error('Please provide slug in the useContentMeta');
  const { data, error, mutate } = useSWR('/api/content/' + slug, fetcher);

  useEffect(() => {
    if (!runEffect) return;
    addViews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addViews() {
    const fetchData = await incrementViews(slug);
    const mutateData = {
      ...data,
      ...fetchData,
    };
    mutate(mutateData);
  }

  async function addLike() {
    if (!data || data.likesByUser >= 5) return;

    // Mutate optimistically
    mutate(
      {
        contentViews: data?.contentViews,
        contentLikes: data?.contentLikes + 1,
        likesByUser: data?.likesByUser + 1,
      },
      false
    );

    // const fetchData = await incrementLikes(slug);
    // const mutateData = {
    //   ...data,
    //   ...fetchData,
    // };
    mutate(incrementLikes(slug));
  }

  return {
    isLoading: !error && !data,
    contentViews: data?.contentViews ?? 0,
    contentLikes: data?.contentLikes ?? 0,
    likesByUser: data?.likesByUser ?? 0,
    isError: error,
    addViews,
    addLike,
  };
}

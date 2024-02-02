import axios from 'axios';

import { ContentMeta, SingleContentMeta } from '@/types/meta';

export async function getContentMeta() {
  return axios.get<Array<ContentMeta>>('/api/content').then((res) => res.data);
}

export async function getSingleContentMeta({ slug }: { slug: string }) {
  return axios
    .get<SingleContentMeta>(`/api/content/${slug}`)
    .then((res) => res.data);
}

export async function incrementViewCount({ slug }: { slug: string }) {
  return axios
    .post<SingleContentMeta>(`/api/content/${slug}`)
    .then((res) => res.data);
}

export async function incrementLikeCount({ slug }: { slug: string }) {
  return axios
    .post<SingleContentMeta>(`/api/like/${slug}`)
    .then((res) => res.data);
}

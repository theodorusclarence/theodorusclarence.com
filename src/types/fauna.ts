export interface ContentMeta {
  slug: string;
  views: number;
  likes: number;
  likesByUser: Array<Record<string, number>>;
}

export interface AllContentRes {
  data: Array<{
    data: ContentMeta;
  }>;
}

export type ContentIndexRes = {
  views: number;
  devtoViews: number | null;
  slug: string;
  likes: number;
  likesByUser: Record<string, number>[];
}[];

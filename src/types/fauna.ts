export interface ContentMeta {
  slug: string;
  views: number;
  likes: number;
  likesByUser: Record<string, number>;
}
// Fauna Response

export interface AllContentRes {
  data: Array<{
    data: ContentMeta;
  }>;
}

export interface ContentMetaRes {
  data: ContentMeta;
}

// Next.js API Response

export type ContentIndexRes = {
  views: number;
  devtoViews: number | null;
  slug: string;
  likes: number;
  likesByUser: Record<string, number>[];
}[];

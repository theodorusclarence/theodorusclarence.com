export interface FaunaContentMeta {
  slug: string;
  views: number;
  likes: number;
  likesByUser: Record<string, number>;
}

export interface ContentMeta {
  slug: string;
  views: number;
  devtoViews?: number | null;
  likes: number;
  likesByUserRaw: Record<string, number>;
  likesByUser: number;
}

export interface SingleContentMeta {
  contentViews: number;
  contentLikes: number;
  likesByUser: number;
  devtoViews?: number | null;
}

//#region  //*=========== Fauna Response ===========
export interface AllContentRes {
  data: Array<{
    data: FaunaContentMeta;
  }>;
}

export interface ContentMetaRes {
  data: FaunaContentMeta;
}
//#endregion  //*======== Fauna Response ===========

//#region  //*=========== Next.js API Response ===========
export type ContentIndexRes = {
  views: number;
  devtoViews: number | null;
  slug: string;
  likes: number;
  likesByUser: Record<string, number>[];
}[];
//#endregion  //*======== Next.js API Response ===========

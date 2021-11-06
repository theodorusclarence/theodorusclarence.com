export interface ContentMeta {
  slug: string;
  views: number;
  likes: number;
  likesByUser: Record<string, number>;
}

//#region  //*=========== Fauna Response ===========
export interface AllContentRes {
  data: Array<{
    data: ContentMeta;
  }>;
}

export interface ContentMetaRes {
  data: ContentMeta;
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

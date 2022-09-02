export interface ContentMeta {
  slug: string;
  views: number;
  likes: number;
  likesByUser: number;
  devtoViews?: number;
}

export interface SingleContentMeta {
  contentViews: number;
  contentLikes: number;
  likesByUser: number;
  devtoViews?: number;
}

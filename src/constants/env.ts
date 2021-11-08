export const isProd = process.env.NODE_ENV === 'production';

export const commentFlag = isProd;
export const contentMetaFlag = isProd;
export const spotifyFlag = isProd;
export const newsletterFlag = isProd;

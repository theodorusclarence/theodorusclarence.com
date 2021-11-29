import { getFromLocalStorage } from '@/lib/helper';

export const isProd = process.env.NODE_ENV === 'production';

export const commentFlag = isProd;
export const contentMetaFlag = isProd;
export const incrementMetaFlag =
  isProd && getFromLocalStorage('incrementMetaFlag') !== 'false';
export const spotifyFlag = isProd;
export const newsletterFlag = isProd;
export const sayHelloFlag = isProd;

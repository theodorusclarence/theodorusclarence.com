import { getFromLocalStorage } from '@/lib/helper';

export const isProd = process.env.NODE_ENV === 'production';

/**
 * Show command service on contents
 * @see Comment.tsx
 */
export const commentFlag = isProd;

/**
 * Get content meta from the database
 * @see useContentMeta.tsx
 */
export const contentMetaFlag = isProd;

/**
 * Increment content views
 * @see useContentMeta.tsx
 */
export const incrementMetaFlag =
  isProd && getFromLocalStorage('incrementMetaFlag') !== 'false';

/**
 * Show Spotify Now Playing on footer
 * @see Footer.tsx
 */
export const spotifyFlag = isProd;

/**
 * Open API access to newsletter provider (subscribe and view count)
 * @see SubscribeCard.tsx
 */
export const newsletterFlag = isProd;

/**
 * Console to the browser greeting message
 * @see Layout.tsx
 */
export const sayHelloFlag = isProd;

/**
 * Console to the browser greeting message
 * @see Footer.tsx
 */
export const feedbackFlag = isProd;

/**
 * Only increase count when in specified domain meta
 * @see _app.tsx
 */
export const blockDomainMeta = isProd;

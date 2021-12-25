/* eslint-disable @typescript-eslint/no-explicit-any */
import { createHash } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

import { getViewsFromDevto } from '@/lib/devto';
import { getContentMeta, upsertContentMeta } from '@/lib/fauna';

export default async function IndividualContent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query.slug as string;

  const ipAddress =
    req.headers['x-forwarded-for'] ||
    // Fallback for localhost or non Vercel deployments
    '0.0.0.0';

  // Since a users IP address is part of the sessionId in our database, we
  // hash it to protect their privacy. By combining it with a salt, we get
  // get a unique id we can refer to, but we won't know what their ip
  // address was.
  const currentUserId = createHash('md5')
    .update(ipAddress + (process.env.IP_ADDRESS_SALT as string), 'utf8')
    .digest('hex');
  const sessionId = currentUserId;

  try {
    if (req.method === 'GET') {
      const data = await getContentMeta(slug);

      if (slug.startsWith('b_')) {
        const devto = await getViewsFromDevto();

        const found = devto?.find((i) => i.slug === slug.slice(2));
        if (found) {
          return res.status(200).json({
            contentViews: data?.views + found?.views ?? 0,
            contentLikes: data?.likes ?? 0,
            devtoViews: found?.views ?? null,
            likesByUser: data?.likesByUser?.[sessionId] ?? 0,
          });
        }
      }

      res.status(200).json({
        contentViews: data.views ?? 0,
        contentLikes: data.likes ?? 0,
        likesByUser: data.likesByUser?.[sessionId] ?? 0,
      });
    } else if (req.method === 'POST') {
      const data = await upsertContentMeta(slug);

      if (slug.startsWith('b_')) {
        const devto = await getViewsFromDevto();

        const found = devto?.find((i) => i.slug === slug.slice(2));
        if (found) {
          return res.status(201).json({
            contentViews: data?.views + found?.views ?? 0,
            contentLikes: data?.likes ?? 0,
            likesByUser: data.likesByUser?.[sessionId] ?? 0,
          });
        }
      }

      res.status(201).json({
        contentViews: data.views ?? 0,
        contentLikes: data.likes ?? 0,
        likesByUser: data.likesByUser?.[sessionId] ?? 0,
      });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).json({ message: error.message ?? 'Internal Server Error' });
  }
}

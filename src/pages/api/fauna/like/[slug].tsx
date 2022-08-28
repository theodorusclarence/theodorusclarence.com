/* eslint-disable @typescript-eslint/no-explicit-any */
import { createHash } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

import { upsertLike } from '@/lib/fauna';

export default async function IndividualContent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query.slug as string;

  const ipAddress = req.headers['x-forwarded-for'] || '0.0.0.0';
  const currentUserId = createHash('md5')
    .update(ipAddress + (process.env.IP_ADDRESS_SALT as string), 'utf8')
    .digest('hex');
  const sessionId = currentUserId;

  try {
    if (req.method === 'POST') {
      const data = await upsertLike(slug, sessionId);

      res.status(201).json({
        contentViews: data?.views ?? 0,
        contentLikes: data?.likes ?? 0,
        likesByUser: data?.likesByUser?.[sessionId] ?? 0,
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

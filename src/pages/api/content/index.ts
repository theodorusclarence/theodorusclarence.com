import { createHash } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

import { getViewsFromDevto } from '@/lib/devto';
import { getAllContent } from '@/lib/fauna';

export default async function index(req: NextApiRequest, res: NextApiResponse) {
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
      const content = await getAllContent();
      const devto = await getViewsFromDevto();

      const mappedData = content.map((meta) => {
        const found = meta.slug.startsWith('b_')
          ? devto?.find((i) => i.slug === meta.slug.slice(2))
          : null;

        return {
          ...meta,
          views: meta.views + (found?.views ?? 0),
          devtoViews: found?.views ?? null,
          likesByUser: meta?.likesByUser?.[sessionId] ?? 0,
        };
      });

      // Sort alphabetically
      mappedData.sort((a, b) => a.slug.localeCompare(b.slug));

      // res.status(200).json({ data: content });
      res.status(200).json(mappedData);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).json({ message: error.message ?? 'Internal Server Error' });
  }
}

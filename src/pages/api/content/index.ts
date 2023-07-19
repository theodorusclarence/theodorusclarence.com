import { NextApiRequest, NextApiResponse } from 'next';

import { getViewsFromDevto } from '@/lib/devto';
import { prismaClient } from '@/lib/prisma.client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const _content = await prismaClient.contentMeta.findMany({
        include: {
          _count: {
            select: {
              views: true,
              likes: true,
            },
          },
        },
      });
      const devto = await getViewsFromDevto();

      const content = _content.map((meta) => {
        const devtoViews = meta.slug.startsWith('b_')
          ? devto?.find((i) => i.slug === meta.slug.replace('b_', ''))?.views
          : undefined;

        return {
          slug: meta.slug,
          views: meta._count.views + (devtoViews ?? 0),
          likes: meta._count.likes,
          devtoViews,
        };
      });

      // Sort alphabetically
      content.sort((a, b) => a.slug.localeCompare(b.slug));

      res.status(200).json(content);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
    console.error(err);
    if (err instanceof Error) {
      res.status(500).json({ message: err.message ?? 'Internal Server Error' });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

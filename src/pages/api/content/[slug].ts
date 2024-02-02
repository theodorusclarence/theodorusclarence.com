import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { getUserLikeCount } from '@/lib/api.server';
import { getArticleViewsFromDevto } from '@/lib/devto';
import { getSessionId } from '@/lib/helper.server';
import { prismaClient } from '@/lib/prisma.client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = z.string().parse(req.query.slug);
  const sessionId = getSessionId(req);

  try {
    if (req.method === 'GET') {
      const content = await prismaClient.contentMeta.findFirst({
        where: {
          slug,
        },
        include: {
          _count: {
            select: {
              views: true,
              likes: true,
            },
          },
        },
      });

      let devtoViews: number | undefined;
      if (slug.startsWith('b_')) {
        devtoViews = await getArticleViewsFromDevto(slug);
      }

      return res.status(200).json({
        contentViews: (content?._count.views ?? 0) + (devtoViews ?? 0),
        contentLikes: content?._count.likes ?? 0,
        devtoViews: devtoViews,
        likesByUser: await getUserLikeCount({ sessionId, slug }),
      });
    } else if (req.method === 'POST') {
      const content = await prismaClient.contentMeta.upsert({
        where: {
          slug: slug,
        },
        create: {
          slug,
          views: {
            create: {
              sessionId,
            },
          },
        },
        update: {
          views: {
            create: {
              sessionId,
            },
          },
        },
        include: {
          _count: {
            select: {
              views: true,
              likes: true,
            },
          },
        },
      });

      let devtoViews: number | undefined;
      if (slug.startsWith('b_')) {
        devtoViews = await getArticleViewsFromDevto(slug);
      }

      return res.status(201).json({
        contentViews: (content?._count.views ?? 0) + (devtoViews ?? 0),
        contentLikes: content?._count.likes ?? 0,
        devtoViews: devtoViews,
        likesByUser: (await getUserLikeCount({ sessionId, slug })) ?? 0,
      });
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

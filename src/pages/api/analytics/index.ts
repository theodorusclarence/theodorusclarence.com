import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { prismaClient } from '@/lib/prisma.client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = z
    .object({
      startDate: z.string().datetime(),
      endDate: z.string().datetime(),
    })
    .safeParse(req.query);
  if (!response.success) {
    return res.status(400).json({ message: response.error });
  }

  const { startDate, endDate } = response.data;

  if (req.method === 'GET') {
    const data = await prismaClient.view.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate).toISOString(),
          lte: new Date(endDate).toISOString(),
        },
      },
      include: {
        ContentMeta: true,
      },
    });

    res.status(200).json(data);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

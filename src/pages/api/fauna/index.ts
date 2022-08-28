import { NextApiRequest, NextApiResponse } from 'next';

import { getAllContent } from '@/lib/fauna';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return res.status(200).json({
      content: await getAllContent(),
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

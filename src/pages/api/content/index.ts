import { NextApiRequest, NextApiResponse } from 'next';

import { getViewsFromDevto } from '@/lib/devto';
import { getAllContent } from '@/lib/fauna';

export default async function index(req: NextApiRequest, res: NextApiResponse) {
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

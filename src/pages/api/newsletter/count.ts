import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default function count(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return axios
      .get<Array<{ id: number }>>(
        'https://www.getrevue.co/api/v2/subscribers',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${process.env.REVUE_TOKEN}`,
          },
        }
      )
      .then((response) => {
        const count = response.data.length;

        // Cache for an hour
        res.setHeader(
          'Cache-Control',
          'public, s-maxage=3600, stale-while-revalidate=60'
        );
        return res.status(200).json({ count });
      })
      .catch(() => res.status(500).json({ error: 'Something was wrong' }));
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

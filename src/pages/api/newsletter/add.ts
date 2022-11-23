// eslint-disable-next-line unused-imports/no-unused-imports
import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const email = z.string().email().parse(req.body.email);

    try {
      const response = await axios.post(
        'https://www.getrevue.co/api/v2/subscribers',
        { email, double_opt_in: true },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${process.env.REVUE_TOKEN}`,
          },
        }
      );

      return res.status(200).json({ success: response.data });
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error)) {
        return res
          .status(400)
          .json({ message: error?.response?.data?.error?.email?.[0] });
      } else {
        return res
          .status(500)
          .json({ message: 'Something wrong with the server.' });
      }
    }
  }
}

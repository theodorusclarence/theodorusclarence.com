// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const data = req.body;

    try {
      const response = await axios.post(
        'https://api.buttondown.email/v1/subscribers',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${process.env.BUTTONDOWN_TOKEN}`,
          },
        }
      );

      return res.status(200).json({ success: response.data });
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error)) {
        return res.status(400).json({ message: error?.response?.data?.[0] });
      } else {
        return res
          .status(500)
          .json({ message: 'Something wrong with the server.' });
      }
    }
  }
}

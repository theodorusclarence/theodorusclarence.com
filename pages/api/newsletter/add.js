import axios from 'axios';

export default async function handler(req, res) {
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
    } catch (error) {
      return res.status(400).json({ message: error?.response?.data?.[0] });
    }
  }
}

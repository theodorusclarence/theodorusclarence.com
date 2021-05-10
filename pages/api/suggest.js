import { createSuggestion, getAllSuggestions } from '@/utils/Fauna';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const suggestions = await getAllSuggestions();
      res.status(200).json(suggestions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Something went wrong.' });
    }
  }

  if (req.method === 'POST') {
    const data = req.body;

    try {
      await createSuggestion(data);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(400).json({ error: 'Something is wrong.' });
    }

    // console.log(data);
  }
}

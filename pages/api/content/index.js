import { getAllContent } from '@/utils/Fauna';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const data = await getAllContent();
      console.log('🚀 ~ file: index.js ~ line 7 ~ handler ~ data', data);

      const mappedData = data.map((item) => item.data);
      // sort by slug alphabetically
      mappedData.sort((a, b) => a.slug.localeCompare(b.slug));

      res.status(200).json({ data: mappedData });
    }
  } catch (err) {
    console.log('🚀 ~ file: test.js ~ line 15 ~ handler ~ err', { err });
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
}

import { getAllContent } from '@/utils/Fauna';
import { getViewsFromDevto } from '@/utils/devto';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const data = await getAllContent();

      const devto = await getViewsFromDevto();

      const mappedData = data.map((item) => {
        const found = item.data.slug.startsWith('b_')
          ? devto.find((i) => i.slug === item.data.slug.slice(2))
          : null;

        return { ...item.data, views: item.data.views + (found?.views ?? 0) };
      });

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

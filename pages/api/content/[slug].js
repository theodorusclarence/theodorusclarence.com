import { getContentMeta, upsertContentMeta } from '@/utils/Fauna';
import { createHash } from 'crypto';

export default async function handler(req, res) {
  // get slug
  const slug = req.query.slug;

  const ipAddress =
    req.headers['x-forwarded-for'] ||
    // Fallback for localhost or non Vercel deployments
    '0.0.0.0';

  // Since a users IP address is part of the sessionId in our database, we
  // hash it to protect their privacy. By combining it with a salt, we get
  // get a unique id we can refer to, but we won't know what their ip
  // address was.
  const currentUserId = createHash('md5')
    .update(ipAddress + process.env.IP_ADDRESS_SALT, 'utf8')
    .digest('hex');

  const sessionId = currentUserId;

  try {
    if (req.method === 'GET') {
      const data = await getContentMeta(slug);

      res.status(200).json({
        contentViews: data?.data?.views ?? 0,
        contentLikes: data?.data?.likes ?? 0,
        likesByUser: data?.data?.likesByUser?.[sessionId] ?? 0,
      });
    } else if (req.method === 'POST') {
      const { data } = await upsertContentMeta(slug);
      res.status(201).json({
        contentViews: data?.views ?? 0,
        contentLikes: data?.likes ?? 0,
      });
    }
  } catch (err) {
    console.log('🚀 ~ file: test.js ~ line 15 ~ handler ~ err', { err });
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
}

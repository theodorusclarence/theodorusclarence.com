import prisma from '@/utils/prisma';
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

  const sessionId = slug + '__' + currentUserId;

  try {
    if (req.method === 'GET') {
      // get content likes
      const content = await prisma.contentMeta.findUnique({
        where: {
          slug,
        },
      });

      // get likes by user ip address
      const likes = await prisma.likesByUser.findUnique({
        where: {
          id: sessionId,
        },
      });

      res.status(200).json({
        contentViews: content?.views ?? 0,
        contentLikes: content?.likes ?? 0,
        likesByUser: likes?.likes ?? 0,
      });
    } else if (req.method === 'POST') {
      // upsert content meta views by 1
      const content = await prisma.contentMeta.upsert({
        where: {
          slug,
        },
        update: {
          views: {
            increment: 1,
          },
        },
        create: {
          slug,
          views: 1,
        },
      });

      res.status(201).json({
        contentViews: content?.views ?? 0,
        contentLikes: content?.likes ?? 0,
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
}

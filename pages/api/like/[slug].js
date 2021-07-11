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
    // Check if the user already liked more than 5 times
    const checkLike = await prisma.likesByUser.findUnique({
      where: {
        id: sessionId,
      },
    });
    if (checkLike?.likes >= 5) throw new Error('Max like is 5');

    // if get then get content likes
    if (req.method === 'POST') {
      const content = await prisma.contentMeta.update({
        where: {
          slug,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });

      // upsert content meta views by 1
      const like = await prisma.likesByUser.upsert({
        where: {
          id: sessionId,
        },
        update: {
          likes: {
            increment: 1,
          },
        },
        create: {
          id: sessionId,
          likes: 1,
        },
      });

      res.status(201).json({
        contentViews: content?.views ?? 0,
        contentLikes: content?.likes ?? 0,
        likesByUser: like.likes ?? 0,
      });
    } else {
      res.status(405).json({
        statusCode: 405,
        message: 'Method not allowed',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
}

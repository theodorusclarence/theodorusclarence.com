import { prismaClient } from '@/lib/prisma.client';

export const getUserLikeCount = async ({
  sessionId,
  slug,
}: {
  sessionId: string;
  slug: string;
}) =>
  await prismaClient.like.count({
    where: {
      sessionId,
      ContentMeta: {
        slug,
      },
    },
  });

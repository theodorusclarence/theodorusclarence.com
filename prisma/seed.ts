import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import faunadata from './data/fauna-backup.json';

async function main() {
  const data = faunadata as unknown as FaunaMeta[];
  data.forEach(
    async (datum) =>
      await prisma.contentMeta.create({
        data: {
          slug: datum.slug,
          views: {
            createMany: {
              data: new Array(datum.views)
                .fill(0)
                .map(() => ({ sessionId: '5db2cdb52c8748af58d9de17ca080e77' })),
            },
          },
          likes: {
            createMany: {
              data: Object.entries(datum.likesByUser).flatMap(
                ([sessionId, likes]) =>
                  new Array(likes).fill(0).map(() => ({ sessionId }))
              ),
            },
          },
        },
      })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

type FaunaMeta = {
  slug: string;
  views: number;
  likes: number;
  likesByUser: Record<string, number>;
};

import faunadb, { query as q } from 'faunadb';

import { AllContentRes } from '@/types/fauna';

const faunaClient = new faunadb.Client({
  secret: process.env.FAUNA_SECRET as string,
});

export const getAllContent = async () => {
  const { data } = await faunaClient.query<AllContentRes>(
    q.Map(
      q.Paginate(q.Documents(q.Collection('contents'))),
      q.Lambda((x) => q.Get(x))
    )
  );

  return data.map((x) => x.data);
};

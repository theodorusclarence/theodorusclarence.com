import faunadb, { query as q } from 'faunadb';

import { AllContentRes, ContentMetaRes } from '@/types/fauna';

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

export const getContentMeta = async (slug: string) => {
  const data = await faunaClient.query<ContentMetaRes>(
    q.Let(
      {
        contentRef: q.Match(q.Index('get_contents_by_slug'), slug),
        contentExists: q.Exists(q.Var('contentRef')),
      },
      q.If(q.Var('contentExists'), q.Get(q.Var('contentRef')), null)
    )
  );

  return data.data;
};

export const upsertContentMeta = async (slug: string) => {
  const data = await faunaClient.query<ContentMetaRes>(
    q.Let(
      {
        match: q.Match(q.Index('get_contents_by_slug'), slug),
        contentExists: q.Exists(q.Var('match')),
      },
      q.If(
        q.Var('contentExists'),
        q.Update(q.Select('ref', q.Get(q.Var('match'))), {
          data: {
            views: q.Add(q.Select(['data', 'views'], q.Get(q.Var('match'))), 1),
          },
        }),
        q.Create(q.Collection('contents'), {
          data: { slug: slug, views: 1, likes: 1, likesByUser: {} },
        })
      )
    )
  );

  return data.data;
};

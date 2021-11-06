import faunadb, { query as q } from 'faunadb';

import { AllContentRes, ContentMetaRes } from '@/types/fauna';

const faunaClient = new faunadb.Client({
  secret: process.env.FAUNA_SECRET as string,
});

/**
 * Get all content meta from the database
 */
export const getAllContent = async () => {
  const { data } = await faunaClient.query<AllContentRes>(
    q.Map(
      q.Paginate(q.Documents(q.Collection('contents'))),
      q.Lambda((x) => q.Get(x))
    )
  );

  return data.map((x) => x.data);
};

/**
 * Get single content meta from the database by slug
 */
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

/**
 * Create or add view count to the slug
 */
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

/**
 * Create or add like count to the slug
 */
export const upsertLike = async (slug: string, sessionId: string) => {
  const data = await faunaClient.query<ContentMetaRes>(
    q.Let(
      {
        match: q.Match(q.Index('get_contents_by_slug'), slug),
        userLike: q.Select(
          ['data', 'likesByUser', sessionId],
          q.Get(q.Var('match')),
          false
        ),
      },

      q.If(
        // If userLike is found
        q.IsInteger(q.Var('userLike')),
        q.If(
          // First check if we can add more
          q.GTE(q.Var('userLike'), 5),
          q.Abort('Max 5'),
          // Then Update the likes and update the likesByUser by sessionId
          q.Update(q.Select('ref', q.Get(q.Var('match'))), {
            data: {
              likes: q.Add(
                q.Select(['data', 'likes'], q.Get(q.Var('match'))),
                1
              ),
              likesByUser: {
                [`${sessionId}`]: q.Add(q.Var('userLike'), 1),
              },
            },
          })
        ),
        // Else, Update the likes and create new key with sessionId
        q.Update(q.Select('ref', q.Get(q.Var('match'))), {
          data: {
            likes: q.Add(q.Select(['data', 'likes'], q.Get(q.Var('match'))), 1),
            likesByUser: {
              [`${sessionId}`]: 1,
            },
          },
        })
      )
    )
  );

  return data.data;
};

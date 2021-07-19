const faunadb = require('faunadb');
const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

const createSlugView = async (slug) => {
  await faunaClient.query(
    q.Create(q.Collection('views'), {
      data: { slug: slug, count: 0 },
    })
  );
};

const getViews = async () => {
  const { data } = await faunaClient.query(
    q.Get(q.Ref(q.Collection('views'), '287880099949183493'))
  );

  return data;
};

const getViewBySlug = async (slug) => {
  const document = await faunaClient.query(
    q.Get(q.Match(q.Index('get_view_by_slug'), slug))
  );

  return document;
};

const checkSlugExist = async (slug) => {
  return await faunaClient.query(
    q.Exists(q.Match(q.Index('get_view_by_slug'), slug))
  );
};

const updateView = async (ref, data) => {
  const res = await faunaClient.query(
    q.Update(q.Ref(ref), {
      data,
    })
  );

  return res;
};

const createSuggestion = async (data) => {
  return await faunaClient.query(
    q.Create(q.Collection('suggestions'), {
      data,
    })
  );
};

const getAllSuggestions = async () => {
  const { data } = await faunaClient.query(
    q.Map(
      q.Paginate(q.Match(q.Index('get_all_suggestions'))),
      q.Lambda('ref', q.Get(q.Var('ref')))
    )
  );

  const suggestions = data.map((suggestion) => {
    suggestion.id = suggestion.ref.id;
    delete suggestion.ref;
    return suggestion;
  });

  return suggestions;
};

const createContent = async (slug) => {
  return await faunaClient.query(
    q.Create(q.Collection('contents'), {
      data: { slug: slug, views: 0, likes: 1, likesByUser: {} },
    })
  );
};

const getAllContent = async () => {
  const { data } = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('contents'))),
      q.Lambda((x) => q.Get(x))
    )
  );

  return data;
};

// const getContentMeta = async (slug) => {
//   return await faunaClient.query(
//     q.If(q.Exists(q.Match(q.Index('get_contents_by_slug'), slug)),
//       q.Get()
//     )
//   );
// };

const getContentMeta = async (slug) => {
  return await faunaClient.query(
    q.Let(
      {
        contentRef: q.Match(q.Index('get_contents_by_slug'), slug),
        contentExists: q.Exists(q.Var('contentRef')),
      },
      q.If(q.Var('contentExists'), q.Get(q.Var('contentRef')), null)
    )
  );
};

const upsertContentMeta = async (slug) => {
  return await faunaClient.query(
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
};

const upsertLikeByUser = async (slug, sessionId) => {
  return await faunaClient.query(
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
};

module.exports = {
  getViews,
  getViewBySlug,
  checkSlugExist,
  updateView,
  getAllSuggestions,
  createSuggestion,
  createSlugView,
  createContent,
  getContentMeta,
  upsertContentMeta,
  upsertLikeByUser,
  getAllContent,
};

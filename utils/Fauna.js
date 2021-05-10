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

module.exports = {
  getViews,
  getViewBySlug,
  checkSlugExist,
  updateView,
  getAllSuggestions,
  createSuggestion,
  createSlugView,
};

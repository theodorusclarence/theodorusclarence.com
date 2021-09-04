export function getBlogs(data) {
  return data?.data
    ?.filter((item) => item.slug.startsWith('b'))
    .map((item) => ({ ...item, slug: item.slug.slice(2) }));
}
export function getLibrary(data) {
  return data?.data
    ?.filter((item) => item.slug.startsWith('l'))
    .map((item) => ({ ...item, slug: item.slug.slice(2) }));
}
export function getProjects(data) {
  return data?.data
    ?.filter((item) => item.slug.startsWith('p'))
    .map((item) => ({ ...item, slug: item.slug.slice(2) }));
}

export async function getViewsFromDevto() {
  try {
    const res = await fetch('https://dev.to/api/articles/me', {
      headers: {
        'api-key': process.env.DEVTO_KEY,
      },
    });
    const dev = await res.json();

    return dev
      .filter((d) =>
        d.canonical_url.includes('https://theodorusclarence.com/blog')
      )
      .map((d) => ({
        slug: d.canonical_url.slice(35),
        views: d.page_views_count,
      }));
  } catch (error) {
    console.error(error);
  }
}

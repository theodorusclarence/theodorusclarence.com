import axios from 'axios';

export async function getViewsFromDevto() {
  try {
    const res = await axios.get<DevtoArticle[]>(
      'https://dev.to/api/articles/me',
      {
        headers: {
          'api-key': process.env.DEVTO_KEY as string,
        },
      }
    );

    return res.data
      .filter((d) =>
        d.canonical_url.includes('https://theodorusclarence.com/blog')
      )
      .map((d) => ({
        slug: d.canonical_url.slice(35),
        views: d.page_views_count,
      }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

export async function getArticleViewsFromDevto(blogSlug: string) {
  try {
    const _devto = await getViewsFromDevto();
    const devto = _devto?.find((i) => i.slug === blogSlug.replace('b_', ''));

    return devto?.views;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

interface DevtoArticle {
  canonical_url: string;
  page_views_count: number;
}

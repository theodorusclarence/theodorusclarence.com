import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Seo(props) {
  const router = useRouter();
  const meta = {
    title: "Theodorus Clarence's Portfolio – theodorusclarence.com",
    description:
      'An online portfolio and blog by Theodorus Clarence. Showcase of my projects, and some of my thoughts about website development.',
    image: 'https://theodorusclarence.com/favicon/large-og.jpg',
    type: 'website',
    robots: 'follow, index',
    ...props,
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta
        property='og:url'
        content={`https://theodorusclarence.com${router.asPath}`}
      />
      <link
        rel='canonical'
        href={`https://theodorusclarence.com${router.asPath}`}
      />
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content='Theodorus Clarence' />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta property='og:image' content={meta.image} />
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@theodorusclarence' />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      {meta.date && (
        <meta property='article:published_time' content={meta.date} />
      )}
    </Head>
  );
}

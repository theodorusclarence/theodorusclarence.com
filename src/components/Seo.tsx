import Head from 'next/head';
import { useRouter } from 'next/router';

import { openGraph } from '@/lib/helper.client';

const defaultMeta = {
  title: 'Elliot Mackinnon',
  siteName: 'https://emackinnon.com',
  description:
    'An online portfolio and blog by Elliot Mackinnon. Showcase of my projects, and some of my thoughts about website development.',
  url: 'https://emackinnon1.github.io/folio-v2',
  image:
    'https://github.com/emackinnon1/folio-v2/tree/main/public/favicon/EM.png',
  type: 'website',
  robots: 'follow, index',
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
  isBlog?: boolean;
  banner?: string;
  canonical?: string;
  tags?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  // Use siteName if there is templateTitle
  // but show full title if there is none
  meta.image = openGraph({
    description: meta.description,
    siteName: props.templateTitle ? meta.siteName : meta.title,
    templateTitle: props.templateTitle,
    banner: props.banner,
    isBlog: props.isBlog,
    tags: props.tags,
  });

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <link
        rel='canonical'
        href={meta.canonical ? meta.canonical : `${meta.url}${router.asPath}`}
      />
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta name='image' property='og:image' content={meta.image} />
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@th_clarence' />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      {meta.date && (
        <>
          <meta property='article:published_time' content={meta.date} />
          <meta
            name='publish_date'
            property='og:publish_date'
            content={meta.date}
          />
          <meta
            name='author'
            property='article:author'
            content='Elliot Mackinnon'
          />
        </>
      )}
      {meta.isBlog && (
        <script
          key='structured-data'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: meta.title,
              description: meta.description,
              author: [
                {
                  '@type': 'Person',
                  name: 'Elliot Mackinnon',
                },
              ],
              image: meta.image,
              datePublished: meta.date,
            }),
          }}
        />
      )}

      {/* Favicons */}
      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta
        name='msapplication-TileImage'
        content='/folio-v2/favicon/ms-icon-144x144.png'
      />
      <meta name='theme-color' content='#ffffff' />
    </Head>
  );
}

type Favicons = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

const favicons: Array<Favicons> = [
  {
    rel: 'em-icon',
    sizes: 'large-large',
    href: '/folio-v2/favicon/EM.png',
  },
  // {
  //   rel: 'apple-touch-icon',
  //   sizes: '57x57',
  //   href: '/folio-v2/favicon/apple-icon-57x57.png',
  // },
  // {
  //   rel: 'apple-touch-icon',
  //   sizes: '60x60',
  //   href: '/folio-v2/favicon/apple-icon-60x60.png',
  // },
  // {
  //   rel: 'apple-touch-icon',
  //   sizes: '72x72',
  //   href: '/folio-v2/favicon/apple-icon-72x72.png',
  // },
  // {
  //   rel: 'apple-touch-icon',
  //   sizes: '76x76',
  //   href: '/folio-v2/favicon/apple-icon-76x76.png',
  // },
  // {
  //   rel: 'apple-touch-icon',
  //   sizes: '114x114',
  //   href: '/folio-v2/favicon/apple-icon-114x114.png',
  // },
  // {
  //   rel: 'apple-touch-icon',
  //   sizes: '120x120',
  //   href: '/folio-v2/favicon/apple-icon-120x120.png',
  // },
  // {
  //   rel: 'apple-touch-icon',
  //   sizes: '144x144',
  //   href: '/folio-v2/favicon/apple-icon-144x144.png',
  // },
  // {
  //   rel: 'apple-touch-icon',
  //   sizes: '152x152',
  //   href: '/folio-v2/favicon/apple-icon-152x152.png',
  // },
  // {
  //   rel: 'apple-touch-icon',
  //   sizes: '180x180',
  //   href: '/folio-v2/favicon/apple-icon-180x180.png',
  // },
  // {
  //   rel: 'icon',
  //   type: 'image/png',
  //   sizes: '192x192',
  //   href: '/folio-v2/favicon/android-icon-192x192.png',
  // },
  // {
  //   rel: 'icon',
  //   type: 'image/png',
  //   sizes: '32x32',
  //   href: '/folio-v2/favicon/favicon-32x32.png',
  // },
  // {
  //   rel: 'icon',
  //   type: 'image/png',
  //   sizes: '96x96',
  //   href: '/folio-v2/favicon/favicon-96x96.png',
  // },
  // {
  //   rel: 'icon',
  //   type: 'image/png',
  //   sizes: '16x16',
  //   href: '/folio-v2/favicon/favicon-16x16.png',
  // },
  {
    rel: 'manifest',
    href: '/folio-v2/favicon/manifest.json',
  },
];

import axios from 'axios';
import { AppProps } from 'next/app';
import Router from 'next/router';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import nProgress from 'nprogress';
import * as React from 'react';
import { SWRConfig } from 'swr';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import 'react-tippy/dist/tippy.css';
import '@/styles/globals.css';
import '@/styles/mdx.css';
import '@/styles/dracula.css';
import '@/styles/nprogress.css';

import { getFromLocalStorage } from '@/lib/helper';

import { blockDomainMeta } from '@/constants/env';

const GTM_ID = 'GTM-KD5JMLMM';

const GtmScript = () => (
  <>
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height='0'
        width='0'
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
    <Script
      id='gtm-script'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{
        __html: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', '${GTM_ID}');
  `,
      }}
    />
  </>
);

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Don't increment views if not on main domain
    if (window.location.host !== 'se.isfusion.cloud' && blockDomainMeta) {
      if (getFromLocalStorage('incrementMetaFlag') !== 'false') {
        localStorage.setItem('incrementMetaFlag', 'false');
        // reload page to make changes
        window.location.reload();
      }
    }
  }, []);

  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
      <GtmScript />
      <SWRConfig
        value={{
          fetcher: (url) => axios.get(url).then((res) => res.data),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </ThemeProvider>
  );
}

export default MyApp;

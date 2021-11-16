import axios from 'axios';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import * as React from 'react';
import { hotjar } from 'react-hotjar';
import { SWRConfig } from 'swr';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import 'react-tippy/dist/tippy.css';
import '@/styles/globals.css';
import '@/styles/mdx.css';
import '@/styles/dracula.css';

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    hotjar.initialize(2702988, 6);
  }, []);

  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
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

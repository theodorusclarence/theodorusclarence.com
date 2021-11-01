import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import 'react-tippy/dist/tippy.css';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

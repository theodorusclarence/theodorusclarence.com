import '@/styles/globals.css';
import '@/styles/dracula.css';
// for tippy js animation
import 'tippy.js/animations/scale-subtle.css';
import { ThemeProvider } from 'next-themes';
import { AnimateSharedLayout } from 'framer-motion';

import { PreloadProvider } from '@/context/PreloadContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
      <AnimateSharedLayout>
        <PreloadProvider>
          <Component {...pageProps} />
        </PreloadProvider>
      </AnimateSharedLayout>
    </ThemeProvider>
  );
}

export default MyApp;

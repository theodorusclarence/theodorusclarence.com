import '@/styles/globals.css';
import '@/styles/dracula.css';
// for tippy js animation
import 'tippy.js/animations/scale-subtle.css';
import { ThemeProvider } from 'next-themes';
import { AnimateSharedLayout } from 'framer-motion';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark'>
      <AnimateSharedLayout>
        <Component {...pageProps} />
      </AnimateSharedLayout>
    </ThemeProvider>
  );
}

export default MyApp;

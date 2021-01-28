import '@/styles/globals.css';
import '@/styles/dracula.css';
// for tippy js animation
import 'tippy.js/animations/scale-subtle.css';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import SEO from '@/next-seo.config';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider attribute='class' defaultTheme='system'>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;

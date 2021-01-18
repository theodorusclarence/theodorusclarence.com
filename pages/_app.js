import '../styles/globals.css';
import '../styles/dracula.css';
// for tippy js animation
import 'tippy.js/animations/scale-subtle.css';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider attribute='class'>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;

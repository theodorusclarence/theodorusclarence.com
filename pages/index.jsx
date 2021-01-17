import Nav from '../components/Nav';
import Seo from '../components/Seo';

export default function Home() {
    return (
        <>
            <Seo pageTitle='NextJS Tailwind Starter' />
            <Nav />
            <section className='bg-gray-600'>
                <main className='flex flex-col items-center justify-center min-h-screen text-green-400 text'>
                    Hello
                </main>
            </section>
        </>
    );
}

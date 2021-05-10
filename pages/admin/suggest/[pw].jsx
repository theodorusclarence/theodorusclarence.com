import useSWR from 'swr';

import fetcher from '@/utils/fetcher';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function SuggestionViewPage() {
  const { data } = useSWR('/api/suggest', fetcher);

  data?.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Nav />
        <section className='py-6 mt-4'>
          <main className='space-y-4 layout'>
            <header className='space-y-2'>
              <h1>List of Suggestions</h1>
            </header>
            <ul className='grid gap-4 '>
              {data?.map((suggestion) => (
                <li key={suggestion.id} className='p-2 rounded-md border-thin'>
                  <h4>
                    {suggestion.data.name} •{' '}
                    <p className='inline component'>
                      {`${new Date(suggestion.data.date)}`}
                    </p>
                  </h4>
                  <p className='component'>{suggestion.data.content}</p>
                </li>
              ))}
            </ul>
          </main>
        </section>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { pw: process.env.ADMIN_PASSWORD } }],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

import Seo from '@/components/Seo';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function UmamiPage() {
  function addUmami() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.setItem('umami.disabled', true);
    }
    return null;
  }

  function removeUmami() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.removeItem('umami.disabled');
    }
    return null;
  }

  return (
    <>
      <Seo
        title='Umami - theodorusclarence.com'
        description='Umami Local Storage Generator'
        robots='noindex,nofollow'
      />
      <div className='min-h-screen'>
        <Nav />
        <section className='py-6 mt-4'>
          <article className='flex flex-col items-center gap-4 text-center layout'>
            <button onClick={addUmami} className='p-2 rounded border-thin'>
              Add umami.disabled = true
            </button>
            <button onClick={removeUmami} className='p-2 rounded border-thin'>
              Remove umami.disabled
            </button>
          </article>
        </section>
        <Footer />
      </div>
    </>
  );
}

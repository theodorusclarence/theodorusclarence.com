import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function SuggestionPage() {
  const url = 'https://theodorusclarence.com/suggest';
  const title = 'Suggestion – theodorusclarence.com';
  const description = 'Feel free to leave me a feedback and suggestions!';

  const { register, handleSubmit, errors, reset } = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    const res = await fetch('/api/suggest', {
      method: 'POST',
      body: JSON.stringify({ ...data, date: new Date() }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      reset();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }
  };

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
        }}
      />
      <div className='flex flex-col min-h-screen'>
        <Nav />
        <section className='py-6 mt-4'>
          <main className='space-y-4 layout'>
            <header className='space-y-2'>
              <h1>Suggestions</h1>
              <p className='text-dark dark:text-light'>
                Suggest me some topic! You can give your kind words here too!
              </p>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className='block mb-2' htmlFor='name'>
                Name (optional)
              </label>
              <input
                type='text'
                name='name'
                ref={register}
                className='w-full px-4 py-2 mb-4 transition-colors rounded-md border-thin dark:bg-dark focus:outline-none focus:ring-1 focus:ring-accent-200'
              />
              <label className='block mb-2' htmlFor='content'>
                Suggestions / Feedback{' '}
              </label>
              {errors.content && (
                <span className='text-red-400'>*required</span>
              )}
              <textarea
                cols='30'
                rows='5'
                placeholder='Hi! Can you try to make a blog on how do you style with css?'
                name='content'
                ref={register({ required: true })}
                className='w-full px-4 py-2 mb-4 transition-colors rounded-md border-thin dark:bg-dark focus:outline-none focus:ring-1 focus:ring-accent-200'
              />
              <div>
                <button
                  type='submit'
                  className='inline-block px-4 py-2 font-medium transition-shadow duration-100 rounded-md active:shadow-none hover:shadow-md border-thin'
                >
                  Send
                </button>
                {success && (
                  <span className='ml-4 text-green-400'>Sent! Thankyou :)</span>
                )}
              </div>
            </form>
          </main>
        </section>
        <Footer />
      </div>
    </>
  );
}

import * as React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { classNames } from '@/utils/helper';

export default function SubscribeCard({ className }) {
  const { register, handleSubmit, reset } = useForm();
  const [status, setStatus] = React.useState('idle');
  const [errMsg, setErrMsg] = React.useState(
    'Sorry, something went wrong please try again later'
  );
  const router = useRouter();

  const onSubmit = async (data) => {
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter/add', {
        method: 'POST',
        body: JSON.stringify({ ...data, referrer_url: router.asPath }),
        headers: { 'Content-Type': 'application/json' },
      });

      const resData = await res.json();

      if (res.ok) {
        reset();
        setStatus('success');
      } else {
        if (resData.message.includes('subscribed')) {
          setStatus('subscribed');
        } else {
          setStatus('error');
          setErrMsg(resData.message);
        }
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className={classNames('p-4 rounded border-thin', className)}>
      <h3>
        <span className='accent no-under bg-accent-200/50'>
          Do you like this post?
        </span>
      </h3>
      <p className='mt-2 text-gray-700 dark:text-gray-300'>
        It's only gonna get better, don't miss out 😉. Get an email whenever I
        post, no spam.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-end gap-2 mt-4'
      >
        <div className='flex-grow'>
          <label className='text-sm font-medium' htmlFor='email'>
            Subscribe to my newsletter
          </label>
          <input
            className='w-full px-4 py-2 mt-2 transition-colors rounded-md shadow-none border-thin sm:text-sm dark:bg-dark focus:border-accent-200 focus:outline-none focus:ring-1 focus:ring-accent-200'
            type='email'
            name='email'
            placeholder='Email'
            required
            ref={register}
          />
        </div>
        <button
          type='submit'
          disabled={status === 'loading'}
          className='inline-block px-4 py-2 font-medium transition-shadow duration-100 rounded-md sm:text-sm btn active:shadow-none hover:shadow-md border-thin ring-vis-0'
        >
          Subscribe
        </button>
      </form>
      <p
        className={classNames(
          'mt-2 text-sm',
          status === 'success'
            ? 'text-green-500'
            : status === 'subscribed'
            ? 'text-yellow-500'
            : status === 'error'
            ? 'text-red-500'
            : 'text-gray-700 dark:text-gray-300'
        )}
      >
        {status === 'success'
          ? 'Thanks for subscribing. See you on the email!'
          : status === 'subscribed'
          ? 'You have subscribed to the newsletter, stay tuned!'
          : status === 'error'
          ? errMsg
          : status === 'loading'
          ? 'Loading...'
          : 'I write 1-2 high quality posts about front-end development each month!'}
      </p>
    </div>
  );
}

import axios, { AxiosError } from 'axios';
import clsx from 'clsx';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

import Accent from '@/components/Accent';
import Button from '@/components/buttons/Button';
import CustomLink from '@/components/links/CustomLink';

import { newsletterFlag } from '@/constants/env';

type SubscribeCardProps = {
  className?: string;
  title?: string;
  description?: string;
};
export default function SubscribeCard({
  className,
  title,
  description,
}: SubscribeCardProps) {
  //#region  //*=========== Count ===========
  const { data: subscriber, mutate } = useSWR<{ count: number }>(
    newsletterFlag ? '/api/newsletter/count' : null
  );
  //#endregion  //*======== Count ===========

  //#region  //*=========== Form and Status ===========

  const { register, handleSubmit, reset } = useForm<{ email: string }>();
  const [status, setStatus] = React.useState('idle');
  const [errMsg, setErrMsg] = React.useState(
    'Sorry, something went wrong please try again later'
  );

  const onSubmit = async (data: { email: string }) => {
    setStatus('loading');

    axios
      .post<{ message: string }>('/api/newsletter/add', {
        email: data.email,
      })
      .then(() => {
        reset();
        if (subscriber?.count) mutate({ count: subscriber.count + 1 });
        setStatus('success');
      })
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.data?.message?.includes('subscribed')) {
            setStatus('subscribed');
          } else {
            setStatus('error');
            setErrMsg(
              error.response?.data.message ?? 'Something is wrong with the API.'
            );
          }
        } else {
          setStatus('error');
          setErrMsg('Something is wrong with the API.');
        }
      });
  };
  //#endregion  //*======== Form and Status ===========

  return (
    <div className={clsx('rounded border p-4 dark:border-gray-600', className)}>
      <h3>
        <Accent>{title ?? 'Join to the newsletter list'}</Accent>
      </h3>
      <p className='mt-2 text-gray-700 dark:text-gray-300'>
        {description ??
          "Don't miss out 😉. Get an email whenever I post, no spam."}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mt-2 flex items-end gap-2'
      >
        <div className='flex-grow'>
          <label className='text-sm font-medium' htmlFor='email'>
            Subscribe to my newsletter
          </label>
          <input
            {...register('email')}
            className={clsx(
              'mt-2',
              'w-full rounded-md dark:bg-dark',
              'border border-gray-300 dark:border-gray-600',
              'text-sm md:text-base',
              'focus:border-primary-300 focus:outline-none focus:ring-0 dark:focus:border-primary-300'
            )}
            type='email'
            placeholder='Email'
            required
          />
        </div>
        <Button type='submit' isLoading={status === 'loading'} className=''>
          Subscribe
        </Button>
      </form>
      <p
        className={clsx(
          'mt-3 text-sm',
          status === 'success'
            ? 'text-green-500'
            : status === 'subscribed'
            ? 'text-yellow-500'
            : status === 'error'
            ? 'text-red-500 dark:text-red-400'
            : 'text-gray-700 dark:text-gray-300'
        )}
      >
        {status === 'success' ? (
          'Thanks, please confirm subscription on your email (check promotions or spam tab too)'
        ) : status === 'subscribed' ? (
          'You have subscribed to the newsletter, stay tuned!'
        ) : status === 'error' ? (
          <>
            {errMsg} Sorry! You can subscribe from the{' '}
            <CustomLink href='https://www.getrevue.co/profile/clarence'>
              revue website
            </CustomLink>{' '}
            instead.
          </>
        ) : status === 'loading' ? (
          'Loading...'
        ) : (
          'I write 1-2 high quality posts about front-end development each month!'
        )}
      </p>
      <p className='mt-2 text-xs text-gray-600 dark:text-gray-300'>
        Join <Accent>{subscriber?.count ?? '-'}</Accent> other subscribers
      </p>
    </div>
  );
}

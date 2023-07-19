import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';

import { getFromLocalStorage } from '@/lib/helper.client';

import Accent from '@/components/Accent';
import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function UmamiPage() {
  const [, setRerender] = React.useState(false);
  function forceRerender() {
    setRerender((t) => !t);
  }

  function addUmami() {
    forceRerender();
    if (typeof localStorage !== 'undefined') {
      return localStorage.setItem('umami.disabled', 'true');
    }
    return null;
  }

  function removeUmami() {
    forceRerender();
    if (typeof localStorage !== 'undefined') {
      return localStorage.removeItem('umami.disabled');
    }
    return null;
  }

  function addIncrement() {
    forceRerender();
    if (typeof localStorage !== 'undefined') {
      return localStorage.setItem('incrementMetaFlag', 'false');
    }
    return null;
  }

  function removeIncrement() {
    forceRerender();
    if (typeof localStorage !== 'undefined') {
      return localStorage.removeItem('incrementMetaFlag');
    }
    return null;
  }

  const umamiDisabled = getFromLocalStorage('umami.disabled') === 'true';
  const increaseViewDisabled =
    getFromLocalStorage('incrementMetaFlag') === 'false';

  return (
    <Layout>
      <Seo templateTitle='Umami' robots='noindex,nofollow' />

      <main>
        <section className=''>
          <div className='layout py-20 text-center'>
            <h1>Dev tools</h1>
            <p className='mt-2 text-gray-600 dark:text-gray-300'>
              This is to block tracking.
            </p>
            <div className='mt-4 space-y-2 text-sm'>
              <p>
                Umami:{' '}
                <Accent className='font-semibold'>
                  {umamiDisabled ? 'Not Tracking' : 'Tracking'}
                </Accent>
              </p>
              <p>
                View Count:{' '}
                <Accent className='font-semibold'>
                  {increaseViewDisabled ? 'Not Incrementing' : 'Incrementing'}
                </Accent>
              </p>
            </div>
            <div className='mt-8 flex flex-col items-center gap-4'>
              <Button onClick={removeUmami}>allow track umami</Button>
              <Button onClick={addUmami}>don't track umami</Button>
              <Button onClick={removeIncrement}>
                allow increase view count
              </Button>
              <Button onClick={addIncrement}>don't increase view count</Button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { pw: process.env.ADMIN_PASSWORD } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function UmamiPage() {
  function addUmami() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.setItem('umami.disabled', 'true');
    }
    return null;
  }

  function removeUmami() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.removeItem('umami.disabled');
    }
    return null;
  }

  function addIncrement() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.setItem('incrementMetaFlag', 'false');
    }
    return null;
  }

  function removeIncrement() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.removeItem('incrementMetaFlag');
    }
    return null;
  }

  return (
    <Layout>
      <Seo templateTitle='Umami' robots='noindex,nofollow' />

      <main>
        <section className=''>
          <div className='py-20 text-center layout'>
            <h1>Dev tools</h1>
            <p className='mt-2 text-gray-600 dark:text-gray-300'>
              This is to block tracking.
            </p>
            <div className='flex flex-col items-center gap-4 mt-8'>
              <Button onClick={addUmami}>add umami.disabled</Button>
              <Button onClick={removeUmami}>remove umami.disabled</Button>
              <Button onClick={addIncrement}>add incrementMetaFlag</Button>
              <Button onClick={removeIncrement}>
                remove incrementMetaFlag
              </Button>
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

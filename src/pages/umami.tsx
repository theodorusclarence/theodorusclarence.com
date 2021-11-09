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

  return (
    <Layout>
      <Seo templateTitle='Umami' robots='noindex,nofollow' />

      <main>
        <section className=''>
          <div className='layout'>
            <Button onClick={addUmami}>add umami.disabled</Button>
            <Button onClick={removeUmami}>remove umami.disabled</Button>
          </div>
        </section>
      </main>
    </Layout>
  );
}

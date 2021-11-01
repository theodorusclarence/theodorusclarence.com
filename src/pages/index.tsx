import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function IndexPage() {
  return (
    <Layout>
      <Seo templateTitle='Index' />

      <main>
        <section className=''>
          <div className='py-20 layout min-h-main'>
            <h1>Landing Page</h1>
          </div>
        </section>
        <h1>hi</h1>
      </main>
    </Layout>
  );
}
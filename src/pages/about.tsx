import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function AboutPage() {
  return (
    <Layout>
      <Seo templateTitle='About' />

      <main>
        <section>
          <div className='min-h-main layout'>
            <h1>About Page</h1>
          </div>
        </section>
      </main>
    </Layout>
  );
}

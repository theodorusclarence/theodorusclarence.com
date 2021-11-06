import * as React from 'react';

import Accent from '@/components/Accent';
import SubscribeCard from '@/components/blog/SubscribeCard';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function SubscribePage() {
  return (
    <Layout>
      <Seo templateTitle='Subscribe' />

      <main>
        <section className=''>
          <div className='flex flex-col items-center py-20 text-center layout'>
            <h1>
              Subscribe to <Accent>theodorusclarence.com</Accent>
            </h1>
            <SubscribeCard className='mt-8 text-left' />
          </div>
        </section>
      </main>
    </Layout>
  );
}

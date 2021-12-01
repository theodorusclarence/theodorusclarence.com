import * as React from 'react';

import Accent from '@/components/Accent';
import SubscribeCard from '@/components/content/blog/SubscribeCard';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function SubscribePage() {
  return (
    <Layout>
      <Seo
        templateTitle='Subscribe'
        description='Get notified every time there is a new post through your email.'
      />

      <main>
        <section className=''>
          <div className='layout flex flex-col items-center py-20 text-center'>
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

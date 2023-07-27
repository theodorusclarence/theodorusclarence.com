import * as React from 'react';

import CarbonAds from '@/components/CarbonAds';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function CarbonPage() {
  return (
    <Layout>
      <Seo templateTitle='Carbon' />

      <main>
        <section className=''>
          <div className='layout'>
            <h2>Carbon Ads Here</h2>
            <CarbonAds />
          </div>
        </section>
      </main>
    </Layout>
  );
}

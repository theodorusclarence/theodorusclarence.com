import * as React from 'react';

import useCopyToClipboard from '@/hooks/useCopyToClipboard';

import Accent from '@/components/Accent';
import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function TrfPage() {
  const [copyStatus, setCopyStatus] = React.useState<'idle' | 'copied'>('idle');
  const [copy] = useCopyToClipboard();

  return (
    <Layout>
      <Seo
        templateTitle='Rekening BCA Clarence'
        description='Buka untuk melihat Nomor Rekening Clarence'
        robots='noindex,nofollow'
      />

      <main>
        <section className=''>
          <div className='layout flex flex-col items-center py-12 text-center'>
            <h1>Rekening BCA</h1>
            <p className='mt-8 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400'>
              Atas Nama
            </p>
            <p className='mt-1 text-lg font-semibold tracking-wide'>
              <Accent>CLARENCE</Accent>
            </p>
            <div className='mt-2 flex flex-col items-center space-y-4'>
              <code className='px-4 py-2 text-lg font-semibold'>
                <Accent>7630055037</Accent>
              </code>
              <Button
                onClick={() => {
                  copy('7630055037').then(() => {
                    setCopyStatus('copied');
                    setTimeout(() => setCopyStatus('idle'), 1500);
                  });
                }}
              >
                {copyStatus === 'idle'
                  ? 'Copy Nomor Rekening'
                  : 'Copied to clipboard 🥳'}
              </Button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

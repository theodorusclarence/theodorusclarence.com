import * as React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import Accent from '@/components/Accent';
import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const copyText = {
  idle: 'Copy Nomor Rekening',
  success: 'Copied to clipboard 🥳',
};

export default function TrfPage() {
  const [copyStatus, setCopyStatus] = React.useState<string>(copyText.idle);

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
              <CopyToClipboard
                text='7630055037'
                onCopy={() => {
                  setCopyStatus(copyText.success);
                  setTimeout(() => setCopyStatus(copyText.idle), 1500);
                }}
              >
                <Button>{copyStatus}</Button>
              </CopyToClipboard>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

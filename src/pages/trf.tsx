import * as React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import Accent from '@/components/Accent';
import Button from '@/components/buttons/Button';
import CloudinaryImg from '@/components/images/CloudinaryImg';
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
        templateTitle='Rekening Clarence'
        description='Buka untuk melihat QR Code dan Nomor Rekening Clarence'
        robots='noindex,nofollow'
      />

      <main>
        <section className=''>
          <div className='layout flex flex-col items-center py-12 text-center'>
            <h1>Rekening BCA</h1>
            <p className='mt-4 text-sm font-bold uppercase text-gray-500 dark:text-gray-400'>
              Atas Nama
            </p>
            <h3 className='mt-1'>
              <Accent>CLARENCE</Accent>
            </h3>
            <CloudinaryImg
              className='mt-4 w-full max-w-sm'
              publicId='theodorusclarence/qr-bca_rcbkew.jpg'
              width={992}
              height={886}
              alt='QR BCA'
            />
            <div className='mt-8 flex flex-col items-center space-y-4'>
              <code className='px-4 py-2 font-bold'>
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

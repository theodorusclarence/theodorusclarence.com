import * as React from 'react';

import Accent from '@/components/Accent';
import Comment from '@/components/content/Comment';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

export default function GuestbookPage() {
  return (
    <Layout>
      <Seo
        templateTitle='Guestbook'
        description='Leave whatever you like to say—message, appreciation, suggestions.'
      />

      <main>
        <section className=''>
          <div className='layout py-20'>
            <h1>
              <Accent>Guestbook</Accent>
            </h1>
            <p className='mt-2 text-gray-700 dark:text-gray-200'>
              Leave whatever you like to say—message, appreciation, suggestions.
              If you got some questions, you can leave them on the{' '}
              <CustomLink href='https://github.com/theodorusclarence/theodorusclarence.com/discussions/179'>
                AMA discussion
              </CustomLink>
            </p>
            <figure className='mt-12'>
              <Comment />
            </figure>
          </div>
        </section>
      </main>
    </Layout>
  );
}

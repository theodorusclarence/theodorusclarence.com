import clsx from 'clsx';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import Layout from '@/components/layout/Layout';
// import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';
import TechStack from '@/components/TechStack';

export default function AboutPage() {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo
        templateTitle='About'
        description='Clarence is a front-end developer that started learning in May 2020. He write blogs about his approach and mental model on understanding topics in front-end development.'
      />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout min-h-main py-20'>
            <h2 data-fade='0'>About</h2>
            <h1 className='mt-1' data-fade='1'>
              <Accent>Jeff Fan</Accent>
            </h1>
            <div className='mt-4' data-fade='2'>
              <CloudinaryImg
                className='float-right ml-6 w-36 md:w-72'
                publicId='v1660493139/personal-site/profile6.png'
                width='976'
                height='976'
                alt='Jeff Fan'
                preview={true}
              />
              <article className='prose dark:prose-invert'>
                <p data-fade='3'>Hey there, I'm Jeff Fan!</p>
                <p data-fade='4'>
                  I advocate cloud computing and keep building ideas on the
                  Internet. Currently, I am a SaaS solution engineer based in
                  Munich. Before that, I was a DevOps engineer focused on AWS
                  and Kubernetes.
                </p>
                <p data-fade='5'>
                  We live in a world where technologies surround our day. I
                  believe tech should not look cold but comes from human nature.
                  And a proper analogy could help us to understand tech's
                  nature. Feel free to reach out to me if you would like to
                  understand any cloud computing concepts like you are only five
                  years old.
                </p>
                <p data-fade='6'>We are only one email away :)</p>
              </article>
              <h3 className='mt-12'>Current Favorite Tech Stack</h3>
              <figure className='mt-2'>
                <TechStack />
              </figure>
            </div>
          </div>
        </section>

        <section>
          <div className='layout py-6'>
            <h2>Contact</h2>
            <article className='prose mt-4 dark:prose-invert'>
              <p>
                Do contact me if you need my opinion about web development,
                especially frontend works. I’ll be happy to help! (find my email
                in the footer)
              </p>
            </article>
          </div>
        </section>
      </main>
    </Layout>
  );
}

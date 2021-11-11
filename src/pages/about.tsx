import clsx from 'clsx';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

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
          <div className='py-20 min-h-main layout'>
            <h2 data-fade='0'>About</h2>
            <h1 className='mt-1' data-fade='1'>
              <Accent>Theodorus Clarence</Accent>
            </h1>
            <div className='mt-4' data-fade='2'>
              <CloudinaryImg
                className='float-right ml-6 w-36 md:w-72'
                publicId='theodorusclarence/clarence_gu3cxx.jpg'
                width='1345'
                height='1511'
                alt='Photo of me'
                preview={false}
              />
              <article className='prose dark:prose-dark'>
                <p data-fade='3'>
                  Hello! I'm Clarence. I started learning web development in May
                  2020, which is the start of the pandemic. I have nothing much
                  to do so I decided to learn web development from a udemy
                  course, then started watching a bunch of{' '}
                  <CustomLink href='/blog/youtube-list'>
                    youtube videos
                  </CustomLink>{' '}
                  to explore more about web development especially frontend
                  development.
                </p>
                <p data-fade='4'>
                  There are a lot of things and technologies to learn in
                  frontend development and I am motivated to learn as much as
                  possible. I enjoy learning something new and getting feedback
                  to make myself better and improve.
                </p>
                <p data-fade='5'>
                  In this website I will be writing some blogs and showcase my
                  projects. I believe that writing what I have learned is the
                  best way to remember things, and I can share my knowledge
                  along the way. So do contact me and I will be very happy to
                  help!
                </p>
              </article>
            </div>
          </div>
        </section>

        <section>
          <div className='layout'>
            <h2 className='animate-fade-in-initial fade-in-7'>Contact</h2>
            <article className='mt-4 prose dark:prose-dark'>
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

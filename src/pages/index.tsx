import clsx from 'clsx';
import * as React from 'react';
import { IoArrowDownOutline } from 'react-icons/io5';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';
import TechStack from '@/components/TechStack';

export default function IndexPage() {
  return (
    <Layout>
      <Seo />

      <main>
        <section className='flex flex-col justify-center -mt-20 min-h-main'>
          <article className='layout'>
            <h2 className='text-2xl md:text-4xl'>Hi!</h2>
            <h1 className='mt-1 text-3xl md:text-5xl'>
              You can call me <Accent>Clarence</Accent>
            </h1>
            <p className='max-w-4xl mt-2 leading-normal text-gray-700 dark:text-gray-200'>
              I'm a fast learner and hardworking Informatics Student at Institut
              Teknologi Sepuluh Nopember.
              <br />
              I'm currently really interested in Frontend Development.{' '}
              <CustomLink href='/about'>Reach me out</CustomLink> to talk more
              about frontend works!
            </p>
          </article>
          <div className='mt-12 layout'>
            <h2 className='text-2xl md:text-4xl'>
              Current Favorite Tech Stack
            </h2>
            <figure className='mt-2'>
              <TechStack />
            </figure>
          </div>
          <button
            className={clsx(
              'absolute bottom-2 md:bottom-10 left-1/2 -translate-x-1/2',
              'rounded-md cursor-pointer transition-colors',
              'hover:text-primary-300 focus-visible:text-primary-300'
            )}
            onClick={(e) => {
              e.preventDefault();
              window.scrollBy({
                top: window.innerHeight - 130,
                left: 0,
                behavior: 'smooth',
              });
            }}
          >
            <IoArrowDownOutline className='w-8 h-8 md:w-10 md:h-10 animate-bounce' />
          </button>
        </section>
        <section className='py-20'>
          <article className='layout min-h-main '>
            <h1>Hi</h1>
          </article>
        </section>
      </main>
    </Layout>
  );
}

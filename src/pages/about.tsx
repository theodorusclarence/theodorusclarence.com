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
        templateTitle='About Jeff Fan'
        description='Jeff Fan is a Senior Solutions Engineer specializing in advocating cloud computing
        and building interesting ideas with cloud. Currently, he is focusing son helping customers to build successful products with simplicity at
        DigitalOcean.'
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
                publicId='v1660493139/personal-site/jeff-the-louvre'
                width='1280'
                height='963'
                alt='Jeff Fan'
                preview={true}
              />
              <article className='prose dark:prose-invert'>
                <p data-fade='3'>Hey there👋</p>
                <p data-fade='4'>
                  I advocate cloud computing and keep building ideas on the
                  cloud. Currently, I am a Senior Solutions Engineer based in
                  Munich. Before that, I was a DevOps engineer focused on AWS
                  and Kubernetes.
                </p>
                <p data-fade='5'>
                  With a background in business administration and computer
                  science, I know how overwhelming when you are fresh to the
                  cloud industry. As a solution engineer, I aim to bridge the
                  gap with a solution and establish a long-term trust
                  relationship. Being a solution engineer is one of the best
                  decisions in my career so far.
                </p>
                <p data-fade='6'>
                  If you don't have a tech background but want to know more
                  about the cloud industry or some SaaS companies, feel free to
                  send me a virtual coffee invite! Happy to help!
                </p>

                {/* <p data-fade='6'>
                  We live in a world where technologies surround our day. I
                  believe tech should not look cold but comes from human nature.
                  And a proper analogy could help us to understand tech's
                  nature. Feel free to reach out to me if you would like to
                  understand any cloud computing concepts like you are only five
                  years old.
                </p> */}
                <p data-fade='7'>We are only one email away 🚀</p>
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
                Do contact me if you need my opinion about solution engineering
                and cloud computing especially topics like value-selling and
                Kubernetes a. I’ll be happy to help! (find my email in the
                footer)
              </p>
            </article>
          </div>
        </section>
      </main>
    </Layout>
  );
}
